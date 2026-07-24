import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Download,
  Building2,
  Users,
  Award,
  CheckCircle2,
  Handshake,
  DollarSign,
  TrendingUp,
  Briefcase,
  FileSpreadsheet,
} from 'lucide-react';

export const ProfileKoperasi: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadPDF = (docName: string) => {
    setDownloadSuccess(`Dokumen ${docName} sedang diunduh...`);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  const workPrograms = [
    { title: 'Unit Simpan Pinjam Syariah / Low-Interest', desc: 'Penyediaan modal usaha anggota bunga sangat rendah 0.8% flat per bulan dengan proses transparan tanpa biaya tersembunyi.' },
    { title: 'Marketplace UMKM Desa Digital', desc: 'Platform pemasaran produk unggulan warga desa Cipageran secara langsung tanpa perantara ke konsumen seluruh Indonesia.' },
    { title: 'Layanan PPOB & Pembayaran Token Digital', desc: 'Membantu kemudahan warga membayar BPJS, Token PLN, PDAM, dan Pulsa melalui loket resmi KOPDES.' },
    { title: 'Pendampingan Sertifikasi Halal & BPOM', desc: 'Fasilitasi gratis pengurusan IUMK, NIB, sertifikasi halal MUI, dan kemasan higienis bagi pelaku UMKM desa.' },
  ];

  const partners = [
    { name: 'Kementerian Koperasi & UKM RI', role: 'Pembina Utama' },
    { name: 'Dinas Perdagangan & UMKM Kota Cimahi', role: 'Regulator Daerah' },
    { name: 'Bank BJB / BJB Syariah', role: 'Mitra Perbankan & QRIS' },
    { name: 'PT PLN (Persero)', role: 'Mitra PPOB Resmi' },
    { name: 'PT Pos Indonesia', role: 'Mitra Logistik Pengiriman' },
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Kelembagaan Koperasi Murni Mandiri</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight">
            Profil & Legalitas KOPDES Cipageran
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Koperasi Desa (KOPDES) Cipageran adalah wujud nyata azas kekeluargaan dan gotong royong ekonomi warga untuk mencapai kesejahteraan bersama yang adil, terbuka, dan berkelanjutan.
          </p>
        </div>

        {/* Legal Badge Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1B5E20] via-emerald-800 to-[#2E7D32] text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="px-3 py-1 bg-[#D4AF37] text-slate-950 font-extrabold text-xs rounded-lg uppercase tracking-wider">
                Status Terverifikasi Kemenkop
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">Nomor Induk Koperasi (NIK): 327702001088</h2>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                Akta Pendirian No: 42/BH/KWK.10/2016 • SK Menteri Koperasi No: AHU-0012890.AH.01.26 • Izin Usaha Simpan Pinjam No: 503/088/DISKOP-CMH
              </p>
            </div>
            <div className="lg:col-span-4 bg-emerald-950/60 p-5 rounded-2xl border border-emerald-600/40 space-y-2 text-center">
              <p className="text-xs text-emerald-200 uppercase tracking-widest font-bold">Peringkat Kesehatan Koperasi</p>
              <p className="text-3xl font-extrabold text-[#D4AF37] font-serif">SEHAT (A)</p>
              <p className="text-[11px] text-emerald-300">Hasil Audit Independen Dinas Koperasi 2025</p>
            </div>
          </div>
        </div>

        {/* Download Dokumen PDF & Laporan Tahunan Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1B5E20] dark:text-emerald-400" />
                Laporan Tahunan & Transparansi Dokumen PDF
              </h2>
              <p className="text-xs text-slate-500">Anggota dan publik dapat mengunduh dokumen pertanggungjawaban KOPDES</p>
            </div>
            {downloadSuccess && (
              <span className="px-3 py-1.5 bg-emerald-100 text-[#1B5E20] text-xs font-bold rounded-xl animate-bounce">
                {downloadSuccess}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Laporan Pertanggungjawaban RAT 2025', size: '2.4 MB PDF', code: 'RAT-2025-CPG' },
              { title: 'Anggaran Dasar & Anggaran Rumah Tangga (AD/ART)', size: '1.8 MB PDF', code: 'ADART-KOPDES' },
              { title: 'Laporan Keuangan AUDITED Tahun 2025', size: '3.1 MB PDF', code: 'LK-AUDIT-2025' },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-[#1B5E20] transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{doc.title}</h3>
                <p className="text-xs text-slate-500">Kode: {doc.code} • {doc.size}</p>
                <button
                  onClick={() => handleDownloadPDF(doc.title)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-[#1B5E20] dark:bg-slate-800 dark:hover:bg-emerald-700 hover:text-white text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>Download Dokumen</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Program Kerja Koperasi */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#1B5E20] dark:text-emerald-400" />
            Program Kerja Utama KOPDES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workPrograms.map((prog, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4 hover:border-[#1B5E20] transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 flex items-center justify-center shrink-0 font-bold">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{prog.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mitra Kerja Koperasi */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Handshake className="w-5 h-5 text-[#1B5E20] dark:text-emerald-400" />
              Mitra Kerja Resmi
            </h2>
            <p className="text-xs text-slate-500">Berkolaborasi dengan instansi pemerintah, BUMN, dan lembaga keuangan nasional</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-1"
              >
                <p className="font-bold text-xs text-slate-900 dark:text-white">{partner.name}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
