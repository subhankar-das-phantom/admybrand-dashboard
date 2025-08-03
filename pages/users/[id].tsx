'use client';
import { GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User as UserIcon,
  Edit,
  Share,
  MoreVertical,
  Activity,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Star,
  Clock,
  Globe
} from "lucide-react";

import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

type Props = {
  item?: User;
  errors?: string;
};

const StaticPropsDetail = ({ item, errors }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

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

  if (errors) {
    return (
      <Layout title="Error | ADmyBRAND Dashboard">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">😔</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-8 bg-red-50 p-4 rounded-lg">
              <span className="font-semibold">Error:</span> {errors}
            </p>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center mx-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </motion.div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout title="User Not Found | ADmyBRAND Dashboard">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h2>
            <p className="text-gray-600 mb-8">The user you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center mx-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </motion.div>
      </Layout>
    );
  }

  // Mock additional user data for demonstration
  const mockUserStats = {
    totalOrders: Math.floor(Math.random() * 50) + 10,
    totalSpent: Math.floor(Math.random() * 5000) + 500,
    avgOrderValue: Math.floor(Math.random() * 200) + 50,
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    joinDate: new Date(Date.now() - Math.random() * 365 * 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    rating: (Math.random() * 2 + 3).toFixed(1)
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'activity', label: 'Activity', icon: Clock }
  ];

  return (
    <Layout title={`${item.name} | ADmyBRAND Dashboard`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header with Back Button */}
        <motion.div variants={headerVariants} className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
          >
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-semibold">Back to Users</span>
          </button>

          <div className="flex items-center space-x-3">
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300">
              <Share className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* User Profile Header */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-12 relative">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white border-opacity-30">
                    <UserIcon className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-white text-opacity-90">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>{item.email || 'No email provided'}</span>
                    </div>
                    {item.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-5 h-5" />
                        <span>{item.phone}</span>
                      </div>
                    )}
                    {item.address && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>{`${item.address.street}, ${item.address.city}, ${item.address.zipcode}`}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{mockUserStats.rating}</span>
                    </div>
                    <div className="w-px h-5 bg-white bg-opacity-30"></div>
                    <div className="text-sm">
                      Joined {mockUserStats.joinDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-0 grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-30">
                  <p className="text-2xl font-bold text-white">{mockUserStats.totalOrders}</p>
                  <p className="text-white text-opacity-75 text-sm">Total Orders</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white border-opacity-30">
                  <p className="text-2xl font-bold text-white">${mockUserStats.totalSpent}</p>
                  <p className="text-white text-opacity-75 text-sm">Total Spent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 pb-4 border-b-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <motion.div variants={itemVariants}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">User Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{mockUserStats.totalOrders}</p>
                      <p className="text-gray-600 text-sm">Total Orders</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">${mockUserStats.totalSpent}</p>
                      <p className="text-gray-600 text-sm">Total Spent</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">${mockUserStats.avgOrderValue}</p>
                      <p className="text-gray-600 text-sm">Avg Order Value</p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">User Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">User ID</span>
                      <span className="text-gray-900 font-semibold">#{item.id}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Full Name</span>
                      <span className="text-gray-900 font-semibold">{item.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Email Address</span>
                      <span className="text-gray-900 font-semibold">{item.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Join Date</span>
                      <span className="text-gray-900 font-semibold">{mockUserStats.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Last Login</span>
                      <span className="text-gray-900 font-semibold">{mockUserStats.lastLogin}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600 font-medium">Status</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300">
                      Send Message
                    </button>
                    <button className="w-full bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300">
                      Create Order
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300">
                      View Analytics
                    </button>
                    <button className="w-full bg-orange-100 text-orange-700 px-4 py-3 rounded-xl font-semibold hover:bg-orange-200 transition-colors duration-300">
                      Export Data
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Insights</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">High-value customer</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Regular purchaser</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Prefers email communication</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Order History</h3>
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No orders found for this user.</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300">
                  Create First Order
                </button>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recent activity to show.</p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = sampleUserData.map((user) => ({
    params: { id: user.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const item = sampleUserData.find((data) => data.id === Number(id));
    
    if (!item) {
      return {
        notFound: true,
      };
    }
    
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
