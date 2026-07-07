import { Smartphone, Shield, HelpCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };
  return (
    <footer className="bg-neutral-dark text-white font-poppins sticky top-[76px] z-[9] -mt-8 rounded-t-[32px] md:rounded-t-[40px] overflow-hidden">
      {/* Curved Divider from White Section */}
      <div className="w-full overflow-hidden leading-none -mt-1 relative z-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '40px' }} className="text-white fill-current">
          <path d="M0,64 C480,120 960,0 1440,64 L1440,0 L0,0 Z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="flex items-center gap-2">
              <img
                src="/assets/blinko-logo.png"
                alt="Blinko Logo"
                className="w-10 h-10 rounded-xl shadow-md object-contain"
              />
              <span className="text-2xl font-bold tracking-tight">
                Blinko<span className="text-primary font-light">.</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's fastest hyperlocal food delivery network. Connecting neighborhood stores and culinary favorites directly to your doorstep.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/bli_nko_01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://wa.me/919864119506"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64" fill="none">
                  <path d="M32 0C14.327 0 0 14.327 0 32c0 5.65 1.47 11.17 4.26 16.02L0 64l16.48-4.26A31.85 31.85 0 0 0 32 64c17.67 0 32-14.33 32-32S49.67 0 32 0zm14.88 41.87c-.42 1.18-2.43 2.19-3.37 2.33-.94.14-1.74.28-5.65-1.28-4.75-1.91-7.85-6.19-8.09-6.52-.24-.33-1.95-2.6-1.95-4.96 0-2.36 1.23-3.52 1.66-3.95.42-.42.94-.52 1.27-.52.33 0 .66 0 .94 0 .28 0 .71-.11 1.04.66.33.77 1.13 2.74 1.23 2.93.09.19.14.42 0 .66-.14.24-.24.38-.47.61-.24.24-.52.52-.75.76-.24.24-.52.52-.24.99.28.47 1.23 2.03 2.64 3.26 1.84 1.6 3.35 2.12 3.82 2.31.47.19.71.16.99-.14.28-.33 1.23-1.41 1.56-1.88.33-.47.66-.42 1.13-.24.47.19 2.97 1.41 3.49 1.65.52.24.85.38.99.61.14.24.14 1.37-.28 2.55z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-light">Our Platforms</h3>
            <ul className="space-y-2">
              <li>
                <a href="#customer-app" onClick={(e) => handleScroll(e, 'customer-app')} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors duration-200">
                  <Smartphone size={16} /> Customer Ordering App
                </a>
              </li>
              <li>
                <a href="#vendor-app" onClick={(e) => handleScroll(e, 'vendor-app')} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors duration-200">
                  <Shield size={16} /> Vendor Storefront Partner
                </a>
              </li>
              <li>
                <a href="#delivery-app" onClick={(e) => handleScroll(e, 'delivery-app')} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors duration-200">
                  <HelpCircle size={16} /> Delivery Fleet Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-light">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us & Founder
                </a>
              </li>
              <li>
                <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home Landing
                </a>
              </li>
              <li>
                <a href="https://blinkoo.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary-light">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary-light" />
                <span>blinkosupport@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-primary-light flex-shrink-0" />
                <span>Biswanath Chariali, Assam, 784179, India </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary-light" />
                <span>+91 98641 19506</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Blinko Delivery Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

