import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Droplets, ChevronDown, Package, Zap, Database, Search, Link2, Activity, Map, Users, ArrowUpRight } from 'lucide-react';

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

  // Existing Products dropdown data
  const productsDropdown: SectionedDropdownItem[] = [
    {
      section: 'Champion Chaser',
      items: [
        {
          name: 'Champion Chaser',
          description: 'Old Customer + New Job = Hot Lead',
          icon: <Package className="w-5 h-5 text-rose-500" />,
          path: '/products/champion-chaser',
        },
        {
          name: 'Workflows',
          description: 'Sync data back to any app',
          icon: <Zap className="w-5 h-5 text-green-400" />,
          path: '/products/workflows',
        },
      ],
    },
    {
      section: 'Platform',
      items: [
        {
          name: 'Single source of truth',
          description: 'A single record of every customer',
          icon: <Database className="w-5 h-5 text-yellow-500" />,
          path: '/products/single-source',
        },
        {
          name: 'Spotlights',
          description: 'Retain and expand existing accounts',
          icon: <Search className="w-5 h-5 text-blue-400" />,
          path: '/products/spotlights',
        },
        {
          name: 'Integrations',
          description: '1 click integrations with over 30 tools',
          icon: <Link2 className="w-5 h-5 text-cyan-500" />,
          path: '/products/integrations',
        },
        {
          name: 'AI Health forecasting',
          description: 'Use AI to forecast renewal revenue',
          icon: <Activity className="w-5 h-5 text-purple-500" />,
          path: '/products/ai-health',
        },
        {
          name: 'Account mapping',
          description: 'Map relationships at key account',
          icon: <Map className="w-5 h-5 text-pink-500" />,
          path: '/products/account-mapping',
        },
      ],
    },
  ];

  // Map navigation item names to their dropdown content - reverted to original mappings
  const dropdownContents: { [key: string]: any } = { // Use any temporarily to avoid type errors during restructuring
    'Company': companyDropdown,
    'Our Products': productsDropdown,
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
              <Droplets className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-white">
              Aqua Blue Group
            </span>
          </Link>
          </div>

          {/* Centered Navigation Pill with Glassmorphism - Hidden on mobile */}
          {/* Made pill bigger, text black and bold */}
          <nav className="hidden lg:flex justify-center items-center backdrop-blur-md bg-white/30 border border-white/20 shadow-lg rounded-full px-10 py-4 space-x-8 text-gray-900 font-bold mx-auto">
            {navigation.map((item) => {
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
              const hasDropdown = dropdownContent && (Array.isArray(dropdownContent) ? dropdownContent.length > 0 : (dropdownContent as SectionedDropdownItem[]).some(section => section.items.length > 0));

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
              <Link
                     key={item.name}
                to={item.path}
                     className={`flex items-center gap-1 transition-colors duration-300 ${
                       isActive ? 'text-purple-600' : 'hover:text-purple-600'
                     }`}
                     onClick={handleDropdownLinkClick} // Close dropdown on click
              >
                {item.name}
              </Link>
                 );
              }
            })}
          </nav>

          {/* Right section: Theme Toggle and Mobile Menu Toggle */}
          {/* Wrapped buttons in a div and applied flex-grow for equal spacing */}
          <div className="flex-1 flex items-center justify-end">
             {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-300 lg:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu content - Kept existing dark background for mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 shadow-lg py-2">
          <nav className="container mx-auto px-4 py-2 space-y-2">
            {/* Using updated navigation for mobile menu */}
            {navigation.map((item) => {
                 const dropdownContent = dropdownContents[item.name];
                 
                 // Determine active state for mobile links/dropdowns
                 let isActive = location.pathname === item.path;
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
                 const hasDropdown = dropdownContent && (Array.isArray(dropdownContent) ? dropdownContent.length > 0 : (dropdownContent as SectionedDropdownItem[]).some(section => section.items.length > 0));

                 if (hasDropdown) {
                    return (
                       <div key={item.name} className="mb-1 last:mb-0">
                          <details>
                              <summary className={`flex items-center text-sm font-medium cursor-pointer select-none py-2 ${
                                   isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                              }`}>
                                   {item.name} <ChevronDown className="ml-1 w-4 h-4" />
                              </summary>
                               {/* Mobile Dropdown Content */}
                               <div className="pl-4 mt-1 space-y-1">
                                 {dropdownContent && Array.isArray(dropdownContent) && dropdownContent.length > 0 && 'name' in dropdownContent[0] ? (
                                    // Render simple list dropdown content
                                     (dropdownContent as SimpleDropdownItem[]).map((sub) => (
                                          <li key={sub.name}>
                                              <Link to={sub.path} onClick={() => setIsMenuOpen(false)} className={`block py-2 text-sm transition-colors ${location.pathname === sub.path ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}>
                                                  {sub.name}
                                              </Link>
                                          </li>
                                     ))
                                  ) : dropdownContent && Array.isArray(dropdownContent) && dropdownContent.length > 0 && 'section' in dropdownContent[0] ? (
                                     // Render sectioned dropdown content
                                      (dropdownContent as SectionedDropdownItem[]).map((section, idx) => (
                                          <div key={section.section} className="mb-2 last:mb-0">
                                              <details>
                                                  <summary className="flex items-center text-sm font-medium cursor-pointer select-none text-gray-400">
                                                      {section.section}
                                                  </summary>
                                                  <ul className="pl-4 mt-1 space-y-1">
                                                      {section.items.map((subItem) => (
                                                          <li key={subItem.name}>
                                                              <Link to={subItem.path} onClick={() => setIsMenuOpen(false)} className={`block py-2 text-sm transition-colors ${location.pathname === subItem.path ? 'text-blue-400' : 'text-gray-400 hover:text-blue-400'}`}>
                                                                  {subItem.name}
                                                              </Link>
                                                          </li>
                                                      ))}
                                                  </ul>
                                              </details>
                                          </div>
                                      ))
                                  ) : null // Render nothing if dropdownContent is empty or invalid type
                                  }
                               </div>
                          </details>
                       </div>
                    );
                 } else { // Standard mobile links
                    return (
              <Link
                            key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                            className={`block py-2 text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                {item.name}
              </Link>
                    );
                 }
            })}
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
    </header>
  );
};

export default Header;