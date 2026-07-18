import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon, PRODUCTS } from '../data/products';

export interface CartItem {
  id: string;                             // unique item id based on product id + color + size
  product: Product;
  quantity: number;
  selectedColor?: { name: string; hex: string };
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
  shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
    paymentMethod: string;
  };
}

export interface UserProfile {
  email: string;
  fullName: string;
  phone?: string;
  membership: 'Gold VIP Member' | 'Silver Member' | 'Regular Member';
  signupDate: string;
}

export type ScreenType = 'home' | 'shop' | 'product' | 'cart' | 'wishlist' | 'checkout' | 'dashboard' | 'contact' | 'auth';

interface ShopContextType {
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType, productId?: string | null) => void;
  selectedProductId: string | null;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: { name: string; hex: string }, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  placeOrder: (shippingDetails: Order['shippingDetails']) => Order;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  // Auth additions
  currentUser: UserProfile | null;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (email: string, password: string, fullName: string, phone?: string) => { success: boolean; error?: string };
  signOut: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart, Wishlist, Orders States loaded from localStorage (with fallbacks)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('giga_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('giga_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('giga_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortBy, setSortBy] = useState('default');

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('giga_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState<{ [email: string]: { password: string; profile: UserProfile } }>(() => {
    try {
      const saved = localStorage.getItem('giga_users_db');
      if (saved) return JSON.parse(saved);
      const initialDb = {
        'kazi@gmail.com': {
          password: 'password123',
          profile: {
            email: 'kazi@gmail.com',
            fullName: 'Kazi Rahman',
            phone: '+8801711223344',
            membership: 'Gold VIP Member' as const,
            signupDate: 'July 2024'
          }
        }
      };
      localStorage.setItem('giga_users_db', JSON.stringify(initialDb));
      return initialDb;
    } catch {
      return {};
    }
  });

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('giga_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('giga_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('giga_users_db', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('giga_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('giga_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('giga_orders', JSON.stringify(orders));
  }, [orders]);

  // Navigate function
  const navigateTo = (screen: ScreenType, productId: string | null = null) => {
    setCurrentScreen(screen);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    // Scroll to top of window on screen change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart with color and size variation
  const addToCart = (
    product: Product,
    quantity: number = 1,
    color?: { name: string; hex: string },
    size?: string
  ) => {
    setCart((prevCart) => {
      // Create a unique cart item ID based on product, color, and size
      const colorSuffix = color ? `-${color.name.replace(/\s+/g, '')}` : '';
      const sizeSuffix = size ? `-${size}` : '';
      const cartItemId = `${product.id}${colorSuffix}${sizeSuffix}`;

      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist toggle
  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyIn = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyIn) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Coupon System
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', discount: 10, description: '10% New User Discount' });
      return true;
    } else if (cleanCode === 'GIGA20') {
      setAppliedCoupon({ code: 'GIGA20', discount: 20, description: '20% Summer Coupon' });
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', discount: 5, description: 'Free Shipping Credit ($5)' });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Place Order Simulation
  const placeOrder = (shippingDetails: Order['shippingDetails']) => {
    // calculate total cart cost
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
    const finalTotal = Math.max(subtotal - discountAmount + 10, 0);              // +10 flat simulated shipping fee

    const newOrder: Order = {
      id: `GIGA-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Processing',
      total: finalTotal,
      items: [...cart],
      shippingDetails
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  };

  const signIn = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users[cleanEmail];
    if (!user) {
      return { success: false, error: 'We couldn t find an account. Please sign up.' };
    }
    if (user.password !== password) {
      return { success: false, error: 'Wrong password. Please try again.' };
    }
    setCurrentUser(user.profile);
    return { success: true };
  };

  const signUp = (email: string, password: string, fullName: string, phone?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (users[cleanEmail]) {
      return { success: false, error: 'This email is already registered.' };
    }
    
    const newProfile: UserProfile = {
      email: cleanEmail,
      fullName: fullName.trim(),
      phone: phone || '',
      membership: 'Regular Member',
      signupDate: new Date().toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' })
    };

    setUsers(prev => ({
      ...prev,
      [cleanEmail]: {
        password: password,
        profile: newProfile
      }
    }));

    setCurrentUser(newProfile);
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  return (
    <ShopContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedProductId,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        currentUser,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
