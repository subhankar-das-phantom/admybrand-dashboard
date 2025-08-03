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

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
    
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
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
              className={`fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl ${
                !isSidebarOpen ? 'lg:w-16' : 'w-72'
              } flex flex-col h-screen`}
            >
              {/* Logo Section - Fixed at top */}
              <div className="flex-shrink-0 p-6 border-b border-gray-700">
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
                        <h1 className="text-xl font-bold">ADmyBRAND</h1>
                        <p className="text-xs text-gray-400">Insights Dashboard</p>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Mobile Close Button - Only visible on mobile */}
                  <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation - Scrollable middle section */}
              <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
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
                              : 'hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          <div className={`${isActiveRoute(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors duration-300`}>
                            {item.icon}
                          </div>
                          {isSidebarOpen && (
                            <div className="flex items-center justify-between flex-1">
                              <span className="font-medium">{item.label}</span>
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
                              : 'hover:bg-gray-700 hover:text-white'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className={`${isActiveRoute(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors duration-300`}>
                            {item.icon}
                          </div>
                          {isSidebarOpen && (
                            <div className="flex items-center justify-between flex-1">
                              <span className="font-medium">{item.label}</span>
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
              <div className="flex-shrink-0 p-4 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">
                    {isClient && `${currentTime}`}
                  </div>
                  <hr className="border-gray-700 mb-3" />
                  <div className="text-xs text-gray-500">
                    © 2025 ADmyBRAND
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
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
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">Welcome back! Here's your overview.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 space-x-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-gray-600" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@admybrand.com</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">Admin User</p>
                        <p className="text-sm text-gray-500">admin@admybrand.com</p>
                      </div>
                      
                      <div className="py-2">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">Profile</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                          <Settings className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">Settings</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3">
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">Help & Support</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-red-600">
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
        <main className="flex-1 p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-auto">
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
