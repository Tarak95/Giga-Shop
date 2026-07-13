import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Contact: React.FC = () => {
  const { navigateTo } = useShop();

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Collapsible FAQ Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errs.message = 'Message content is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  const faqs = [
    {
      q: 'Are your gadgets and electronics 100% genuine?',
      a: 'Absolutely! All headphones, laptops, smartwatches, and phones at GigaShop are sourced directly from the official brand manufacturers (Sony, Apple, ASUS, etc.). Every purchase carries an official, authentic manufacturer warranty card.'
    },
    {
      q: 'How long does shipping take within Bangladesh?',
      a: 'Orders shipped inside Dhaka typically arrive within 24 to 48 hours. For divisional districts outside Dhaka, delivery usually takes between 2 to 4 working days via our trusted premium shipping courier partners.'
    },
    {
      q: 'What is your product exchange & return policy?',
      a: 'We offer a hassle-free, 30-day return or exchange window. If your product arrives damaged, defective, or incorrect, you can request an instant replacement or a full refund. Items must be in their original packaging with warranty seals intact.'
    },
    {
      q: 'Can I pay with credit card on delivery?',
      a: 'Our Cash on Delivery courier partners accept cash payments upon arrival. If you prefer to pay with credit cards, mobile banking (bKash/Nagad), or PayPal, please complete your secure online transactions during the checkout phase on our website.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in" id="contact-page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium" id="contact-breadcrumbs">
        <span className="hover:text-emerald-600 cursor-pointer" onClick={() => navigateTo('home')}>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-bold">Contact Us & Support</span>
      </div>

      {/* Page header */}
      <div className="text-left space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Get in Touch with Us</h1>
        <p className="text-slate-500 text-sm max-w-xl">Have questions about an order or our premium product drops? Speak directly with our responsive support desk based in Dhaka.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="contact-splits-grid">
        
        {/* LEFT COLUMN: Support Details Card (5 columns) */}
        <div className="lg:col-span-5 space-y-6" id="contact-details-panels">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">Customer Support Desk</h3>

            <div className="space-y-5 text-xs sm:text-sm font-semibold text-slate-600 text-left">
              {/* Telephone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm border border-emerald-100">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Hotline Support</h4>
                  <a href="tel:+8801700000000" className="text-emerald-600 hover:underline block mt-1 font-extrabold text-base">+880 1700-000000</a>
                  <p className="text-slate-400 text-[11px] mt-0.5">Sat to Thu: 10:00 AM - 8:00 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm border border-emerald-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Email Correspondence</h4>
                  <a href="mailto:support@gigashop.com" className="text-emerald-600 hover:underline block mt-1 font-bold">support@gigashop.com</a>
                  <p className="text-slate-400 text-[11px] mt-0.5">For billing and commercial inquiries</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm border border-emerald-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Corporate Headquarters</h4>
                  <p className="text-slate-800 font-bold mt-1">Mirpur DOHS, Dhaka, Bangladesh</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Registered company corporation</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm border border-emerald-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Store Operations Hours</h4>
                  <p className="text-slate-800 font-bold mt-1">Available Online 24 / 7</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Warehouse dispatch centers run daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form Feedback (7 columns) */}
        <div className="lg:col-span-7" id="contact-feedback-panel">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6 text-left">
            <h3 className="font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">Send an Instant Message</h3>

            <AnimatePresence mode="wait">
              {!success ? (
                /* CONTACT FORM */
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleContactSubmit} 
                  className="space-y-4"
                  id="contact-form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${errors.name ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[10px] text-rose-500 font-bold">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-slate-50 border ${errors.email ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800`}
                        placeholder="johndoe@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-rose-500 font-bold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject Inquiry</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800"
                      placeholder="e.g., Order Tracking, Sizing help, Corporate query"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border ${errors.message ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200'} text-xs rounded-lg py-2.5 px-3.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white font-semibold text-slate-800 resize-none`}
                      placeholder="Type your questions or comments here..."
                    ></textarea>
                    {errors.message && <p className="text-[10px] text-rose-500 font-bold">{errors.message}</p>}
                  </div>

                  {/* Submit trigger button */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl cursor-pointer shadow-lg shadow-emerald-50 flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message Inquiry</span>
                  </button>
                </motion.form>
              ) : (
                /* CONTACT SUCCESS CARD */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50/40 rounded-2xl border border-emerald-100 p-8 text-center space-y-4"
                  key="contact-success"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-emerald-850 text-base">Inquiry Successfully Transmitted!</h4>
                    <p className="text-slate-600 text-xs">We have logged your ticket. A professional support representative will review your message and reply via email within 4 to 8 business hours.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ==================== FAQs ACCORDION SYSTEM ==================== */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm text-left space-y-6" id="faqs-accordion-section">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <HelpCircle className="w-5.5 h-5.5 text-emerald-600" />
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto" id="faqs-container">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-100 rounded-xl overflow-hidden shadow-inner bg-slate-50/30"
              >
                {/* FAQ Header Accordion toggle button */}
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 flex justify-between items-center text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-emerald-600 transition-colors cursor-pointer bg-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* FAQ Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-slate-100/60 text-slate-600 text-xs sm:text-sm leading-relaxed text-left bg-slate-50/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
