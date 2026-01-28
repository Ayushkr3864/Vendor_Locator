import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Store,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "./vendorNavbar";
import {
CheckCircle,
  Target,
  ChevronRight
} from "lucide-react";
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.8 },
  },
};
const benefits = [
  "No setup fees or hidden charges",
  "24/7 customer support",
  "Easy-to-use dashboard",
  "Real-time analytics",
  "Mobile-friendly interface",
];
const VendorLandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Store />,
      title: "Digital Storefront",
      desc: "Your shop, online — crafted to feel real, not templated.",
    },
    {
      icon: <Users />,
      title: "Hyper-Local Discovery",
      desc: "Customers near you, already searching with intent.",
    },
    {
      icon: <TrendingUp />,
      title: "Sales Momentum",
      desc: "See patterns instead of guessing where growth comes from.",
    },
    {
      icon: <Shield />,
      title: "Trust & Security",
      desc: "Infrastructure that fades into the background.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        :root {
          --bg: #0b0e14;
          --surface: #121826;
          --ink: #e6e9f0;
          --muted: #9aa4bf;
          --accent: #2aff9d;
          --accent-2: #ffb703;
        }

        body {
          font-family: "IBM Plex Sans", sans-serif;
          background: var(--bg);
          color: var(--ink);
        }

        .font-editorial {
          font-family: "Fraunces", serif;
        }
      `}</style>
      <div className="relative min-h-screen overflow-hidden bg-[var(--bg)]">
        <Navbar />

        {/* Atmospheric Glows */}
        <div className="pointer-events-none absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-[var(--accent)] opacity-10 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-[var(--accent-2)] opacity-10 blur-[140px]" />

        {/* HERO */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-40"
        >
          <motion.div
            variants={item}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]"
          >
            <Sparkles size={16} className="text-[var(--accent)]" />
            Built for real local businesses
          </motion.div>

          <motion.h1
            variants={item}
            className="font-editorial text-5xl leading-tight sm:text-7xl"
          >
            Your business,
            <br />
            <span className="text-[var(--accent)]">
              visible where it matters.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg text-[var(--muted)]"
          >
            VendorHub helps local vendors get discovered, trusted, and chosen —
            without burning money on ads.
          </motion.p>

          <motion.div variants={item} className="mt-14 flex flex-wrap gap-6">
            <button
              onClick={() => navigate("/register")}
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 font-semibold text-black shadow-[0_0_40px_rgba(42,255,157,0.35)] transition hover:scale-105"
            >
              Start Selling
              <ArrowRight className="transition group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="rounded-full border border-white/20 px-8 py-4 text-white transition hover:bg-white/5"
            >
              Vendor Login
            </button>
          </motion.div>
        </motion.section>

        {/* FEATURES */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-40">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 text-[var(--accent)]"
          >
            <motion.h2
              variants={item}
              className="text-4xl sm:text-5xl font-bold  mb-4"
            >
              Everything You Need to Succeed
            </motion.h2>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              Powerful features designed to help your business thrive in the
              digital age
            </p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group rounded-3xl border border-white/10 bg-[var(--surface)] p-8 transition hover:-translate-y-2 hover:border-[var(--accent)]"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)] transition group-hover:scale-110">
                  {f.icon}
                </div>

                <h3 className="mb-3 text-xl font-semibold">{f.title}</h3>
                <p className="leading-relaxed text-[var(--muted)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8  relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-10 opacity-10">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Target className=" text-[var(--accent)] " size={32} />
                <span className="text-2xl font-semibold text-white">
                  Why Choose VendorHub?
                </span>
              </div>

              <h2 className="font-editorial text-5xl text-[var(--accent)] leading-tight sm:text-7xl">
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
        <section className="py-24 px-4 sm:px-6 lg:px-8  ">
          <div className="max-w-4xl mx-auto ">
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
                    onClick={() => navigate("/login")}
                    className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Already a Vendor? Login
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-10 text-center text-sm text-[var(--muted)]">
          © 2026 VendorHub — crafted for local hustle.
        </footer>
      </div>
    </>
  );
};

export default VendorLandingPage;
