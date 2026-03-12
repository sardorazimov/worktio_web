/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Resend istemcisini başlatıyoruz
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email gerekli' }, { status: 400 });
    }

    // Kendine (Admin'e) bildirim maili atıyorsun
    // Not: Kendi domainini doğrulayana kadar from kısmında onboarding@resend.dev kullanabilirsin
    const { data, error } = await resend.emails.send({
      from: 'Worktio System <onboarding@resend.dev>',
      to: ['sardorazimov2901@gmail.com'], // Buraya kendi mailini yaz, kayıt oldukça sana düşsün
      subject: '🚀 Worktio Yeni Kayıt!',
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #050508; color: #fff;">
          <h2 style="color: #d946ef;">Yeni Bekleme Listesi Kaydı</h2>
          <p style="color: #a3a3a3;">Sistem açılışı için biri daha sıraya girdi:</p>
          <div style="padding: 15px; background-color: #171717; border-radius: 8px; border: 1px solid #262626;">
            <strong>Email:</strong> <span style="color: #f97316;">${email}</span>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (_error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}