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
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 text-center transition-colors duration-300">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
              <span className="text-4xl">😔</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Oops! Something went wrong</h2>
            <p className="text-red-600 dark:text-red-400 mb-8 bg-red-50 dark:bg-red-900 p-4 rounded-lg transition-colors duration-300">
              <span className="font-semibold">Error:</span> {errors}
            </p>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mx-auto"
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 text-center transition-colors duration-300">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
              <UserIcon className="w-10 h-10 text-gray-400 dark:text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">User Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">The user you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mx-auto"
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
        {/* Header with Back Button - Dark Mode */}
        <motion.div variants={headerVariants} className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
          >
            <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-semibold">Back to Users</span>
          </button>

          <div className="flex items-center space-x-3">
            <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300">
              <Share className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-3 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl transition-colors duration-300">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300">
              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </motion.div>

        {/* User Profile Header - Dark Mode */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 px-8 py-12 relative transition-colors duration-300">
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
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
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

          {/* Tabs - Dark Mode */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 pb-4 border-b-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
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

        {/* Content based on active tab - Dark Mode */}
        <motion.div variants={itemVariants}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Stats - Dark Mode */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">User Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <ShoppingCart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{mockUserStats.totalOrders}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">Total Orders</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">${mockUserStats.totalSpent}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">Total Spent</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">${mockUserStats.avgOrderValue}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">Avg Order Value</p>
                    </div>
                  </div>
                </div>

                {/* User Details - Dark Mode */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">User Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">User ID</span>
                      <span className="text-gray-900 dark:text-white font-semibold">#{item.id}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Full Name</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{item.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Email Address</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{item.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Join Date</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{mockUserStats.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Last Login</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{mockUserStats.lastLogin}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Status</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-semibold">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Dark Mode */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
                      Send Message
                    </button>
                    <button className="w-full bg-green-600 dark:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300">
                      Create Order
                    </button>
                    <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                      View Analytics
                    </button>
                    <button className="w-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-4 py-3 rounded-xl font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors duration-300">
                      Export Data
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-6 border border-purple-100 dark:border-purple-800 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Customer Insights</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">High-value customer</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Regular purchaser</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Prefers email communication</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Order History</h3>
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">No orders found for this user.</p>
                <button className="mt-4 bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
                  Create First Order
                </button>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Recent Activity</h3>
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 dark:text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">No recent activity to show.</p>
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
