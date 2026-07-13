import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Trash2, 
  ShoppingBag, 
  ChevronRight, 
  ArrowLeft, 
  Tag, 
  Percent,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Cart: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    navigateTo 
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Apply Coupon Logic
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess(false);

    if (!couponCode.trim()) {
      setCouponError('Please enter a voucher code');
      return;
    }

    const matched = applyCoupon(couponCode);
    if (matched) {
      setCouponSuccess(true);
      setCouponCode('');
    } else {
      setCouponError('Invalid voucher code. Try GIGA20 or WELCOME10.');
    }
  };

  // Pricing calculations
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discount) / 100 : 0;
  // Shipping: free above $150, otherwise flat $10
  const shippingFee = cartSubtotal === 0 ? 0 : cartSubtotal > 150 ? 0 : 10;
  const grandTotal = Math.max(cartSubtotal - discountAmount + shippingFee, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="shopping-cart-page">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 font-mono mb-8" id="cart-breadcrumbs">
        <span className="hover:text-[#1A1A1A]/80 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A1A1A] font-bold">Shopping Cart</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-serif italic text-[#1A1A1A] font-light tracking-tight text-left mb-10 pb-4 border-b border-[#1A1A1A]/20">My Shopping Cart</h1>

      <AnimatePresence mode="wait">
        {cart.length === 0 ? (
          /* EMPTY STATE CARDS */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-[#EDE9E3]/20 rounded-none border border-[#1A1A1A] p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6"
            id="cart-empty-state"
          >
            <div className="w-14 h-14 rounded-none bg-[#F9F8F6] border border-[#1A1A1A] flex items-center justify-center mx-auto text-[#1A1A1A]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif italic text-xl text-[#1A1A1A] font-normal">Your Cart is Currently Empty</h3>
              <p className="text-[#1A1A1A]/70 text-xs leading-relaxed">Looks like you haven't added any gadgets or clothes to your bag yet. Explore our latest drops and fill your wardrobe today.</p>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#1A1A1A] text-[#F9F8F6] hover:bg-opacity-90 text-[10px] tracking-widest uppercase font-bold py-3.5 px-6 rounded-none cursor-pointer border border-[#1A1A1A] transition-all inline-flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back To Shop Catalog</span>
            </button>
          </motion.div>
        ) : (
          /* CART CONTENT */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            id="cart-content-grid"
          >
            {/* A. Left column: Table list of items (8 columns) */}
            <div className="lg:col-span-8 space-y-4" id="cart-items-table">
              {/* Desktop Table Headers */}
              <div className="hidden sm:grid grid-cols-12 gap-4 bg-[#EDE9E3]/40 border-b border-[#1A1A1A] text-[#1A1A1A]/60 font-mono uppercase text-[9px] tracking-widest p-4 text-left font-semibold">
                <span className="col-span-6">Product Details</span>
                <span className="col-span-2 text-center">Unit Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Subtotal</span>
              </div>

              {/* Items feed */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-none border border-[#1A1A1A]/20 p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center text-left relative hover:border-[#1A1A1A]/50 transition-colors"
                  >
                    {/* Image and Meta info (6 columns) */}
                    <div className="sm:col-span-6 flex gap-4 items-center">
                      <div 
                        onClick={() => navigateTo('product', item.product.id)}
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F9F8F6] border border-[#1A1A1A]/10 rounded-none overflow-hidden shrink-0 cursor-pointer"
                      >
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 
                          onClick={() => navigateTo('product', item.product.id)}
                          className="font-serif italic text-base text-[#1A1A1A] hover:opacity-60 transition-opacity cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[9px] text-[#1A1A1A]/50 font-mono uppercase tracking-widest">{item.product.subCategory}</p>
                        
                        {/* Selected variations */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.selectedColor && (
                            <span className="inline-flex items-center gap-1.5 text-[8px] bg-[#EDE9E3]/50 text-[#1A1A1A] px-2 py-0.5 rounded-none font-mono uppercase border border-[#1A1A1A]/10">
                              <span className="w-2 h-2 rounded-full border border-slate-300" style={{ backgroundColor: item.selectedColor.hex }}></span>
                              {item.selectedColor.name}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="inline-flex items-center text-[8px] bg-[#EDE9E3]/50 text-[#1A1A1A] px-2 py-0.5 rounded-none font-mono uppercase border border-[#1A1A1A]/10">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Unit Price (2 columns) */}
                    <div className="sm:col-span-2 text-left sm:text-center">
                      <span className="text-[#1A1A1A]/40 text-[9px] uppercase font-mono tracking-widest sm:hidden block mb-0.5">Price</span>
                      <span className="font-bold text-xs text-[#1A1A1A]/90 font-mono">${item.product.price}</span>
                    </div>

                    {/* Quantity counter (2 columns) */}
                    <div className="sm:col-span-2 flex justify-start sm:justify-center items-center">
                      <span className="text-[#1A1A1A]/40 text-[9px] uppercase font-mono tracking-widest sm:hidden block mr-4">Quantity</span>
                      <div className="flex items-center border border-[#1A1A1A] rounded-none overflow-hidden h-8 bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 text-[#1A1A1A] hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-bold text-xs font-mono text-[#1A1A1A]">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 text-[#1A1A1A] hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Line subtotal (2 columns) */}
                    <div className="sm:col-span-2 text-right flex sm:flex-col justify-between sm:justify-center items-center">
                      <span className="text-[#1A1A1A]/40 text-[9px] uppercase font-mono tracking-widest sm:hidden block">Subtotal</span>
                      <div>
                        <span className="font-bold text-xs text-[#1A1A1A] font-mono block">${(item.product.price * item.quantity).toFixed(2)}</span>
                        {/* Quick remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#1A1A1A]/40 hover:text-red-700 transition-colors p-1 rounded-none hover:bg-red-50 absolute top-2 right-2 sm:static sm:mt-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer actions: Clear cart, Keep Shopping */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] text-[10px] font-bold flex items-center gap-1.5 cursor-pointer uppercase tracking-widest transition-opacity"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>

                <button
                  onClick={clearCart}
                  className="text-[#1A1A1A]/40 hover:text-red-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer uppercase tracking-widest transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Items</span>
                </button>
              </div>
            </div>

            {/* B. Right column: Checkout Summary & Coupons (4 columns) */}
            <div className="lg:col-span-4 space-y-6" id="cart-sidebar">
              {/* Order Invoice summary */}
              <div className="bg-white rounded-none border border-[#1A1A1A] p-5 sm:p-6 text-left space-y-4">
                <h3 className="font-serif italic font-medium text-lg text-[#1A1A1A] pb-3 border-b border-[#1A1A1A]/20">Order Invoice Summary</h3>

                <div className="space-y-3.5 text-xs font-medium text-[#1A1A1A]/70">
                  <div className="flex justify-between items-center">
                    <span>Products Subtotal</span>
                    <span className="text-[#1A1A1A] font-bold font-mono">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {/* Coupon discount details */}
                  <AnimatePresence>
                    {appliedCoupon && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between items-center text-[#1A1A1A] bg-[#EDE9E3]/50 p-2 rounded-none border border-[#1A1A1A]/20 font-mono"
                      >
                        <span className="flex items-center gap-1"><Percent className="w-3.5 h-3.5" /> Coupon ({appliedCoupon.code})</span>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold">-${discountAmount.toFixed(2)}</span>
                          <button onClick={removeCoupon} className="text-red-600 hover:text-red-800 font-bold text-xs cursor-pointer leading-none">×</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center">
                    <span>Simulated Shipping & Handling</span>
                    {shippingFee === 0 ? (
                      <span className="text-[#1A1A1A] font-bold font-mono">FREE SHIPPING</span>
                    ) : (
                      <span className="text-[#1A1A1A] font-bold font-mono">${shippingFee.toFixed(2)}</span>
                    )}
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-[9px] text-[#1A1A1A]/50 -mt-1 tracking-wider uppercase font-mono">Add ${(150 - cartSubtotal).toFixed(2)} more to qualify for FREE shipping!</p>
                  )}
                </div>

                {/* Final Total */}
                <div className="border-t border-[#1A1A1A]/20 pt-4 flex justify-between items-baseline gap-2">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">Estimated Total</span>
                  <span className="text-2xl font-bold font-mono text-[#1A1A1A]">${grandTotal.toFixed(2)}</span>
                </div>

                {/* Proceed checkout trigger button */}
                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full bg-[#1A1A1A] hover:bg-neutral-800 text-[#F9F8F6] font-bold text-[10px] tracking-widest uppercase py-3.5 px-4 rounded-none cursor-pointer transition-all block text-center border border-[#1A1A1A]"
                >
                  Proceed to Secure Checkout
                </button>
              </div>

              {/* Coupon inputs box */}
              <div className="bg-[#EDE9E3]/20 rounded-none border border-[#1A1A1A]/30 p-5 text-left space-y-3.5">
                <span className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest block flex items-center gap-1 font-mono">
                  <Tag className="w-4 h-4" /> Apply Coupon Voucher
                </span>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter GIGA20 or WELCOME10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-[#1A1A1A]/30 text-xs rounded-none py-2 px-3 focus:outline-none focus:border-[#1A1A1A] uppercase font-bold text-[#1A1A1A] font-mono tracking-widest"
                  />
                  <button
                    type="submit"
                    className="bg-[#1A1A1A] hover:bg-opacity-90 text-[#F9F8F6] text-[10px] tracking-widest uppercase font-bold px-4 rounded-none cursor-pointer transition-all border border-[#1A1A1A]"
                  >
                    Apply
                  </button>
                </form>

                {couponError && <p className="text-[10px] text-red-600 font-semibold">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-[#1A1A1A] uppercase tracking-wider text-[9px] font-mono">✓ Coupon applied successfully!</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
