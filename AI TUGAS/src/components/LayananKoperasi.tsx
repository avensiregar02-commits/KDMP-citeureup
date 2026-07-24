import React, { useState } from 'react';
import {
  Calculator,
  PiggyBank,
  Store,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Send,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const LayananKoperasi: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'pinjaman' | 'simpanan' | 'umkm' | 'pengaduan'>('pinjaman');

  // Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [tenorMonths, setTenorMonths] = useState<number>(12);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanSuccessMsg, setLoanSuccessMsg] = useState<string | null>(null);

  // Other form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSuccessMsg, setFormSuccessMsg] = useState<string | null>(null);

  // Monthly installment calculation (bunga flat 0.8% / bulan)
  const monthlyInterestRate = 0.008;
  const totalInterest = loanAmount * monthlyInterestRate * tenorMonths;
  const totalPayment = loanAmount + totalInterest;
  const monthlyInstallment = Math.round(totalPayment / tenorMonths);

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoanSuccessMsg(
      `Pengajuan pinjaman sebesar Rp ${loanAmount.toLocaleString('id-ID')} selama ${tenorMonths} bulan berhasil dikirim! Tim KOPDES akan memverifikasi dalam 1x24 jam.`
    );
    setTimeout(() => {
      setLoanSuccessMsg(null);
      setLoanPurpose('');
    }, 4000);
  };

  const handleOtherFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccessMsg('Permohonan Anda berhasil dikirim! Petugas KOPDES akan menghubungi Anda via WhatsApp.');
    setTimeout(() => {
      setFormSuccessMsg(null);
      setFormName('');
      setFormPhone('');
      setFormDesc('');
    }, 4000);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Pusat Layanan Koperasi & Pengaduan Warga</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Layanan Terpadu KOPDES Cipageran
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Fasilitas pembiayaan usaha produktif, simpanan tabungan warga, pendaftaran kemitraan UMKM, serta konsultasi & pengaduan online.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { id: 'pinjaman', title: 'Ajukan Pinjaman Usaha', icon: Calculator, desc: 'Hitung simulasi & ajukan modal usaha' },
            { id: 'simpanan', title: 'Simpan Dana Tabungan', icon: PiggyBank, desc: 'Buka tabungan simpanan warga' },
            { id: 'umkm', title: 'Pendaftaran UMKM Mitra', icon: Store, desc: 'Pasarkan produk di Marketplace KOPDES' },
            { id: 'pengaduan', title: 'Konsultasi & Pengaduan', icon: MessageSquare, desc: 'Layanan aspirasi & keluhan warga' },
          ].map((srv) => {
            const Icon = srv.icon;
            const isSelected = activeForm === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveForm(srv.id as any)}
                className={`p-5 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-[#1B5E20] text-white border-emerald-500 shadow-xl'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-800 text-[#D4AF37]' : 'bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm font-serif">{srv.title}</h3>
                  <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {srv.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Service Form Area */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg">
          {activeForm === 'pinjaman' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Simulator Column */}
              <div className="lg:col-span-6 space-y-6 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="space-y-1">
                  <span className="px-2.5 py-1 bg-emerald-100 text-[#1B5E20] font-bold text-[10px] rounded-md">
                    Simulator Pinjaman Bunga Rendah (0.8% / bln)
                  </span>
                  <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                    Simulasi Angsuran Bulanan
                  </h3>
                </div>

                {/* Amount Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Jumlah Pinjaman:</span>
                    <span className="text-[#1B5E20] dark:text-emerald-400 font-extrabold text-base">
                      Rp {loanAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={25000000}
                    step={500000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#1B5E20] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Rp 1.000.000</span>
                    <span>Rp 25.000.000</span>
                  </div>
                </div>

                {/* Tenor Select */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold">Jangka Waktu (Tenor):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 12, 18, 24].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTenorMonths(t)}
                        className={`py-2 rounded-xl text-xs font-bold transition ${
                          tenorMonths === t
                            ? 'bg-[#1B5E20] text-white'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        {t} Bulan
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimasi Angsuran / Bulan:</span>
                    <span className="font-extrabold text-base text-[#1B5E20] dark:text-emerald-400">
                      Rp {monthlyInstallment.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Total Pengembalian:</span>
                    <span>Rp {totalPayment.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  Formulir Pengajuan Pinjaman Usaha
                </h3>

                {loanSuccessMsg ? (
                  <div className="p-5 bg-emerald-100 text-[#1B5E20] rounded-2xl space-y-2 text-xs font-bold">
                    <CheckCircle2 className="w-6 h-6 text-[#1B5E20]" />
                    <p>{loanSuccessMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleLoanSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1">Nama Lengkap Pemohon</label>
                      <input
                        type="text"
                        required
                        placeholder="Ahmad Subagja"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Nomor WhatsApp Active</label>
                      <input
                        type="tel"
                        required
                        placeholder="0812-3456-7890"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Tujuan Penggunaan Modal Usaha</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Contoh: Pembelian bahan baku susu murni & mesin penutup kemasan..."
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow transition"
                    >
                      Kirim Formulir Pengajuan
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeForm !== 'pinjaman' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  Formulir {activeForm === 'simpanan' ? 'Pendaftaran Simpanan Warga' : activeForm === 'umkm' ? 'Pendaftaran Kemitraan UMKM' : 'Konsultasi & Pengaduan Warga'}
                </h3>
                <p className="text-xs text-slate-500">
                  Lengkapi data Anda di bawah ini untuk ditindaklanjuti oleh pengurus KOPDES.
                </p>
              </div>

              {formSuccessMsg ? (
                <div className="p-5 bg-emerald-100 text-[#1B5E20] rounded-2xl space-y-2 text-xs font-bold text-center">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <p>{formSuccessMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleOtherFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Nomor Kontak WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-3456-7890"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Keterangan / Rincian Usaha / Pesan</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tuliskan pesan atau rincian permohonan Anda..."
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow transition"
                  >
                    Kirim Permohonan
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
