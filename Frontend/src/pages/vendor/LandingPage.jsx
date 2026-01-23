import React from "react";
import { motion } from "framer-motion";
import {
  Store,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  ChevronRight,
} from "lucide-react";
import Navbar from "./vendorNavbar";
const VendorLandingPage = () => {
  // Replace these with your actual navigation logic
  const handleRegister = () => {
    console.log("Navigate to /register");
    // In your app: navigate('/register')
  };

  const handleLogin = () => {
    console.log("Navigate to /login");
    // In your app: navigate('/login')
  };

  const features = [
    {
      icon: <Store className="w-8 h-8" />,
      title: "Business Profile",
      description:
        "Create a stunning digital storefront that showcases your products and services to local customers.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Local Customers",
      description:
        "Connect directly with customers in your area actively searching for your products and services.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Boost Sales",
      description:
        "Increase your revenue with powerful tools designed to help you reach more customers and close deals.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description:
        "Your business data is protected with enterprise-grade security and reliable infrastructure.",
    },
  ];

  const benefits = [
    "No setup fees or hidden charges",
    "24/7 customer support",
    "Easy-to-use dashboard",
    "Real-time analytics",
    "Mobile-friendly interface",
  ];

  return (
    <>
      <Navbar   />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-emerald-200 mb-8"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  Trusted by 10,000+ Local Vendors
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Grow Your Business
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                  Reach Local Customers
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Join thousands of successful vendors who are connecting with
                customers, boosting sales, and growing their businesses on our
                platform.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Register as Vendor
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full shadow-lg hover:shadow-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 w-full sm:w-auto"
                >
                  Vendor Login
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Free to Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">
                    No Credit Card Required
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">
                    Setup in 5 Minutes
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to help your business thrive in the
                digital age
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300"
                >
                  {/* Icon Background */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                <Target className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  Why Choose VendorHub?
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12">
                Built for Your Success
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-200 flex-shrink-0" />
                    <span className="text-white font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-emerald-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg"
                >
                  <Store className="w-10 h-10 text-emerald-600" />
                </motion.div>

                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Ready to Grow Your Business?
                </h2>
                <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                  Join thousands of successful vendors and start reaching more
                  customers today. No commitments, no hidden fees—just results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/register")}
                    className="group px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Get Started Now
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}
                    className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Already a Vendor? Login
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400 text-center">
          <p className="text-sm">
            © 2026 VendorHub. All rights reserved. Built with ❤️ for local
            businesses.
          </p>
        </footer>
      </div>
    </>
  );
};

export default VendorLandingPage;
