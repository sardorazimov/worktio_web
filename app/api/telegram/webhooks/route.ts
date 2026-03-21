/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { flows, executions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Telegram body:", JSON.stringify(body));

  const message = body.message || body.channel_post;
  if (!message) return NextResponse.json({ ok: true });

  const text = message.text || message.caption || "";

  // Direkt kanala gönder — AI yok, test için
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: channelId,
      text: `📢 Yeni içerik:\n\n${text}`,
      parse_mode: "HTML",
    }),
  });

  const result = await res.json();
  console.log("Telegram result:", result);

  return NextResponse.json({ ok: true });
}

async function processContent(payload: any) {
  const results: any = {};

  // 1. AI ile içeriği platforma göre düzenle
  const aiContent = await generatePlatformContent(payload.text, payload.contentType);

  // 2. Paralel paylaşım
  const promises = [];

  // Telegram Kanal
  promises.push(
    postToTelegram(payload.fileId, aiContent.telegram, payload.contentType)
      .then(r => { results.telegram = r; })
      .catch(e => { results.telegram = { error: e.message }; })
  );

  // X (Twitter)
  promises.push(
    postToTwitter(aiContent.twitter)
      .then(r => { results.twitter = r; })
      .catch(e => { results.twitter = { error: e.message }; })
  );

  await Promise.allSettled(promises);

  // DB'ye kaydet
  await db.insert(executions).values({
    flowId: "social-media-flow",
    userId: "system",
    status: "success",
    results,
    duration: 0,
  });

  return results;
}

async function generatePlatformContent(text: string, type: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Sen bir sosyal medya içerik uzmanısın. Verilen içeriği her platform için optimize et.
          Yanıtı JSON formatında ver:
          {
            "telegram": "Telegram için içerik (emoji kullan, max 1000 karakter)",
            "twitter": "X için içerik (max 280 karakter, hashtag ekle)",
            "instagram": "Instagram için içerik (emoji, hashtag, max 2200 karakter)",
            "youtube": "YouTube için başlık ve açıklama: {title: '', description: ''}"
          }`
        },
        { role: "user", content: `İçerik tipi: ${type}\n\nİçerik: ${text}` }
      ],
      response_format: { type: "json_object" },
    }),
  });

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

async function postToTelegram(fileId: string | null, text: string, type: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  const base = `https://api.telegram.org/bot${token}`;

  if (fileId && type === "image") {
    const res = await fetch(`${base}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: channelId, photo: fileId, caption: text, parse_mode: "HTML" }),
    });
    return res.json();
  } else if (fileId && type === "video") {
    const res = await fetch(`${base}/sendVideo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: channelId, video: fileId, caption: text, parse_mode: "HTML" }),
    });
    return res.json();
  } else {
    const res = await fetch(`${base}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: channelId, text, parse_mode: "HTML" }),
    });
    return res.json();
  }
}

async function postToTwitter(text: string) {
  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
    body: JSON.stringify({ text: text.slice(0, 280) }),
  });
  return res.json();
}