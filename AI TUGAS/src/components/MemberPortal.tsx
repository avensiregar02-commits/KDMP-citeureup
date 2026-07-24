import React, { useState } from 'react';
import {
  UserCheck,
  QrCode,
  Download,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  History,
  FileText,
  Printer,
  CheckCircle2,
  Lock,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { MemberProfile, LoanApplication } from '../types';

interface MemberPortalProps {
  member: MemberProfile;
  loans: LoanApplication[];
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export const MemberPortal: React.FC<MemberPortalProps> = ({
  member,
  loans,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'simpanan' | 'pinjaman' | 'kartu'>('ringkasan');
  const [loginNik, setLoginNik] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regSuccessMsg, setRegSuccessMsg] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccessMsg('Pendaftaran Anggota KOPDES Berhasil! Silakan login dengan NIK Anda.');
    setTimeout(() => {
      setIsRegistering(false);
      setRegSuccessMsg(null);
    }, 2500);
  };

  const totalSimpanan = member.savingsPokok + member.savingsWajib + member.savingsSukarela;

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <UserCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Portal Digital Layanan Anggota KOPDES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Area Mandiri Anggota Koperasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Akses saldo simpanan, riwayat angsuran pinjaman, cetak kartu anggota digital, dan ajukan pembiayaan usaha.
          </p>
        </div>

        {!isLoggedIn ? (
          /* Login & Registration Box */
          <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#1B5E20] text-[#D4AF37] flex items-center justify-center font-bold text-xl mx-auto">
                CPG
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                {isRegistering ? 'Pendaftaran Anggota Baru' : 'Masuk Portal Anggota'}
              </h2>
              <p className="text-xs text-slate-500">
                {isRegistering
                  ? 'Daftar menjadi bagian dari KOPDES Cipageran'
                  : 'Gunakan NIK KTP Anda yang terdaftar'}
              </p>
            </div>

            {regSuccessMsg && (
              <div className="p-3 bg-emerald-100 text-[#1B5E20] text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{regSuccessMsg}</span>
              </div>
            )}

            {!isRegistering ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor Induk Kependudukan (NIK)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="3277021508850003"
                    value={loginNik}
                    onChange={(e) => setLoginNik(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kata Sandi / PIN
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-[#D4AF37]" />
                  <span>Masuk Ke Dashboard</span>
                </button>

                <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  Belum mendaftar anggota?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="text-[#1B5E20] dark:text-emerald-400 font-bold hover:underline"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Lengkap (Sesuai KTP)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ahmad Subagja"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    NIK KTP
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="16 digit NIK"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-3456-7890"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition"
                >
                  Kirim Pendaftaran Anggota
                </button>

                <div className="text-center text-xs text-slate-500 pt-1">
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    className="text-[#1B5E20] dark:text-emerald-400 font-bold hover:underline"
                  >
                    Masuk
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="space-y-8 animate-fadeIn">
            {/* User Greeting Bar */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1B5E20] to-emerald-600 text-[#D4AF37] font-bold text-xl flex items-center justify-center border-2 border-[#D4AF37]">
                  AS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                      Selamat Datang, {member.fullName}
                    </h2>
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 text-[10px] font-extrabold rounded-md">
                      Anggota {member.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    No. Anggota: <strong>{member.memberNumber}</strong> • Terdaftar sejak {member.joinDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition"
              >
                Keluar Portal
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2 gap-2 overflow-x-auto">
              {[
                { id: 'ringkasan', label: 'Ringkasan Keuangan' },
                { id: 'simpanan', label: 'Rincian Simpanan' },
                { id: 'pinjaman', label: 'Riwayat Pinjaman' },
                { id: 'kartu', label: 'Kartu Anggota Digital' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-[#1B5E20] text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'ringkasan' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1B5E20] to-emerald-900 text-white shadow-lg space-y-3">
                  <p className="text-xs text-emerald-200 font-semibold uppercase">Total Saldo Tabungan</p>
                  <p className="text-3xl font-extrabold font-serif text-[#D4AF37]">
                    Rp {totalSimpanan.toLocaleString('id-ID')}
                  </p>
                  <p className="text-[11px] text-emerald-200">
                    Gabungan Simpanan Pokok, Wajib & Sukarela
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Sisa Pinjaman Aktif</p>
                  <p className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
                    Rp {member.activeLoanAmount.toLocaleString('id-ID')}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-bold">
                    Status Angsuran: {member.loanStatus}
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Estimasi Sisa Hasil Usaha (SHU) 2026</p>
                  <p className="text-3xl font-extrabold font-serif text-[#D4AF37]">
                    Rp 385.000
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Akan dibagikan saat RAT mendatang
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'simpanan' && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white">
                  Rincian Jenis Simpanan
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Simpanan Pokok</p>
                      <p className="text-[11px] text-slate-500">Setoran satu kali saat awal menjadi anggota</p>
                    </div>
                    <span className="font-bold text-sm text-[#1B5E20] dark:text-emerald-400">
                      Rp {member.savingsPokok.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Simpanan Wajib</p>
                      <p className="text-[11px] text-slate-500">Setoran rutin bulanan Rp 25.000 / bulan</p>
                    </div>
                    <span className="font-bold text-sm text-[#1B5E20] dark:text-emerald-400">
                      Rp {member.savingsWajib.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Simpanan Sukarela</p>
                      <p className="text-[11px] text-slate-500">Tabungan bebas yang dapat ditarik sewaktu-waktu</p>
                    </div>
                    <span className="font-bold text-sm text-[#1B5E20] dark:text-emerald-400">
                      Rp {member.savingsSukarela.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pinjaman' && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white">
                  Daftar Pinjaman Usaha Produktif
                </h3>
                {loans.map((loan) => (
                  <div key={loan.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span>Kode: {loan.id}</span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-[#1B5E20] rounded-md">
                        {loan.status}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">Tujuan: {loan.purpose}</p>
                    <div className="flex justify-between text-slate-500 pt-1">
                      <span>Jumlah: Rp {loan.amount.toLocaleString('id-ID')} ({loan.tenorMonths} bulan)</span>
                      <span>Angsuran: Rp {loan.monthlyInstallment.toLocaleString('id-ID')}/bln</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'kartu' && (
              <div className="max-w-lg mx-auto space-y-6 text-center">
                {/* Visual Digital Member Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-tr from-[#1B5E20] via-emerald-800 to-teal-900 text-white shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-emerald-600/60 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-slate-950 font-extrabold flex items-center justify-center text-xs">
                        CPG
                      </div>
                      <div>
                        <h4 className="font-bold text-xs font-serif">KOPDES CIPAGERAN</h4>
                        <p className="text-[9px] text-emerald-200">KOPERASI DESA DIGITAL CIMAHI</p>
                      </div>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-200 border-2 border-[#D4AF37] overflow-hidden shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                        alt="Foto Anggota"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="text-[10px] uppercase text-[#D4AF37] font-bold">KARTU ANGGOTA RESMI</p>
                      <h3 className="font-extrabold text-sm font-serif truncate">{member.fullName}</h3>
                      <p className="text-[11px] text-emerald-100 font-mono">{member.memberNumber}</p>
                      <p className="text-[10px] text-slate-300">NIK: {member.nik}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-600/60 text-[10px] text-emerald-200">
                    <div>
                      <p>Domisili: Kelurahan Cipageran</p>
                      <p>Status: Anggota {member.status}</p>
                    </div>

                    {/* Simulated QR Code */}
                    <div className="bg-white p-1.5 rounded-lg shadow shrink-0 text-slate-900">
                      <QrCode className="w-10 h-10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => alert('Fitur cetak kartu digital disiapkan!')}
                    className="px-5 py-2.5 bg-[#1B5E20] text-white rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-[#D4AF37]" />
                    <span>Cetak Kartu PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
