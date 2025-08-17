import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from '../Link';

const MegaMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleClick = (menu: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === menu ? null : menu);
    }
  };

  const menuData = {
    appliances: {
      title: 'Appliances',
      sections: [
        {
          title: 'Cooking',
          items: [
            'Chimneys',
            'Built-in Hobs',
            'Cooking Range',
            'Built-in Ovens',
            'Built-in Microwaves',
            'Cooktops'
          ]
        },
        {
          title: 'Refrigeration',
          items: [
            'Built-in Refrigerators',
            'Free Standing Wine Coolers'
          ]
        },
        {
          title: 'Dishwashing',
          items: [
            'Built-in Dishwashers'
          ]
        },
        {
          title: 'Small Appliances',
          items: [
            'Coffee Maker',
            'Air Fryers',
            'OTGs',
            'Air Purifiers',
            'Fans'
          ]
        }
      ]
    }
  };

  const mainMenuItems = [
    { name: 'Appliances', key: 'appliances', hasDropdown: true },
    { name: 'Pantry & Corner Units', key: 'pantry', hasDropdown: false },
    { name: 'Storage & Organizers', key: 'storage', hasDropdown: false },
    { name: 'About', key: 'about', hasDropdown: false },
    { name: 'Resources', key: 'resources', hasDropdown: false },
    { name: 'Contact', key: 'contact', hasDropdown: false }
  ];

  return (
    <section 
      className={`header_sec w-full shadow-sm z-10 py-4 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'fixed top-0 bg-white shadow-lg' 
          : 'absolute bg-transparent'
      }`}
      style={{
        transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
        animation: isScrolled ? 'slideDownSmooth 0.5s ease-in-out' : 'none',
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideDownSmooth {
            from {
              transform: translateY(-100%);
              opacity: 0.8;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `
      }} />
      
      {/* Main Navigation */}
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              <img src="/kaff-logo.png" className={`transition-colors duration-300 ${
                isScrolled ? 'filter brightness-0' : 'text-white'
              }`} alt="Kaff Logo" />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              {mainMenuItems.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      handleMouseEnter(item.key);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) {
                      handleMouseLeave();
                    }
                  }}
                >
                  <button className={`flex items-center text-xl space-x-1 hover:opacity-80 px-4 font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-900 hover:text-gray-700' 
                      : 'text-white hover:text-white'
                  }`}>
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${
                        activeDropdown === item.key ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                </div>
              ))}
            </nav>
            
            <div className='flex items-center gap-4'>
              <button className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'
              }`}>
                <Search className="w-5 h-5" />
              </button>
              <button className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'
              }`}>
                <User className="w-5 h-5" />
              </button>
              <button className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'
              }`}>
                <ShoppingCart className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                className={`md:hidden transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-900 hover:text-gray-700' 
                    : 'text-white hover:text-gray-200'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {activeDropdown === 'appliances' && (
        <div
          className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50 hidden md:block"
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-4 gap-8">
              {menuData.appliances.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {mainMenuItems.map((item) => (
              <div key={item.key}>
                <button
                  className="flex items-center justify-between w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => handleClick(item.key)}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.key ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.hasDropdown && activeDropdown === item.key && (
                  <div className="pl-6 pb-4 space-y-4">
                    {menuData.appliances.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                          {section.title}
                        </h4>
                        <ul className="space-y-1">
                          {section.items.map((subItem, subItemIndex) => (
                            <li key={subItemIndex}>
                              <a
                                href="#"
                                className="block text-gray-600 hover:text-gray-900 text-sm py-1 transition-colors duration-200"
                              >
                                {subItem}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MegaMenu;