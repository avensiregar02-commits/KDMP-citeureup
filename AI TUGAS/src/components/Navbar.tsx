import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  UserCheck,
  Building2,
  Phone,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { NavigationSection } from '../types';

interface NavbarProps {
  activeSection: NavigationSection;
  setActiveSection: (section: NavigationSection) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: 'ID' | 'EN';
  setLanguage: (lang: 'ID' | 'EN') => void;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  isLoggedIn,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems: { id: NavigationSection; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: language === 'ID' ? 'Beranda' : 'Home' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'produk-unggulan', label: language === 'ID' ? 'Produk Unggulan' : 'Featured' },
    { id: 'profile-koperasi', label: language === 'ID' ? 'Koperasi' : 'Cooperative' },
    { id: 'profile-desa', label: language === 'ID' ? 'Profil Desa' : 'Village' },
    { id: 'layanan', label: language === 'ID' ? 'Layanan' : 'Services' },
    { id: 'promo', label: 'Promo & Flash Sale' },
    { id: 'artikel', label: language === 'ID' ? 'Berita' : 'News' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'kontak', label: language === 'ID' ? 'Kontak' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Bar Banner */}
      <div className="bg-[#1B5E20] text-white text-xs px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              {language === 'ID'
                ? 'Microsite Resmi Koperasi Desa (KOPDES) Cipageran - Kota Cimahi'
                : 'Official Microsite of Cipageran Village Cooperative'}
            </span>
            <span className="text-emerald-200/60">|</span>
            <span className="text-emerald-100 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> NIK Kemenkop: 327702001088
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D4AF37] transition flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" /> Call Center: 0812-3456-7890
            </a>
            <button
              onClick={() => setActiveSection('admin')}
              className="px-2 py-0.5 rounded bg-emerald-800 hover:bg-emerald-700 text-[#D4AF37] font-semibold text-[11px] flex items-center gap-1 transition"
            >
              <LayoutDashboard className="w-3 h-3" />
              {language === 'ID' ? 'Dashboard Admin' : 'Admin Panel'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1B5E20] via-emerald-700 to-[#2E7D32] flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform border border-emerald-500/30">
            <span className="font-bold text-lg tracking-wider text-[#D4AF37]">CPG</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-serif">
                KOPDES
              </span>
              <span className="px-1.5 py-0.5 bg-[#1B5E20] text-[#D4AF37] text-[10px] font-bold rounded-md tracking-wider">
                CIPAGERAN
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5">
              Kota Cimahi • Maju & Sejahtera
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1B5E20] text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-[#1B5E20] transition flex items-center gap-2 text-xs font-medium border border-slate-200 dark:border-slate-700"
            title="Cari Produk / Artikel (Cmd+K)"
          >
            <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="hidden md:inline">
              {language === 'ID' ? 'Cari...' : 'Search...'}
            </span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#1B5E20] dark:text-emerald-300 hover:bg-emerald-100 transition border border-emerald-200/60 dark:border-emerald-800"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-slate-900 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setActiveSection('marketplace')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition hidden sm:flex items-center relative"
            title="Wishlist Saya"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Ganti Mode Tampilan"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* Multi Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'ID' ? 'EN' : 'ID')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-emerald-50 transition border border-slate-200 dark:border-slate-700 flex items-center gap-1"
            title="Ganti Bahasa"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            {language}
          </button>

          {/* Member Portal Button */}
          <button
            onClick={() => setActiveSection('anggota')}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
              activeSection === 'anggota'
                ? 'bg-[#D4AF37] text-slate-900'
                : 'bg-[#1B5E20] hover:bg-emerald-800 text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>{language === 'ID' ? 'Portal Anggota' : 'Member Area'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl xl:hidden bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold text-left transition ${
                  activeSection === item.id
                    ? 'bg-[#1B5E20] text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setActiveSection('anggota');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-[#1B5E20] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-[#D4AF37]" />
              Portal Anggota
            </button>
            <button
              onClick={() => {
                setActiveSection('admin');
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 bg-emerald-900 text-[#D4AF37] rounded-xl text-xs font-bold flex items-center justify-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
