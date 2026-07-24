import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Building,
  Users,
  Award,
  Sparkles,
  Milestone,
  Play,
  CheckCircle2,
  TreePine,
  Wheat,
  Beef,
  Palette,
} from 'lucide-react';

export const ProfileDesa: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sejarah' | 'visimisi' | 'struktur' | 'potensi'>('sejarah');

  const timelineEvents = [
    { year: '1982', title: 'Pembentukan Kelurahan Cipageran', desc: 'Resmi menjadi bagian administratif Kecamatan Cimahi Utara dengan pusat kegiatan kemasyarakatan.' },
    { year: '1998', title: 'Perkembangan Sentra Peternakan Sapi', desc: 'Warga RW 08 mulai membentuk kelompok tani ternak sapi perah penghasil susu segar berkualitas.' },
    { year: '2015', title: 'Inisiasi Pembentukan KOPDES', desc: 'Para tokoh masyarakat merintis pendaftaran Koperasi Desa untuk memfasilitasi simpan pinjam dan pemasaran hasil usaha.' },
    { year: '2024', title: 'Pengembangan Wisata Edukasi Paku Haji', desc: 'Kawasan Paku Haji dikembangkan sebagai destinasi wisata alam dan edukasi pertanian/peternakan.' },
    { year: '2026', title: 'Peluncuran Microsite KOPDES Digital', desc: 'Transformasi penuh ke ekosistem digital marketplace dan layanan portal anggota online.' },
  ];

  const villageOfficials = [
    { name: 'Drs. H. Maman Suherman', role: 'Kepala Kelurahan / Desa Cipageran', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { name: 'H. Achmad Solihin, S.E.', role: 'Ketua KOPDES Cipageran', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Hj. Endang Rahmawati', role: 'Sekretaris Kelurahan & Pembina UMKM', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { name: 'Asep Ridwan, S.T.', role: 'Koordinator Pengembangan Potensi Desa', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Building className="w-4 h-4 text-[#D4AF37]" />
            <span>Mengenal Desa Cipageran, Kota Cimahi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Profil & Potensi Desa Cipageran
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Desa/Kelurahan Cipageran terletak di kawasan lereng utara Kota Cimahi yang kaya akan keindahan alam, potensi peternakan sapi perah, komoditas kopi Arabika Paku Haji, dan kehangatan tradisi gotong royong warga.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="inline-flex bg-slate-200/80 dark:bg-slate-900 p-1.5 rounded-2xl gap-1">
            {[
              { id: 'sejarah', label: 'Sejarah & Timeline' },
              { id: 'visimisi', label: 'Visi & Misi' },
              { id: 'struktur', label: 'Struktur Organisasi' },
              { id: 'potensi', label: 'Potensi Wilayah' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'sejarah' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-2xl font-bold font-serif text-[#1B5E20] dark:text-emerald-400">
                  Sejarah Singkat Desa Cipageran
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Nama <strong className="text-slate-900 dark:text-white">Cipageran</strong> berasal dari gabungan kata Bahasa Sunda <em>"Ci"</em> (air) dan <em>"Pager"</em> (pagar pembatas/pelindung). Secara historis, Cipageran merupakan daerah berbukit yang menjadi sabuk hijau pelindung kawasan Cimahi Utara.
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Seiring berjalannya waktu, masyarakat Cipageran mengembangkan mata pencaharian utama berupa peternakan sapi perah, pertanian holtikultura, olahan makanan tradisional seperti combro dan keripik singkong, serta kerajinan anyaman bambu.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#D4AF37] shrink-0" />
                  <p className="text-xs text-[#1B5E20] dark:text-emerald-300 font-semibold">
                    Cipageran diakui sebagai salah satu Desa Mandiri Berdaya Saing Tinggi di Jawa Barat berkat kekuatan koperasi dan kebersamaan warga.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Panorama Cipageran"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Timeline Perjalanan Desa */}
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  Timeline Perjalanan Desa Cipageran
                </h3>
                <p className="text-xs text-slate-500">Jejak langkah transformasi dari wilayah perbukitan hingga desa digital</p>
              </div>

              <div className="relative border-l-2 border-[#1B5E20] ml-4 sm:ml-8 pl-6 space-y-8">
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white dark:border-slate-950 shadow" />
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1B5E20] text-[#D4AF37] text-xs font-bold">
                        Tahun {evt.year}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {evt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'visimisi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {/* Visi */}
            <div className="p-8 rounded-3xl bg-[#1B5E20] text-white shadow-xl relative overflow-hidden space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 text-[#D4AF37] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-serif text-[#D4AF37]">Visi Desa Cipageran</h2>
              <p className="text-sm text-emerald-100 leading-relaxed italic font-serif text-lg">
                "Terwujudnya Desa Cipageran yang Maju, Agamis, Mandiri secara Ekonomi melalui Pemberdayaan Koperasi dan Potensi Lokal yang Berkelanjutan."
              </p>
            </div>

            {/* Misi */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold font-serif text-[#1B5E20] dark:text-emerald-400">Misi Pembangunan</h2>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                {[
                  'Meningkatkan taraf hidup masyarakat melalui pemberdayaan UMKM dan modernisasi Koperasi Desa.',
                  'Memaksimalkan potensi peternakan sapi perah, pertanian holtikultura, dan komoditas Kopi Paku Haji.',
                  'Membangun tata kelola pemerintahan desa yang transparan, akuntabel, dan ramah teknologi.',
                  'Memelihara kearifan lokal, kelestarian lingkungan sabuk hijau, dan keterlibatan pemuda desa.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'struktur' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
                Struktur Pemerintahan Desa & Pengurus Koperasi
              </h2>
              <p className="text-xs text-slate-500">Para pemimpin dan pelayan masyarakat yang berdedikasi bagi Desa Cipageran</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {villageOfficials.map((off, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition text-center p-5 space-y-3"
                >
                  <img
                    src={off.image}
                    alt={off.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#D4AF37]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif">{off.name}</h3>
                    <p className="text-xs font-semibold text-[#1B5E20] dark:text-emerald-400 mt-0.5">{off.role}</p>
                  </div>
                  <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 rounded-full">
                    Masa Bakti 2024 - 2030
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'potensi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-[#1B5E20] transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] flex items-center justify-center">
                <Beef className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white">Peternakan Sapi Perah</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Menghasilkan lebih dari 2.500 liter susu sapi segar harian yang diolah menjadi susu murni, yoghurt, dan keju olahan.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-[#1B5E20] transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-[#D4AF37] flex items-center justify-center">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white">Wisata Paku Haji</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Destinasi wisata alam berkemah, berkuda, serta tempat edukasi pertanian organik bagi pelajar dan wisatawan.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-[#1B5E20] transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] flex items-center justify-center">
                <Wheat className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white">Olahan Singkong & Kopi</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Produksi cemilan olahan singkong khas combro dan keripik balado, serta Kopi Arabika Paku Haji bercitarasa khas.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-[#1B5E20] transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white">Batik Cimahi & Bambu</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sentra pengrajin batik daun singkong khas Cimahi dan kerajinan anyaman bambu hias kualitas ekspor.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
