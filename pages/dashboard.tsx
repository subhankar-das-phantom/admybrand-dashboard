'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import Layout from '../components/Layout';

import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { salesData, topProductsData, sampleUserData } from '../utils/sample-data';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  const totalUsers = sampleUserData.length;
  const totalOrders = salesData.reduce((acc, cur) => acc + cur.sales, 0);
  const totalRevenue = salesData.reduce((acc, cur) => acc + cur.sales, 0) * 1.2;
  const growth = ((salesData[salesData.length - 1].sales - salesData[0].sales) / salesData[0].sales) * 100;

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
    
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{`${label}`}</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                {isClient ? `Last updated: ${currentTime}` : 'Loading...'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Total Users</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{totalUsers.toLocaleString()}</p>
                <p className="text-blue-600 text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">Total Orders</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{totalOrders.toLocaleString()}</p>
                <p className="text-green-600 text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +8.5% from last month
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Revenue</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">${totalRevenue.toLocaleString()}</p>
                <p className="text-purple-600 text-sm mt-2 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +15.3% from last month
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br ${growth >= 0 ? 'from-emerald-50 to-emerald-100 border-emerald-200' : 'from-red-50 to-red-100 border-red-200'} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${growth >= 0 ? 'text-emerald-600' : 'text-red-600'} text-sm font-semibold uppercase tracking-wide`}>Growth Rate</p>
                <p className={`text-3xl font-bold ${growth >= 0 ? 'text-emerald-900' : 'text-red-900'} mt-2`}>{growth.toFixed(2)}%</p>
                <p className={`${growth >= 0 ? 'text-emerald-600' : 'text-red-600'} text-sm mt-2 flex items-center`}>
                  {growth >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {growth >= 0 ? 'Trending up' : 'Needs attention'}
                </p>
              </div>
              <div className={`${growth >= 0 ? 'bg-emerald-500' : 'bg-red-500'} p-3 rounded-full`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Trend Chart - Enhanced */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Sales Trend</h3>
                <p className="text-gray-600 text-sm mt-1">Monthly sales performance overview</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                  This Year
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
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

          {/* Top Products Chart - Enhanced */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Top Products</h3>
              <p className="text-gray-600 text-sm mt-1">Best performing products this month</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topProductsData}>
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
                <Bar 
                  dataKey="sales" 
                  fill="#8884d8"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Additional Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 rounded-2xl text-white shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Conversion Rate</h4>
            <p className="text-3xl font-bold">3.2%</p>
            <p className="text-orange-100 text-sm mt-2">+0.3% from last month</p>
          </div>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-2xl text-white shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Avg. Order Value</h4>
            <p className="text-3xl font-bold">$89.50</p>
            <p className="text-cyan-100 text-sm mt-2">+$12.30 from last month</p>
          </div>
          <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 rounded-2xl text-white shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Customer Satisfaction</h4>
            <p className="text-3xl font-bold">4.8/5</p>
            <p className="text-violet-100 text-sm mt-2">Based on 1,234 reviews</p>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
