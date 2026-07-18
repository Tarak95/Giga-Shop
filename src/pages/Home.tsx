import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { 
  Flame, 
  Sparkles, 
  ChevronRight, 
  ShoppingBag, 
  Heart, 
  Star, 
  ArrowRight,
  Smartphone,
  Headphones,
  Laptop,
  Shirt,
  Watch,
  Award
} from 'lucide-react';

export const Home: React.FC = () => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist, setSelectedCategory, setSelectedSubCategory } = useShop();

  // Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const heroSlides = [
    {
      badge: 'LATEST DROP 2026',
      title: 'Symphony of Pure Silence',
      subtitle: 'Premium ANC Headphones with high-fidelity studio acoustic tuning.',
      cta: 'Explore Audio Tech',
      bgClass: 'bg-[#1A1A1A] text-[#F9F8F6]',
      img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
      category: 'gadget',
      subCategory: 'Audio'
    },
    {
      badge: 'PREMIUM TAILORING',
      title: 'Timeless Style & Unmatched Comfort',
      subtitle: 'Genuine full-grain leather jackets and premium heavyweight knits.',
      cta: 'Explore Fashion',
      bgClass: 'bg-[#EDE9E3] text-[#1A1A1A]',
      img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      category: 'clothing',
      subCategory: 'Jackets & Coats'
    }
  ];

  // Auto scroll slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Simulated Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroCta = (slide: typeof heroSlides[0]) => {
    setSelectedCategory(slide.category);
    setSelectedSubCategory(slide.subCategory);
    navigateTo('shop');
  };

  const hotProducts = PRODUCTS.filter(p => p.hot);
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <div className="space-y-16 pb-16" id="home-page-container">
      {/* 1. DYNAMIC HERO CAROUSEL */}
      <section className="relative overflow-hidden border-b border-[#1A1A1A]" id="hero-carousel">
        <div className="h-[460px] md:h-[520px] transition-all duration-700 relative">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 ${slide.bgClass} flex items-center transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-6 text-left">
                  <span className="inline-flex items-center gap-1.5 bg-transparent border border-current text-[10px] px-3 py-1 rounded-none font-bold uppercase tracking-[0.25em]">
                    <Sparkles className="w-3 h-3" />
                    {slide.badge}
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic tracking-tight font-light leading-[1.1]">
                    {slide.title}
                  </h1>
                  <p className="opacity-80 text-xs sm:text-sm max-w-lg leading-relaxed uppercase tracking-wider font-medium font-sans">
                    {slide.subtitle}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleHeroCta(slide)}
                      className={`font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-none transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                        slide.bgClass.includes('bg-[#1A1A1A]') 
                          ? 'bg-white text-[#1A1A1A] border-white hover:bg-[#EDE9E3]' 
                          : 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A] hover:bg-opacity-90'
                      }`}
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setSelectedCategory('all'); setSelectedSubCategory(null); navigateTo('shop'); }}
                      className={`font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-none transition-all border cursor-pointer ${
                        slide.bgClass.includes('bg-[#1A1A1A]') 
                          ? 'bg-transparent text-white border-white/30 hover:border-white' 
                          : 'bg-transparent text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                      }`}
                    >
                      View All Catalog
                    </button>
                  </div>
                </div>

                {/* Side Image */}
                <div className="hidden md:flex justify-end relative">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-80 h-80 lg:w-[400px] lg:h-[400px] object-cover rounded-none border border-[#1A1A1A] shadow-none relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 transition-all cursor-pointer rounded-none ${idx === activeSlide ? 'bg-[#1A1A1A] w-8' : 'bg-[#1A1A1A]/30 w-3'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* 2. PRESET CATEGORY SELECTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="quick-category-pills">
        <div className="bg-[#EDE9E3]/20 rounded-none border border-[#1A1A1A]/30 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-left">
            <div>
              <h2 className="text-2xl font-serif italic text-[#1A1A1A] tracking-tight">Browse Popular Divisions</h2>
              <p className="text-[#1A1A1A]/50 text-xs uppercase tracking-widest font-mono mt-1">Direct paths to premium crafted hardware and apparel</p>
            </div>
            <button 
              onClick={() => { setSelectedCategory('all'); setSelectedSubCategory(null); navigateTo('shop'); }}
              className="text-[#1A1A1A] hover:opacity-60 text-xs font-bold flex items-center gap-1 cursor-pointer uppercase tracking-widest"
            >
              <span>Browse All Shop</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Smartphones', category: 'gadget', sub: 'Smartphones', icon: <Smartphone className="w-5 h-5 text-[#1A1A1A]" /> },
              { label: 'Audio Tech', category: 'gadget', sub: 'Audio', icon: <Headphones className="w-5 h-5 text-[#1A1A1A]" /> },
              { label: 'Computing', category: 'gadget', sub: 'Computing', icon: <Laptop className="w-5 h-5 text-[#1A1A1A]" /> },
              { label: 'Jackets & Coats', category: 'clothing', sub: 'Jackets & Coats', icon: <Shirt className="w-5 h-5 text-[#1A1A1A]" /> },
              { label: 'Smart Wearables', category: 'gadget', sub: 'Wearables', icon: <Watch className="w-5 h-5 text-[#1A1A1A]" /> },
              { label: 'Premium Hoodies', category: 'clothing', sub: 'Hoodies & Sweats', icon: <Award className="w-5 h-5 text-[#1A1A1A]" /> }
            ].map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat.category);
                  setSelectedSubCategory(cat.sub);
                  navigateTo('shop');
                }}
                className="bg-white hover:bg-[#EDE9E3]/40 rounded-none p-5 text-center border border-[#1A1A1A]/10 hover:border-[#1A1A1A] transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-none bg-[#F9F8F6] border border-[#1A1A1A]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                  {cat.icon}
                </div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#1A1A1A]/80">{cat.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC FLASH SALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="flash-sale-section">
        <div className="bg-[#1A1A1A] rounded-none p-6 sm:p-10 text-white relative" id="flash-sale-box">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-[#EDE9E3] text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-none border border-white/25">
                <Flame className="w-3.5 h-3.5" /> Hot Drops
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">Summer Flash Drop Is Live</h2>
              <p className="text-[#F9F8F6]/60 text-xs uppercase tracking-wider">Premium hand-picked objects and seasonal garments at compliance value</p>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-3 sm:gap-4" id="countdown-clock">
              <span className="text-[#F9F8F6]/40 text-[10px] tracking-widest font-mono uppercase mr-1">Time Remaining:</span>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-transparent border border-white/30 flex items-center justify-center font-mono font-bold text-lg sm:text-xl text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-[9px] text-[#F9F8F6]/50 font-bold mt-1 uppercase tracking-widest">Hrs</span>
              </div>
              <span className="text-white font-bold text-xl">:</span>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-transparent border border-white/30 flex items-center justify-center font-mono font-bold text-lg sm:text-xl text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-[9px] text-[#F9F8F6]/50 font-bold mt-1 uppercase tracking-widest">Mins</span>
              </div>
              <span className="text-white font-bold text-xl">:</span>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-transparent border border-white/30 flex items-center justify-center font-mono font-bold text-lg sm:text-xl text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-[9px] text-[#F9F8F6]/50 font-bold mt-1 uppercase tracking-widest">Secs</span>
              </div>
            </div>
          </div>

          {/* Flash items products list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
            {hotProducts.slice(0, 3).map((product) => {
              const isWish = isInWishlist(product.id);
              const hasDiscount = !!product.originalPrice;
              const discountPercent = hasDiscount 
                ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
                : 0;

              return (
                <div 
                  key={product.id}
                  className="bg-transparent rounded-none border border-white/10 p-5 relative group hover:border-white/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                      {hasDiscount && (
                        <span className="bg-white text-[#1A1A1A] text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-none">
                          -{discountPercent}%
                        </span>
                      )}
                      <span className="bg-[#EDE9E3] text-[#1A1A1A] text-[8px] font-mono font-bold px-2 py-0.5 rounded-none tracking-widest uppercase">
                        Drop
                      </span>
                    </div>

                    {/* Quick Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-4 right-4 z-10 p-1.5 rounded-none transition-colors cursor-pointer ${isWish ? 'text-white' : 'text-[#F9F8F6]/40 hover:text-white'}`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Image */}
                    <div 
                      onClick={() => navigateTo('product', product.id)}
                      className="aspect-square rounded-none overflow-hidden mb-5 bg-[#1A1A1A] cursor-pointer border border-white/10"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta */}
                    <div className="space-y-1.5 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-[#EDE9E3]/70 font-mono tracking-widest uppercase">{product.subCategory}</span>
                        <div className="flex items-center gap-0.5 text-white/80 text-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-mono text-[10px]">{product.rating}</span>
                        </div>
                      </div>
                      <h3 
                        onClick={() => navigateTo('product', product.id)}
                        className="font-serif italic text-lg text-white hover:opacity-80 transition-opacity cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[#F9F8F6]/60 text-xs line-clamp-2 leading-relaxed">{product.description}</p>
                    </div>
                  </div>

                  {/* Price and Cart */}
                  <div className="flex items-center justify-between gap-2 mt-6 pt-5 border-t border-white/10">
                    <div>
                      <span className="text-base font-bold font-mono text-white">${product.price}</span>
                      {hasDiscount && (
                        <span className="text-xs font-mono text-[#F9F8F6]/40 line-through pl-2">${product.originalPrice}</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="bg-white text-[#1A1A1A] hover:bg-[#EDE9E3] p-2 rounded-none transition-all cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MAIN CURATED PRODUCT GRID (FEATURED PRODUCTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-grid-section">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1 bg-[#EDE9E3]/60 text-[#1A1A1A] text-[10px] px-3.5 py-1 rounded-none font-bold uppercase tracking-[0.2em] border border-[#1A1A1A]/10">
            <Award className="w-3.5 h-3.5" /> Curated Catalog Drops
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] tracking-tight">Our Curated Highlights</h2>
          <p className="text-[#1A1A1A]/60 text-xs max-w-lg mx-auto uppercase tracking-wider font-semibold">Premium wearable hardware, architectural sound design, and custom apparel capsules.</p>
        </div>

        {/* Dynamic Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="home-featured-products-grid">
          {featuredProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            const hasDiscount = !!product.originalPrice;
            const discountPercent = hasDiscount 
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
              : 0;

            return (
              <div 
                key={product.id}
                className="bg-white rounded-none border border-[#1A1A1A]/10 p-4 relative group hover:border-[#1A1A1A] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {hasDiscount && (
                      <span className="bg-[#1A1A1A] text-white text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-none">
                        -{discountPercent}%
                      </span>
                    )}
                    {product.featured && (
                      <span className="bg-[#EDE9E3] text-[#1A1A1A] text-[8px] font-bold px-2 py-0.5 rounded-none uppercase tracking-widest border border-[#1A1A1A]/10">
                        Archive
                      </span>
                    )}
                  </div>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-3 right-3 z-10 p-1.5 rounded-none transition-all cursor-pointer ${isWish ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/30 hover:text-[#1A1A1A]'}`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Image container */}
                  <div 
                    onClick={() => navigateTo('product', product.id)}
                    className="aspect-square rounded-none overflow-hidden mb-4 bg-[#F9F8F6] cursor-pointer border border-[#1A1A1A]/5"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info details */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 font-mono">
                      <span>{product.subCategory}</span>
                      <div className="flex items-center gap-0.5 text-[#1A1A1A]/80">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <h3 
                      onClick={() => navigateTo('product', product.id)}
                      className="font-serif italic text-base text-[#1A1A1A] hover:opacity-60 transition-opacity cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[#1A1A1A]/60 text-xs line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                </div>

                {/* Footer price and actions */}
                <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-[#1A1A1A]/10">
                  <div>
                    <span className="text-base font-bold font-mono text-[#1A1A1A]">${product.price}</span>
                    {hasDiscount && (
                      <span className="text-xs font-mono text-[#1A1A1A]/40 line-through pl-1.5">${product.originalPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-[#1A1A1A] text-[#F9F8F6] hover:bg-neutral-800 p-2 rounded-none transition-all cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SPLIT MARKETING CALL-TO-ACTION PROMOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8" id="marketing-promo-grid">
        {/* Banner 1: Tech Gadget block */}
        <div 
          className="rounded-none p-8 bg-[#1A1A1A] text-white relative overflow-hidden flex flex-col justify-between h-[280px] border border-[#1A1A1A]"
          id="gadget-banner"
        >
          <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden opacity-30 md:opacity-80">
            <img 
              src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80" 
              alt="Gadget Promo" 
              className="w-full h-full object-cover scale-110 -rotate-3 transform origin-bottom-right"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-3 max-w-xs relative z-10 text-left">
            <span className="text-[9px] font-bold tracking-[0.25em] text-[#EDE9E3] uppercase font-mono">DIVISION_01 / TECH</span>
            <h3 className="text-2xl sm:text-3xl font-serif italic leading-tight">Biometric Precision & Studio Acoustics</h3>
            <p className="text-[#F9F8F6]/60 text-xs">Dive into physical health metrics tracking and long-battery studio-tuned active cancellation gear.</p>
          </div>
          <div className="relative z-10 text-left">
            <button 
              onClick={() => { setSelectedCategory('gadget'); setSelectedSubCategory(null); navigateTo('shop'); }}
              className="bg-white text-[#1A1A1A] hover:bg-[#EDE9E3] font-bold text-[10px] tracking-widest uppercase px-5 py-3 rounded-none transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Hardwares</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Banner 2: Clothing Apparel block */}
        <div 
          className="rounded-none p-8 bg-[#EDE9E3] text-[#1A1A1A] relative overflow-hidden flex flex-col justify-between h-[280px] border border-[#1A1A1A]/30"
          id="clothing-banner"
        >
          <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden opacity-30 md:opacity-80">
            <img 
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" 
              alt="Apparel Promo" 
              className="w-full h-full object-cover scale-110 rotate-3 transform origin-bottom-right"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-3 max-w-xs relative z-10 text-left">
            <span className="text-[9px] font-bold tracking-[0.25em] text-[#1A1A1A]/60 uppercase font-mono">DIVISION_02 / GARMENTS</span>
            <h3 className="text-2xl sm:text-3xl font-serif italic leading-tight">Heavy French Terry & Handcrafted Skins</h3>
            <p className="text-[#1A1A1A]/70 text-xs">Experience pure 450gsm combed cotton hoodies, pre-shrunk reactive-dyed washes, and premium leather shells.</p>
          </div>
          <div className="relative z-10 text-left">
            <button 
              onClick={() => { setSelectedCategory('clothing'); setSelectedSubCategory(null); navigateTo('shop'); }}
              className="bg-[#1A1A1A] text-[#F9F8F6] hover:bg-opacity-95 font-bold text-[10px] tracking-widest uppercase px-5 py-3 rounded-none transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Garments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. TRUST STATISTICS / LOGOS */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="trust-logos-strip">
        <div className="bg-[#EDE9E3]/25 rounded-none border border-[#1A1A1A] p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h4 className="text-3xl font-serif italic text-[#1A1A1A]">25,000+</h4>
            <p className="text-[#1A1A1A]/60 text-[9px] font-mono uppercase tracking-widest">Delighted Collective</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-serif italic text-[#1A1A1A]">4.8 / 5.0</h4>
            <p className="text-[#1A1A1A]/60 text-[9px] font-mono uppercase tracking-widest">Verified Index Score</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-serif italic text-[#1A1A1A]">Dhaka</h4>
            <p className="text-[#1A1A1A]/60 text-[9px] font-mono uppercase tracking-widest">Collective Base HQ</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-serif italic text-[#1A1A1A]">24 Hours</h4>
            <p className="text-[#1A1A1A]/60 text-[9px] font-mono uppercase tracking-widest">Mean Dispatch Cycle</p>
          </div>
        </div>
      </section>
    </div>
  );
};
