import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Eye,
  GitCompare,
  Navigation,
  Target,
  Shield,
  Clock,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./UserNavbar";
export default function FeaturesPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, entry.target.dataset.index]);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".feature-card").forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Local-First Approach",
      description:
        "Find vendors in your specific area only. No irrelevant results from distant locations.",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: <Search className="w-10 h-10" />,
      title: "Smart Search",
      description:
        "Search by category, product, or service to find exactly what you need quickly.",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Complete Vendor Profiles",
      description:
        "View all products and services offered by a vendor in one convenient place.",
      gradient: "from-indigo-500 via-purple-500 to-blue-500",
      bgGradient: "from-indigo-50 to-purple-50",
    },
    {
      icon: <GitCompare className="w-10 h-10" />,
      title: "Easy Comparison",
      description:
        "Compare multiple vendors side-by-side to make the best choice for your needs.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      icon: <Navigation className="w-10 h-10" />,
      title: "Get Directions",
      description:
        "Navigate to vendors instantly with integrated Google Maps directions.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      bgGradient: "from-cyan-50 to-blue-50",
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Relevant Results Only",
      description:
        "See only vendors that operate in your local area, no wasted time browsing.",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      bgGradient: "from-orange-50 to-amber-50",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Verified Businesses",
      description:
        "All vendors are verified and reliable, ensuring quality and trustworthiness.",
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      bgGradient: "from-violet-50 to-purple-50",
    },
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Saves Time",
      description: "No random searching",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Discovery",
      description: "Find vendors instantly",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Better Decisions",
      description: "Easy comparison",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trusted Businesses",
      description: "Only verified locals",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <>
      <Navbar home={"true"} />
      <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating Shapes */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 border-4 border-cyan-400/30 rounded-lg rotate-45 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-500/20 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-4 border-blue-400/30 rounded-full animate-float animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
            <div className="animate-fadeInUp">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold">
                  🚀 Next-Gen Vendor Discovery
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                <span className="text-white">Find Trusted Local</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 animate-gradient">
                  Vendors Near You
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed">
                Discover nearby vendors in your area, compare multiple options,
                and find the best services without random searching.
              </p>

              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                onClick={() => navigate("/explore/vendor")}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Vendors Near You
                  <MapPin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Feature Cards Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16 animate-fadeInUp animation-delay-500">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`feature-card group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    visibleCards.includes(String(index))
                      ? "animate-slideUp"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 blur-xl`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                    >
                      <div className="text-white group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-blue-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Why Users Love Us
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}
                    >
                      <div className="text-white">{benefit.icon}</div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {benefit.title}
                    </h3>

                    <p className="text-blue-200 text-sm">
                      {benefit.description}
                    </p>

                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
            <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-3xl p-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Find Your Perfect Vendor?
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                Join thousands of satisfied users discovering trusted local
                businesses
              </p>
              <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Start Exploring Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradient {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out;
          }

          .animate-slideUp {
            animation: slideUp 0.8s ease-out forwards;
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }

          .animation-delay-500 {
            animation-delay: 0.5s;
          }

          .animation-delay-1000 {
            animation-delay: 1s;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    </>
  );
}
