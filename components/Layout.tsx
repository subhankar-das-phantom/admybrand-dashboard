'use client';
import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Home, 
  Info, 
  Menu, 
  X, 
  Bell, 
  Search, 
  Settings, 
  User,
  ChevronDown,
  Moon,
  Sun,
  Database,
  LogOut,
  HelpCircle,
  Zap
} from "lucide-react";

type Props = {
  children?: ReactNode;
  title?: string;
};

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  external?: boolean;
}

const Layout = ({ children, title = "ADmyBRAND Insights Dashboard" }: Props) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration and dark mode persistence
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
    
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Load dark mode preference from local storage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Check system preference if no saved preference
      setIsDarkMode(true);
    }

    return () => clearInterval(interval);
  }, []);

  // Apply dark mode class to HTML element and save preference
  useEffect(() => {
    if (isClient) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }
  }, [isDarkMode, isClient]);

  // Navigation items
  const navigationItems: NavigationItem[] = [
    {
      href: "/overview",
      label: "Overview",
      icon: <Home className="w-5 h-5" />,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
      badge: "New"
    },
    {
      href: "/users",
      label: "Users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      href: "/about",
      label: "About",
      icon: <Info className="w-5 h-5" />,
    }
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/overview' && router.pathname === '/') return true;
    return router.pathname === href || router.pathname.startsWith(href + '/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="min-h-screen flex transition-colors duration-300">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Modern analytics dashboard for business intelligence" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isMobileMenuOpen) && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white shadow-2xl transition-colors duration-300 ${
                !isSidebarOpen ? 'lg:w-16' : 'w-72'
              } flex flex-col h-screen`}
            >
              {/* Logo Section - Fixed at top */}
              <div className="flex-shrink-0 p-6 border-b border-gray-700 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <motion.div 
                    className="flex items-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    {isSidebarOpen && (
                      <div>
                        <h1 className="text-xl font-bold text-white">ADmyBRAND</h1>
                        <p className="text-xs text-gray-400 dark:text-gray-300">Insights Dashboard</p>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Mobile Close Button - Only visible on mobile */}
                  <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Navigation - Scrollable middle section */}
              <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 dark:scrollbar-track-gray-900">
                <div className="p-4 space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                            isActiveRoute(item.href)
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white'
                          }`}
                        >
                          <div className={`${isActiveRoute(item.href) ? 'text-white' : 'text-gray-400 dark:text-gray-300 group-hover:text-white'} transition-colors duration-300`}>
                            {item.icon}
                          </div>
                          {isSidebarOpen && (
                            <div className="flex items-center justify-between flex-1">
                              <span className="font-medium text-white">{item.label}</span>
                              {item.badge && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                            isActiveRoute(item.href)
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={`${isActiveRoute(item.href) ? 'text-white' : 'text-gray-400 dark:text-gray-300 group-hover:text-white'} transition-colors duration-300`}>
                            {item.icon}
                          </div>
                          {isSidebarOpen && (
                            <div className="flex items-center justify-between flex-1">
                              <span className="font-medium text-white">{item.label}</span>
                              {item.badge && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Sidebar Footer - Fixed at bottom */}
              <div className="flex-shrink-0 p-4 border-t border-gray-700 dark:border-gray-600">
                {/* Add the upgrade card back */}
                {isSidebarOpen && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-white mb-2">Upgrade Pro</h3>
                    <p className="text-xs text-blue-100 mb-3">Unlock advanced analytics</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors duration-200 w-full">
                      Upgrade Now
                    </button>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-sm text-gray-400 dark:text-gray-300 mb-2">
                    {isClient && `${currentTime}`}
                  </div>
                  <hr className="border-gray-700 dark:border-gray-600 mb-3" />
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    © 2025 ADmyBRAND
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              {/* Single Toggle Button - Works for both mobile and desktop */}
              <button
                onClick={() => {
                  // On mobile, toggle mobile menu
                  // On desktop, toggle sidebar
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    toggleMobileMenu();
                  } else {
                    toggleSidebar();
                  }
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Welcome back! Here's your overview.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 space-x-2 transition-colors duration-300">
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-300 w-32"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? 
                  <Sun className="w-5 h-5 text-yellow-500 dark:text-yellow-400" /> : 
                  <Moon className="w-5 h-5 text-gray-600" />
                }
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">admin@admybrand.com</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-colors duration-300"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white">Admin User</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">admin@admybrand.com</p>
                      </div>
                      
                      <div className="py-2">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200">
                          <User className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-200">Profile</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200">
                          <Settings className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-200">Settings</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-colors duration-200">
                          <HelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-200">Help & Support</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 text-red-600 dark:text-red-400 transition-colors duration-200">
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-auto transition-colors duration-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Click outside to close menus */}
      {(isUserMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Layout;
