'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import { motion, Variants } from 'framer-motion';
import { 
  ArrowLeft, 
  Code, 
  Zap, 
  Users, 
  Target, 
  Star,
  Github,
  ExternalLink,
  Mail,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  TrendingUp,
  Award,
  Coffee,
  Globe
} from 'lucide-react';

const AboutPage = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleString());
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

  const heroVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Modern Technology Stack",
      description: "Built with Next.js 14, TypeScript, and Tailwind CSS for optimal performance and developer experience.",
      color: "bg-blue-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized for speed with static generation, image optimization, and modern bundling techniques.",
      color: "bg-yellow-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Type Safe",
      description: "Full TypeScript integration ensures robust code quality and excellent developer experience.",
      color: "bg-green-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User Focused",
      description: "Designed with user experience in mind, featuring intuitive navigation and beautiful interfaces.",
      color: "bg-purple-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analytics Ready",
      description: "Comprehensive dashboard with real-time data visualization and business intelligence features.",
      color: "bg-indigo-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Scalable Architecture",
      description: "Built to scale with modular components, efficient data handling, and performance optimization.",
      color: "bg-pink-500"
    }
  ];

  const technologies = [
    { name: "Next.js 14", description: "React framework with App Router", logo: "⚛️" },
    { name: "TypeScript", description: "Type-safe JavaScript", logo: "📘" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework", logo: "🎨" },
    { name: "Framer Motion", description: "Animation library", logo: "🎭" },
    { name: "Lucide Icons", description: "Beautiful icon library", logo: "✨" },
    { name: "Recharts", description: "Data visualization", logo: "📊" }
  ];

  const stats = [
    { number: "100%", label: "TypeScript Coverage", icon: <Code className="w-6 h-6" /> },
    { number: "95+", label: "Performance Score", icon: <Zap className="w-6 h-6" /> },
    { number: "10+", label: "Components", icon: <Target className="w-6 h-6" /> },
    { number: "5★", label: "User Experience", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <Layout title="About | ADmyBRAND Insights Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Navigation */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
          >
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-semibold">Back to Dashboard</span>
          </Link>

          <div className="text-sm text-gray-500">
            {isClient && `Last updated: ${currentTime}`}
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          variants={heroVariants}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white border-opacity-30"
            >
              <Heart className="w-12 h-12 text-pink-300" />
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-6xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              About ADmyBRAND Insights
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              A modern, AI-powered analytics dashboard built with cutting-edge technologies to provide 
              beautiful, fast, and intuitive business intelligence solutions.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 shadow-lg">
                <Globe className="w-5 h-5" />
                <span>Explore Dashboard</span>
              </button>
              <button className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-opacity-30 transition-colors duration-300 flex items-center space-x-2 border border-white border-opacity-30">
                <Github className="w-5 h-5" />
                <span>View Source</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 1.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our dashboard special and how it can transform your business intelligence workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern, industry-leading technologies for optimal performance and developer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{tech.logo}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                    <p className="text-gray-600 text-sm">{tech.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="lg:w-1/2">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                To democratize business intelligence by creating beautiful, intuitive, and powerful analytics tools 
                that help businesses make data-driven decisions with confidence.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Simplify complex data visualization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Provide actionable business insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Deliver exceptional user experiences</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Highlights</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Modern Design System</h4>
                      <p className="text-gray-600 text-sm">Consistent, accessible, and beautiful UI components</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Coffee className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Developer Experience</h4>
                      <p className="text-gray-600 text-sm">Built with TypeScript and modern tooling for maintainability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Performance Optimized</h4>
                      <p className="text-gray-600 text-sm">Fast loading times and smooth interactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Have questions about the dashboard or want to collaborate? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </button>
            <button className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-opacity-30 transition-colors duration-300 flex items-center space-x-2 border border-white border-opacity-30">
              <ExternalLink className="w-5 h-5" />
              <span>Documentation</span>
            </button>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div variants={itemVariants} className="text-center pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-300 font-semibold text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Dashboard</span>
          </Link>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AboutPage;
