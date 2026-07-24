import React, { useState } from 'react';
import {
  Image,
  Video,
  Compass,
  Maximize2,
  X,
  Play,
  Camera,
  Layers,
} from 'lucide-react';
import { GalleryMedia } from '../types';

interface MediaGalleryProps {
  gallery: GalleryMedia[];
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ gallery }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');
  const [activeMediaModal, setActiveMediaModal] = useState<GalleryMedia | null>(null);

  const filterOptions = ['Semua', 'Wisata Paku Haji', 'Potensi Desa', 'Drone View', 'UMKM'];

  const filteredMedia = gallery.filter((item) => {
    if (selectedFilter === 'Semua') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>Dokumentasi & Galeri Desa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Galeri Foto, Video & View 360° Cipageran
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Potret keindahan alam perbukitan Paku Haji, keceriaan warga, serta aktivitas peternakan dan produksi kerajinan UMKM Cipageran.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 justify-center overflow-x-auto pb-2 scrollbar-none">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
                selectedFilter === f
                  ? 'bg-[#1B5E20] text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMediaModal(item)}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay Type Icon */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold rounded-lg flex items-center gap-1">
                  {item.type === 'photo' && <Image className="w-3.5 h-3.5 text-emerald-400" />}
                  {item.type === 'video' && <Video className="w-3.5 h-3.5 text-amber-400" />}
                  {item.type === '360' && <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />}
                  <span className="uppercase">{item.type}</span>
                </div>

                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 bg-white/90 text-slate-900 rounded-full shadow">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <span className="text-[10px] text-emerald-600 font-bold uppercase">{item.category}</span>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeMediaModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-800 p-6 space-y-4 relative animate-scaleUp text-white">
              <button
                onClick={() => setActiveMediaModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-[#1B5E20] text-[#D4AF37] text-[10px] font-extrabold rounded">
                  {activeMediaModal.category} • {activeMediaModal.type.toUpperCase()}
                </span>
                <h2 className="text-lg font-bold font-serif">{activeMediaModal.title}</h2>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-slate-950 max-h-[60vh] flex items-center justify-center">
                <img
                  src={activeMediaModal.url}
                  alt={activeMediaModal.title}
                  className="max-h-[60vh] w-auto object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeMediaModal.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
