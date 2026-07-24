export type NavigationSection =
  | 'home'
  | 'profile-desa'
  | 'profile-koperasi'
  | 'marketplace'
  | 'produk-unggulan'
  | 'artikel'
  | 'promo'
  | 'agenda'
  | 'galeri'
  | 'anggota'
  | 'layanan'
  | 'kontak'
  | 'admin';

export type ProductCategory =
  | 'Pertanian'
  | 'Perikanan'
  | 'Peternakan'
  | 'Kerajinan'
  | 'Kuliner'
  | 'Fashion'
  | 'UMKM'
  | 'Produk Digital';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  category: ProductCategory;
  description: string;
  sellerName: string;
  sellerVillage: string;
  image: string;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  salesCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Menunggu Pembayaran' | 'Diproses' | 'Dikirim' | 'Selesai';
  customerName: string;
  customerAddress: string;
  paymentMethod: 'QRIS KOPDES' | 'Transfer Bank' | 'Bayar di Koperasi (COD)';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Kegiatan Koperasi' | 'Berita Desa' | 'Pengumuman' | 'Pelatihan' | 'UMKM' | 'Ekonomi Desa';
  author: string;
  date: string;
  readTime: string;
  image: string;
  views: number;
  comments: ArticleComment[];
}

export interface ArticleComment {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface Promo {
  id: string;
  title: string;
  code: string;
  discountPercent: number;
  minPurchase: number;
  maxDiscount: number;
  validUntil: string;
  type: 'Flash Sale' | 'Voucher' | 'Diskon' | 'Cashback' | 'Promo Musiman';
  bannerImage: string;
}

export interface EventAgenda {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Pelatihan' | 'Rapat' | 'Bazar' | 'Pasar Murah' | 'Festival Desa';
  description: string;
  organizer: string;
  image: string;
  status: 'Akan Datang' | 'Berlangsung' | 'Selesai';
}

export interface GalleryMedia {
  id: string;
  title: string;
  category: 'Foto Kegiatan' | 'Potensi Desa' | 'Wisata Paku Haji' | 'UMKM' | 'Drone View' | '360° Panorama';
  type: 'photo' | 'video' | '360';
  url: string;
  thumbnail: string;
  description: string;
}

export interface MemberProfile {
  id: string;
  nik: string;
  memberNumber: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  joinDate: string;
  status: 'Aktif' | 'Pengurus' | 'Pendamping';
  savingsPokok: number;
  savingsWajib: number;
  savingsSukarela: number;
  activeLoanAmount: number;
  loanStatus: 'Tidak Ada' | 'Lancar' | 'Pengajuan Diproses';
}

export interface LoanApplication {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  tenorMonths: number;
  purpose: string;
  monthlyInstallment: number;
  status: 'Pending' | 'Disetujui' | 'Ditolak';
  requestDate: string;
}

export interface ServiceRequest {
  id: string;
  type: 'Simpan Dana' | 'Pendaftaran UMKM' | 'Konsultasi' | 'Layanan Pengaduan';
  name: string;
  phone: string;
  description: string;
  date: string;
  status: 'Baru' | 'Diproses' | 'Selesai';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
