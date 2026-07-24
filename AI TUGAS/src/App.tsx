import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/HeroBanner';
import { ProfileDesa } from './components/ProfileDesa';
import { ProfileKoperasi } from './components/ProfileKoperasi';
import { Marketplace } from './components/Marketplace';
import { ProdukUnggulan } from './components/ProdukUnggulan';
import { ArticlesNews } from './components/ArticlesNews';
import { PromoSection } from './components/PromoSection';
import { EventCalendar } from './components/EventCalendar';
import { MediaGallery } from './components/MediaGallery';
import { MemberPortal } from './components/MemberPortal';
import { LayananKoperasi } from './components/LayananKoperasi';
import { ContactMap } from './components/ContactMap';
import { AdminDashboard } from './components/AdminDashboard';
import { ShoppingCartDrawer } from './components/ShoppingCartDrawer';
import { AiChatWidget } from './components/AiChatWidget';

import {
  INITIAL_PRODUCTS,
  INITIAL_ARTICLES,
  INITIAL_PROMOS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_MEMBER,
  INITIAL_LOANS,
} from './data/initialData';

import {
  NavigationSection,
  Product,
  CartItem,
  Article,
  Promo,
  EventAgenda,
  GalleryMedia,
  MemberProfile,
  LoanApplication,
} from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('landing');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'id' | 'su' | 'en'>('id');

  // Dynamic Data States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [promos] = useState<Promo[]>(INITIAL_PROMOS);
  const [events] = useState<EventAgenda[]>(INITIAL_EVENTS);
  const [gallery] = useState<GalleryMedia[]>(INITIAL_GALLERY);
  const [member] = useState<MemberProfile>(INITIAL_MEMBER);
  const [loans] = useState<LoanApplication[]>(INITIAL_LOANS);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-2']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle dark mode class toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Cart Functions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Admin Data Modifiers
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddArticleComment = (articleId: string, text: string, author: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          return {
            ...art,
            comments: [
              ...art.comments,
              {
                id: `c-${Date.now()}`,
                author,
                text,
                date: new Date().toLocaleDateString('id-ID'),
              },
            ],
          };
        }
        return art;
      })
    );
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col justify-between">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        language={language}
        setLanguage={setLanguage}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Rendered Page Body */}
      <main className="flex-1">
        {activeSection === 'landing' && (
          <>
            <HeroBanner setActiveSection={setActiveSection} />
            <ProdukUnggulan
              products={products}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              setActiveSection={setActiveSection}
            />
            <ProfileDesa />
            <ArticlesNews articles={articles.slice(0, 3)} onAddComment={handleAddArticleComment} />
          </>
        )}

        {activeSection === 'profile-desa' && <ProfileDesa />}

        {activeSection === 'profile-koperasi' && <ProfileKoperasi />}

        {activeSection === 'marketplace' && (
          <Marketplace
            products={products}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeSection === 'produk-unggulan' && (
          <ProdukUnggulan
            products={products}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'artikel' && (
          <ArticlesNews articles={articles} onAddComment={handleAddArticleComment} />
        )}

        {activeSection === 'promo' && (
          <PromoSection promos={promos} setActiveSection={setActiveSection} />
        )}

        {activeSection === 'agenda' && <EventCalendar events={events} />}

        {activeSection === 'galeri' && <MediaGallery gallery={gallery} />}

        {activeSection === 'anggota' && (
          <MemberPortal
            member={member}
            loans={loans}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}

        {activeSection === 'layanan' && <LayananKoperasi />}

        {activeSection === 'kontak' && <ContactMap />}

        {activeSection === 'admin' && (
          <AdminDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            articles={articles}
            promos={promos}
            member={member}
          />
        )}
      </main>

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* AI Assistant Floating Chat Widget */}
      <AiChatWidget />

      {/* Comprehensive Footer */}
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
