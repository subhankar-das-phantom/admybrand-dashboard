'use client';
import { GetStaticProps } from 'next';
import { useState, useEffect, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon, 
  Plus, 
  Download, 
  Upload,
  Users as UsersIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  SortAsc,
  SortDesc,
  UserPlus
} from 'lucide-react';

import { User } from '../../interfaces';
import { sampleUserData } from '../../utils/sample-data';
import Layout from '../../components/Layout';

type Props = {
  users: User[];
};

interface FilterOptions {
  search: string;
  sortBy: 'name' | 'email' | 'id' | 'date';
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'list';
}

const UsersPage = ({ users }: Props) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
    viewMode: 'grid'
  });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const cardVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Mock additional user data
  const enhancedUsers = useMemo(() => {
    return users.map(user => ({
      ...user,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=100`,
      status: Math.random() > 0.3 ? 'active' : 'inactive',
      lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      joinDate: new Date(Date.now() - Math.random() * 365 * 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      totalOrders: Math.floor(Math.random() * 50) + 1,
      totalSpent: Math.floor(Math.random() * 5000) + 100,
      phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State`
    }));
  }, [users]);

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    let filtered = enhancedUsers.filter(user =>
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.id.toString().includes(filters.search)
    );

    // Sort users
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email?.toLowerCase() || '';
          bValue = b.email?.toLowerCase() || '';
          break;
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [enhancedUsers, filters]);

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const UserCard = ({ user }: { user: any }) => (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700"
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 dark:border-gray-600"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
                user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">{user.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 transition-colors duration-300">#{user.id}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className={`px-2 py-1 rounded-full ${
                  user.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                }`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleSelectUser(user.id)}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {user.email && (
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <Mail className="w-4 h-4" />
              <span className="text-sm truncate">{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{user.phone}</span>
            </div>
          )}
          {user.address && (
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm truncate">{user.address}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded-xl transition-colors duration-300">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{user.totalOrders}</p>
            <p className="text-xs text-blue-600 dark:text-blue-300">Orders</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded-xl transition-colors duration-300">
            <p className="text-2xl font-bold text-green-600 dark:text-green-300">${user.totalSpent}</p>
            <p className="text-xs text-green-600 dark:text-green-300">Spent</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <div className="flex items-center space-x-1 mb-1">
              <Calendar className="w-3 h-3" />
              <span>Joined {user.joinDate}</span>
            </div>
            <div>Last active: {user.lastActive}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/users/${user.id}`}>
              <button className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200">
                <Eye className="w-4 h-4" />
              </button>
            </Link>
            <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const UserRow = ({ user }: { user: any }) => (
    <motion.tr
      variants={itemVariants}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700"
    >
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={selectedUsers.includes(user.id)}
          onChange={() => handleSelectUser(user.id)}
          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">#{user.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 transition-colors duration-300">{user.email || 'N/A'}</td>
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 transition-colors duration-300">{user.phone || 'N/A'}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.status === 'active' 
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
        }`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 transition-colors duration-300">{user.totalOrders}</td>
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 transition-colors duration-300">${user.totalSpent}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <Link href={`/users/${user.id}`}>
            <button className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors duration-200">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
          <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors duration-200">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  return (
    <Layout title="Users List | ADmyBRAND Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section with Dark Mode */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Users Management</h1>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Manage and view all your users in one place</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  <span>Total: {users.length} users</span>
                  <span>•</span>
                  <span>Active: {enhancedUsers.filter(u => u.status === 'active').length}</span>
                  <span>•</span>
                  <span>Showing: {filteredUsers.length}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>Add User</span>
              </button>
              <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Import</span>
              </button>
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls with Dark Mode */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="email">Sort by Email</option>
                  <option value="id">Sort by ID</option>
                </select>

                <button
                  onClick={() => setFilters(prev => ({ 
                    ...prev, 
                    sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
                  }))}
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300"
                >
                  {filters.sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900 px-4 py-2 rounded-xl transition-colors duration-300">
                  <span className="text-sm text-blue-700 dark:text-blue-300">{selectedUsers.length} selected</span>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1 transition-colors duration-300">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    filters.viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, viewMode: 'list' }))}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    filters.viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Users Display with Dark Mode */}
        <motion.div variants={itemVariants}>
          {filters.viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-colors duration-300">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Orders</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Spent</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

        {/* Empty State with Dark Mode */}
        {filteredUsers.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
              <UsersIcon className="w-12 h-12 text-gray-400 dark:text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">No users found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">Try adjusting your search criteria or add some users.</p>
            <button className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
              Add First User
            </button>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const users: User[] = sampleUserData;
  return { props: { users } };
};

export default UsersPage;
