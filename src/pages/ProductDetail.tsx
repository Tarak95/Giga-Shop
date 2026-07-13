import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, REVIEWS, Product } from '../data/products';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Check, 
  Truck, 
  RefreshCcw, 
  ShieldCheck, 
  Minus, 
  Plus, 
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetail: React.FC = () => {
  const { 
    selectedProductId, 
    navigateTo, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useShop();

  // Find active product
  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Component UI States
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : undefined);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[1] || product.sizes[0] : undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews'>('features');
  const [cartSuccess, setCartSuccess] = useState(false);

  // Sync state if selected product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(product.colors ? product.colors[0] : undefined);
    setSelectedSize(product.sizes ? product.sizes[1] || product.sizes[0] : undefined);
    setQuantity(1);
  }, [product]);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedColor, selectedSize);
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 3000);
  };

  const isWish = isInWishlist(product.id);
  const hasDiscount = !!product.originalPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
    : 0;

  // Find similar products in same category
  const similarProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in" id="product-detail-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium" id="product-breadcrumbs">
        <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('shop')}>Shop</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-500 font-bold capitalize">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main product presentation splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="product-presentation-grid">
        
        {/* LEFT COLUMN: Image Presentation (5 columns) */}
        <div className="lg:col-span-5 space-y-4" id="product-gallery-section">
          {/* Main big image view */}
          <div className="aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-white relative">
            {hasDiscount && (
              <span className="absolute top-4 left-4 z-10 bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                -{discountPercent}% OFF
              </span>
            )}
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Miniature Thumbnails Rail */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1" id="product-gallery-thumbnails">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-white shrink-0 cursor-pointer transition-all ${activeImage === imgUrl ? 'border-emerald-500 shadow-md shadow-emerald-500/10' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Configurator & Details (7 columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6 text-left" id="product-configurator-section">
          
          {/* Category & Rating */}
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
            <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              {product.subCategory}
            </span>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-bold">
                {product.rating} ({product.reviewCount} customer reviews)
              </span>
            </div>
          </div>

          {/* Product Name & Short Description */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price display */}
          <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Unit Price</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">${product.price}</span>
                {hasDiscount && (
                  <span className="text-sm text-slate-400 line-through font-semibold">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Inventory status */}
            <div className="text-right">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Stock Status</p>
              <p className={`text-xs font-bold mt-1 ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
                {product.inStock ? '● In Stock (Dispatches within 24 Hours)' : '● Out of Stock'}
              </p>
            </div>
          </div>

          {/* Option selectors: Colors & Sizes */}
          <div className="space-y-4 pt-2">
            {/* A. Colors Selectors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2" id="color-selectors">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">
                  Select Color: <strong className="text-slate-800">{selectedColor?.name}</strong>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((colorObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(colorObj)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${selectedColor?.name === colorObj.name ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-transparent'}`}
                      style={{ backgroundColor: colorObj.hex }}
                      title={colorObj.name}
                    >
                      {selectedColor?.name === colorObj.name && (
                        <Check className={`w-4 h-4 ${colorObj.hex === '#FFFFFF' || colorObj.hex === '#F9FAFB' ? 'text-slate-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* B. Sizes Selectors (For Clothing) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2" id="size-selectors">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">
                  Select Size: <strong className="text-slate-800">{selectedSize}</strong>
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {product.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-9 px-3.5 rounded-lg border-2 font-bold cursor-pointer transition-all ${selectedSize === sz ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Increments & Action buy buttons */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-4 border-t border-slate-100">
            {/* Counter */}
            {product.inStock && (
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-extrabold text-slate-800 text-sm font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Add to Cart button */}
            <div className="flex-1 relative flex flex-col justify-center">
              {product.inStock ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 cursor-pointer hover:scale-[1.01]"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>Add to Shopping Cart</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-slate-100 text-slate-400 font-bold py-3.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200"
                >
                  Out Of Stock
                </button>
              )}

              {/* Success badge popup */}
              <AnimatePresence>
                {cartSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-2 px-4 rounded-xl shadow-lg border border-slate-800 flex items-center gap-1.5 whitespace-nowrap z-20"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added {quantity} item(s) to Cart!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add to Wishlist Toggle */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${isWish ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:border-slate-300'}`}
              title="Add to Wishlist"
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Secure Trust Indicators */}
          <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-100 pt-5 text-[10px] sm:text-xs text-slate-500">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Flat Shipping ($10)</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 border-l border-r border-slate-100">
              <RefreshCcw className="w-4 h-4 text-emerald-600" />
              <span>30-Day Easy Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Authenticity</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SPECS AND HIGHLIGHTS TABBED SYSTEM ==================== */}
      <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm" id="specs-highlights-reviews">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          {[
            { id: 'features', label: 'Key Features' },
            { id: 'specs', label: 'Technical Details' },
            { id: 'reviews', label: `Reviews (${product.reviewCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 sm:px-8 py-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === tab.id ? 'border-emerald-500 text-emerald-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8 text-left" id="active-tab-panel">
          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-base text-slate-950">Designed to Excel</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Here are some of the engineered features of this standard product model:</p>
              <ul className="space-y-3">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <h3 className="font-extrabold text-base text-slate-950 mb-4">Complete Specifications</h3>
              <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 text-sm">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 sm:p-4 bg-white hover:bg-slate-50/50 transition-colors">
                    <span className="font-extrabold text-slate-500">{key}</span>
                    <span className="sm:col-span-2 text-slate-700 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8" id="product-reviews-tab">
              {/* Reviews Summary Stats Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-100 items-center">
                <div className="md:col-span-4 text-center space-y-1">
                  <h4 className="text-4xl font-black text-slate-900">{product.rating}</h4>
                  <p className="text-slate-400 text-xs uppercase font-extrabold tracking-widest">Out of 5 Stars</p>
                  <div className="flex justify-center gap-0.5 text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Simulated review score breakdown bars */}
                <div className="md:col-span-8 text-xs font-bold text-slate-600 space-y-2">
                  {[
                    { stars: 5, pct: '82%' },
                    { stars: 4, pct: '12%' },
                    { stars: 3, pct: '4%' },
                    { stars: 2, pct: '1%' },
                    { stars: 1, pct: '1%' }
                  ].map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-3">
                      <span className="w-10 whitespace-nowrap">{bar.stars} Stars</span>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: bar.pct }}></div>
                      </div>
                      <span className="w-8 text-right text-slate-400">{bar.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated Customer list */}
              <div className="space-y-5" id="reviews-feed">
                {REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-5 border-b border-slate-100 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      {/* User metadata */}
                      <div className="flex items-center gap-3">
                        <img 
                          src={rev.userAvatar} 
                          alt={rev.userName} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {rev.userName}
                            {rev.verified && (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                                Verified Buyer
                              </span>
                            )}
                          </h5>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>

                      {/* Score stars */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3.5 h-3.5 ${idx < rev.rating ? 'fill-current' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{rev.comment}</p>

                    <button className="text-slate-400 hover:text-emerald-600 text-xs flex items-center gap-1 cursor-pointer transition-colors pt-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Helpful? Yes (4)</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== SIMILAR PRODUCTS RECOMMENDED ==================== */}
      <section className="space-y-6" id="similar-recommendations">
        <div className="text-left border-b border-slate-100 pb-3">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-6 bg-emerald-500 rounded-full block"></span>
            Similar Products You May Like
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((p) => {
            const isWish = isInWishlist(p.id);
            return (
              <div 
                key={p.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 relative group hover:border-emerald-200 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <button
                    onClick={() => toggleWishlist(p)}
                    className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-all cursor-pointer ${isWish ? 'bg-rose-50 text-rose-600' : 'bg-slate-100/80 text-slate-500 hover:bg-slate-100 hover:text-rose-600'}`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  <div 
                    onClick={() => navigateTo('product', p.id)}
                    className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50 cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{p.subCategory}</span>
                    <h3 
                      onClick={() => navigateTo('product', p.id)}
                      className="font-bold text-sm text-slate-800 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {p.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-50">
                  <span className="text-base font-extrabold text-slate-900">${p.price}</span>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="bg-slate-900 hover:bg-emerald-600 text-white p-2 rounded-xl transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
