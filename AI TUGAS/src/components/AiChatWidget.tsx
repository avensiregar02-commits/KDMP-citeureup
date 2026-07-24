import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  MessageCircle,
  HelpCircle,
  Loader2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Sampurasun! Saya Pendamping AI KOPDES Cipageran. Ada yang bisa saya bantu terkait layanan koperasi, simpan pinjam, atau produk UMKM desa?',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const presetQuestions = [
    'Bagaimana cara daftar anggota KOPDES?',
    'Apa produk unggulan Cipageran?',
    'Berapa bunga pinjaman modal usaha?',
    'Di mana alamat kantor KOPDES?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Mohon maaf, terjadi kendala sinyal. Anda juga bisa menghubungi WA Pengurus di 0812-3456-7890.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Fallback answers for offline / error cases
      let fallback = 'KOPDES Cipageran siap melayani Anda! Kantor buka Senin-Sabtu jam 08.00-16.00 WIB di Jl. H. Gofur No. 88, Cimahi Utara.';
      if (query.toLowerCase().includes('daftar')) {
        fallback = 'Untuk mendaftar anggota KOPDES, silakan buka menu "Anggota" di website ini atau bawa fotokopi KTP dan KK ke kantor KOPDES Cipageran.';
      } else if (query.toLowerCase().includes('pinjaman') || query.toLowerCase().includes('bunga')) {
        fallback = 'Pinjaman modal usaha KOPDES memiliki bunga sangat ringan 0.8% flat/bulan. Simulasi lengkap dapat dihitung pada menu "Layanan".';
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallback,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group px-4 py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white rounded-full shadow-2xl flex items-center gap-2 border-2 border-[#D4AF37] transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-[#D4AF37]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-bold font-serif hidden sm:inline">Pendamping AI KOPDES</span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[520px] overflow-hidden animate-scaleUp text-slate-800 dark:text-slate-100">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1B5E20] to-emerald-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-slate-950/40 text-[#D4AF37] flex items-center justify-center font-bold border border-amber-400/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs font-serif text-white">Pendamping AI KOPDES</h3>
                <p className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Asisten Digital Aktif 24 Jam
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-[#1B5E20] text-[#D4AF37] flex items-center justify-center shrink-0 text-[10px]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl space-y-1 shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-[#1B5E20] text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed text-[11px] sm:text-xs">{m.text}</p>
                  <p className="text-[9px] text-right opacity-70">{m.timestamp}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-[#1B5E20]" />
                <span>Memproses jawaban AI...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Presets Chips */}
          <div className="p-2.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-none">
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 text-[10px] font-semibold rounded-lg border border-slate-200 dark:border-slate-700 whitespace-nowrap shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ketik pertanyaan seputar KOPDES..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 bg-[#1B5E20] hover:bg-emerald-700 text-white rounded-2xl disabled:opacity-50 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
