import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FileText,
  Ticket,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Download,
  Printer,
  CheckCircle2,
  X,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { Product, Article, Promo, MemberProfile } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  articles: Article[];
  promos: Promo[];
  member: MemberProfile;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  articles,
  promos,
  member,
}) => {
  const [activeTab, setActiveTab] = useState<'laporan' | 'produk' | 'artikel' | 'promo' | 'anggota'>('laporan');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [exportMsg, setExportMsg] = useState<string | null>(null);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(20000);
  const [newCategory, setNewCategory] = useState<any>('Kuliner');
  const [newSeller, setNewSeller] = useState('UMKM Desa Cipageran');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80');

  // Chart Data
  const salesData = [
    { bulan: 'Jan', penjualan: 180000000, transaksi: 420 },
    { bulan: 'Feb', penjualan: 210000000, transaksi: 510 },
    { bulan: 'Mar', penjualan: 240000000, transaksi: 590 },
    { bulan: 'Apr', penjualan: 280000000, transaksi: 680 },
    { bulan: 'Mei', penjualan: 310000000, transaksi: 740 },
    { bulan: 'Jun', penjualan: 350000000, transaksi: 820 },
    { bulan: 'Jul', penjualan: 420000000, transaksi: 950 },
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newName,
      price: newPrice,
      rating: 5.0,
      reviewCount: 1,
      stock: 50,
      category: newCategory,
      description: newDesc || 'Produk olahan berkualitas buatan warga Cipageran.',
      sellerName: newSeller,
      sellerVillage: 'Desa Cipageran, Cimahi',
      image: newImage,
      isFeatured: true,
      salesCount: 0,
    };
    onAddProduct(newProd);
    setShowAddProductModal(false);
    setNewName('');
    setNewDesc('');
  };

  const handleExportCSV = () => {
    setExportMsg('Laporan Penjualan & Transaksi berhasil diexport ke format Excel/CSV!');
    setTimeout(() => setExportMsg(null), 3500);
  };

  return (
    <div className="py-10 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1B5E20] text-[#D4AF37] font-bold text-xl flex items-center justify-center border border-emerald-500/40">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif text-white">Dashboard Pengurus KOPDES</h1>
              <p className="text-xs text-slate-400">Panel Kelola Operasional, Produk, Laporan Keuangan & Anggota</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-[#D4AF37] font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" /> Export Data Excel
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" /> Cetak Laporan
            </button>
          </div>
        </div>

        {exportMsg && (
          <div className="p-4 bg-emerald-950 text-emerald-200 rounded-2xl border border-emerald-700 text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            <span>{exportMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 pb-2 gap-2 overflow-x-auto">
          {[
            { id: 'laporan', label: 'Laporan & Grafik', icon: TrendingUp },
            { id: 'produk', label: 'Kelola Produk UMKM', icon: Package },
            { id: 'artikel', label: 'Kelola Artikel & Berita', icon: FileText },
            { id: 'promo', label: 'Kelola Promo & Voucher', icon: Ticket },
            { id: 'anggota', label: 'Kelola Anggota', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1B5E20] text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-emerald-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'laporan' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-3xl bg-slate-800 border border-slate-700 space-y-2">
                <p className="text-xs text-slate-400 font-semibold uppercase">Total Ombudsman Omset 2026</p>
                <p className="text-2xl font-extrabold text-[#D4AF37] font-serif">Rp 2.845.000.000</p>
                <p className="text-[10px] text-emerald-400 font-bold">▲ +18.4% dibanding tahun lalu</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-800 border border-slate-700 space-y-2">
                <p className="text-xs text-slate-400 font-semibold uppercase">Total Transaksi Selesai</p>
                <p className="text-2xl font-extrabold text-white font-serif">4.710 Order</p>
                <p className="text-[10px] text-emerald-400 font-bold">98.5% Tingkat Kepuasan</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-800 border border-slate-700 space-y-2">
                <p className="text-xs text-slate-400 font-semibold uppercase">Jumlah Anggota Aktif</p>
                <p className="text-2xl font-extrabold text-white font-serif">1.480 Anggota</p>
                <p className="text-[10px] text-emerald-400 font-bold">+24 Anggota baru bulan ini</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-800 border border-slate-700 space-y-2">
                <p className="text-xs text-slate-400 font-semibold uppercase">Total Dana Simpanan Anggota</p>
                <p className="text-2xl font-extrabold text-[#D4AF37] font-serif">Rp 1.450.000.000</p>
                <p className="text-[10px] text-slate-400">Tersimpan Aman di KOPDES</p>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base font-serif text-white">Grafik Tren Omset Penjualan Bulanan (2026)</h3>
                  <p className="text-xs text-slate-400">Data pertumbuhan omset gabungan Marketplace & Toko Fisik KOPDES</p>
                </div>
                <span className="px-3 py-1 bg-emerald-950 text-emerald-300 font-bold text-xs rounded-xl border border-emerald-800">
                  Update Realtime
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}M`} />
                    <Tooltip
                      formatter={(val: any) => [`Rp ${Number(val).toLocaleString('id-ID')}`, 'Penjualan']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    />
                    <Area type="monotone" dataKey="penjualan" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'produk' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base font-serif text-white">Katalog Produk UMKM ({products.length})</h3>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2 bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" /> Tambah Produk Baru
              </button>
            </div>

            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-4">Produk</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Harga</th>
                      <th className="p-4">Stok</th>
                      <th className="p-4">Penjual</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/80">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-700/50 transition">
                        <td className="p-4 flex items-center gap-3 font-bold text-white">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                          <span>{p.name}</span>
                        </td>
                        <td className="p-4">{p.category}</td>
                        <td className="p-4 font-bold text-emerald-400">Rp {p.price.toLocaleString('id-ID')}</td>
                        <td className="p-4">{p.stock} pcs</td>
                        <td className="p-4 text-slate-300">{p.sellerName}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-2 rounded-xl bg-rose-950 text-rose-300 hover:bg-rose-900 transition"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Add Product */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-800 p-6 space-y-4 relative text-white animate-scaleUp">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold font-serif text-white">Tambah Produk UMKM Desa Baru</h3>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Nama Produk</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Combro Frozen KOPDES 10pcs"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Harga (Rp)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Kategori</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs focus:outline-none"
                    >
                      <option value="Kuliner">Kuliner</option>
                      <option value="Peternakan">Peternakan</option>
                      <option value="Pertanian">Pertanian</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Kerajinan">Kerajinan</option>
                      <option value="Produk Digital">Produk Digital</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Nama UMKM / Penjual</label>
                  <input
                    type="text"
                    required
                    value={newSeller}
                    onChange={(e) => setNewSeller(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Deskripsi Produk</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan keunggulan produk..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold rounded-2xl transition"
                >
                  Simpan Produk Baru
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'artikel' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-bold text-base font-serif text-white">Kelola Artikel ({articles.length})</h3>
            <div className="space-y-3">
              {articles.map((art) => (
                <div key={art.id} className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white text-sm">{art.title}</p>
                    <p className="text-slate-400 mt-0.5">{art.category} • {art.date}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 font-bold rounded-lg">Dipublikasi</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'promo' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-bold text-base font-serif text-white">Daftar Promo & Voucher Active ({promos.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {promos.map((pr) => (
                <div key={pr.id} className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                  <p className="font-bold text-white">{pr.title}</p>
                  <p className="font-mono text-emerald-400 font-bold">Kode: {pr.code}</p>
                  <p className="text-slate-400">Diskon {pr.discountPercent}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'anggota' && (
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4 animate-fadeIn">
            <h3 className="font-bold text-base font-serif text-white">Database Anggota Terdaftar</h3>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white">{member.fullName}</p>
                <p className="text-slate-400">NIK: {member.nik} • No: {member.memberNumber}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-900 text-emerald-300 font-bold rounded-xl">
                Status: {member.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
