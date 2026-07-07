import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Customer App', id: 'customer-app' },
    { name: 'Vendor App', id: 'vendor-app' },
    { name: 'Delivery App', id: 'delivery-app' },
    { name: 'About & Founder', id: 'about' }
  ];

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 96; // Offset for floating navbar + spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    let ticking = false;
    const elementsCache = {};

    const handleScrollSpy = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 140; // offset for detection
          
          for (const link of links) {
            if (!elementsCache[link.id]) {
              elementsCache[link.id] = document.getElementById(link.id);
            }
            const el = elementsCache[link.id];
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(link.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    // Run once initially
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <nav className="fixed top-4 left-4 right-4 md:left-6 md:right-6 max-w-7xl mx-auto z-50 bg-white/95 backdrop-blur-md border border-primary-soft shadow-lg rounded-2xl transition-all duration-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleScroll(e, 'home')}
              className="flex items-center gap-2 group"
            >
              <img
                src="/assets/blinko-logo.png"
                alt="Blinko Logo"
                className="w-8 h-8 rounded-lg shadow-md shadow-primary/20 transform group-hover:scale-105 transition-transform duration-200 object-contain"
              />
              <span className="text-xl font-bold font-poppins text-neutral-dark tracking-tight">
                Blinko<span className="text-primary font-light">.</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className={`relative px-1 py-1 font-poppins text-sm font-bold transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </a>
            ))}
            <a
              href="#customer-app"
              onClick={(e) => handleScroll(e, 'customer-app')}
              className="flex items-center gap-1 font-poppins text-sm font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg shadow-md shadow-primary/10 hover:shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get App
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-primary-soft focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border border-primary-soft mt-1 rounded-2xl shadow-xl overflow-hidden mx-1 mb-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className={`block px-4 py-2.5 rounded-xl font-poppins text-sm font-semibold transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-primary bg-primary-soft/50'
                    : 'text-gray-600 hover:text-primary hover:bg-primary-soft/30'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 px-4 pb-2">
              <a
                href="#customer-app"
                onClick={(e) => handleScroll(e, 'customer-app')}
                className="w-full flex items-center justify-center gap-1 font-poppins text-sm font-bold text-white bg-primary hover:bg-primary-dark py-2.5 rounded-xl shadow-md transition-all duration-200"
              >
                Download Customer App
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

