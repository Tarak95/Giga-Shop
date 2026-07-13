import React, { useState } from 'react';
import { useShop, ScreenType } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  PhoneCall, 
  MapPin, 
  Mail, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Sparkles,
  CreditCard,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgePercent
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../data/products';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { 
    currentScreen, 
    navigateTo, 
    cart, 
    wishlist, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategory,
    setSelectedSubCategory,
    currentUser
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [emailNewsletter, setEmailNewsletter] = useState('');
  const [newsLetterSuccess, setNewsLetterSuccess] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSelectedCategory('all');
    setSelectedSubCategory(null);
    navigateTo('shop');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailNewsletter.trim()) {
      setNewsLetterSuccess(true);
      setEmailNewsletter('');
      setTimeout(() => setNewsLetterSuccess(false), 5000);
    }
  };

  const handleCategoryNav = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory(null);
    navigateTo('shop');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#1A1A1A] font-sans border-8 md:border-[16px] border-white selection:bg-[#1A1A1A] selection:text-white" id="main-layout-root">
      {/* 1. TOP PROMO BANNER */}
      <div className="bg-[#1A1A1A] text-[#F9F8F6] text-[10px] uppercase tracking-[0.2em] py-3 px-6 flex justify-between items-center border-b border-[#1A1A1A]" id="top-promo-banner">
        <div className="flex items-center gap-2 font-medium">
          <BadgePercent className="w-3.5 h-3.5 text-[#EDE9E3]" />
          <span>⚡ Summer Flash Drop: Up to 40% Off on Selected Hardware & Apparel — Use Code: <strong className="underline">GIGA20</strong></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[9px] tracking-widest font-medium">
          <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> COMPLIMENTARY SHIPPING OVER $150</span>
          <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> 30-DAY COMPLIANCE PROMISE</span>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#1A1A1A] shadow-none" id="main-header">
        {/* Mid bar: Search, Logo, Cart */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4" id="header-mid-bar">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            id="header-logo-container"
          >
            <div className="w-9 h-9 border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] bg-transparent group-hover:bg-[#1A1A1A] group-hover:text-[#F9F8F6] transition-colors duration-300 rounded-none">
              <ShoppingBag className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <span className="text-3xl font-serif italic tracking-tight text-[#1A1A1A] font-light">GigaShop</span>
              <span className="block text-[9px] text-[#1A1A1A]/50 tracking-[0.3em] font-mono uppercase -mt-1 font-semibold">Nexus Collective</span>
            </div>
          </div>

          {/* Search bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-md relative"
            id="header-search-form"
          >
            <input
              type="text"
              placeholder="Search hardware, apparel, archives..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-20 rounded-none border border-[#1A1A1A]/30 bg-transparent focus:bg-white focus:outline-none focus:border-[#1A1A1A] text-xs transition-all uppercase tracking-widest font-medium"
            />
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#1A1A1A]/60" />
            <button 
              type="submit" 
              className="absolute right-1 top-1 bg-[#1A1A1A] text-[#F9F8F6] text-[9px] tracking-widest uppercase px-3 py-1 rounded-none hover:bg-opacity-90 font-medium transition-all cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Utilities: Wishlist, Cart, Dashboard */}
          <div className="flex items-center gap-1.5 sm:gap-2" id="header-utilities">
            {/* Wishlist */}
            <button 
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-[#1A1A1A] hover:opacity-60 relative transition-all cursor-pointer"
              title="Wishlist"
              id="wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#1A1A1A] text-[#F9F8F6] text-[8px] w-3.5 h-3.5 rounded-none flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={() => navigateTo('cart')}
              className="p-2 text-[#1A1A1A] hover:opacity-60 relative transition-all cursor-pointer flex items-center gap-1.5"
              title="Shopping Cart"
              id="cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-[#F9F8F6] text-[8px] w-3.5 h-3.5 rounded-none flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left text-[9px] uppercase tracking-wider font-semibold">
                <p className="text-[#1A1A1A]/50 text-[7px] leading-none uppercase">BAG</p>
                <p className="font-bold text-[#1A1A1A]">${cartSubtotal.toFixed(2)}</p>
              </div>
            </button>

            {/* User Dashboard / Auth */}
            <button 
              onClick={() => navigateTo('dashboard')}
              className="p-2 text-[#1A1A1A] hover:opacity-60 relative transition-all cursor-pointer flex items-center gap-1.5"
              title={currentUser ? "User Dashboard" : "Sign In / Register"}
              id="user-dashboard-btn"
            >
              <User className="w-5 h-5" />
              <div className="hidden lg:block text-left text-[9px] uppercase tracking-wider font-semibold">
                <p className="text-[#1A1A1A]/50 text-[7px] leading-none uppercase">
                  {currentUser ? `HELLO, ${currentUser.fullName.split(' ')[0]}` : 'ACCOUNT'}
                </p>
                <p className="font-bold text-[#1A1A1A]">
                  {currentUser ? 'DASHBOARD' : 'SIGN IN'}
                </p>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1A1A] hover:opacity-60 rounded-none transition-all cursor-pointer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottom bar: Category links and Contact */}
        <nav className="hidden md:block border-t border-[#1A1A1A] bg-[#EDE9E3]/30" id="desktop-nav-bar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Nav links */}
            <div className="flex items-center py-1">
              <button 
                onClick={() => navigateTo('home')}
                className={`px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer border-b border-transparent hover:opacity-50 ${currentScreen === 'home' ? 'border-[#1A1A1A] text-[#1A1A1A] font-bold' : 'text-[#1A1A1A]/70'}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleCategoryNav('all')}
                className={`px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer border-b border-transparent hover:opacity-50 ${currentScreen === 'shop' ? 'border-[#1A1A1A] text-[#1A1A1A] font-bold' : 'text-[#1A1A1A]/70'}`}
              >
                Shop Catalog
              </button>
              <button 
                onClick={() => handleCategoryNav('gadget')}
                className="px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer border-b border-transparent hover:opacity-50 text-[#1A1A1A]/70"
              >
                Gadgets & Hardware
              </button>
              <button 
                onClick={() => handleCategoryNav('clothing')}
                className="px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer border-b border-transparent hover:opacity-50 text-[#1A1A1A]/70"
              >
                Apparel Series
              </button>
              <button 
                onClick={() => navigateTo('contact')}
                className={`px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer border-b border-transparent hover:opacity-50 ${currentScreen === 'contact' ? 'border-[#1A1A1A] text-[#1A1A1A] font-bold' : 'text-[#1A1A1A]/70'}`}
              >
                Contact
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="flex items-center gap-2 text-[#1A1A1A]/60 text-[10px] uppercase tracking-[0.2em] py-1 font-medium" id="header-phone-support">
              <PhoneCall className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>SUPPORT:</span>
              <a href="tel:+88017000000" className="text-[#1A1A1A] hover:opacity-50 font-bold">+880 1700-0000</a>
            </div>
          </div>
        </nav>
      </header>

      {/* 3. MOBILE DRAWER NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            id="mobile-drawer-overlay"
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col gap-6"
              id="mobile-drawer-content"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="text-lg font-extrabold text-emerald-600">GigaShop</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full bg-slate-100 cursor-pointer">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              </form>

              {/* Mobile Links */}
              <div className="flex flex-col gap-4 text-sm font-semibold">
                <button 
                  onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
                  className="text-left py-2 hover:text-emerald-600 border-b border-slate-50 transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => { handleCategoryNav('all'); setMobileMenuOpen(false); }}
                  className="text-left py-2 hover:text-emerald-600 border-b border-slate-50 transition-colors"
                >
                  Shop Store
                </button>
                <button 
                  onClick={() => { handleCategoryNav('gadget'); setMobileMenuOpen(false); }}
                  className="text-left py-2 hover:text-emerald-600 border-b border-slate-50 transition-colors pl-2 text-slate-500"
                >
                  └ Gadgets & Tech
                </button>
                <button 
                  onClick={() => { handleCategoryNav('clothing'); setMobileMenuOpen(false); }}
                  className="text-left py-2 hover:text-emerald-600 border-b border-slate-50 transition-colors pl-2 text-slate-500"
                >
                  └ Clothing & Fashion
                </button>
                <button 
                  onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
                  className="text-left py-2 hover:text-emerald-600 border-b border-slate-50 transition-colors"
                >
                  {currentUser ? `Dashboard (${currentUser.fullName})` : 'Sign In / Sign Up'}
                </button>
                <button 
                  onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                  className="text-left py-2 hover:text-emerald-600 transition-colors"
                >
                  Contact Us
                </button>
              </div>

              {/* Footer details in Drawer */}
              <div className="mt-auto pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <p className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-emerald-600" /> +8801700-0000</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-600" /> support@gigashop.com</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN BODY INJECTED PAGE */}
      <main className="flex-1" id="main-content-wrapper">
        {children}
      </main>

      {/* 5. BRAND VALUE PROPOSITION STRIP */}
      <section className="bg-[#EDE9E3]/40 border-t border-b border-[#1A1A1A]/30 py-12" id="brand-value-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shrink-0 bg-[#F9F8F6]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif italic font-medium text-[#1A1A1A] text-base">Complimentary Courier</h4>
              <p className="text-[#1A1A1A]/70 text-xs mt-1 leading-relaxed">Free shipping on orders exceeding $150. Curated courier dispatch with live parcel logs.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shrink-0 bg-[#F9F8F6]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif italic font-medium text-[#1A1A1A] text-base">Secure Gateway</h4>
              <p className="text-[#1A1A1A]/70 text-xs mt-1 leading-relaxed">Fully encrypted SSL gateway protocol. Complete compliance with premium cards & PayPal.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shrink-0 bg-[#F9F8F6]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif italic font-medium text-[#1A1A1A] text-base">Returns & Exchange</h4>
              <p className="text-[#1A1A1A]/70 text-xs mt-1 leading-relaxed">A seamless 30-day return cycle. Complimentary pre-paid drop off labels provided instantly.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] shrink-0 bg-[#F9F8F6]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif italic font-medium text-[#1A1A1A] text-base">Manufacturer Warranty</h4>
              <p className="text-[#1A1A1A]/70 text-xs mt-1 leading-relaxed">Authentic items sourced directly from international brands with complete warranty files.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UNIVERSAL FOOTER */}
      <footer className="bg-[#1A1A1A] text-[#F9F8F6] pt-16 pb-12 border-t border-[#1A1A1A]" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-9 h-9 border border-[#F9F8F6] flex items-center justify-center text-[#F9F8F6]">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <span className="text-2xl font-serif italic tracking-tight text-white">GigaShop</span>
            </div>
            <p className="text-[#F9F8F6]/75 text-xs leading-relaxed font-sans">
              Curated online storefront supplying premium gadgets & high-fashion clothing. We pair modern technology with aesthetic print-era design.
            </p>
            <div className="space-y-2.5 text-xs text-[#F9F8F6]/60 pt-3">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#EDE9E3]" /> Dhaka, Bangladesh</p>
              <p className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-[#EDE9E3]" /> +880 1700-000000</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#EDE9E3]" /> contact@gigashop.com</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="text-left">
            <h5 className="font-serif italic text-lg text-white mb-4 tracking-wide border-b border-[#F9F8F6]/20 pb-2">Product Categories</h5>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              <li>
                <button onClick={() => handleCategoryNav('gadget')} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer">
                  Gadgets & Electronics
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('clothing')} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer">
                  Clothing & Apparel
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('gadget'); setSelectedSubCategory('Audio'); navigateTo('shop'); }} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer text-left">
                  High-End Sound
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('clothing'); setSelectedSubCategory('Jackets & Coats'); navigateTo('shop'); }} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer text-left">
                  Trench Coats & Outerwear
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('clothing'); setSelectedSubCategory('Footwear'); navigateTo('shop'); }} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer text-left">
                  Apparel Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service / Pages */}
          <div className="text-left">
            <h5 className="font-serif italic text-lg text-white mb-4 tracking-wide border-b border-[#F9F8F6]/20 pb-2">Curated Pages</h5>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer">
                  Return To Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer">
                  The Full Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer text-left">
                  Customer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white text-[#F9F8F6]/70 transition-opacity cursor-pointer">
                  Customer Support
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="text-left">
            <h5 className="font-serif italic text-lg text-white mb-4 tracking-wide border-b border-[#F9F8F6]/20 pb-2">Join the Collective</h5>
            <p className="text-[#F9F8F6]/75 text-xs mb-4 leading-relaxed">
              Subscribe to receive updates on limited archival product drops, editorial features, and special codes.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2" id="footer-newsletter-form">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={emailNewsletter}
                  onChange={(e) => setEmailNewsletter(e.target.value)}
                  className="w-full bg-[#1A1A1A] text-white placeholder-neutral-500 rounded-none py-3 px-4 pr-12 text-xs border border-[#F9F8F6]/30 focus:outline-none focus:border-white focus:ring-0 uppercase tracking-widest"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1 bg-white text-[#1A1A1A] p-2 rounded-none hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <AnimatePresence>
                {newsLetterSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-[#EDE9E3] font-medium uppercase tracking-widest mt-1.5"
                  >
                    ✓ Successfully subscribed.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-8">
              <p className="text-[9px] text-[#F9F8F6]/50 uppercase tracking-[0.2em] font-medium mb-2.5">Compliant Methods</p>
              <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest uppercase text-[#F9F8F6]/60">
                <span className="border border-[#F9F8F6]/20 px-2 py-0.5">VISA</span>
                <span className="border border-[#F9F8F6]/20 px-2 py-0.5">M/C</span>
                <span className="border border-[#F9F8F6]/20 px-2 py-0.5">AMEX</span>
                <span className="border border-[#F9F8F6]/20 px-2 py-0.5">COD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-[#F9F8F6]/50" id="footer-copyright-strip">
          <p>© 2026 GIGAshop. Nexus Collective Systems. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Coordinates</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
