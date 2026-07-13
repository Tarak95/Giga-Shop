import React, { useState } from 'react';
import { useShop, Order } from '../context/ShopContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Award, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Package,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { orders, wishlist, navigateTo, currentUser, signOut } = useShop();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const getInitials = (name: string) => {
    if (!name) return 'KR';
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Calculate shopper stats
  const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);
  const totalItemsCount = orders.reduce(
    (acc, order) => acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="dashboard-page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium" id="dashboard-breadcrumbs">
        <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-bold">My Account Dashboard</span>
      </div>

      {/* 1. SHOPPER PROFILE BANNER */}
      <section className="bg-slate-900 rounded-none p-6 sm:p-8 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6" id="dashboard-shopper-banner">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="flex items-center gap-4 text-left">
          <div className="w-16 h-16 rounded-none bg-emerald-600 border border-emerald-400 flex items-center justify-center font-black text-2xl text-white shadow-md uppercase">
            {getInitials(currentUser?.fullName || 'Kazi Rahman')}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif italic font-light">{currentUser?.fullName || 'Kazi Rahman'}</h2>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded-none uppercase flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-400" /> {currentUser?.membership || 'Gold VIP Member'}
              </span>
            </div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Shopper account logs since {currentUser?.signupDate || 'July 2024'}</p>
          </div>
        </div>

        {/* Quick details & Logout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs" id="dashboard-banner-contacts">
          <div className="space-y-1.5 text-left">
            <p className="flex items-center gap-1.5 text-slate-300"><Mail className="w-4 h-4 text-emerald-500" /> {currentUser?.email || 'kazi@gmail.com'}</p>
            <p className="flex items-center gap-1.5 text-slate-300"><Phone className="w-4 h-4 text-emerald-500" /> {currentUser?.phone || '+8801711223344'}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-white text-slate-900 hover:bg-slate-100 text-[10px] tracking-widest uppercase font-bold py-2 px-4 rounded-none transition-colors cursor-pointer border border-white"
          >
            লগ আউট / Sign Out
          </button>
        </div>
      </section>

      {/* 2. ANALYTICS STATS CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="dashboard-analytics-grid">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-left flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Spent (USD)</span>
            <span className="text-2xl font-black text-slate-900">${totalSpent.toFixed(2)}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-left flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Orders</span>
            <span className="text-2xl font-black text-slate-900">{orders.length} orders</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-left flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">My Saved Wishlist</span>
            <span className="text-2xl font-black text-slate-900">{wishlist.length} items</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* 3. ORDER HISTORY & LIVE SHIPMENT TRACKING */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-left" id="dashboard-order-history-box">
        <div className="pb-4 border-b border-slate-100 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Registered Order Log History</h3>
            <p className="text-slate-500 text-xs mt-0.5">Click any order line below to track real-time dispatches and inspect invoices</p>
          </div>
          <button 
            onClick={() => navigateTo('shop')}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Start New Purchase
          </button>
        </div>

        <AnimatePresence mode="wait">
          {orders.length === 0 ? (
            /* EMPTY HISTORY VIEW */
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-12 text-center max-w-sm mx-auto space-y-4"
              id="dashboard-empty-orders"
            >
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">No Purchase Orders Recorded</h4>
                <p className="text-slate-500 text-xs">You have not completed any checkouts on this session yet. Go to shop and complete mock purchases to verify dashboards.</p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl cursor-pointer shadow-md inline-block"
              >
                Go to Shop Store
              </button>
            </motion.div>
          ) : (
            /* ORDERS ACCORDION LIST */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden"
              id="dashboard-orders-accordion"
            >
              {orders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                
                return (
                  <div key={order.id} className="bg-white">
                    {/* Header line click bar */}
                    <div
                      onClick={() => toggleOrderExpand(order.id)}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 text-xs font-bold">
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Order ID</p>
                          <p className="text-slate-900 font-mono text-sm font-black mt-0.5">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Date Logged</p>
                          <p className="text-slate-700 mt-0.5 font-semibold">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Checkout Total</p>
                          <p className="text-emerald-600 mt-0.5 font-black text-sm">${order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Status indicator badge */}
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5" />
                          {order.status}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Expandable sub-area details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                        >
                          <div className="p-4 sm:p-6 space-y-6 text-sm">
                            {/* A. Shipment Tracker progress bar */}
                            <div className="space-y-4">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Live Dispatch Tracker</span>
                              
                              <div className="relative pt-2 pb-6">
                                {/* Horizontal timeline bar line */}
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 rounded"></div>
                                <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-emerald-500 -translate-y-1/2 rounded"></div>

                                {/* Tracking dots */}
                                <div className="relative flex justify-between text-[10px] sm:text-xs font-bold text-slate-500 z-10">
                                  {/* Step 1: Placed */}
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white shadow-sm mb-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-slate-800 font-extrabold">Order Placed</span>
                                    <span className="text-[9px] text-slate-400 font-medium">Completed</span>
                                  </div>

                                  {/* Step 2: Processing */}
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white shadow-sm mb-1.5 animate-pulse">
                                      <Package className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-emerald-600 font-black">Processing</span>
                                    <span className="text-[9px] text-slate-400 font-medium">Active Warehouse</span>
                                  </div>

                                  {/* Step 3: Shipped */}
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm mb-1.5">
                                      <Package className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-slate-400 font-medium">Shipped Out</span>
                                    <span className="text-[9px] text-slate-400 font-medium">Pending Carrier</span>
                                  </div>

                                  {/* Step 4: Arrived */}
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm mb-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-slate-400 font-medium">Delivered</span>
                                    <span className="text-[9px] text-slate-400 font-medium">Pending Transit</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* B. Billing / shipping details card & items lists */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                              
                              {/* Left detail card: items list */}
                              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm text-left">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Purchased Items Details</span>
                                <div className="space-y-3">
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-center text-xs">
                                      <img 
                                        src={item.product.image} 
                                        alt={item.product.name} 
                                        className="w-10 h-10 object-cover rounded bg-slate-50 border border-slate-100 shrink-0"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="flex-1">
                                        <h4 className="font-extrabold text-slate-800 line-clamp-1">{item.product.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold">
                                          Qty: {item.quantity} 
                                          {item.selectedSize ? ` | Size: ${item.selectedSize}` : ''}
                                          {item.selectedColor ? ` | Color: ${item.selectedColor.name}` : ''}
                                        </p>
                                      </div>
                                      <span className="font-black text-slate-900 shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right detail card: Shipping specs */}
                              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm text-left text-xs font-semibold text-slate-600">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Shipping & Billing Summary</span>
                                <div className="space-y-2">
                                  <p className="flex items-center gap-2"><User className="w-4 h-4 text-emerald-600 shrink-0" /> <span className="text-slate-800 font-bold">{order.shippingDetails.fullName}</span></p>
                                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600 shrink-0" /> <span className="text-slate-800 font-semibold">{order.shippingDetails.address}, {order.shippingDetails.city} (ZIP: {order.shippingDetails.zipCode})</span></p>
                                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-600 shrink-0" /> <span className="text-slate-800 font-semibold">{order.shippingDetails.phone}</span></p>
                                  <p className="flex items-center gap-2 border-t border-slate-100 pt-2"><span className="font-bold">Payment Method:</span> <span className="text-emerald-600 font-bold">{order.shippingDetails.paymentMethod}</span></p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
