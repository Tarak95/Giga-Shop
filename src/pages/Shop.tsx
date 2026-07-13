import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, SUB_CATEGORIES, Product } from '../data/products';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  Star, 
  ShoppingBag, 
  Heart, 
  ChevronRight,
  ListFilter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Shop: React.FC = () => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
  } = useShop();

  // Reset all active filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory(null);
    setPriceRange([0, 1500]);
    setSortBy('default');
    setSearchQuery('');
  };

  // Filter products based on active criteria
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDesc = product.description.toLowerCase().includes(query);
      const matchesSubCat = product.subCategory.toLowerCase().includes(query);
      const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
      if (!matchesName && !matchesDesc && !matchesSubCat && !matchesTags) {
        return false;
      }
    }

    // 2. Main Category
    if (selectedCategory !== 'all') {
      if (product.category !== selectedCategory) {
        return false;
      }
    }

    // 3. Sub-Category
    if (selectedSubCategory) {
      if (product.subCategory !== selectedSubCategory) {
        return false;
      }
    }

    // 4. Price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high-low') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // default (natural array sorting)
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="shop-container">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5" id="shop-header-intro">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1.5">
            <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600 font-bold">Shop Store</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {selectedCategory === 'all' ? 'All Curated Store' : selectedCategory === 'gadget' ? 'Gadget & Audio Store' : 'Apparel & Design Store'}
          </h1>
        </div>

        {/* Total stats counters */}
        <p className="text-slate-500 text-xs md:text-sm font-medium">
          Showing <strong className="text-slate-800">{sortedProducts.length}</strong> of {PRODUCTS.length} unique items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="shop-layout-split">
        {/* ==================== SIDEBAR FILTERS ==================== */}
        <aside className="lg:col-span-1 space-y-6" id="shop-sidebar">
          {/* Main Filter card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-600" /> Filter Criteria
              </span>
              <button 
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* A. Search query on sidebar */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type product keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-xs py-2 px-3 pl-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            {/* B. Main Category Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</label>
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'gadget', label: 'Gadget & Tech' },
                  { id: 'clothing', label: 'Clothing & Apparel' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedSubCategory(null);
                    }}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-all font-semibold cursor-pointer ${selectedCategory === cat.id ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* C. Sub-Category Picker */}
            <AnimatePresence mode="wait">
              {selectedCategory !== 'all' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden border-t border-slate-100 pt-4"
                  key={selectedCategory}
                >
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Sub-Category</label>
                  <div className="flex flex-col gap-1 text-xs">
                    <button
                      onClick={() => setSelectedSubCategory(null)}
                      className={`text-left py-1.5 px-2 rounded-md font-semibold cursor-pointer ${selectedSubCategory === null ? 'text-emerald-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      All Sub-Categories
                    </button>
                    {SUB_CATEGORIES[selectedCategory as keyof typeof SUB_CATEGORIES].map((subCat) => (
                      <button
                        key={subCat}
                        onClick={() => setSelectedSubCategory(subCat)}
                        className={`text-left py-1.5 px-2 rounded-md font-semibold cursor-pointer ${selectedSubCategory === subCat ? 'text-emerald-600 font-extrabold pl-3 border-l-2 border-emerald-500' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        {subCat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* D. Price Filter Range */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Price Range ($)</label>
              
              {/* Sliders */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                  <span>Min: ${priceRange[0]}</span>
                  <span>Max: ${priceRange[1]}</span>
                </div>
              </div>

              {/* Direct Input triggers */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Min</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-1.5 rounded"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Max</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Math.max(0, parseInt(e.target.value) || 0)])}
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-1.5 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ==================== PRODUCTS LISTING ==================== */}
        <section className="lg:col-span-3 space-y-6" id="shop-main-catalog">
          {/* Top Sort Controls */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="shop-sorting-actions">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <ListFilter className="w-4 h-4 text-emerald-600" />
              <span>Sorting Criteria:</span>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs py-1.5 px-3 rounded-lg font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="default">Default Match</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filtering badging summary */}
          {(searchQuery || selectedCategory !== 'all' || selectedSubCategory || priceRange[0] > 0 || priceRange[1] < 1500) && (
            <div className="flex flex-wrap items-center gap-2 text-xs" id="active-filter-capsules">
              <span className="text-slate-400 font-bold mr-1 uppercase text-[10px]">Active Filters:</span>
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 font-semibold text-slate-700 flex items-center gap-1.5">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">×</button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 font-semibold text-emerald-700 flex items-center gap-1.5">
                  Department: {selectedCategory === 'gadget' ? 'Gadgets' : 'Apparel'}
                  <button onClick={() => { setSelectedCategory('all'); setSelectedSubCategory(null); }} className="text-emerald-400 hover:text-emerald-600 font-bold cursor-pointer">×</button>
                </span>
              )}
              {selectedSubCategory && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 font-semibold text-emerald-700 flex items-center gap-1.5">
                  Sub-Category: {selectedSubCategory}
                  <button onClick={() => setSelectedSubCategory(null)} className="text-emerald-400 hover:text-emerald-600 font-bold cursor-pointer">×</button>
                </span>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 font-semibold text-slate-700 flex items-center gap-1.5">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button onClick={() => setPriceRange([0, 1500])} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">×</button>
                </span>
              )}
            </div>
          )}

          {/* Catalog products catalog listing */}
          <AnimatePresence mode="popLayout">
            {sortedProducts.length === 0 ? (
              /* EMPTY FILTER STATE */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-dashed border-slate-200 py-16 px-4 text-center max-w-lg mx-auto space-y-4"
                id="shop-empty-state"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base">No Matching Products Found</h3>
                  <p className="text-slate-500 text-xs">We couldn't find any results matches your queries. Try adjusting your sidebar sliders or changing filters.</p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer shadow-md transition-colors"
                >
                  Clear All Filters & Reset
                </button>
              </motion.div>
            ) : (
              /* PRODUCTS CATALOG GRID */
              <motion.div 
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                id="shop-products-grid"
              >
                {sortedProducts.map((product) => {
                  const isWish = isInWishlist(product.id);
                  const hasDiscount = !!product.originalPrice;
                  const discountPercent = hasDiscount 
                    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
                    : 0;

                  return (
                    <motion.div
                      layout
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-100 p-4 relative group hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Badges */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                          {hasDiscount && (
                            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                              -{discountPercent}%
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="bg-slate-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Sold Out
                            </span>
                          )}
                        </div>

                        {/* Wishlist toggle */}
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-all cursor-pointer ${isWish ? 'bg-rose-50 text-rose-600 shadow-md shadow-rose-200' : 'bg-slate-100/80 text-slate-500 hover:bg-slate-100 hover:text-rose-600'}`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>

                        {/* Image container */}
                        <div 
                          onClick={() => navigateTo('product', product.id)}
                          className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50 cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!product.inStock ? 'opacity-50 grayscale' : ''}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Info details */}
                        <div className="space-y-1.5 text-left">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <span>{product.subCategory}</span>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                          <h3 
                            onClick={() => navigateTo('product', product.id)}
                            className="font-extrabold text-sm text-slate-800 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h3>
                          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{product.description}</p>
                        </div>
                      </div>

                      {/* Footer price and actions */}
                      <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-50">
                        <div>
                          <span className="text-lg font-black text-slate-900">${product.price}</span>
                          {hasDiscount && (
                            <span className="text-xs text-slate-400 line-through pl-1.5">${product.originalPrice}</span>
                          )}
                        </div>

                        {product.inStock ? (
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="bg-slate-900 hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-all cursor-pointer hover:scale-105 hover:shadow-md hover:shadow-emerald-200"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold uppercase py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-md">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};
