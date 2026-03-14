/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  Key, Globe, Shield, Cpu, Plus, Trash2,
  Eye, EyeOff, Loader2, Check, X, Mail,
  Github, Slack, Webhook
} from "lucide-react";

type Variable = { id: string; key: string; value: string; encrypted: boolean };
type Credential = { id: string; name: string; type: string; data: any };
type Environment = { id: string; name: string; isActive: boolean; variables: any };

const TABS = [
  { id: "variables", label: "Variables", icon: <Key size={14} /> },
  { id: "credentials", label: "Credentials", icon: <Shield size={14} /> },
  { id: "environments", label: "Environments", icon: <Globe size={14} /> },
  { id: "ai-usage", label: "AI Usage", icon: <Cpu size={14} /> },
];

const CREDENTIAL_TYPES = [
  { type: "gmail", label: "Gmail", icon: <Mail size={16} />, color: "text-red-400", fields: ["email", "accessToken", "refreshToken"] },
  { type: "github", label: "GitHub", icon: <Github size={16} />, color: "text-zinc-300", fields: ["token", "username"] },
  { type: "slack", label: "Slack", icon: <Slack size={16} />, color: "text-amber-400", fields: ["botToken", "signingSecret"] },
  { type: "webhook", label: "Webhook", icon: <Webhook size={16} />, color: "text-purple-400", fields: ["url", "secret"] },
];

