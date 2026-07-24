import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  ShoppingBag,
  Star,
  ChevronRight,
  Flame,
  ArrowRight,
  Beef,
  Wheat,
  Palette,
  Utensils,
  Smartphone,
} from 'lucide-react';
import { Product, ProductCategory, NavigationSection } from '../types';

interface ProdukUnggulanProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  setActiveSection: (section: NavigationSection) => void;
}

export const ProdukUnggulan: React.FC<ProdukUnggulanProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  setActiveSection,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('Semua');

  const categories = [
    { id: 'Semua', label: 'Semua Produk', icon: Sparkles },
    { id: 'Peternakan', label: 'Peternakan Sapi', icon: Beef },
    { id: 'Kuliner', label: 'Kuliner Singkong & Kopi', icon: Utensils },
    { id: 'Fashion', label: 'Batik & Kerajinan', icon: Palette },
    { id: 'Pertanian', label: 'Pertanian & Pupuk', icon: Wheat },
    { id: 'Produk Digital', label: 'Layanan Digital', icon: Smartphone },
  ];

  const featuredList = products.filter((p) => {
    if (selectedCat === 'Semua') return p.isFeatured;
    return p.category === selectedCat || (selectedCat === 'Fashion' && p.category === 'Kerajinan');
  });

  return (
    <div className="py-12 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-[#D4AF37] text-xs font-bold border border-amber-300 dark:border-amber-700">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Produk Unggulan Desa Cipageran</span>
            </div>
            <h2 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-white">
              Koleksi Terbaik Hasil Olahan Warga
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Dipilih khusus karena kualitas tinggi, resep otentik, dan kepuasan pelanggan tertinggi.
            </p>
          </div>

          <button
            onClick={() => setActiveSection('marketplace')}
            className="px-5 py-2.5 rounded-2xl bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition self-start md:self-auto"
          >
            <span>Lihat Semua Katalog</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-emerald-600'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((p) => (
            <div
              key={p.id}
              className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1B5E20] text-white text-[10px] font-bold rounded-lg shadow">
                  {p.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{p.sellerName}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{p.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-serif line-clamp-2">
                    {p.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Harga Resmi</p>
                    <p className="font-extrabold text-base text-[#1B5E20] dark:text-emerald-400">
                      Rp {p.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 hover:bg-emerald-200 transition"
                      title="Tambah Ke Keranjang"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onBuyNow(p)}
                      className="px-3.5 py-2 rounded-xl bg-[#1B5E20] hover:bg-emerald-700 text-white text-xs font-bold transition shadow"
                    >
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
