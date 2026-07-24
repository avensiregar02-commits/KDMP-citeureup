import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Ticket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  QrCode,
  CreditCard,
  Building2,
  Truck,
} from 'lucide-react';
import { CartItem } from '../types';

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [voucherErrorMsg, setVoucherErrorMsg] = useState<string | null>(null);
  const [voucherSuccessMsg, setVoucherSuccessMsg] = useState<string | null>(null);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank_transfer' | 'cod'>('qris');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [orderCompletedId, setOrderCompletedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const shippingFee = subtotal > 0 ? (subtotal >= 100000 ? 0 : 10000) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherInput.trim().toUpperCase();
    if (code === 'KOPDESBANGKIT' || code === 'CIPAGERAN10') {
      setAppliedDiscountPercent(10);
      setVoucherSuccessMsg('Voucher Potongan 10% Berhasil Dipakai!');
      setVoucherErrorMsg(null);
    } else if (code === 'SIMPANSEJAHTERA' || code === 'FLASH25') {
      setAppliedDiscountPercent(25);
      setVoucherSuccessMsg('Voucher Diskon Flash 25% Berhasil Dipakai!');
      setVoucherErrorMsg(null);
    } else {
      setVoucherErrorMsg('Kode voucher tidak valid atau sudah kadaluarsa.');
      setVoucherSuccessMsg(null);
    }
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) return;
    const orderId = `KOPDES-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCompletedId(orderId);
  };

  const handleCloseAll = () => {
    setOrderCompletedId(null);
    setIsCheckoutModalOpen(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slideLeft">
        {/* Cart Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#1B5E20] text-[#D4AF37] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base font-serif text-slate-900 dark:text-white">
                Keranjang Belanja
              </h2>
              <p className="text-[11px] text-slate-500">{cart.length} Jenis Produk</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-bold text-sm text-slate-700 dark:text-slate-300">
                Keranjang Anda masih kosong
              </p>
              <p className="text-xs text-slate-500">
                Jelajahi produk lokal berkualitas buatan warga Desa Cipageran.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-xs font-extrabold text-[#1B5E20] dark:text-emerald-400">
                    Rp {item.product.price.toLocaleString('id-ID')}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher & Summary Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-4">
            {/* Voucher Form */}
            <form onSubmit={handleApplyVoucher} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kode Voucher (KOPDESBANGKIT)"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs uppercase font-mono font-bold focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-800 hover:bg-emerald-700 text-[#D4AF37] text-xs font-bold rounded-xl transition"
                >
                  Pakai
                </button>
              </div>

              {voucherSuccessMsg && (
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {voucherSuccessMsg}
                </p>
              )}
              {voucherErrorMsg && (
                <p className="text-[11px] font-bold text-rose-500">{voucherErrorMsg}</p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span>Subtotal Produk:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Diskon Voucher ({appliedDiscountPercent}%):</span>
                  <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Ongkos Kirim Kurir Desa:</span>
                <span className="font-bold">
                  {shippingFee === 0 ? 'GRATIS' : `Rp ${shippingFee.toLocaleString('id-ID')}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Pembayaran:</span>
                <span className="text-[#1B5E20] dark:text-emerald-400 font-serif text-base">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Lanjut Ke Pembayaran</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        )}

        {/* Checkout Modal */}
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 p-6 space-y-5 relative animate-scaleUp text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {orderCompletedId ? (
                /* Order Success View */
                <div className="text-center space-y-4 py-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1B5E20] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-[#1B5E20]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      Pesanan Berhasil Dibuat!
                    </h3>
                    <p className="text-xs text-slate-500">
                      Nomor Transaksi: <strong className="font-mono text-emerald-600">{orderCompletedId}</strong>
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-left text-xs space-y-2 border border-slate-200 dark:border-slate-700">
                    <p className="font-bold text-slate-900 dark:text-white">Instruksi Pembayaran QRIS / Bank BJB:</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Silakan selesaikan pembayaran sebesar <strong className="text-[#1B5E20] dark:text-emerald-400">Rp {grandTotal.toLocaleString('id-ID')}</strong>.
                    </p>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-center space-y-2">
                      <QrCode className="w-24 h-24 mx-auto text-slate-800 dark:text-slate-100" />
                      <p className="text-[10px] text-slate-400">Scan QRIS menggunakan Mobile Banking atau E-Wallet pilihan Anda</p>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseAll}
                    className="w-full py-3 bg-[#1B5E20] text-white font-bold text-xs rounded-2xl"
                  >
                    Kembali Ke Beranda
                  </button>
                </div>
              ) : (
                /* Checkout Form View */
                <form onSubmit={handleProcessOrder} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                      Pengiriman & Pembayaran
                    </h3>
                    <p className="text-xs text-slate-500">Lengkapi alamat pengiriman produk lokal Cipageran</p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">Nama Penerima</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Nomor WhatsApp Penerima</label>
                      <input
                        type="tel"
                        required
                        placeholder="0812-3456-7890"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Alamat Lengkap Pengiriman</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Nama jalan, RT/RW, nomor rumah di Cipageran / Cimahi..."
                        value={buyerAddress}
                        onChange={(e) => setBuyerAddress(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-2">Metode Pembayaran</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'qris', label: 'QRIS BJB', icon: QrCode },
                          { id: 'bank_transfer', label: 'Transfer Bank', icon: Building2 },
                          { id: 'cod', label: 'COD Kantor', icon: CreditCard },
                        ].map((pm) => {
                          const Icon = pm.icon;
                          const isSel = paymentMethod === pm.id;
                          return (
                            <button
                              key={pm.id}
                              type="button"
                              onClick={() => setPaymentMethod(pm.id as any)}
                              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                                isSel
                                  ? 'bg-[#1B5E20] text-white border-emerald-500'
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-[10px] font-bold">{pm.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#1B5E20] hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow transition"
                    >
                      Bayar Sekarang (Rp {grandTotal.toLocaleString('id-ID')})
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
