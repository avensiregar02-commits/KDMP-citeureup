import React from 'react';
import {
  ShoppingBag,
  UserPlus,
  PhoneCall,
  Users,
  Store,
  TrendingUp,
  Handshake,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { NavigationSection } from '../types';

interface HeroBannerProps {
  setActiveSection: (section: NavigationSection) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ setActiveSection }) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image / Ambient Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
          alt="Pemandangan Desa Cipageran Paku Haji"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Gov Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-[#D4AF37]/50 backdrop-blur-md text-xs font-semibold text-[#D4AF37] shadow-lg">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Microsite Resmi Koperasi Desa • Cimahi Utara</span>
            </div>

            {/* Main Tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Koperasi Desa Cipageran{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-[#D4AF37]">
                Maju, Mandiri, dan Sejahtera
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
              Pusat layanan digitalisasi ekonomi warga Desa Cipageran. Belanja produk UMKM lokal, nikmati fasilitas simpan pinjam transparan, dan kembangkan potensi usaha bersama.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setActiveSection('marketplace')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 border border-emerald-500/40"
              >
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                <span>Belanja Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => setActiveSection('anggota')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <UserPlus className="w-5 h-5" />
                <span>Daftar Anggota</span>
              </button>

              <button
                onClick={() => setActiveSection('kontak')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 backdrop-blur-md flex items-center justify-center gap-2 transition"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Hubungi Kami</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Legalitas Terdaftar Kemenkop UKM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Pembayaran QRIS & Bank Transfer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Produk 100% Asli UMKM Desa</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Card - Glassmorphism Highlight */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-800/70 border border-slate-700/80 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1B5E20] flex items-center justify-center text-[#D4AF37] font-bold">
                    CPG
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-white font-serif">UNGGULAN DESA CIPAGERAN</h2>
                    <p className="text-xs text-emerald-400 font-medium">Cimahi Utara • Jawa Barat</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 text-[11px] font-bold rounded-lg border border-emerald-800">
                  Terverifikasi
                </span>
              </div>

              {/* Highlight Product Carousel / Card preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 hover:border-emerald-500/50 transition">
                  <img
                    src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80"
                    alt="Susu Sapi Murni"
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D4AF37]">
                      Peternakan Sapi Perah
                    </span>
                    <h3 className="text-xs font-bold text-white truncate">
                      Susu Sapi Murni Fresh Cipageran 1L
                    </h3>
                    <p className="text-xs font-extrabold text-emerald-400 mt-1">
                      Rp 18.000 <span className="text-[10px] text-slate-400 line-through">Rp 22.000</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSection('marketplace')}
                    className="px-3 py-1.5 rounded-xl bg-[#1B5E20] hover:bg-emerald-600 text-white text-xs font-bold shrink-0 transition"
                  >
                    Beli
                  </button>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 hover:border-emerald-500/50 transition">
                  <img
                    src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=200&q=80"
                    alt="Kopi Arabika Paku Haji"
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D4AF37]">
                      Pertanian Paku Haji
                    </span>
                    <h3 className="text-xs font-bold text-white truncate">
                      Kopi Arabika Paku Haji 250g
                    </h3>
                    <p className="text-xs font-extrabold text-emerald-400 mt-1">
                      Rp 45.000
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSection('marketplace')}
                    className="px-3 py-1.5 rounded-xl bg-[#1B5E20] hover:bg-emerald-600 text-white text-xs font-bold shrink-0 transition"
                  >
                    Beli
                  </button>
                </div>
              </div>

              {/* Callout Info */}
              <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-700/80">
                Punya usaha UMKM di Cipageran?{' '}
                <button
                  onClick={() => setActiveSection('layanan')}
                  className="text-[#D4AF37] font-bold underline hover:text-amber-300"
                >
                  Daftarkan Produk Anda Gratis
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Statistics Counter Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-center gap-4 hover:border-emerald-500/50 transition shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#1B5E20]/50 text-[#D4AF37] flex items-center justify-center shrink-0 border border-emerald-600/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-serif">1.480+</p>
              <p className="text-xs font-medium text-slate-400">Jumlah Anggota Aktif</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-center gap-4 hover:border-emerald-500/50 transition shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#1B5E20]/50 text-[#D4AF37] flex items-center justify-center shrink-0 border border-emerald-600/30">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-serif">120+</p>
              <p className="text-xs font-medium text-slate-400">Produk UMKM Lokal</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-center gap-4 hover:border-emerald-500/50 transition shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#1B5E20]/50 text-[#D4AF37] flex items-center justify-center shrink-0 border border-emerald-600/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-serif">Rp 2.8M+</p>
              <p className="text-xs font-medium text-slate-400">Total Transaksi 2026</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex items-center gap-4 hover:border-emerald-500/50 transition shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#1B5E20]/50 text-[#D4AF37] flex items-center justify-center shrink-0 border border-emerald-600/30">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white font-serif">45 Mitra</p>
              <p className="text-xs font-medium text-slate-400">Kerjasama Instansi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
