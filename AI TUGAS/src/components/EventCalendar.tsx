import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  X,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { EventAgenda } from '../types';

interface EventCalendarProps {
  events: EventAgenda[];
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventAgenda | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) return;
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEvent(null);
      setRsvpName('');
      setRsvpPhone('');
    }, 2500);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Agenda & Kegiatan Desa Cipageran</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Jadwal Rapat, Pelatihan & Festival Desa
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Ikuti berbagai kegiatan kemasyarakatan, pasar murah sembako, dan pelatihan peningkatan kualitas usaha UMKM.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#1B5E20] text-[#D4AF37] text-xs font-bold rounded-lg shadow">
                    {evt.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-950/90 text-emerald-200 text-[11px] font-extrabold rounded-lg backdrop-blur-md">
                    {evt.status}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white leading-snug">
                    {evt.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#1B5E20] dark:text-emerald-400 shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#1B5E20] dark:text-emerald-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#1B5E20] dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="w-full py-2.5 bg-[#1B5E20] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4 text-[#D4AF37]" />
                  <span>Daftar / Konfirmasi Kehadiran</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RSVP Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 p-6 space-y-5 relative animate-scaleUp">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-2.5 py-1 bg-emerald-100 text-[#1B5E20] text-[10px] font-bold rounded-lg">
                  {selectedEvent.category}
                </span>
                <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedEvent.date} • {selectedEvent.time}
                </p>
              </div>

              {rsvpSuccess ? (
                <div className="p-4 bg-emerald-100 text-[#1B5E20] rounded-2xl text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-[#1B5E20] mx-auto" />
                  <p className="font-bold text-sm">Pendaftaran Berhasil!</p>
                  <p className="text-xs">
                    Terima kasih {rsvpName}, konfirmasi kehadiran telah dicatat. Sampai jumpa di lokasi acara!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Lengkap Peserta
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-3456-7890"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1B5E20] text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition"
                  >
                    Kirim Konfirmasi Kehadiran
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
