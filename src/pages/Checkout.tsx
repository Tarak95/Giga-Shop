import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ChevronRight, 
  ArrowLeft, 
  CreditCard, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Truck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Checkout: React.FC = () => {
  const { cart, appliedCoupon, placeOrder, navigateTo, currentUser } = useShop();

  // Form Inputs State
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || 'Kazi Rahman',
    email: currentUser?.email || 'kazi@gmail.com',
    address: 'Avenue 4, Mirpur DOHS',
    city: 'Dhaka',
    zipCode: '1216',
    phone: currentUser?.phone || '+8801711223344',
    paymentMethod: 'credit-card'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [placedOrderDetails, setPlacedOrderDetails] = useState<any | null>(null);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discount) / 100 : 0;
  const shippingFee = cartSubtotal === 0 ? 0 : cartSubtotal > 150 ? 0 : 10;
  const grandTotal = Math.max(cartSubtotal - discountAmount + shippingFee, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City location is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP postal code is required';
    if (!formData.phone.trim()) errors.phone = 'Mobile contact is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Trigger context place order
    const completedOrderObj = placeOrder({
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod === 'credit-card' ? 'Credit Card' : formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'
    });

    setPlacedOrderDetails(completedOrderObj);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="checkout-page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-6" id="checkout-breadcrumbs">
        <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('cart')}>Cart</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-bold">Checkout</span>
      </div>

      <AnimatePresence mode="wait">
        {!placedOrderDetails ? (
          /* ==================== ACTIVE CHECKOUT FLOW FORM ==================== */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
            key="checkout-form"
          >
            {/* Left Col: Billing & Payment forms (8 columns) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <MapPin className="w-5.5 h-5.5 text-emerald-600" /> Shipping & Delivery Information
                </h2>

                <form onSubmit={handlePlaceOrderSubmit} className="space-y-4" id="shipping-details-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${formErrors.fullName ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                        placeholder="John Doe"
                      />
                      {formErrors.fullName && <p className="text-[10px] text-rose-500 font-bold">{formErrors.fullName}</p>}
                    </div>

                    {/* Email address */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${formErrors.email ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                        placeholder="johndoe@example.com"
                      />
                      {formErrors.email && <p className="text-[10px] text-rose-500 font-bold">{formErrors.email}</p>}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border ${formErrors.address ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                      placeholder="123 Street Name, Apartment, Suite"
                    />
                    {formErrors.address && <p className="text-[10px] text-rose-500 font-bold">{formErrors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* City */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${formErrors.city ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                        placeholder="Dhaka"
                      />
                      {formErrors.city && <p className="text-[10px] text-rose-500 font-bold">{formErrors.city}</p>}
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${formErrors.zipCode ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                        placeholder="1216"
                      />
                      {formErrors.zipCode && <p className="text-[10px] text-rose-500 font-bold">{formErrors.zipCode}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Contact
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${formErrors.phone ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                        placeholder="+8801700-000000"
                      />
                      {formErrors.phone && <p className="text-[10px] text-rose-500 font-bold">{formErrors.phone}</p>}
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment selector block */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <CreditCard className="w-5.5 h-5.5 text-emerald-600" /> Payment Guarantee Selection
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { id: 'credit-card', title: 'Credit / Debit Card', desc: 'Secure encryption' },
                    { id: 'paypal', title: 'PayPal Checkout', desc: 'Instant authorization' },
                    { id: 'cod', title: 'Cash on Delivery', desc: 'Bangladesh standard' }
                  ].map((pay) => (
                    <div
                      key={pay.id}
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: pay.id }))}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.paymentMethod === pay.id ? 'border-emerald-500 bg-emerald-50/10 shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <input
                        type="radio"
                        checked={formData.paymentMethod === pay.id}
                        onChange={() => {}}
                        className="accent-emerald-600 float-right mt-1 cursor-pointer"
                      />
                      <h4 className="font-extrabold text-xs text-slate-800">{pay.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{pay.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Invoice recap and final order (4 columns) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" /> Order Review ({cart.length} items)
                </h3>

                {/* Items preview list */}
                <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center text-xs">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-10 h-10 object-cover rounded bg-slate-50 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 text-left">
                        <h4 className="font-extrabold text-slate-800 line-clamp-1">{item.product.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold">Qty: {item.quantity} {item.selectedSize ? `| Size: ${item.selectedSize}` : ''}</p>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-slate-100 pt-4 space-y-2 text-xs font-semibold text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>Products Subtotal</span>
                    <span className="text-slate-900 font-bold">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-emerald-600 font-bold">
                      <span>Voucher Discount ({appliedCoupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Simulated Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-black">FREE SHIPPING</span>
                    ) : (
                      <span className="text-slate-900 font-bold">${shippingFee.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline gap-2 text-sm font-black text-slate-900 border-t border-slate-100 pt-3">
                    <span>Final Amount</span>
                    <span className="text-xl font-black">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="submit"
                  form="shipping-details-form"
                  onClick={handlePlaceOrderSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 px-4 rounded-xl cursor-pointer shadow-lg shadow-emerald-50 text-center flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>Place Simulated Order</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('cart')}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold text-center block w-full mt-2 hover:underline"
                >
                  Modify Items inside Cart
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ==================== POST-PURCHASE SUCCESS ANIMATED SCREEN ==================== */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-md"
            key="checkout-success"
          >
            {/* Green tick banner */}
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">Simulated Purchase Success</span>
              <h2 className="text-2xl font-extrabold text-slate-900">Thank You for Your GigaShop Order!</h2>
              <p className="text-slate-500 text-xs sm:text-sm">We have successfully accepted your transaction. Your order invoice and tracking numbers have been registered in your account logs.</p>
            </div>

            {/* Order specs capsule */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-left text-xs space-y-2.5 font-semibold text-slate-600">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                <span className="font-bold">Simulated Order ID</span>
                <span className="text-slate-900 font-black font-mono">{placedOrderDetails.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-emerald-600" /> Estimated Dispatch Date</span>
                <span className="text-slate-900 font-extrabold">Within 24 Hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-emerald-600" /> Delivery Address</span>
                <span className="text-slate-900 font-extrabold text-right max-w-xs truncate">{placedOrderDetails.shippingDetails.address}, {placedOrderDetails.shippingDetails.city}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 font-black text-sm text-slate-900">
                <span>Final Amount Charged</span>
                <span className="text-emerald-600 text-base font-black">${placedOrderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center">
              <button
                onClick={() => navigateTo('dashboard')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 px-6 rounded-xl cursor-pointer shadow-md transition-colors"
              >
                Track Order on User Dashboard
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-6 rounded-xl cursor-pointer shadow-md transition-colors"
              >
                Go back to Homepage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
