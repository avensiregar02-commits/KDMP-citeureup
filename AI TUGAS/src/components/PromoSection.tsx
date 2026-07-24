import React, { useState, useEffect } from 'react';
import {
  Flame,
  Ticket,
  Copy,
  CheckCircle2,
  Clock,
  Tag,
  Percent,
  Sparkles,
  ArrowRight,
  Gift,
} from 'lucide-react';
import { Promo, NavigationSection } from '../types';

interface PromoSectionProps {
  promos: Promo[];
  setActiveSection: (section: NavigationSection) => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ promos, setActiveSection }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Zona Promo & Voucher Spesial KOPDES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Belanja Hemat Produk UMKM Cipageran
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Gunakan voucher potongan harga, nikmati cashback simpanan anggota, dan klaim diskon spesial hari ini!
          </p>
        </div>

        {/* Flash Sale Countdown Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900 via-amber-900 to-slate-900 text-white shadow-xl border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#D4AF37] tracking-wider">
              <Sparkles className="w-4 h-4" /> Flash Sale Hari Koperasi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Diskon Hingga 25% Semua Produk Sembako & Susu Fresh
            </h2>
            <p className="text-xs text-rose-200">
              Penawaran terbatas hingga akhir pekan ini khusus warga dan anggota KOPDES.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-4 rounded-2xl border border-rose-500/40">
            <Clock className="w-6 h-6 text-rose-400 animate-pulse shrink-0" />
            <div className="flex items-center gap-2 text-center">
              <div>
                <span className="bg-rose-600 text-white font-mono font-extrabold text-xl px-2.5 py-1 rounded-lg">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <p className="text-[10px] text-slate-400 uppercase mt-1">Jam</p>
              </div>
              <span className="text-xl font-bold text-rose-400">:</span>
              <div>
                <span className="bg-rose-600 text-white font-mono font-extrabold text-xl px-2.5 py-1 rounded-lg">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <p className="text-[10px] text-slate-400 uppercase mt-1">Menit</p>
              </div>
              <span className="text-xl font-bold text-rose-400">:</span>
              <div>
                <span className="bg-rose-600 text-white font-mono font-extrabold text-xl px-2.5 py-1 rounded-lg">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <p className="text-[10px] text-slate-400 uppercase mt-1">Detik</p>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Cards Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#1B5E20] dark:text-emerald-400" />
            Daftar Kode Voucher Siap Klaim
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promos.map((p) => {
              const isCopied = copiedCode === p.code;
              return (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition space-y-4 p-6 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-emerald-100 text-[#1B5E20] text-[10px] font-extrabold rounded-md">
                        {p.type}
                      </span>
                      <span className="text-xs text-slate-400">Berlaku s/d {p.validUntil}</span>
                    </div>

                    <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white">
                      {p.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Diskon <strong>{p.discountPercent}%</strong> • Min. belanja Rp {p.minPurchase.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                      {p.code}
                    </div>

                    <button
                      onClick={() => handleCopyCode(p.code)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1B5E20] text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Salin Kode
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-[#1B5E20] text-white text-center space-y-4 shadow-xl">
          <Gift className="w-10 h-10 text-[#D4AF37] mx-auto" />
          <h2 className="text-2xl font-bold font-serif">Pakai Kode Voucher Sekarang di Marketplace</h2>
          <p className="text-xs text-emerald-100 max-w-xl mx-auto">
            Masukkan kode voucher di halaman checkout saat membeli susu sapi murni, kopi Paku Haji, atau produk kerajinan desa.
          </p>
          <button
            onClick={() => setActiveSection('marketplace')}
            className="px-6 py-3 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-2xl shadow hover:bg-amber-400 transition"
          >
            Mulai Belanja & Pakai Voucher
          </button>
        </div>
      </div>
    </div>
  );
};
