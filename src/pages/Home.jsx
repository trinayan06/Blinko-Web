import { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  Zap,
  MapPin,
  CreditCard,
  Clock,
  ShieldCheck,
  Store,
  TrendingUp,
  ArrowRight,
  Smartphone,
  Search,
  ArrowDown,
  Bell,
  CheckSquare,
  Shield,
  Calendar,
  Users,
  Target,
  Globe,
  Heart
} from 'lucide-react';

/* ── helpers ── */
const parseNum = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10) || 0;
const parseSuffix = (s) => {
  const m = String(s).match(/[^0-9,].*/);
  return m ? m[0] : '';
};

/* ── animated counter (no external component) ── */
function AnimatedCount({ end, duration = 2.5, separator = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  const formatted = separator
    ? count.toLocaleString()
    : String(count);

  return <span ref={ref}>{formatted}{suffix}</span>;
}

/* ── floating decorator ── */
function FloatingEmoji({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <span className="drop-shadow-lg text-4xl md:text-5xl opacity-40">{children}</span>
    </motion.div>
  );
}

/* ── reusable phone mockup with real logo & screenshot ── */
function PhoneMockup({ screenshotUrl, logoUrl, appName, badgeText, statusText, isLeft = false }) {
  return (
    <div className={`flex flex-col ${isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-4 sm:gap-8 justify-center w-full max-w-2xl mx-auto px-4`}>
      {/* Real Large App Logo (120-150px) - hidden on mobile to conserve screen space */}
      <motion.div
        className="hidden sm:flex flex-col items-center justify-center bg-white p-3 sm:p-6 rounded-3xl border border-primary-soft shadow-xl w-28 h-28 sm:w-44 sm:h-44 flex-shrink-0"
        whileHover={{ scale: 1.05, rotate: isLeft ? -2 : 2 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={logoUrl}
          alt={`${appName} Logo`}
          className="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-2xl"
        />
        <span className="text-[8px] sm:text-[10px] font-black text-neutral-dark font-poppins mt-1 sm:mt-2 tracking-widest text-center uppercase">
          {appName.replace("Blinko ", "")} App
        </span>
      </motion.div>

      {/* Floating Phone Mockup */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-28 sm:w-64 md:w-72 aspect-[9/18] bg-neutral-dark rounded-[1.8rem] sm:rounded-[2.5rem] shadow-2xl border-[4px] sm:border-[6px] border-gray-800 overflow-hidden">
          {/* Notch/Pill */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-28 h-3.5 sm:h-5 bg-gray-800 rounded-b-2xl z-10" />
          
          {/* Screen Content */}
          <div className="w-full h-full p-1.5 sm:p-2">
            <div className="w-full h-full rounded-[1.4rem] sm:rounded-[2rem] overflow-hidden bg-neutral-light">
              <img
                src={screenshotUrl}
                alt={`${appName} Screenshot`}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Small floating badge */}
        {badgeText && (
          <div className="absolute -bottom-2 -right-2 bg-white p-2 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-primary-soft max-w-[130px] sm:max-w-[180px]">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center text-green-600 text-sm sm:text-lg flex-shrink-0">✅</div>
            <div>
              <p className="text-[8px] sm:text-[10px] text-gray-500 font-bold font-poppins uppercase tracking-wider">{badgeText}</p>
              <p className="text-[10px] sm:text-xs font-bold text-neutral-dark font-poppins leading-tight">{statusText}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ── curved divider component ── */
function CurvedDivider({ colorClass = "text-white", isBottom = false }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${isBottom ? 'rotate-180 -mb-1' : '-mt-1'} relative z-20`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '40px' }} className={`${colorClass} fill-current`}>
        <path d="M0,64 C480,120 960,0 1440,64 L1440,0 L0,0 Z" />
      </svg>
    </div>
  );
}

/* ── marquee data ── */
const tickerItems = [
  '🔥 10+ Merchants',
  '⚡ Fast Delivery',
  '📍 10+ Villages',
  '💰 Best Prices',
  '🛵 Verified Riders',
  '🍕 Local Favorites',
  '🎯 Live Tracking',
  '🤝 Zero Commission',
];

export default function Home() {
  const stats = CONFIG.stats;
  const founder = CONFIG.founder;

  const downloadCustomer = CONFIG.downloads.customer;
  const downloadVendor = CONFIG.downloads.vendor;
  const downloadDelivery = CONFIG.downloads.delivery;

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // h-16 is 64px
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const features = [
    { title: 'Lightning Fast Delivery', desc: 'Get your hot meals and groceries delivered in record times from local neighborhood stores.', icon: <Zap className="text-primary w-6 h-6" /> },
    { title: 'Live GPS Map Tracking', desc: 'Follow your order in real time on our map, from merchant pickup directly to your doorstep.', icon: <MapPin className="text-primary w-6 h-6" /> },
    { title: 'Flexible Payment Options', desc: 'Pay securely with UPI, cards, NetBanking, or select Cash on Delivery (COD) at checkout.', icon: <CreditCard className="text-primary w-6 h-6" /> },
    { title: '24/7 Dedicated Support', desc: 'Have a question? Our support crew is online day and night to guarantee a flawless delivery.', icon: <Clock className="text-primary w-6 h-6" /> },
    { title: 'Zero Contact Hand-off', desc: 'Opt for contactless delivery to leave orders at your gate or door safely with verified riders.', icon: <ShieldCheck className="text-primary w-6 h-6" /> },
    { title: 'Curated Local Merchants', desc: 'Access fresh fruits, dairy, and chef specialties from hand-picked local neighborhood shops.', icon: <Store className="text-primary w-6 h-6" /> },
    { title: 'Lowest Market Rates', desc: 'Our optimized fee systems guarantee the lowest delivery margins and commission markups.', icon: <TrendingUp className="text-primary w-6 h-6" /> },
  ];

  const appCards = [
    { title: 'For Customers', badge: 'ORDER NOW', desc: 'Hungry? Satisfy your cravings in minutes. Order gourmet dishes, fresh groceries, and sweet delights from shops right next to you.', logoHeroUrl: '/assets/customer-icon-padded.png', id: 'customer-app', btnText: 'Explore Customer App' },
    { title: 'For Vendors', badge: 'PARTNER WITH US', desc: 'Take your physical store digital in minutes. Recapture local market share, manage orders, and unlock instant delivery drivers.', logoHeroUrl: '/assets/vendor-icon-padded.png', id: 'vendor-app', btnText: 'Grow Your Store' },
    { title: 'For Delivery Partners', badge: 'JOIN THE RIDE', desc: 'Work on your own terms. Earn competitive weekly payouts, flexible shifts, and use our in-app map navigations to guide you.', logoHeroUrl: '/assets/delivery-icon-padded.png', id: 'delivery-app', btnText: 'Deliver & Earn' },
  ];

  const customerHowItWorks = [
    { emoji: '📍', title: '1. Set Location', desc: 'Share your precise GPS location or type a manual address at checkout so we reach your exact doorstep.' },
    { emoji: '🔍', title: '2. Browse Shops', desc: 'Explore nearby verified merchants sorted by proximity, ratings, and categories like food, grocery, and dairy.' },
    { emoji: '🛒', title: '3. Build Your Cart', desc: 'Select items from a single merchant, customize quantities, and lock in your order with estimated delivery times.' },
    { emoji: '🚚', title: '4. Track & Receive', desc: 'Follow your rider in real time on the GPS map. Arrive at your doorstep fresh and fast within 20 minutes.' },
  ];

  const customerFeatures = [
    { title: 'Nearby Discoveries', desc: 'Instantly surface local stores, restaurants, and fresh produce shops within your delivery radius.', icon: <Search className="text-primary w-6 h-6" /> },
    { title: 'Real-Time GPS Tracking', desc: 'Watch your delivery partner ride towards your pin on a live interactive map view.', icon: <MapPin className="text-primary w-6 h-6" /> },
    { title: 'Flexible Payments', desc: 'Pay with UPI, credit/debit cards, NetBanking, wallets, or Cash on Delivery at checkout.', icon: <CreditCard className="text-primary w-6 h-6" /> },
    { title: 'Instant Push Alerts', desc: 'Instant order status updates at every step: confirmed, preparing, dispatched, and delivered.', icon: <Smartphone className="text-primary w-6 h-6" /> },
  ];

  const vendorBenefits = [
    { title: 'Reach More Customers', desc: 'Unlock access to thousands of hungry foodies and shoppers searching for products directly within your neighborhood range.', icon: <TrendingUp className="text-primary w-6 h-6" /> },
    { title: 'Simplified Order Feeds', desc: 'Receive real-time notifications for incoming orders. Accept, prepare, package, and hand off to delivery partners with ease.', icon: <Bell className="text-primary w-6 h-6" /> },
    { title: 'Interactive Analytics', desc: 'Track daily storefront earnings, popular inventory items, delivery metrics, and consumer feedbacks from a single clean board.', icon: <Store className="text-primary w-6 h-6" /> },
    { title: 'Instant Weekly Payments', desc: 'Get your earnings settled directly to your bank account weekly with transparent UPI verification tracking.', icon: <CheckSquare className="text-primary w-6 h-6" /> },
  ];

  const vendorSteps = [
    { emoji: '📝', title: '1. Register Profile', desc: 'Fill in your shop details, address, and bank routing info for weekly pay settlements.' },
    { emoji: '🍔', title: '2. Upload Catalog', desc: 'List products, prices, images, and mark stock availability. Manage delivery radius caps (e.g. up to 8km).' },
    { emoji: '🚀', title: '3. Fulfill Orders', desc: 'Prepare orders on request. A nearby Blinko delivery partner arrives automatically to handle transit.' },
  ];

  const deliveryBenefits = [
    { title: 'Complete Shift Flexibility', desc: 'Go online when you want, log off when you\'re done. You control your schedules entirely.', icon: <Clock className="text-primary w-6 h-6" /> },
    { title: 'In-App Map Navigations', desc: 'No more getting lost. Launch Google Maps directions straight to the customer\'s coordinates with our new tap-to-navigate integration.', icon: <MapPin className="text-primary w-6 h-6" /> },
    { title: 'Competitive Weekly Payouts', desc: 'Earn per delivery with bonuses for peak hours. Track your dashboard earnings settled directly weekly.', icon: <Calendar className="text-primary w-6 h-6" /> },
    { title: 'Rider Safety Policies', desc: 'Accident insurance coverage and zero-contact delivery guidelines protect you on every shift.', icon: <Shield className="text-primary w-6 h-6" /> },
  ];

  const deliveryReqs = [
    { emoji: '🚴', title: '1. Vehicle & License', desc: 'A valid driver\'s license, active registration, and access to a two-wheeler, cycle, or electric vehicle.' },
    { emoji: '📱', title: '2. Android Smartphone', desc: 'An active Android device to install the Blinko Partner app, review shifts, and launch GPS map navigations.' },
    { emoji: '📁', title: '3. Verification Docs', desc: 'Upload Aadhar identification, driving license copy, and vehicle insurance policy details inside the app.' },
  ];

  const aboutValues = [
    { title: 'Community First', desc: 'Every decision is measured against its impact on local merchants and neighborhood livelihoods.', icon: <Users className="text-primary w-6 h-6" /> },
    { title: 'Transparent Pricing', desc: 'No hidden charges. Delivery fees, service charges, and merchant margins are clearly displayed.', icon: <Target className="text-primary w-6 h-6" /> },
    { title: 'Hyperlocal Focus', desc: 'We optimize for shorter delivery distances from shops within your neighborhood, not across the city.', icon: <Globe className="text-primary w-6 h-6" /> },
    { title: 'Built with Care', desc: 'Every pixel, notification, and map marker is obsessively crafted for the best user experience.', icon: <Heart className="text-primary w-6 h-6" /> },
  ];

  return (
    <div className="bg-neutral-light min-h-screen">

      {/* ═══════ HERO ═══════ */}
      <section id="home" className="relative stack-section-desktop md:z-[1] overflow-hidden pt-32 pb-16 md:py-28 border-b border-primary-soft" style={{ borderRadius: 0, top: 0, minHeight: '100vh' }}>
        {/* Desktop Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"
          className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
        >
          <source src="/videos/blinko-video.mp4" type="video/mp4" />
        </video>

        {/* Mobile Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
          className="absolute inset-0 w-full h-full object-cover z-0 md:hidden"
        >
          <source src="/videos/mobile-video.mp4" type="video/mp4" />
        </video>



        {/* Floating 3-D decorators (hidden on mobile to keep interface clean) */}
        <FloatingEmoji className="top-16 left-[8%] hidden lg:block" delay={0}>🍔</FloatingEmoji>
        <FloatingEmoji className="top-28 right-[6%] hidden lg:block" delay={0.8}>🛵</FloatingEmoji>
        <FloatingEmoji className="bottom-20 left-[14%] hidden lg:block" delay={1.6}>🪙</FloatingEmoji>
        <FloatingEmoji className="bottom-10 right-[12%] hidden md:block" delay={2.2}>🍕</FloatingEmoji>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-soft border border-primary/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-bold text-xs tracking-wider uppercase font-poppins">India's Quickest Hyperlocal Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-dark font-poppins leading-[1.1]">
              India's #1 <br />
              <span className="text-primary">Hyperlocal Delivery</span> <br />
              Platform
            </h1>

            <p className="text-white text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-poppins font-medium">
              Blinko connects you instantly to local favorites. Fast delivery, fresh local products, and seamless support across three custom apps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => handleScroll('customer-app')}
                className="cursor-pointer inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Customer App
              </button>
              <button
                onClick={() => handleScroll('vendor-app')}
                className="cursor-pointer inline-flex items-center justify-center px-6 py-3.5 border border-gray-300 text-base font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
              >
                Become a Partner
              </button>
              <button
                onClick={() => handleScroll('delivery-app')}
                className="cursor-pointer inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-primary bg-primary-soft hover:bg-primary-soft/80 transition-all duration-200"
              >
                Join Delivery Fleet
              </button>
            </div>

            <div className="flex flex-row items-center gap-3 justify-center lg:justify-start pt-4">
              <span className="text-white/60 font-semibold font-poppins text-xs uppercase tracking-wider">Coming soon to:</span>
              <button
                onClick={() => alert("Coming soon to Google Play!")}
                className="inline-flex items-center justify-start bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white px-4 py-2 rounded-xl border border-white/10 shadow-md transition-all duration-200 text-left cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466 511.98" className="w-5 h-5 mr-2 sm:mr-2.5 flex-shrink-0">
                  <g fillRule="nonzero">
                    <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"/>
                    <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"/>
                    <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"/>
                    <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"/>
                  </g>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] sm:text-[9px] text-gray-300 font-bold uppercase tracking-wider mb-0.5">COMING SOON</span>
                  <span className="text-[12px] sm:text-[14px] font-black font-poppins text-white">Google Play</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right Layout with Rotated Food Card and Phone Mockup */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center items-center h-[460px] sm:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background rotated food card (hidden on mobile screen size) */}
            <div className="absolute left-4 top-12 w-64 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/60 z-0 hidden sm:block transform -rotate-6">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600"
                alt="Delicious Indian Gourmet Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-white/80 text-[10px] font-bold font-poppins tracking-widest uppercase">Indore Specialties</span>
                <span className="text-white text-lg font-bold font-poppins mt-1">Delivered hot 🚀</span>
              </div>
            </div>

            {/* Foreground floating phone mockup */}
            <motion.div
              className="absolute sm:right-4 z-10"
              animate={{ y: [0, -12, 0], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative w-56 sm:w-60 aspect-[9/18] bg-neutral-dark rounded-[2.5rem] shadow-2xl border-[6px] border-gray-800 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-b-2xl z-10" />
                <div className="w-full h-full p-1.5">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden">
                    <img
                      src="/assets/customer-screenshot.png"
                      alt="Blinko Customer App Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Floating App Badge */}
              <div className="absolute -bottom-2 -left-6 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-primary-soft animate-bounce">
                <img
                  src="/assets/customer-logo.png"
                  alt="Blinko Logo"
                  className="w-8 h-8 object-contain rounded-lg"
                />
                <div>
                  <p className="text-[10px] text-gray-500 font-bold font-poppins">Customer App</p>
                  <p className="text-xs font-bold text-neutral-dark font-poppins">Hot delivery ⚡</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ MARQUEE TICKER (Criss-Cross X Overlay) ═══════ */}
      <div className="relative h-28 z-20 mt-6 md:mt-10 overflow-hidden w-full pointer-events-none select-none">
        {/* First Marquee: Rotated 2 degrees, moving Left-to-Right */}
        <div className="absolute w-[120%] -left-[10%] top-2 bg-primary py-5 shadow-xl transform rotate-1.5 overflow-hidden border-y border-white/20">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="mx-6 text-white font-poppins font-black text-sm md:text-lg uppercase tracking-wider">{item}</span>
            ))}
          </div>
        </div>

        {/* Second Marquee: Rotated -2 degrees, moving Right-to-Left */}
        <div className="absolute w-[120%] -left-[10%] top-2 bg-neutral-dark py-5 shadow-xl transform -rotate-1.5 overflow-hidden border-y border-white/10">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="mx-6 text-primary font-poppins font-black text-sm md:text-lg uppercase tracking-wider">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Test Divider 1: Hero to Stats Bar */}
      <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0 }} className="z-20 -mt-8 md:-mt-12">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="#FFF5EE" />
        </svg>
      </div>

      {/* ═══════ STATS BAR (AnimatedCount) ═══════ */}
      <div style={{ backgroundColor: '#FFF5EE' }} className="border-b border-primary-soft md:sticky md:top-[76px] md:z-[2] md:-mt-8 rounded-t-[32px] md:rounded-t-[40px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-soft">
            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-black text-primary font-poppins">
                <AnimatedCount end={parseNum(stats.vendors)} duration={2.5} suffix={parseSuffix(stats.vendors)} />
              </p>
              <p className="text-gray-500 font-semibold font-poppins text-sm uppercase tracking-wider">Active Merchants</p>
            </div>
            <div className="space-y-1 pt-6 md:pt-0">
              <p className="text-4xl sm:text-5xl font-black text-primary font-poppins">
                <AnimatedCount end={parseNum(stats.cities)} duration={2.5} suffix={parseSuffix(stats.cities)} />
              </p>
              <p className="text-gray-500 font-semibold font-poppins text-sm uppercase tracking-wider">Indian Villages Covered</p>
            </div>
            <div className="space-y-1 pt-6 md:pt-0">
              <p className="text-4xl sm:text-5xl font-black text-primary font-poppins">
                <AnimatedCount end={parseNum(stats.ordersDelivered)} duration={3} separator="," suffix={parseSuffix(stats.ordersDelivered)} />
              </p>
              <p className="text-gray-500 font-semibold font-poppins text-sm uppercase tracking-wider">Orders Successfully Shipped</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ FEATURES GRID (slide-in) ═══════ */}
      <section id="features" className="stack-section-desktop md:z-[3] md:-mt-8 bg-white border-b border-primary-soft rounded-t-[32px] md:rounded-t-[40px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-neutral-dark">Why Blinko Stands Out</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-poppins">Designed to bridge the gap between local commerce and state-of-the-art delivery convenience.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl border border-primary-soft/50 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-4"
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center">{feat.icon}</div>
              <h3 className="text-lg font-bold font-poppins text-neutral-dark">{feat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-poppins">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* ═══════ SELECT YOUR GATEWAY (stacked/responsive) ═══════ */}
      <section id="gateway" style={{ backgroundColor: '#FFF3EE' }} className="stack-section-desktop md:z-[4] md:-mt-8 py-24 border-t border-primary-soft rounded-t-[32px] md:rounded-t-[40px] overflow-hidden">
        <CurvedDivider colorClass="text-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-neutral-dark">Select Your Gateway</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-poppins">Choose the dedicated Blinko experience tailored precisely to your role.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {appCards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-primary-soft shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
              >
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  <div className="w-full h-full bg-primary-soft/85 flex items-center justify-center">
                    <img src={card.logoHeroUrl} alt={card.title} className="w-[160px] h-[160px] object-contain transform hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white font-black text-[10px] tracking-widest px-2.5 py-1 rounded-full font-poppins">{card.badge}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-poppins text-neutral-dark">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-poppins">{card.desc}</p>
                  </div>
                  <button
                    onClick={() => handleScroll(card.id)}
                    className="cursor-pointer w-full flex items-center justify-center gap-1 bg-neutral-dark hover:bg-neutral-dark/95 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors duration-200 group"
                  >
                    {card.btnText}
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Divider 2: Features/Gateway to Customer App */}
      <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0 }} className="z-20 -mt-1">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="#2D6A6A" />
        </svg>
      </div>

      {/* ═══════ CUSTOMER APP SECTION ═══════ */}
      <section id="customer-app" style={{ backgroundColor: '#2D6A6A' }} className="stack-section z-[5] -mt-8 border-t border-primary-soft rounded-t-[32px] md:rounded-t-[40px] overflow-hidden pt-5 pb-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          <motion.div
            className="space-y-3 lg:space-y-6 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white font-black text-xs tracking-widest uppercase font-poppins bg-teal-800/60 px-3.5 py-1.5 rounded-full border border-teal-700/50 inline-block">
              CUSTOMER ORDERING APP
            </span>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-white font-poppins leading-[1.15]">
              Order food from <br /><span className="text-primary-light">your local favorites</span>
            </h2>
            <p className="text-teal-100/90 text-sm lg:text-md leading-relaxed font-poppins max-w-lg mx-auto lg:mx-0">
              Discover local restaurants, grocery stores, and dairy shops nearby. Order in seconds and get it delivered hot to your doorstep in minutes.
            </p>
            <div className="flex flex-row gap-3 justify-center lg:justify-start pt-1">
              <a href={downloadCustomer.apkUrl} download="Blinko-Customer.apk" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/25 transition-all duration-200 text-xs sm:text-sm">
                <ArrowDown size={16} /> <span className="hidden sm:inline">Download </span>Customer APK
              </a>
              <button
                onClick={() => alert("Coming soon to Google Play!")}
                className="inline-flex items-center justify-start bg-neutral-dark hover:bg-neutral-dark/90 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-neutral-700 shadow-md transition-all duration-200 text-left cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466 511.98" className="w-5 h-5 mr-2 sm:mr-2.5 flex-shrink-0">
                  <g fillRule="nonzero">
                    <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"/>
                    <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"/>
                    <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"/>
                    <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"/>
                  </g>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">COMING SOON</span>
                  <span className="text-[12px] sm:text-[14px] font-black font-poppins text-white">Google Play</span>
                </div>
              </button>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 flex justify-center">
            <PhoneMockup
              screenshotUrl="/assets/customer-screenshot.png"
              logoUrl="/assets/customer-logo.png"
              appName="Blinko Customer"
              badgeText="Order Status"
              statusText="Arriving in 12 min"
            />
          </div>
        </div>
      </section>

      {/* Test Divider 3: Customer App to Vendor App */}
      <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0, backgroundColor: '#2D6A6A' }} className="z-20 -mt-1">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="#2A3F5F" />
        </svg>
      </div>

      {/* ═══════ VENDOR APP SECTION ═══════ */}
      <section id="vendor-app" style={{ backgroundColor: '#2A3F5F' }} className="stack-section z-[6] -mt-8 border-t border-primary-soft rounded-t-[32px] md:rounded-t-[40px] overflow-hidden pt-5 pb-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          <div className="flex justify-center">
            <PhoneMockup
              screenshotUrl="/assets/vendor-screenshot.png"
              logoUrl="/assets/vendor-logo.png"
              appName="Blinko Vendor"
              badgeText="Store Status"
              statusText="Active & Receiving Orders"
              isLeft={true}
            />
          </div>

          <motion.div
            className="space-y-3 lg:space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white font-black text-xs tracking-widest uppercase font-poppins bg-blue-800/60 px-3.5 py-1.5 rounded-full border border-blue-700/50 inline-block">
              VENDOR MERCHANT PLATFORM
            </span>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-white font-poppins leading-[1.15]">
              Grow your business <br /><span className="text-primary-light">with Blinko Partner</span>
            </h2>
            <p className="text-blue-100/90 text-sm lg:text-md leading-relaxed font-poppins max-w-lg mx-auto lg:mx-0">
              Transform your physical shop into a digital storefront in minutes. Gain access to verified delivery networks, monitor store metrics, and expand your customer radius.
            </p>
            <div className="flex flex-row gap-3 justify-center lg:justify-start pt-1">
              <a href={downloadVendor.apkUrl} download="Blinko-Vendor.apk" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/25 transition-all duration-200 text-xs sm:text-sm">
                <ArrowDown size={16} /> <span className="hidden sm:inline">Download </span>Vendor APK
              </a>
              <button
                onClick={() => alert("Coming soon to Google Play!")}
                className="inline-flex items-center justify-start bg-neutral-dark hover:bg-neutral-dark/90 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-neutral-700 shadow-md transition-all duration-200 text-left cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466 511.98" className="w-5 h-5 mr-2 sm:mr-2.5 flex-shrink-0">
                  <g fillRule="nonzero">
                    <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"/>
                    <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"/>
                    <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"/>
                    <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"/>
                  </g>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">COMING SOON</span>
                  <span className="text-[12px] sm:text-[14px] font-black font-poppins text-white">Google Play</span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Test Divider 4: Vendor App to Delivery App */}
      <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0, backgroundColor: '#2A3F5F' }} className="z-20 -mt-1">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="#C1440E" />
        </svg>
      </div>

      {/* ═══════ DELIVERY APP SECTION ═══════ */}
      <section id="delivery-app" style={{ backgroundColor: '#C1440E' }} className="stack-section z-[7] -mt-8 border-t border-primary-soft rounded-t-[32px] md:rounded-t-[40px] overflow-hidden pt-5 pb-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          <motion.div
            className="space-y-3 lg:space-y-6 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white font-black text-xs tracking-widest uppercase font-poppins bg-orange-850/60 px-3.5 py-1.5 rounded-full border border-orange-700/50 inline-block">
              RIDER DELIVERY FLEET
            </span>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-white font-poppins leading-[1.15]">
              Earn money delivering <br /><span className="text-orange-200">with Blinko Delivery</span>
            </h2>
            <p className="text-orange-100/90 text-sm lg:text-md leading-relaxed font-poppins max-w-lg mx-auto lg:mx-0">
              Work on your own terms. Deliver local retail food, grocery essentials, and courier packets with flexible hours and competitive weekly payouts.
            </p>
            <div className="flex flex-row gap-3 justify-center lg:justify-start pt-1">
              <a href={downloadDelivery.apkUrl} download="Blinko-Delivery.apk" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/25 transition-all duration-200 text-xs sm:text-sm">
                <ArrowDown size={16} /> <span className="hidden sm:inline">Download </span>Delivery APK
              </a>
              <button
                onClick={() => alert("Coming soon to Google Play!")}
                className="inline-flex items-center justify-start bg-neutral-dark hover:bg-neutral-dark/90 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-neutral-700 shadow-md transition-all duration-200 text-left cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466 511.98" className="w-5 h-5 mr-2 sm:mr-2.5 flex-shrink-0">
                  <g fillRule="nonzero">
                    <path fill="#EA4335" d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"/>
                    <path fill="#FBBC04" d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"/>
                    <path fill="#34A853" d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"/>
                    <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"/>
                  </g>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">COMING SOON</span>
                  <span className="text-[12px] sm:text-[14px] font-black font-poppins text-white">Google Play</span>
                </div>
              </button>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 flex justify-center">
            <PhoneMockup
              screenshotUrl="/assets/delivery-screenshot.png"
              logoUrl="/assets/delivery-logo.png"
              appName="Blinko Delivery"
              badgeText="Current Earnings"
              statusText="₹4,250 this week"
            />
          </div>
        </div>
      </section>

      {/* Test Divider 5: Delivery App to About Section */}
      <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0, backgroundColor: '#C1440E' }} className="z-20 -mt-1">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ═══════ ABOUT & FOUNDER SECTION ═══════ */}
      <section id="about" className="stack-section z-[8] -mt-8 bg-white border-t border-primary-soft rounded-t-[32px] md:rounded-t-[40px] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-primary font-black text-xs tracking-widest uppercase font-poppins bg-primary-soft px-3.5 py-1.5 rounded-full border border-primary/15 inline-block mb-4">
              ABOUT BLINKO
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-neutral-dark font-poppins leading-[1.1]">
              Bridging Neighborhoods <br /><span className="text-primary">Through Technology</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-poppins max-w-2xl mx-auto mt-4">
              Blinko was born from a simple idea: every local shop deserves the same technology that powers large chains. We build the digital rails that connect local merchants directly to their communities.
            </p>
          </motion.div>
        </div>

        {/* Founder Profile Card */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div className="bg-neutral-light rounded-3xl shadow-lg border border-primary-soft p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <div className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border-4 border-white">
              <img src={founder.photoUrl} alt={founder.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold font-poppins text-neutral-dark">{founder.name}</h3>
                <p className="text-primary font-semibold font-poppins text-sm">{founder.title}</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed font-poppins">{founder.bio}</p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-gray-500 text-sm font-poppins">
                "{founder.quote}"
              </blockquote>
            </div>
          </motion.div>
        </div>

        {/* About Values */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <motion.div className="text-center space-y-4 mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-3xl font-bold font-poppins text-neutral-dark">Our Core Values</h3>
            <p className="text-gray-500 max-w-lg mx-auto font-poppins">The principles that guide every line of code and every delivery dispatch.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutValues.map((v, i) => (
              <motion.div key={i} className="flex gap-4 p-6 rounded-2xl border border-primary-soft/40 hover:bg-orange-50/10 transition-colors bg-neutral-light" initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">{v.icon}</div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold font-poppins text-neutral-dark">{v.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-poppins">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
