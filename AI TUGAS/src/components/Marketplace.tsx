import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Store,
  Tag,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Sparkles,
  Flame,
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface MarketplaceProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'price-low' | 'price-high'>('popular');
  const [onlyFlashSale, setOnlyFlashSale] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories: (string | ProductCategory)[] = [
    'Semua',
    'Pertanian',
    'Peternakan',
    'Perikanan',
    'Kuliner',
    'Fashion',
    'Kerajinan',
    'UMKM',
    'Produk Digital',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedCategory === 'Semua' || p.category === selectedCategory;
        const matchesFlash = !onlyFlashSale || p.isFlashSale;
        return matchesSearch && matchesCat && matchesFlash;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return b.id.localeCompare(a.id);
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return b.salesCount - a.salesCount; // default popular
      });
  }, [products, searchQuery, selectedCategory, sortBy, onlyFlashSale]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1B5E20] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </div>
        )}

        {/* Banner Section */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1B5E20] via-emerald-800 to-teal-900 text-white shadow-xl overflow-hidden border border-emerald-600/30">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950 text-xs font-extrabold uppercase">
              <Store className="w-4 h-4" />
              Marketplace KOPDES Cipageran
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
              Belanja Produk Asli Desa Cipageran Langsung dari Pengrajin & Peternak
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              Setiap pembelian Anda mendukung langsung ekonomi keluarga peternak, petani, dan UMKM lokal Cipageran. Bebas komisi tinggi, harga jujur dan terjangkau!
            </p>
          </div>
        </div>

        {/* Search & Sorting Controls Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari susu murni, kopi Paku Haji, batik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting & Flash Sale Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => setOnlyFlashSale(!onlyFlashSale)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition ${
                  onlyFlashSale
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
                Flash Sale Promo
              </button>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none"
                >
                  <option value="popular">Paling Terlaris</option>
                  <option value="latest">Terbaru</option>
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-[#1B5E20] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Tidak ada produk yang ditemukan</h3>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setOnlyFlashSale(false);
              }}
              className="px-4 py-2 bg-[#1B5E20] text-white text-xs font-bold rounded-xl"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((p) => {
              const isWishlisted = wishlistIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {p.discountPercent && (
                        <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-extrabold rounded-md shadow">
                          -{p.discountPercent}%
                        </span>
                      )}
                      {p.isFlashSale && (
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-md shadow flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-rose-600 fill-rose-600" /> Flash
                        </span>
                      )}
                    </div>

                    {/* Wishlist Action */}
                    <button
                      onClick={() => {
                        onToggleWishlist(p.id);
                        showToast(isWishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist');
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-rose-500 transition shadow"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Quick Eye Button */}
                    <button
                      onClick={() => setSelectedProductModal(p)}
                      className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-slate-900/80 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition backdrop-blur-md flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Detail
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold truncate max-w-[120px]">
                          {p.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{p.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setSelectedProductModal(p)}
                        className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-[#1B5E20] transition"
                      >
                        {p.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Store className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{p.sellerName}</span>
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                      <div>
                        <p className="font-extrabold text-sm sm:text-base text-[#1B5E20] dark:text-emerald-400">
                          Rp {p.price.toLocaleString('id-ID')}
                        </p>
                        {p.originalPrice && (
                          <p className="text-[10px] text-slate-400 line-through">
                            Rp {p.originalPrice.toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => {
                            onAddToCart(p);
                            showToast(`${p.name} masuk keranjang!`);
                          }}
                          className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+Keranjang</span>
                        </button>
                        <button
                          onClick={() => {
                            onBuyNow(p);
                          }}
                          className="py-2 rounded-xl bg-[#1B5E20] hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center shadow"
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Product Detail Modal */}
        {selectedProductModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto animate-scaleUp">
              <button
                onClick={() => setSelectedProductModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="rounded-2xl w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-4">
                  <span className="px-2.5 py-1 bg-emerald-100 text-[#1B5E20] font-bold text-xs rounded-lg">
                    {selectedProductModal.category}
                  </span>
                  <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                    {selectedProductModal.name}
                  </h2>
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{selectedProductModal.rating} ({selectedProductModal.reviewCount} ulasan)</span>
                    <span className="text-slate-400">• Terjual {selectedProductModal.salesCount}</span>
                  </div>

                  <div>
                    <p className="text-2xl font-extrabold text-[#1B5E20] dark:text-emerald-400 font-serif">
                      Rp {selectedProductModal.price.toLocaleString('id-ID')}
                    </p>
                    {selectedProductModal.originalPrice && (
                      <p className="text-xs text-slate-400 line-through">
                        Rp {selectedProductModal.originalPrice.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedProductModal.description}
                  </p>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">Penjual / Produsen:</p>
                    <p className="text-slate-600 dark:text-slate-400">{selectedProductModal.sellerName}</p>
                    <p className="text-slate-500 text-[11px]">{selectedProductModal.sellerVillage}</p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        onAddToCart(selectedProductModal);
                        setSelectedProductModal(null);
                        showToast('Produk ditambahkan ke keranjang!');
                      }}
                      className="flex-1 py-3 bg-[#1B5E20] text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      + Keranjang
                    </button>
                    <button
                      onClick={() => {
                        const p = selectedProductModal;
                        setSelectedProductModal(null);
                        onBuyNow(p);
                      }}
                      className="flex-1 py-3 bg-[#D4AF37] text-slate-950 text-xs font-bold rounded-2xl"
                    >
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
