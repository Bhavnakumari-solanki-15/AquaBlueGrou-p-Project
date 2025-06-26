import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Droplets, ChevronDown, Package, Zap, Database, Search, Link2, Activity, Map, Users, ArrowUpRight, Fish, Pill, FlaskConical, Microscope, ShoppingCart, Star, Leaf, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

// Define types for navigation and dropdowns
type SimpleDropdownItem = { name: string; path: string; };
type SectionedDropdownItem = {
  section: string;
  items: { name: string; description: string; icon: JSX.Element; path: string; }[];
};

type CompanyDropdownItem = {
  heading: string;
  description: string;
  icon: JSX.Element;
  path: string;
};

// Use a more specific union type for DropdownContent
type DropdownContent = SimpleDropdownItem[] | SectionedDropdownItem[] | CompanyDropdownItem[] | undefined; // Add undefined for items without dropdowns and add new CompanyDropdownItem[]

const Header: React.FC = () => {
  // Removed theme context
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const companyLinkRef = useRef<HTMLButtonElement>(null);
  const companyDropdownArrowRef = useRef<HTMLDivElement>(null);
  const { isAdmin, user, signOut } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [contactCount, setContactCount] = useState(0);
  const [joinUsCount, setJoinUsCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [productCategories, setProductCategories] = useState<SectionedDropdownItem[]>([]);
  const mainCategories = ["Aquamart", "Aquabase", "Fishwaale Mart"];

  useEffect(() => {
    const fetchProductCategories = async () => {
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*, sub_categories(*)');

      if (error) {
        console.error('Error fetching product categories:', error);
        return;
      }

      if (categories) {
        const formattedCategories = categories.map(category => ({
          section: category.name,
          items: category.sub_categories.map((sub: any) => ({
            name: sub.name,
            description: '',
            icon: <Package className="w-5 h-5 text-purple-700" />,
            path: `/products/${sub.name.toLowerCase().replace(/\s+/g, '-')}`
          }))
        }));
        setProductCategories(formattedCategories);
      }
    };

    fetchProductCategories();
  }, []);

  // Update navigation data to include Blog and remove from Company dropdown
  const navigation = [
    { name: 'Company', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  // New data structure for the Company dropdown with three columns based on screenshot
  const companyDropdown = [
    { // Column 1: Join the Team
      heading: 'JOIN THE TEAM',
      items: [
        {
          name: 'Join Us',
          description: 'Join a world-class team and make an impact.',
          img: '/images/image3.png', // Illustration for Careers
          path: '/join-us', // Updated path to point to the new Join Us page
        },
      ],
    },
    { // Column 2: Company
      heading: 'COMPANY',
      items: [
        {
          name: 'About',
          description: 'Learn about our mission and values.',
          img: '/images/image4.png', // Illustration for About
          path: '/about', // Path remains /about for the main About page
        },
      ],
    },
    { // Column 3: Links (Contact as requested, Blog added back)
      heading: 'MORE', // Placeholder heading, adjust if needed
      items: [
        {
          name: 'Blog',
          description: '', // No description in screenshot for these links
          img: '', // No illustration provided or shown for these
          path: '/blog', // Path remains /blog for the Blog page
        },
        {
          name: 'Contact',
          description: '', // No description in screenshot for these links
          img: '', // No illustration provided or shown for these
          path: '/contact', // Path remains /contact for the Contact page
        },
      ],
    },
  ];

  // Map navigation item names to their dropdown content - reverted to original mappings
  const dropdownContents: { [key: string]: any } = { // Use any temporarily to avoid type errors during restructuring
    'Company': companyDropdown,
    'Our Products': productCategories,
    // Removed entries for Solutions, Resources, Company, Pricing
  };


  const handleDropdownLinkClick = () => setOpenDropdown(null);

  // Reinstated handleAboutUsClick if needed for scrolling on /about page
   const handleAboutUsClick = (e: React.MouseEvent) => {
     setOpenDropdown(null);
     if (location.pathname === '/about') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     } else {
       navigate('/about');
       setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
     }
   };

  const handleDropdownMouseEnter = (dropdownKey: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(dropdownKey);
  };
  const handleDropdownMouseLeave = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    // Set a timeout before closing the dropdown to allow moving between dropdown and content
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // Increased delay to allow moving between nav item and dropdown
  };

  // Effect to position the dropdown arrow
  useEffect(() => {
    const positionArrow = () => {
      if (openDropdown === 'Company' && companyLinkRef.current && companyDropdownArrowRef.current) {
        const linkRect = companyLinkRef.current.getBoundingClientRect();
        // Calculate the center of the link relative to the viewport
        const linkCenter = linkRect.left + linkRect.width / 2;
        
        // Get the header's bounding rect to calculate relative position
        const headerRect = (companyDropdownArrowRef.current.parentElement as HTMLElement).getBoundingClientRect();
        
        // Calculate the position relative to the header's left edge
        const relativePosition = linkCenter - headerRect.left;
        
        // Set the left style of the arrow container
        companyDropdownArrowRef.current.style.left = `${relativePosition}px`;
      }
    };

    positionArrow(); // Position arrow on mount/open

    // Reposition arrow on window resize
    window.addEventListener('resize', positionArrow);

    return () => {
      window.removeEventListener('resize', positionArrow);
    };
  }, [openDropdown]); // Recalculate when the dropdown opens/closes

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.dropdown-parent')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  // Add a click handler for the user dropdown
  const handleUserDropdownClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsAdminDropdownOpen(false);
  };

  // Add a click handler for the admin dropdown
  const handleAdminDropdownClick = () => {
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.user-dropdown') && !(e.target as HTMLElement).closest('.admin-dropdown')) {
        setIsUserDropdownOpen(false);
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Fetch submission counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
      const { count: contactSubCount } = await supabase.from('contact_us').select('*', { count: 'exact' });
      const { count: joinUsSubCount } = await supabase.from('join_us').select('*', { count: 'exact' });
      setContactCount(contactSubCount || 0);
      setJoinUsCount(joinUsSubCount || 0);
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header 
      // Removed background, blur, gradient, and border for a completely transparent header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4`}
    >
      <div className="container mx-auto px-4">
        {/* Restructured header content for centering */}
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo */}
          {/* Wrapped logo in a div and applied flex-grow for equal spacing */}
          <div className="flex-1 flex items-center">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="/images/aquablue-logo.png"
                alt="Aqua Blue Group Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Centered Navigation Pill with Glassmorphism - Hidden on mobile */}
          {/* Made pill bigger, text black and bold */}
          <nav className="hidden lg:flex justify-center items-center backdrop-blur-md bg-white/30 border border-white/20 shadow-lg rounded-full px-10 py-4 space-x-8 text-gray-900 font-bold mx-auto">
            {navigation.map((item, index) => {
              const dropdownContent = dropdownContents[item.name];
              const isOpen = openDropdown === item.name;
              
              // Determine active state based on item type and dropdown content
              // Simplify active state for static links
              let isActive = location.pathname === item.path;

              // For dropdowns, check if any sub-item is active
              if (dropdownContent) {
                  if (Array.isArray(dropdownContent) && dropdownContent.length > 0) { // Check if it's a non-empty array first
                       if ('name' in dropdownContent[0]) { // Simple array of links
                           isActive = isActive || (dropdownContent as SimpleDropdownItem[]).some(subItem => location.pathname === subItem.path);
                       } else if ('section' in dropdownContent[0]) { // Array of sections with items
                           isActive = isActive || (dropdownContent as SectionedDropdownItem[]).some(section =>
                               section.items.some(subItem => location.pathname === subItem.path)
                           );
                       }
                  }
              }

              // Check if there is any dropdown content for the item
              const hasDropdown = item.name === 'Our Products' || (dropdownContent && (Array.isArray(dropdownContent) ? dropdownContent.length > 0 : (dropdownContent as SectionedDropdownItem[]).some(section => section.items.length > 0)));

              // Handle dropdown rendering: render a button if it has a dropdown, otherwise render a Link
              if (hasDropdown) {
                 // Determine specific background color for the dropdown based on item name
                 // Reverted dropdown background logic to only apply specific colors for known dropdowns
                 let dropdownBgClass = 'bg-white/40'; // Default glassmorphism white
                 if (item.name === 'Our Products') {
                    dropdownBgClass = 'bg-purple-100/40'; // Purple for Our Products
                 } else if (item.name === 'Company') {
                     // Keep Company dropdown white or set a different color if desired
                     dropdownBgClass = 'bg-white/40'; // Example: white for Company
                 }

                 return (
                    <div
                      key={item.name}
                      className="relative dropdown-parent group"
                      onMouseEnter={() => handleDropdownMouseEnter(item.name)}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <button
                        className={`flex items-center gap-1 transition-colors duration-300 ${
                          isActive ? 'text-purple-600' : 'hover:text-purple-600'
                        }`}
                        onClick={() => {
                          if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                          setOpenDropdown(isOpen ? null : item.name);
                        }}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        type="button"
                        ref={item.name === 'Company' ? companyLinkRef : null}
                      >
                        {item.name} <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {/* The dropdown content will be rendered outside this div, but within the header */}
                    </div>
                 );
              } else { // Standard links without dropdowns
                 return (
                  <React.Fragment key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1 transition-colors duration-300 ${
                        isActive ? 'text-purple-600' : 'hover:text-purple-600'
                      }`}
                      onClick={handleDropdownLinkClick} // Close dropdown on click
                    >
                      {item.name}
                    </Link>
                  </React.Fragment>
                 );
              }
            })}
          </nav>

          {/* Right section: Theme Toggle and Mobile Menu Toggle */}
          {/* Wrapped buttons in a div and applied flex-grow for equal spacing */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden z-50">
              {!isMenuOpen && (
                user ? (
                  <div className="relative user-dropdown">
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#dec9f8] text-[#2d215b] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6a4da8] mr-2"
                      onClick={handleUserDropdownClick}
                    >
                      {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="User Avatar" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        user.email ? user.email[0].toUpperCase() : '?'
                      )}
                    </button>
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-4 flex items-center border-b border-gray-200">
                          <img
                            src={user.user_metadata?.avatar_url || '/images/nophoto.jpg'}
                            alt="User Avatar"
                            className="h-12 w-12 rounded-full object-cover mr-3"
                          />
                          <div className="w-full max-w-[160px] truncate">
                            <p className="font-semibold text-gray-900 text-sm truncate">{user.email || 'User'}</p>
                          </div>
                        </div>
                        <div className="py-1">
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              <ShieldCheck size={18} className="mr-2 text-gray-500" /> Admin Panel
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-gray-200 py-1">
                          <button
                            onClick={async () => {
                              await signOut();
                              setIsUserDropdownOpen(false);
                              navigate('/');
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <ArrowUpRight size={18} className="mr-2 text-gray-500 rotate-180" /> Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-[#2d215b] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors mr-2"
                  >
                    Login
                  </Link>
                )
              )}
              {!isMenuOpen && (
                <button onClick={() => setIsMenuOpen(true)} className="text-[#2d215b] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6a4da8]">
                  <Menu size={24} />
                </button>
              )}
            </div>

            {/* Desktop User/Admin Profile and Login/Signup */}
            <div className="hidden lg:flex items-center relative space-x-4">
              {user ? (
                <div className="relative user-dropdown">
                  <button
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-white/30 border border-white/20 shadow-lg focus:outline-none"
                    onClick={handleUserDropdownClick}
                  >
                    <img
                      src={user.user_metadata?.avatar_url || '/images/nophoto.jpg'}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </button>
                  {isUserDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="px-4 py-4 flex items-center border-b border-gray-200">
                        <img
                          src={user.user_metadata?.avatar_url || '/images/nophoto.jpg'}
                          alt="User Avatar"
                          className="h-12 w-12 rounded-full object-cover mr-3"
                        />
                        <div className="w-full max-w-[160px] truncate">
                          <p className="font-semibold text-gray-900 text-sm truncate">{user.email || 'User'}</p>
                        </div>
                      </div>
                      <div className="py-1">
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <ShieldCheck size={18} className="mr-2 text-gray-500" /> Admin Panel
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-gray-200 py-1">
                        <button
                          onClick={async () => {
                            await signOut();
                            setIsUserDropdownOpen(false);
                            navigate('/');
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <ArrowUpRight size={18} className="mr-2 text-gray-500 rotate-180" /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
                    className="hidden lg:flex items-center justify-center h-12 px-6 rounded-full text-gray-900 font-bold bg-white/30 border border-white/20 shadow-lg hover:bg-white/50 transition-colors duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    to={`/signup?redirectTo=${encodeURIComponent(location.pathname)}`}
                    className="hidden lg:flex items-center justify-center h-12 px-6 rounded-full text-white font-bold bg-purple-600 border border-purple-700 shadow-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu content - Kept existing dark background for mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-40 flex flex-col items-center justify-center lg:hidden p-4 h-full overflow-y-auto">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-[#2d215b] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6a4da8] z-50">
            <X size={24} />
          </button>
          {/* User avatar/profile below the X button, with margin to avoid overlap */}
          {user && (
            <div className="mt-16 mb-6">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#dec9f8] text-[#2d215b] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6a4da8]"
                onClick={handleUserDropdownClick}
              >
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="User Avatar" className="h-full w-full rounded-full object-cover" />
                ) : (
                  user.email ? user.email[0].toUpperCase() : '?'
                )}
              </button>
            </div>
          )}
          <nav className="flex flex-col space-y-2 text-center w-full max-w-xs mx-auto">
            {navigation.map((item) => {
              const dropdownContent = dropdownContents[item.name];
              const hasDropdown = item.name === 'Our Products' || (dropdownContent && (Array.isArray(dropdownContent) ? dropdownContent.length > 0 : (dropdownContent as SectionedDropdownItem[]).some(section => section.items.length > 0)));
              if (hasDropdown) {
                return (
                  <div key={item.name}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-[#2d215b] hover:text-[#6a4da8] transition-colors focus:outline-none"
                      onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                    >
                      <span className="text-left">{item.name}</span>
                      <span className={`ml-2 transform transition-transform ${expandedMenu === item.name ? 'rotate-90' : ''}`}>▶</span>
                    </button>
                    {expandedMenu === item.name && (
                      <div className="pl-8 mt-1 space-y-1 text-left">
                        {item.name === 'Company' && Array.isArray(dropdownContent) && dropdownContent.map((col: any) => (
                          col.items.map((subItem: any) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block text-lg text-[#2d215b] hover:text-purple-600 py-1 px-2 rounded"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))
                        ))}
                        {item.name === 'Our Products' && Array.isArray(dropdownContent) && dropdownContent.map((section: any) => (
                          section.items.map((subItem: any) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block text-lg text-[#2d215b] hover:text-purple-600 py-1 px-2 rounded"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center w-full px-4 py-2 text-2xl font-semibold text-[#2d215b] hover:text-[#6a4da8] transition-colors text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-2xl font-semibold text-[#2d215b] hover:text-[#6a4da8] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Render the Company dropdown content outside the nav item but within the header */}
      {openDropdown === 'Company' && dropdownContents['Company'] && (
           // Check if it's the new Company dropdown structure
           Array.isArray(dropdownContents['Company']) && dropdownContents['Company'].length > 0 && 'items' in dropdownContents['Company'][0] && 'heading' in dropdownContents['Company'][0] && (
              // Render the new Company dropdown with three columns
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 mt-4 w-[960px] backdrop-blur-md bg-pink-100/80 border border-pink-200 shadow-xl rounded-xl py-8 px-10 z-50 transition-opacity transition-transform duration-300 ease-out ${openDropdown === 'Company' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                onMouseEnter={() => {
                  if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                }}
                onMouseLeave={handleDropdownMouseLeave}
                onMouseDown={(e) => e.stopPropagation()}
              >
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
                   {(dropdownContents['Company'] as { heading: string; items: { name: string; description: string; img?: string; path: string; }[] }[]).map((column, colIdx) => (
                     <div key={colIdx} className={`flex-1 flex flex-col ${colIdx > 0 ? 'ml-8' : ''}`}>
                       <div className="uppercase text-xs font-semibold text-gray-500 mb-4 text-center">{column.heading}</div>
                       <ul className={`flex-1 ${column.heading === 'MORE' ? 'space-y-1' : 'space-y-2'}`}>
                         {column.items.map((subItem) => (
                           <Link
                             key={subItem.name}
                             to={subItem.path}
                             onClick={handleDropdownLinkClick}
                             className={`flex items-center rounded-lg hover:text-[#6a4da8] group ${column.heading === 'MORE' ? 'py-1 px-4' : 'p-4'}`}
                           >
                             {subItem.img && (
                                // Using a simple img tag for the illustration
                               <img src={subItem.img} alt={subItem.name} className="w-20 h-20 object-cover mr-4 rounded-md" />
                             )}
                             {/* Added flex and items-center for text and icon alignment */}
                             <div className="flex-1 flex items-center">
                               <div>
                                 <div className="font-medium text-gray-900">{subItem.name}</div>
                                 {subItem.description && (
                                   <div className="text-sm text-gray-600">{subItem.description}</div>
                                 )}
                               </div>
                               {/* Arrow icon for items without description, positioned to the right */}
                               {(!subItem.description || column.heading === 'MORE') && (
                                 <span className="text-[#2d215b] group-hover:text-purple-600 transition-colors duration-200">
                                   <ArrowUpRight size={16} />
                                 </span>
                               )}
                             </div>
                           </Link>
                         ))}
                       </ul>
                     </div>
                   ))}
                 </div>
              </div>
           ) // Close the conditional rendering for the Company dropdown
      )}

      {/* Render the Products dropdown content */}
      {openDropdown === 'Our Products' && dropdownContents['Our Products'] && (
        <div 
          className={`absolute left-1/2 transform -translate-x-1/2 mt-4 w-[960px] backdrop-blur-md bg-purple-100/80 border border-purple-200 shadow-xl rounded-xl py-8 px-10 z-50 transition-opacity transition-transform duration-300 ease-out ${openDropdown === 'Our Products' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          onMouseEnter={() => {
            if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
          }}
          onMouseLeave={handleDropdownMouseLeave}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
            {mainCategories.map((mainCatName) => {
              const categoryData = productCategories.find(c => c.section === mainCatName);
              return (
                <div key={mainCatName} className="flex-1 flex flex-col">
                  <div className="uppercase text-xs font-semibold text-gray-500 mb-4">{mainCatName}</div>
                  <ul className="space-y-2">
                    {categoryData && categoryData.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          onClick={handleDropdownLinkClick}
                          className="flex items-center gap-2 p-2 rounded-lg hover:text-[#6a4da8] group"
                        >
                          <span className="text-purple-600 group-hover:text-purple-700">
                            {item.icon}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            {item.description && (
                              <div className="text-sm text-gray-600">{item.description}</div>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dropdown arrow positioned based on JS calculation */}
      {openDropdown === 'Company' && (
        <div 
          ref={companyDropdownArrowRef}
          className="absolute top-[72px] w-0 h-0 z-50 pointer-events-none"
        >
          {/* Outer border */}
          <div className="absolute top-0 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-pink-200"></div>
          {/* Inner fill */}
          <div className="absolute top-0 transform -translate-x-1/2 -translate-y-[1px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[7px] border-b-pink-100/80 z-10"></div>
        </div>
      )}

      {/* Products dropdown arrow */}
      {openDropdown === 'Our Products' && (
        <div 
          className="absolute top-[72px] left-1/2 transform -translate-x-1/2 w-0 h-0 z-50 pointer-events-none"
        >
          {/* Outer border */}
          <div className="absolute top-0 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-purple-200"></div>
          {/* Inner fill */}
          <div className="absolute top-0 transform -translate-x-1/2 -translate-y-[1px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[7px] border-b-purple-100/80 z-10"></div>
        </div>
      )}
    </header>
  );
};

export default Header;