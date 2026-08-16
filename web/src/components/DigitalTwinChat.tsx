"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { BRAND, STARTER_PROMPTS } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Halo, saya ${BRAND.assistantName}, asisten AI ${BRAND.name}. Saya bisa bantu jelaskan layanan Resume CV, Konsultasi Skripsi, Design Visual, dan Design 3D. Mau mulai dari yang mana?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const submitQuestion = async (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: cleanQuestion }
    ];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      const payload = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !payload.answer) {
        throw new Error(payload.error || "Tidak bisa menghasilkan jawaban.");
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: payload.answer ?? "" }
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitQuestion(input);
  };

  return (
    <section id="tuti" className="bg-sand px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.4fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">Tuti AI</p>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">Tanya dulu, order belakangan.</h2>
          <p className="mt-4 text-ink/70">
            {BRAND.assistantName} menjawab seputar layanan, durasi, dan kisaran harga. Untuk brief
            panjang atau order, lanjut ke WhatsApp.
          </p>
          <a
            href={whatsappUrl("Halo, saya sudah chat dengan Tuti dan ingin lanjut order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-teal"
          >
            Lanjut via WhatsApp
          </a>
        </div>

        <div className="twin-panel flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-sm">
          <div ref={messagesRef} className="flex-1 space-y-3 overflow-y-auto p-4 md:p-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-sand text-ink"
                    : "ml-auto bg-ink text-paper"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="inline-flex gap-1 rounded-2xl bg-sand px-4 py-3">
                <span className="typing-dot" />
                <span className="typing-dot delay-150" />
                <span className="typing-dot delay-300" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-ink/8 px-4 py-3">
            {STARTER_PROMPTS.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void submitQuestion(prompt)}
                disabled={isLoading}
                className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 transition hover:border-teal hover:text-teal disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-ink/10 p-3 md:p-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pertanyaan…"
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-sm outline-none ring-teal focus:ring-2"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-50"
            >
              Kirim
            </button>
          </form>
          {error && <p className="px-4 pb-3 text-xs text-red-700">{error}</p>}
        </div>
      </div>
    </section>
  );
}
