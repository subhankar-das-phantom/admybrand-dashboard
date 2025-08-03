'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';
import Layout from '../components/Layout';

import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { salesData, topProductsData, sampleUserData } from '../utils/sample-data';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Pie chart data
const pieChartData = [
  { name: 'Desktop', value: 65, color: '#3B82F6' },
  { name: 'Mobile', value: 25, color: '#10B981' },
  { name: 'Tablet', value: 10, color: '#F59E0B' }
];

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  
  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Static data calculations (for consistent SSR/CSR)
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    growth: 0,
    enhancedUserData: [] as any[]
  });

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
    
    // Calculate dashboard data on client side only
    const totalUsers = sampleUserData.length;
    const totalOrders = salesData.reduce((acc, cur) => acc + cur.sales, 0);
    const totalRevenue = salesData.reduce((acc, cur) => acc + cur.sales, 0) * 1.2;
    const growth = ((salesData[salesData.length - 1].sales - salesData[0].sales) / salesData[0].sales) * 100;
    
    // Enhanced user data with consistent generation
    const enhancedUserData = sampleUserData.map((user, index) => ({
      ...user,
      email: `user${user.id}@example.com`,
      status: index % 3 === 0 ? 'inactive' : 'active',
      orders: Math.floor(Math.random() * 50) + 1,
      revenue: Math.floor(Math.random() * 5000) + 100,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));

    setDashboardData({
      totalUsers,
      totalOrders,
      totalRevenue,
      growth,
      enhancedUserData
    });
    
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter and sort data for table
  const filteredData = dashboardData.enhancedUserData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField as keyof typeof a];
    let bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Custom tooltip component with dark mode support
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value?.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom pie chart tooltip with dark mode support
  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{payload[0].name}</p>
          <p className="text-sm" style={{ color: payload[0].payload.color }}>
            {`${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <Layout title="Dashboard">
        <div className="space-y-8">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Dashboard Overview</h1>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Welcome back! Here's what's happening with your business today.</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  Loading...
                </div>
              </div>
            </div>
          </div>

          {/* Loading Skeleton Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 p-6 rounded-2xl shadow-lg animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>

          {/* Loading Chart Skeletons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gray-200 dark:bg-gray-700 p-8 rounded-2xl shadow-lg animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 p-8 rounded-2xl shadow-lg animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Dashboard Overview</h1>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                Last updated: {currentTime}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Cards with consistent data */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-300 text-sm font-semibold uppercase tracking-wide">Total Users</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">{dashboardData.totalUsers.toLocaleString()}</p>
                <p className="text-blue-600 dark:text-blue-300 text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="bg-blue-500 dark:bg-blue-600 p-3 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-300 text-sm font-semibold uppercase tracking-wide">Total Orders</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{dashboardData.totalOrders.toLocaleString()}</p>
                <p className="text-green-600 dark:text-green-300 text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +8.5% from last month
                </p>
              </div>
              <div className="bg-green-500 dark:bg-green-600 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-300 text-sm font-semibold uppercase tracking-wide">Revenue</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">${dashboardData.totalRevenue.toLocaleString()}</p>
                <p className="text-purple-600 dark:text-purple-300 text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +15.3% from last month
                </p>
              </div>
              <div className="bg-purple-500 dark:bg-purple-600 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br ${dashboardData.growth >= 0 ? 'from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 border-emerald-200 dark:border-emerald-700' : 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 border-red-200 dark:border-red-700'} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${dashboardData.growth >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300'} text-sm font-semibold uppercase tracking-wide`}>Growth Rate</p>
                <p className={`text-3xl font-bold ${dashboardData.growth >= 0 ? 'text-emerald-900 dark:text-emerald-100' : 'text-red-900 dark:text-red-100'} mt-2`}>{dashboardData.growth.toFixed(2)}%</p>
                <p className={`${dashboardData.growth >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300'} text-sm mt-2 flex items-center`}>
                  {dashboardData.growth >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {dashboardData.growth >= 0 ? 'Trending up' : 'Needs attention'}
                </p>
              </div>
              <div className={`${dashboardData.growth >= 0 ? 'bg-emerald-500 dark:bg-emerald-600' : 'bg-red-500 dark:bg-red-600'} p-3 rounded-full`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rest of your charts and components remain the same... */}
        {/* Enhanced Charts Section with dark mode */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Trend Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Trend</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Monthly sales performance overview</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                  This Year
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Last Year
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2, fill: '#ffffff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Traffic Sources</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Visitor distribution by device</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry: any) => (
                    <span style={{ color: entry.color }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Continue with rest of your components... */}
        {/* The rest remains the same but using dashboardData.enhancedUserData for the table */}
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
