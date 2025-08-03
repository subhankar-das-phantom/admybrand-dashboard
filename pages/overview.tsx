'use client';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion, Variants } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  BarChart3,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  MousePointer,
  ShoppingBag,
  Zap
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  growth: string;
  growthType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  description?: string;
}

const EnhancedMetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  growth, 
  growthType, 
  icon, 
  color, 
  bgGradient,
  description 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${bgGradient} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-opacity-20 cursor-pointer overflow-hidden relative group`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-32 h-32 rounded-full bg-white absolute -top-8 -right-8"></div>
        <div className="w-20 h-20 rounded-full bg-white absolute -bottom-4 -left-4"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className={`${color} text-sm font-semibold uppercase tracking-wider mb-2 opacity-80`}>
              {title}
            </p>
            <p className={`text-3xl font-bold ${color} mb-1`}>
              {value}
            </p>
            {description && (
              <p className={`text-xs ${color} opacity-60`}>
                {description}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
            {icon}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {growthType === 'positive' ? (
              <TrendingUp className={`w-4 h-4 ${color}`} />
            ) : growthType === 'negative' ? (
              <TrendingDown className={`w-4 h-4 ${color}`} />
            ) : (
              <BarChart3 className={`w-4 h-4 ${color}`} />
            )}
            <span className={`text-sm font-medium ${color} opacity-90`}>
              {growth}
            </span>
          </div>
          
          {/* Trend Indicator */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            growthType === 'positive' 
              ? 'bg-green-500 bg-opacity-20 text-green-100' 
              : growthType === 'negative' 
                ? 'bg-red-500 bg-opacity-20 text-red-100'
                : 'bg-gray-500 bg-opacity-20 text-gray-100'
          }`}>
            {growthType === 'positive' ? '↗' : growthType === 'negative' ? '↘' : '→'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OverviewPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleString());
    
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const periods = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'];

  const handleDownload = () => {
    const data = [
      ["Metric", "Value", "Growth"],
      ["Total Revenue", "$12,345", "+5.2%"],
      ["Active Users", "8,765", "+2.1%"],
      ["Conversions", "1,234", "-1.5%"],
      ["Growth Rate", "15%", "+3.0%"]
    ];

    const csvContent = data.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "dashboard_overview.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout title="Overview | Admybrand Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Enhanced Header Section with Dark Mode */}
        <motion.div 
          variants={headerVariants}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden transition-colors duration-300"
        >
          {/* Background Animation */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold mb-3 text-white"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Overview Dashboard
                </motion.h1>
                <motion.p 
                  className="text-lg opacity-90 text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Monitor your business performance and key metrics
                </motion.p>
                <motion.p 
                  className="text-sm opacity-70 mt-2 text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {isClient ? `Last updated: ${currentTime}` : 'Loading...'}
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Period Selector */}
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-2">
                  <Calendar className="w-5 h-5 text-white" />
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                  >
                    {periods.map(period => (
                      <option key={period} value={period} className="text-gray-800 bg-white">
                        {period}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <motion.button 
                    className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Refresh data"
                  >
                    <RefreshCw className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button 
                    onClick={handleDownload}
                    className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Download data"
                  >
                    <Download className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button 
                    className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl hover:bg-opacity-30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Filter data"
                  >
                    <Filter className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Cards - Gradients work well in both modes */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <EnhancedMetricCard
            title="Total Revenue"
            value="$12,345"
            growth="+5.2% vs last month"
            growthType="positive"
            description="Monthly recurring revenue"
            icon={<DollarSign className="w-7 h-7 text-white" />}
            color="text-green-100"
            bgGradient="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600"
          />

          <EnhancedMetricCard
            title="Active Users"
            value="8,765"
            growth="+2.1% vs last month"
            growthType="positive"
            description="Daily active users"
            icon={<Users className="w-7 h-7 text-white" />}
            color="text-blue-100"
            bgGradient="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600"
          />

          <EnhancedMetricCard
            title="Conversions"
            value="1,234"
            growth="-1.5% vs last month"
            growthType="negative"
            description="Goal completions"
            icon={<Target className="w-7 h-7 text-white" />}
            color="text-orange-100"
            bgGradient="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600"
          />

          <EnhancedMetricCard
            title="Growth Rate"
            value="15%"
            growth="+3.0% vs last month"
            growthType="positive"
            description="Monthly growth"
            icon={<TrendingUp className="w-7 h-7 text-white" />}
            color="text-purple-100"
            bgGradient="bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600"
          />
        </motion.div>

        {/* Quick Stats Section with Dark Mode */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold uppercase tracking-wide">Page Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24,567</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-2xl">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-colors duration-300" style={{ width: '68%' }}></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">68%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold uppercase tracking-wide">Click Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.24%</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900 rounded-2xl">
                <MousePointer className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-colors duration-300" style={{ width: '82%' }}></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">82%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold uppercase tracking-wide">Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,847</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-2xl">
                <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-colors duration-300" style={{ width: '91%' }}></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">91%</span>
            </div>
          </div>
        </motion.div>

        {/* Performance Insights with Dark Mode */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600 transition-colors duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Performance Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Key metrics and recommendations for your business</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-2xl">
              <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Revenue Growth</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Your revenue is up 5.2% this month. Great job!</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Conversion Rate</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Consider optimizing your landing pages to improve conversions.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">User Engagement</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">User activity is trending upward. Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default OverviewPage;
