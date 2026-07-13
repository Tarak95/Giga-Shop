import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  ChevronRight, 
  ArrowLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useShop();

  const handleMoveToCart = (item: any) => {
    if (!item.inStock) return;
    addToCart(item, 1);
    toggleWishlist(item); // remove from wishlist after adding to cart
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="wishlist-page">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6" id="wishlist-breadcrumbs">
        <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-bold">Wishlist</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-left mb-8 flex items-center gap-2">
        <Heart className="w-6 h-6 text-rose-500 fill-current" /> My Shopping Wishlist
      </h1>

      <AnimatePresence mode="wait">
        {wishlist.length === 0 ? (
          /* EMPTY STATE CARD */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-sm"
            id="wishlist-empty-state"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400 border border-slate-100 shadow-inner">
              <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-lg">Your Wishlist is Empty</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Save your favorite premium gadgets and fashion apparel items here to keep track of them for later. We'll alert you on price drops!</p>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl cursor-pointer shadow-md transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back To Shop Catalog</span>
            </button>
          </motion.div>
        ) : (
          /* WISHLIST ITEMS GRID */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            id="wishlist-grid"
          >
            {wishlist.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 relative group hover:border-emerald-200 hover:shadow-lg transition-all flex flex-col justify-between text-left shadow-sm"
              >
                <div>
                  {/* Remove Button on corner */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-100/80 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Image container */}
                  <div 
                    onClick={() => navigateTo('product', item.id)}
                    className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info details */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.subCategory}</span>
                    <h3 
                      onClick={() => navigateTo('product', item.id)}
                      className="font-extrabold text-sm text-slate-800 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-[11px] line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Bottom row actions: Price, Move to Cart */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-50">
                  <div>
                    <span className="text-lg font-black text-slate-900">${item.price}</span>
                    <p className={`text-[9px] font-bold ${item.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>

                  {item.inStock ? (
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 hover:scale-105"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-slate-50 text-slate-400 border border-slate-200 font-bold text-[10px] uppercase py-1.5 px-2.5 rounded-lg cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
