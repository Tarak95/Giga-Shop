export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'gadget' | 'clothing';
  subCategory: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  inStock: boolean;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  featured?: boolean;
  hot?: boolean;
  tags: string[];
}

export interface Coupon {
  code: string;
  discount: number; // Percentage, e.g. 15 for 15%
  description: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 12 },
  { id: 'gadget', name: 'Gadgets & Tech', count: 6, banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80' },
  { id: 'clothing', name: 'Clothing & Fashion', count: 6, banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80' }
];

export const SUB_CATEGORIES = {
  gadget: ['Smartphones', 'Audio', 'Wearables', 'Computing'],
  clothing: ['Jackets & Coats', 'Hoodies & Sweats', 'Footwear', 'Activewear']
};

export const PRODUCTS: Product[] = [
  {
    id: 'g-1',
    name: 'AeroSound Pro ANC Headphones',
    price: 249,
    originalPrice: 299,
    category: 'gadget',
    subCategory: 'Audio',
    rating: 4.8,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80'
    ],
    description: 'Experience absolute silence and high-fidelity sound. The AeroSound Pro features hybrid active noise cancellation, custom-designed 40mm dynamic drivers, and up to 50 hours of wireless playback on a single charge. Soft memory-foam ear cushions and an adjustable headband ensure luxurious comfort for extended listening sessions.',
    features: [
      'Hybrid Active Noise Cancellation (ANC) up to 40dB',
      'High-Resolution Audio certified with LDAC support',
      '50-hour battery life with Fast Charging (5 mins = 4 hours)',
      'Multi-point bluetooth connection for seamless pairing',
      'Crystal clear calls with quad-microphones & AI noise reduction'
    ],
    specs: {
      'Driver Size': '40mm Dynamic',
      'Frequency Response': '4Hz - 40,000Hz',
      'Bluetooth Version': '5.3',
      'Battery Life': 'Up to 50 hours (ANC Off), 38 hours (ANC On)',
      'Charging Port': 'USB Type-C',
      'Weight': '250g'
    },
    inStock: true,
    colors: [
      { name: 'Matte Black', hex: '#111827' },
      { name: 'Platinum Silver', hex: '#D1D5DB' },
      { name: 'Midnight Navy', hex: '#1E3A8A' }
    ],
    featured: true,
    hot: true,
    tags: ['Best Seller', 'ANC', 'Audio', 'Premium']
  },
  {
    id: 'g-2',
    name: 'Titanium Chrono Smartwatch Ultra',
    price: 399,
    category: 'gadget',
    subCategory: 'Wearables',
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=600&q=80'
    ],
    description: 'Built for extreme environments and daily luxury. Crafted with an aerospace-grade titanium case and scratch-resistant sapphire crystal glass. Features advanced GPS tracking, real-time vital metrics monitor (including ECG, SpO2, and continuous heart rate), and water resistance up to 100 meters. Always-on LTPO AMOLED display with customizable dials.',
    features: [
      'Aerospace-Grade Titanium Case & Sapphire Crystal Glass',
      'Dual-frequency GPS with precision path mapping',
      '14-day battery life on a single charge',
      'Full health suite: SpO2, ECG, Sleep tracker & Stress monitor',
      'Water resistant up to 10ATM (100 Meters)'
    ],
    specs: {
      'Display': '1.96" Always-On LTPO AMOLED',
      'Case Size': '49mm Titanium',
      'Connectivity': 'Bluetooth 5.2, Wi-Fi, NFC',
      'Sensors': 'Optical HR, SpO2, Barometer, Gyroscope',
      'Battery Capacity': '540mAh',
      'OS Compatibility': 'iOS & Android'
    },
    inStock: true,
    colors: [
      { name: 'Titanium Gray', hex: '#6B7280' },
      { name: 'Carbon Black', hex: '#1F2937' },
      { name: 'Safety Orange', hex: '#F97316' }
    ],
    featured: true,
    tags: ['Fitness', 'Titanium', 'Waterproof']
  },
  {
    id: 'g-3',
    name: 'X-Pro 5G Cinematic Smartphone',
    price: 899,
    originalPrice: 999,
    category: 'gadget',
    subCategory: 'Smartphones',
    rating: 4.7,
    reviewCount: 204,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'
    ],
    description: 'Redefine mobile photography. Powered by the latest octa-core AI-focused processor with an advanced triple lens system (200MP Main, 48MP Ultrawide, and 12MP Telephoto with 5x optical zoom). Beautiful 6.7" Dynamic Fluid AMOLED screen with 120Hz refresh rate and a massive 5000mAh battery that supports 80W rapid charging.',
    features: [
      '200MP Triple AI Camera with Super Night Mode',
      '6.7-inch Fluid AMOLED Display with HDR10+ and 120Hz',
      '80W wired charging (100% in 25 minutes)',
      'IP68 certified water and dust resistance',
      'Next-gen AI integrated chip with 12GB RAM'
    ],
    specs: {
      'Processor': 'Octa-core AI 4nm platform',
      'RAM / Storage': '12GB LPDDR5X / 256GB UFS 4.0',
      'Main Camera': '200MP + 48MP + 12MP (OIS)',
      'Front Camera': '32MP Autofocus',
      'Battery': '5000mAh with 80W SuperVOOC',
      'Security': 'In-display ultrasonic fingerprint'
    },
    inStock: true,
    colors: [
      { name: 'Cosmic Violet', hex: '#4C1D95' },
      { name: 'Sleek Silver', hex: '#E5E7EB' },
      { name: 'Obsidian Black', hex: '#111827' }
    ],
    featured: false,
    tags: ['Camera King', '120Hz', '5G']
  },
  {
    id: 'g-4',
    name: 'ZenBook Slim 14 Laptop',
    price: 1199,
    originalPrice: 1299,
    category: 'gadget',
    subCategory: 'Computing',
    rating: 4.8,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
      'https://images.unsplash.com/photo-1496181130204-755241544e35?w=600&q=80'
    ],
    description: 'Powerful, light, and incredibly stylish. At just 1.1kg and 13.9mm thin, the ZenBook Slim 14 is the ultimate portable productivity workstation. Features a gorgeous 2.8K OLED screen with 100% DCI-P3 color gamut, powered by a high-efficiency processor with smart thermal design and an all-day 75Wh battery.',
    features: [
      'Ultra-thin 13.9mm full-metal aerospace alloy body',
      '14-inch 2.8K (2880x1800) OLED Display',
      '16GB Dual-Channel RAM & 1TB PCIe NVMe SSD',
      'Backlit keyboard with ergo-lift hinge design',
      'Full I/O: Thunderbolt 4, HDMI 2.1, USB-A & Card Reader'
    ],
    specs: {
      'CPU': 'Latest high-efficiency 12-core processor',
      'Graphics': 'Integrated UHD AI Graphics',
      'Display': '14" OLED 90Hz, 550 nits peak',
      'Battery': '75Wh (Up to 15 hours battery)',
      'Weight': '1.13 kg',
      'OS': 'Windows 11 Home'
    },
    inStock: true,
    colors: [
      { name: 'Ponder Blue', hex: '#1E293B' },
      { name: 'Pine Grey', hex: '#4B5563' }
    ],
    featured: true,
    tags: ['Ultra Light', 'OLED', 'Workstation']
  },
  {
    id: 'g-5',
    name: 'Lumina Smart Home Speaker',
    price: 129,
    category: 'gadget',
    subCategory: 'Audio',
    rating: 4.6,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80'
    ],
    description: 'Elevate your home audio. The Lumina Smart Speaker delivers filling 360-degree high-fidelity sound with deep bass and clear vocals. Features integrated voice-assistant, touch-sensitive top controls, and ambient responsive LED light ring that syncs with your music or changes based on status alerts.',
    features: [
      '360-degree omnidirectional acoustics with passive radiators',
      'Dual voice-assistants with far-field microphone array',
      'Dynamic RGB ambient halo lighting',
      'Wi-Fi streaming, AirPlay 2, and Spotify Connect support',
      'Multi-room audio linking with additional Lumina speakers'
    ],
    specs: {
      'Amplifier': 'Class D 30W Woofer & 10W Tweeter',
      'Microphones': '4-Microphone far-field system',
      'Connectivity': 'Dual-band Wi-Fi, Bluetooth 5.0',
      'Dimensions': '115mm x 115mm x 150mm',
      'Weight': '850g',
      'Power Source': 'AC Adapter (24V)'
    },
    inStock: true,
    colors: [
      { name: 'Charcoal Black', hex: '#1F2937' },
      { name: 'Chalk White', hex: '#F3F4F6' },
      { name: 'Sage Green', hex: '#86EFAC' }
    ],
    featured: false,
    tags: ['Smart Home', '360 Sound', 'Ambient']
  },
  {
    id: 'g-6',
    name: 'PulseBuds Compact True Wireless',
    price: 89,
    originalPrice: 119,
    category: 'gadget',
    subCategory: 'Audio',
    rating: 4.5,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&q=80'
    ],
    description: 'Incredible sound inside an ultra-compact body. PulseBuds offer active-fit ergonomics, robust sweat-proofing, and deep punchy bass. Features responsive full tap touch controls, auto-pause/play sensors, and a sleek modern carrying case that supports wireless Qi charging.',
    features: [
      'Ergonomic featherlight design (only 3.8g per earbud)',
      'IPX7 sweat and heavy rain proofing',
      '8 hours playtime + 24 hours extra with pocket-sized charging case',
      'Intelligent tap control with volume adjustment',
      'Low latency gaming mode (60ms lag)'
    ],
    specs: {
      'Drivers': '6mm Custom Neodymium',
      'Latency': '60ms in Game Mode',
      'Waterproof Rating': 'IPX7',
      'Bluetooth': 'v5.3 with AAC/SBC codecs',
      'Charging Case': 'USB-C & Qi Wireless compatible',
      'Total Playtime': '32 Hours'
    },
    inStock: false,
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Matte Onyx', hex: '#1F2937' }
    ],
    featured: false,
    tags: ['Sports', 'Pocket Size', 'IPX7']
  },

  // CLOTHING CATEGORY
  {
    id: 'c-1',
    name: 'Premium Leather Moto Biker Jacket',
    price: 189,
    originalPrice: 249,
    category: 'clothing',
    subCategory: 'Jackets & Coats',
    rating: 4.9,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5bab3?w=600&q=80'
    ],
    description: 'An timeless masterpiece. Tailored from premium, supple full-grain genuine leather that develops a beautiful unique patina over time. Features professional asymmetric metal zippers, padded shoulder channels, classic lapels with snaps, and multiple functional utility pockets. Styled with premium heavy satin interior lining.',
    features: [
      '100% full-grain genuine cowhide leather',
      'Smooth, high-end satin interior lining',
      'YKK heavy-duty rustproof chrome zippers',
      'Classic snap lapels and adjustable waist buckle straps',
      'Internal secure pocket for phone or cards'
    ],
    specs: {
      'Material': '100% Premium Full-Grain Leather',
      'Lining': '100% Polyester Satin',
      'Fit': 'Slim Biker Cut',
      'Care': 'Professional Leather Clean Only',
      'Thickness': 'Medium-heavy weight'
    },
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Heritage Black', hex: '#111827' },
      { name: 'Rustic Brown', hex: '#78350F' }
    ],
    featured: true,
    hot: true,
    tags: ['Genuine Leather', 'Timeless', 'Handcrafted']
  },
  {
    id: 'c-2',
    name: 'Heavyweight Cozy Knit Hoodie',
    price: 69,
    originalPrice: 85,
    category: 'clothing',
    subCategory: 'Hoodies & Sweats',
    rating: 4.8,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80'
    ],
    description: 'The epitome of comfort. Made from ultra-dense 450GSM organic brushed cotton fleece. Featuring a structured double-layer hood, drop-shoulder casual fit, seamless kangaroo pocket, and ribbed side panels for maximum movement. Pre-shrunk to retain its pristine silhouette wash after wash.',
    features: [
      'Heavyweight 450GSM organic French Terry cotton',
      'Double-layer heavy structured hood (no drawstrings for clean look)',
      'Brushed fleece interior for exceptional softness',
      'Durable flatlock seam stitching throughout',
      'Ribbed cuffs, hem, and expansion side-gussets'
    ],
    specs: {
      'Composition': '100% Organic Cotton',
      'Weight': '450 GSM (Heavyweight)',
      'Fit': 'Oversized Boxy Fit',
      'Shrinkage': 'Pre-washed (Less than 1% shrinkage)',
      'Care': 'Machine wash cold, air dry'
    },
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Dusty Rose', hex: '#E2E8F0' }, // customized color visualization
      { name: 'Sage Green', hex: '#86EFAC' },
      { name: 'Oatmeal Heather', hex: '#F3F4F6' },
      { name: 'Minimalist Sand', hex: '#FEF3C7' }
    ],
    featured: true,
    tags: ['Organic Cotton', 'Heavyweight', 'Everyday']
  },
  {
    id: 'c-3',
    name: 'Retro Classic Canvas Sneakers',
    price: 79,
    category: 'clothing',
    subCategory: 'Footwear',
    rating: 4.7,
    reviewCount: 154,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80'
    ],
    description: 'Step into vintage style with contemporary comfort. Hand-crafted with premium double-layered canvas and vulcanized non-slip rubber soles. Features orthotic-grade breathable insoles for high arch support and impact absorption. Perfect for daily commutes or weekend strolls.',
    features: [
      '12oz premium heavy-duty breathable cotton canvas',
      'Flexible vulcanized rubber outsole with traction tread',
      'Removable cushioned antimicrobial memory-foam insole',
      'Reinforced double-stitched stress areas & metal eyelets',
      'Includes two sets of premium flat cotton laces'
    ],
    specs: {
      'Upper': '12oz Organic Canvas',
      'Sole': '100% Vulcanized Rubber',
      'Insole': 'Memory Foam + Orthotic support',
      'Weight': '380g per shoe',
      'Fit': 'True to size'
    },
    inStock: true,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Off White', hex: '#F9FAFB' },
      { name: 'Classic Navy', hex: '#1E3A8A' },
      { name: 'Charcoal Grey', hex: '#4B5563' }
    ],
    featured: false,
    tags: ['Retro', 'Sneakers', 'Comfortable']
  },
  {
    id: 'c-4',
    name: 'Rugged Denim Trucker Jacket',
    price: 95,
    originalPrice: 110,
    category: 'clothing',
    subCategory: 'Jackets & Coats',
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80'
    ],
    description: 'The definitive American workwear icon. Made from robust 14oz rigid selvedge cotton denim that yields gorgeous customized fades and creases based on your wear. Equipped with traditional button-flap chest pockets, welt hand pockets, and adjustable waist tabs for custom fit.',
    features: [
      '14oz ultra-durable premium ring-spun selvedge denim',
      'Embossed steel buttons with antique brass finish',
      'Classic red-line selvedge interior detail',
      'Reinforced contrast tobacco-colored stitching',
      'Deep interior pockets for utility storage'
    ],
    specs: {
      'Material': '100% Cotton Selvedge Denim',
      'Weight': '14 oz (Heavyweight)',
      'Fit': 'Regular Trucker Fit',
      'Care': 'Cold wash inside out, line dry'
    },
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Indigo Wash', hex: '#1D4ED8' },
      { name: 'Vintage Acid Black', hex: '#374151' }
    ],
    featured: false,
    tags: ['Selvedge Denim', 'Heritage', 'Trucker']
  },
  {
    id: 'c-5',
    name: 'Merino Wool Knit Beanie',
    price: 35,
    category: 'clothing',
    subCategory: 'Jackets & Coats',
    rating: 4.6,
    reviewCount: 148,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=600&q=80'
    ],
    description: 'Luxurious warmth that is never itchy. Spun from 100% extra-fine Australian Merino wool that naturally repels odors, breathes beautifully, and retains thermal warmth even when wet. Designed with a adjustable double fold cuff to suit various face shapes.',
    features: [
      '100% Extra-fine natural Australian Merino Wool',
      'Inherently antibacterial, moisture-wicking and breathable',
      'Stretchable rib-knit stitch allows one-size-fits-all ease',
      'Adjustable fold-up hem allows slouchy or fitted wear',
      'Extremely soft, non-itch comfort feel'
    ],
    specs: {
      'Material': '100% Merino Wool',
      'Knit Type': '1x1 Rib Knit',
      'Size': 'One Size Fits All (highly elastic)',
      'Origin': 'Ethically sourced Merino farms',
      'Care': 'Hand wash only, dry flat'
    },
    inStock: true,
    colors: [
      { name: 'Onyx Black', hex: '#111827' },
      { name: 'Forest Green', hex: '#064E3B' },
      { name: 'Mustard Yellow', hex: '#D97706' },
      { name: 'Crimson Red', hex: '#991B1B' }
    ],
    featured: false,
    tags: ['Merino Wool', 'Thermal', 'Essential']
  },
  {
    id: 'c-6',
    name: 'FlexFit Everyday Athletic Joggers',
    price: 59,
    originalPrice: 75,
    category: 'clothing',
    subCategory: 'Activewear',
    rating: 4.8,
    reviewCount: 195,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80',
      'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80'
    ],
    description: 'Engineering comfort in motion. Combining ultra-premium four-way stretch nylon-blend fabric with advanced moisture-wicking tech. Features zippered hidden side pockets for active utility, an elastic waistband with flat interior drawcord, and sleek ergonomic tapered ankle cuffs.',
    features: [
      'Four-way hyper stretch fabric (78% Nylon, 22% Spandex)',
      'Antimicrobial and sweat-wicking treatment',
      'Double zip side-seam pockets + drop-in back pocket',
      'Low-profile comfortable elastic waist band',
      'Engineered gusset stitch for unrestricted stride'
    ],
    specs: {
      'Fabric': 'Nylon-Spandex Performance Blend',
      'Stretch Ratio': '300% Multi-directional',
      'Inseam': '29 inches tapered',
      'Weight': '240g (Lightweight)',
      'Sun Protection': 'UPF 50+'
    },
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Tech Olive', hex: '#374151' },
      { name: 'Charcoal Space Dye', hex: '#1F2937' },
      { name: 'Midnight Blue', hex: '#1E3A8A' }
    ],
    featured: false,
    tags: ['Activewear', 'Hyper Stretch', 'Water Repellent']
  }
];

export const COUPONS: Coupon[] = [
  { code: 'WELCOME10', discount: 10, description: '10% off for all new shoppers' },
  { code: 'GIGA20', discount: 20, description: 'Super summer 20% off discount code' },
  { code: 'FREESHIP', discount: 5, description: 'Apply $5 off as free shipping credit' }
];

export const REVIEWS = [
  {
    id: 'r-1',
    userName: 'Alex M.',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80',
    rating: 5,
    date: '2 days ago',
    comment: 'The AeroSound headphones are worth every single penny! Noise cancellation blocks my chatty office completely, and the bass response is unbelievably clean. Incredible buy.',
    verified: true
  },
  {
    id: 'r-2',
    userName: 'Kazi Rahman',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    comment: 'The leather moto jacket fits exactly as expected. Premium grain leather feels extremely rich and soft. Truly premium craftsmanship. Very fast shipping!',
    verified: true
  },
  {
    id: 'r-3',
    userName: 'Emily T.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    rating: 4,
    date: '3 weeks ago',
    comment: 'Titanium smartwatch is gorgeous and is a lifesaver for fitness tracking. The battery lasts almost 12 days for my regular usage. Dropped 1 star because the orange strap is too loud, bought a gray one.',
    verified: true
  }
];
