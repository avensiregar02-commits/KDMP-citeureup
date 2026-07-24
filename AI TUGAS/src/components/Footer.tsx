import React from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  ShieldCheck,
  ChevronRight,
  Heart,
  Globe,
  Award,
} from 'lucide-react';
import { NavigationSection } from '../types';

interface FooterProps {
  setActiveSection: (section: NavigationSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t-4 border-[#1B5E20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B5E20] flex items-center justify-center text-[#D4AF37] font-bold text-lg border border-emerald-600/40">
                CPG
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white font-serif tracking-tight">
                  KOPDES CIPAGERAN
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  Kota Cimahi • Jawa Barat
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Koperasi Desa Cipageran adalah lembaga ekonomi kerakyatan berbasis digital yang berkomitmen mewujudkan kemandirian ekonomi, pemberdayaan UMKM, dan kesejahteraan warga Desa Cipageran.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>Legalitas Resm Kemenkop UKM No. 327702001088</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif border-l-2 border-[#D4AF37] pl-2.5">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'marketplace' as NavigationSection, label: 'Marketplace UMKM' },
                { id: 'produk-unggulan' as NavigationSection, label: 'Produk Unggulan Desa' },
                { id: 'profile-koperasi' as NavigationSection, label: 'Profil Koperasi & Legalitas' },
                { id: 'profile-desa' as NavigationSection, label: 'Profil & Potensi Cipageran' },
                { id: 'layanan' as NavigationSection, label: 'Pengajuan Simpan Pinjam' },
                { id: 'promo' as NavigationSection, label: 'Promo & Flash Sale' },
                { id: 'anggota' as NavigationSection, label: 'Portal Anggota & Kartu Digital' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveSection(link.id)}
                    className="hover:text-[#D4AF37] transition flex items-center gap-1.5 text-slate-400 hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-500" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif border-l-2 border-[#D4AF37] pl-2.5">
              Kontak & Operasional
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Jl. H. Gofur / Cipageran No. 88, RT 03/RW 05, Kel. Cipageran, Kec. Cimahi Utara, Kota Cimahi 40511
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0812-3456-7890 / (022) 6654-321</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>koperasi.cipageran@cimahikota.go.id</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Senin - Sabtu: 08:00 - 16:00 WIB</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social Media & Govt Accreditation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif border-l-2 border-[#D4AF37] pl-2.5">
              Kemitraan & Media Sosial
            </h4>
            <p className="text-xs text-slate-400">
              Ikuti perkembangan kegiatan ekonomi desa, pelatihan UMKM, dan promo terbaru melalui kanal resmi kami:
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#1B5E20] hover:text-[#D4AF37] transition flex items-center justify-center text-slate-300"
                title="Instagram KOPDES"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#1B5E20] hover:text-[#D4AF37] transition flex items-center justify-center text-slate-300"
                title="Facebook KOPDES"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://cimahikota.go.id"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#1B5E20] hover:text-[#D4AF37] transition flex items-center justify-center text-slate-300"
                title="Website Resmi Kota Cimahi"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
              <Award className="w-8 h-8 text-[#D4AF37] shrink-0" />
              <div className="text-[11px]">
                <p className="font-bold text-white">Koperasi Desa Terbaik 2026</p>
                <p className="text-slate-400">Peringkat 1 Digitalisasi Desa - Prov. Jawa Barat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 KOPDES Cipageran Kota Cimahi. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveSection('kontak')} className="hover:text-emerald-400">
              Syarat & Ketentuan
            </button>
            <span>•</span>
            <button onClick={() => setActiveSection('kontak')} className="hover:text-emerald-400">
              Kebijakan Privasi
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk Warga Cipageran
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
