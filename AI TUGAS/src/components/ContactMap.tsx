import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Globe,
  MessageCircle,
} from 'lucide-react';

export const ContactMap: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [formSentMsg, setFormSentMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSentMsg('Pesan Anda telah berhasil dikirim ke Pengurus KOPDES Cipageran!');
    setTimeout(() => {
      setFormSentMsg(null);
      setSenderName('');
      setSenderEmail('');
      setSenderMsg('');
    }, 3500);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Lokasi & Kontak KOPDES Cipageran</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Hubungi Kantor Koperasi Desa
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Kami siap melayani kebutuhan informasi, kunjungan kerja, pendaftaran anggota, dan transaksi produk UMKM.
          </p>
        </div>

        {/* Contact Info + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Cards Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-serif text-[#1B5E20] dark:text-emerald-400">
                Informasi Kontak Kantor
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Alamat Kantor KOPDES</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      Jl. H. Gofur / Cipageran No. 88, RT 03/RW 05, Kel. Cipageran, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40511
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Telepon & Call Center</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">0812-3456-7890 / (022) 6654-321</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Email Resmi</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">koperasi.cipageran@cimahikota.go.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Jam Operasional Pelayanan</p>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">Senin - Sabtu: 08:00 - 16:00 WIB (Minggu Libur)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Media Sosial Resmi:</p>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#1B5E20]"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#1B5E20]"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Map Frame Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Kirim Pesan / Pertanyaan
              </h2>

              {formSentMsg ? (
                <div className="p-4 bg-emerald-100 text-[#1B5E20] rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{formSentMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Anda"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Alamat Email / HP</label>
                      <input
                        type="text"
                        required
                        placeholder="0812... atau email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Pesan Anda</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                      value={senderMsg}
                      onChange={(e) => setSenderMsg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-[#1B5E20] hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl transition flex items-center gap-2 shadow"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </form>
              )}
            </div>

            {/* Simulated Interactive Map Container */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-64 bg-slate-200 dark:bg-slate-800 relative flex items-center justify-center">
              <iframe
                title="Peta Lokasi Kantor KOPDES Cipageran Cimahi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15845.2341234!2d107.5312!3d-6.8623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e40123456789%3A0x123456789abcdef!2sCipageran%2C%20North%20Cimahi%2C%20Cimahi%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
                className="w-full h-full border-0 filter grayscale opacity-90 hover:grayscale-0 transition duration-500"
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-slate-900/90 text-white text-[11px] font-bold rounded-xl backdrop-blur-md shadow border border-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kantor KOPDES Cipageran Cimahi Utara</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