export default function SettingsClient() {
  const [tab, setTab] = useState("variables");
  const [variables, setVariables] = useState<Variable[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [aiUsage, setAiUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Variable form
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newEncrypted, setNewEncrypted] = useState(false);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  // Credential form
  const [newCredType, setNewCredType] = useState("gmail");
  const [newCredName, setNewCredName] = useState("");
  const [newCredData, setNewCredData] = useState<Record<string, string>>({});
  const [showCredForm, setShowCredForm] = useState(false);

  // Environment form
  const [newEnvName, setNewEnvName] = useState("");
  const [showEnvForm, setShowEnvForm] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/variables").then(r => r.json()),
      fetch("/api/credentials").then(r => r.json()),
      fetch("/api/environments").then(r => r.json()),
    ]).then(([vars, creds, envs]) => {
      setVariables(Array.isArray(vars) ? vars : []);
      setCredentials(Array.isArray(creds) ? creds : []);
      setEnvironments(Array.isArray(envs) ? envs : []);
      setLoading(false);
    });
  }, []);

  const addVariable = async () => {
    if (!newKey || !newValue) return;
    setSaving(true);
    const res = await fetch("/api/variables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: newKey, value: newValue, encrypted: newEncrypted }),
    });
    const data = await res.json();
    setVariables(v => [...v, data]);
    setNewKey(""); setNewValue(""); setNewEncrypted(false);
    setSaving(false);
  };

  const deleteVariable = async (id: string) => {
    await fetch(`/api/variables/${id}`, { method: "DELETE" });
    setVariables(v => v.filter(x => x.id !== id));
  };

  const addCredential = async () => {
    if (!newCredName) return;
    setSaving(true);
    const res = await fetch("/api/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCredName, type: newCredType, data: newCredData }),
    });
    const data = await res.json();
    setCredentials(c => [...c, data]);
    setNewCredName(""); setNewCredData({}); setShowCredForm(false);
    setSaving(false);
  };

  const deleteCredential = async (id: string) => {
    await fetch(`/api/credentials/${id}`, { method: "DELETE" });
    setCredentials(c => c.filter(x => x.id !== id));
  };

  const addEnvironment = async () => {
    if (!newEnvName) return;
    setSaving(true);
    const res = await fetch("/api/environments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newEnvName, variables: {} }),
    });
    const data = await res.json();
    setEnvironments(e => [...e, data]);
    setNewEnvName(""); setShowEnvForm(false);
    setSaving(false);
  };

  const credType = CREDENTIAL_TYPES.find(c => c.type === newCredType);

  return (
    <div className="p-8 max-w-4xl mx-auto text-zinc-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
        <p className="text-zinc-400 text-sm mt-1">Credentials, değişkenler ve ortam ayarları</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-zinc-500" /></div>
      ) : (
        <>
          {/* VARIABLES */}
          {tab === "variables" && (
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-sm font-semibold text-zinc-300 mb-4">Yeni Değişken</h2>
                <div className="flex gap-3">
                  <input
                    value={newKey}
                    onChange={e => setNewKey(e.target.value)}
                    placeholder="KEY_NAME"
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-purple-500"
                  />
                  <input
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    placeholder="değer"
                    type={newEncrypted ? "password" : "text"}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                    <input type="checkbox" checked={newEncrypted} onChange={e => setNewEncrypted(e.target.checked)} className="accent-purple-500" />
                    Şifreli
                  </label>
                  <button onClick={addVariable} disabled={saving || !newKey || !newValue}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  </button>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {variables.length === 0 ? (
                  <div className="p-8 text-center text-zinc-600 text-sm">Henüz değişken yok</div>
                ) : (
                  variables.map((v, i) => (
                    <div key={v.id} className={`flex items-center gap-4 px-5 py-3 ${i !== 0 ? "border-t border-zinc-800" : ""}`}>
                      <code className="text-sm text-purple-300 font-mono flex-1">{v.key}</code>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-zinc-400 font-mono truncate">
                          {showValues[v.id] ? v.value : "••••••••"}
                        </span>
                        <button onClick={() => setShowValues(s => ({ ...s, [v.id]: !s[v.id] }))}
                          className="text-zinc-600 hover:text-zinc-400"
                        >
                          {showValues[v.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                      </div>
                      {v.encrypted && <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">Şifreli</span>}
                      <button onClick={() => deleteVariable(v.id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* CREDENTIALS */}
          {tab === "credentials" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setShowCredForm(!showCredForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-medium transition-colors"
                >
                  <Plus size={14} /> Yeni Credential
                </button>
              </div>

              {showCredForm && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-zinc-500 mb-1.5 block">Tip</label>
                      <select value={newCredType} onChange={e => { setNewCredType(e.target.value); setNewCredData({}); }}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                      >
                        {CREDENTIAL_TYPES.map(c => <option key={c.type} value={c.type}>{c.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1.5 block">İsim</label>
                      <input value={newCredName} onChange={e => setNewCredName(e.target.value)}
                        placeholder="Benim Gmail Hesabım"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {credType?.fields.map(field => (
                    <div key={field}>
                      <label className="text-xs text-zinc-500 mb-1.5 block capitalize">{field}</label>
                      <input
                        value={newCredData[field] ?? ""}
                        onChange={e => setNewCredData(d => ({ ...d, [field]: e.target.value }))}
                        type="password"
                        placeholder={field}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <button onClick={addCredential} disabled={saving || !newCredName}
                      className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
                    >
                      {saving ? <Loader2 size={14} className="animate-spin mx-auto" /> : "Kaydet"}
                    </button>
                    <button onClick={() => setShowCredForm(false)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {credentials.length === 0 ? (
                  <div className="p-8 text-center text-zinc-600 text-sm">Henüz credential yok</div>
                ) : (
                  credentials.map((c, i) => {
                    const ct = CREDENTIAL_TYPES.find(t => t.type === c.type);
                    return (
                      <div key={c.id} className={`flex items-center gap-4 px-5 py-4 ${i !== 0 ? "border-t border-zinc-800" : ""}`}>
                        <div className={`w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center ${ct?.color}`}>
                          {ct?.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-zinc-200">{c.name}</div>
                          <div className="text-xs text-zinc-500 capitalize">{c.type}</div>
                        </div>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={8} /> Bağlı
                        </span>
                        <button onClick={() => deleteCredential(c.id)} className="text-zinc-600 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ENVIRONMENTS */}
          {tab === "environments" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button onClick={() => setShowEnvForm(!showEnvForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-medium transition-colors"
                >
                  <Plus size={14} /> Yeni Environment
                </button>
              </div>

              {showEnvForm && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex gap-3">
                  <input value={newEnvName} onChange={e => setNewEnvName(e.target.value)}
                    placeholder="production, staging, dev..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <button onClick={addEnvironment} disabled={saving || !newEnvName}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    Ekle
                  </button>
                  <button onClick={() => setShowEnvForm(false)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm transition-colors"
                  >
                    İptal
                  </button>
                </div>
              )}

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {environments.length === 0 ? (
                  <div className="p-8 text-center text-zinc-600 text-sm">Henüz environment yok</div>
                ) : (
                  environments.map((env, i) => (
                    <div key={env.id} className={`flex items-center gap-4 px-5 py-4 ${i !== 0 ? "border-t border-zinc-800" : ""}`}>
                      <div className={`w-2 h-2 rounded-full ${env.isActive ? "bg-emerald-400" : "bg-zinc-600"}`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-zinc-200 capitalize">{env.name}</div>
                        <div className="text-xs text-zinc-500">
                          {Object.keys(env.variables ?? {}).length} değişken
                        </div>
                      </div>
                      {env.isActive && (
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          Aktif
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* AI USAGE */}
          {tab === "ai-usage" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Toplam İstek", value: "—", color: "text-purple-400" },
                  { label: "Input Token", value: "—", color: "text-blue-400" },
                  { label: "Output Token", value: "—", color: "text-amber-400" },
                ].map(s => (
                  <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center">
                    <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
                    <div className="text-xs text-zinc-500">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center text-zinc-600 text-sm">
                AI kullanım takibi yakında aktif olacak
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}