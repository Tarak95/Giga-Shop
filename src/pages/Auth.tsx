import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';

export const Auth: React.FC = () => {
  const { signIn, signUp, navigateTo, currentUser } = useShop();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect or show message
  if (currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-[#1A1A1A] text-center space-y-6">
        <div className="w-16 h-16 bg-[#EDE9E3] border border-[#1A1A1A] flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8 text-[#1A1A1A]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif italic text-[#1A1A1A]">আপনি লগইন অবস্থায় আছেন</h2>
          <p className="text-xs text-[#1A1A1A]/70 uppercase tracking-wider">
            You are logged in as <span className="font-bold">{currentUser.fullName}</span> ({currentUser.email})
          </p>
        </div>
        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => navigateTo('dashboard')}
            className="w-full bg-[#1A1A1A] text-white hover:bg-neutral-800 font-bold text-xs uppercase tracking-widest py-3.5 border border-[#1A1A1A] transition-all cursor-pointer"
          >
            ড্যাশবোর্ডে যান / Go to Dashboard
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="w-full bg-transparent text-[#1A1A1A] hover:bg-[#EDE9E3]/40 font-bold text-xs uppercase tracking-widest py-3.5 border border-[#1A1A1A]/30 transition-all cursor-pointer"
          >
            মূল পাতায় ফিরুন / Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const res = signIn(email, password);
        setLoading(false);
        if (res.success) {
          navigateTo('dashboard');
        } else {
          setError(res.error || 'একটি ত্রুটি ঘটেছে।');
        }
      } else {
        if (!fullName.trim()) {
          setError('দয়া করে আপনার পুরো নাম লিখুন।');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('পাসওয়ার্ডটি অন্তত ৬ অক্ষরের হতে হবে।');
          setLoading(false);
          return;
        }
        const res = signUp(email, password, fullName, phone);
        setLoading(false);
        if (res.success) {
          navigateTo('dashboard');
        } else {
          setError(res.error || 'একটি ত্রুটি ঘটেছে।');
        }
      }
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="auth-page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/40 font-mono uppercase tracking-widest mb-8 text-left">
        <span className="hover:text-[#1A1A1A] cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A1A1A] font-bold">{isLogin ? 'Sign In' : 'Sign Up'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Aesthetic brand column */}
        <div className="lg:col-span-5 space-y-8 text-left hidden lg:block">
          <span className="inline-flex items-center gap-1.5 bg-[#EDE9E3]/60 text-[#1A1A1A] text-[10px] px-3.5 py-1 rounded-none font-bold uppercase tracking-[0.2em] border border-[#1A1A1A]/10">
            <Sparkles className="w-3.5 h-3.5" /> GIGASHOP EXCLUSIVE
          </span>
          <h1 className="text-4xl lg:text-5xl font-serif italic tracking-tight font-light leading-[1.2] text-[#1A1A1A]">
            Nexus Collective এ আপনাকে স্বাগতম
          </h1>
          <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans uppercase tracking-wide">
            একটি অ্যাকাউন্ট তৈরি করে আমাদের বিশেষ আর্কাইভ কালেকশন, কুপন ডিসকাউন্ট এবং দ্রুত শিপিং ট্র্যাকিং সুবিধা উপভোগ করুন।
          </p>
          
          <div className="space-y-4 pt-4 border-t border-[#1A1A1A]/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-[#1A1A1A]/20 flex items-center justify-center shrink-0 bg-[#EDE9E3]/20">
                <ShieldCheck className="w-4 h-4 text-[#1A1A1A]" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">১০০% নিরাপদ অ্যাকাউন্ট</h4>
                <p className="text-xs text-[#1A1A1A]/60 mt-0.5">আপনার ব্যক্তিগত ডেটা সম্পূর্ণ নিরাপদ ও বিশ্বস্ত এনক্রিপশনে সংরক্ষিত।</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-[#1A1A1A]/20 flex items-center justify-center shrink-0 bg-[#EDE9E3]/20">
                <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">গোল্ড মেম্বারশিপ অ্যাক্সেস</h4>
                <p className="text-xs text-[#1A1A1A]/60 mt-0.5">প্রথম কেনাকাটাতেই পেয়ে যাবেন বিশেষ মেম্বারশিপ ক্যাটাগরি ও অফার।</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form Container */}
        <div className="lg:col-span-7 max-w-lg w-full mx-auto">
          <div className="bg-white border border-[#1A1A1A] p-6 sm:p-10 shadow-none text-left relative">
            
            {/* Header switcher */}
            <div className="flex border-b border-[#1A1A1A]/10 pb-6 mb-8 gap-6">
              <button
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`text-lg sm:text-xl font-serif italic pb-2 relative cursor-pointer ${isLogin ? 'text-[#1A1A1A] font-bold border-b border-[#1A1A1A]' : 'text-[#1A1A1A]/40'}`}
              >
                সাইন ইন / Sign In
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`text-lg sm:text-xl font-serif italic pb-2 relative cursor-pointer ${!isLogin ? 'text-[#1A1A1A] font-bold border-b border-[#1A1A1A]' : 'text-[#1A1A1A]/40'}`}
              >
                নতুন অ্যাকাউন্ট / Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 text-rose-700 p-4 border border-rose-300 text-xs font-medium mb-6 uppercase tracking-wider"
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name (Only for registration) */}
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                    আপনার নাম / Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="যেমন: কাজী রহমান"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-[#1A1A1A]/30 focus:border-[#1A1A1A] bg-transparent rounded-none px-4 py-3 pl-10 text-xs uppercase tracking-wider focus:outline-none transition-all font-medium"
                    />
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1A1A1A]/50" />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                  ইমেইল ঠিকানা / Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#1A1A1A]/30 focus:border-[#1A1A1A] bg-transparent rounded-none px-4 py-3 pl-10 text-xs focus:outline-none transition-all font-medium"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1A1A1A]/50" />
                </div>
              </div>

              {/* Phone (Only for registration) */}
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                    ফোন নম্বর / Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+৮৮০১৭১১২২৩৩৪৪"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-[#1A1A1A]/30 focus:border-[#1A1A1A] bg-transparent rounded-none px-4 py-3 pl-10 text-xs focus:outline-none transition-all font-medium"
                    />
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1A1A1A]/50" />
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                    পাসওয়ার্ড / Password <span className="text-rose-500">*</span>
                  </label>
                  {isLogin && (
                    <span className="text-[10px] text-[#1A1A1A]/50 hover:text-[#1A1A1A] cursor-pointer underline tracking-wider uppercase">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#1A1A1A]/30 focus:border-[#1A1A1A] bg-transparent rounded-none px-4 py-3 pl-10 pr-10 text-xs focus:outline-none transition-all font-medium"
                  />
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1A1A1A]/50" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-[9px] text-[#1A1A1A]/40 uppercase tracking-widest">কমপক্ষে ৬টি ক্যারেক্টার হতে হবে।</p>
                )}
              </div>

              {/* Terms Checkbox */}
              {!isLogin && (
                <div className="flex items-start gap-2.5 pt-1.5">
                  <input
                    type="checkbox"
                    required
                    id="terms-checkbox"
                    className="mt-0.5 border border-[#1A1A1A]/30 rounded-none bg-transparent accent-[#1A1A1A] w-3.5 h-3.5 cursor-pointer"
                  />
                  <label htmlFor="terms-checkbox" className="text-[10px] leading-tight text-[#1A1A1A]/60 cursor-pointer">
                    আমি <span className="text-[#1A1A1A] font-bold underline">নিয়মাবলী ও শর্তাবলী</span> মেনে নিতে সম্মতি জ্ঞাপন করছি।
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A1A1A] text-white hover:bg-neutral-800 disabled:bg-neutral-500 font-bold text-xs uppercase tracking-widest py-4 border border-[#1A1A1A] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <span>প্রক্রিয়াধীন... / Please Wait...</span>
                ) : (
                  <>
                    <span>{isLogin ? 'লগইন করুন / Sign In Now' : 'অ্যাকাউন্ট তৈরি করুন / Sign Up Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Mode Switcher */}
            <div className="mt-8 text-center border-t border-[#1A1A1A]/10 pt-6">
              <p className="text-xs text-[#1A1A1A]/60 tracking-wider">
                {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতিমধ্যেই অ্যাকাউন্ট রয়েছে?'}
                <button
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(null); }}
                  className="text-[#1A1A1A] font-bold underline pl-1.5 hover:opacity-75 cursor-pointer uppercase text-xs"
                >
                  {isLogin ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}
                </button>
              </p>
            </div>

            {/* Quick Helper Credentials */}
            {isLogin && (
              <div className="mt-6 p-4 bg-[#EDE9E3]/30 border border-[#1A1A1A]/10 text-xs">
                <span className="font-bold text-[9px] uppercase tracking-wider text-[#1A1A1A]/60 block mb-1">ডেমো সাইন ইন ডিটেইলস:</span>
                <p className="font-mono text-[10px] text-[#1A1A1A]/80">Email: <span className="font-bold">kazi@gmail.com</span></p>
                <p className="font-mono text-[10px] text-[#1A1A1A]/80">Password: <span className="font-bold">password123</span></p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
