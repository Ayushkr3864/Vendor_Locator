import React from "react";

const LoadingPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-950 overflow-hidden">
      {/* Atmospheric Background with Geometric Patterns */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, #10b981 1px, transparent 1px),
              linear-gradient(to bottom, #10b981 1px, transparent 1px)
            `,
              backgroundSize: "80px 80px",
              animation: "gridPulse 4s ease-in-out infinite",
            }}
          ></div>
        </div>

        {/* Radial glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl"
          style={{ animation: "float 8s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite reverse" }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-8">
        {/* Main Loader - Hexagon with Rotating Border */}
        <div
          className="relative inline-flex items-center justify-center mb-8"
          style={{ animation: "fadeInScale 0.8s ease-out" }}
        >
          {/* Outer rotating hexagon border */}
          <div
            className="absolute w-32 h-32"
            style={{ animation: "rotate 3s linear infinite" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient
                  id="hexGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#10b981", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#10b981", stopOpacity: 0.3 }}
                  />
                </linearGradient>
              </defs>
              <polygon
                points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                fill="none"
                stroke="url(#hexGradient)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Inner counter-rotating hexagon */}
          <div
            className="absolute w-20 h-20"
            style={{ animation: "rotate 2s linear infinite reverse" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 85,30 85,70 50,90 15,70 15,30"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
            </svg>
          </div>

          {/* Center dot */}
          <div
            className="w-3 h-3 bg-emerald-400 rounded-full"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          ></div>
        </div>

        {/* Loading Text with Staggered Animation */}
        <div className="overflow-hidden mb-4">
          <h1
            className="text-6xl font-light tracking-wider text-emerald-400"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              animation: "slideUp 0.6s ease-out 0.3s backwards",
            }}
          >
            INITIALIZING
          </h1>
        </div>

        {/* Progress Bar */}
        <div
          className="w-64 h-0.5 mx-auto mb-6 bg-slate-800 rounded-full overflow-hidden"
          style={{ animation: "fadeIn 0.6s ease-out 0.6s backwards" }}
        >
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
            style={{ animation: "loadProgress 2s ease-out infinite" }}
          ></div>
        </div>

        {/* Animated Status Text */}
        <div
          className="flex items-center justify-center gap-3 text-slate-400"
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            animation: "fadeIn 0.6s ease-out 0.9s backwards",
          }}
        >
          <span className="text-sm tracking-widest">LOADING SYSTEMS</span>
          <div className="flex gap-1">
            <span
              className="inline-block w-1 h-1 bg-emerald-500 rounded-full"
              style={{ animation: "blink 1.4s ease-in-out infinite" }}
            ></span>
            <span
              className="inline-block w-1 h-1 bg-emerald-500 rounded-full"
              style={{ animation: "blink 1.4s ease-in-out 0.2s infinite" }}
            ></span>
            <span
              className="inline-block w-1 h-1 bg-emerald-500 rounded-full"
              style={{ animation: "blink 1.4s ease-in-out 0.4s infinite" }}
            ></span>
          </div>
        </div>

        {/* System Messages */}
        <div
          className="mt-8 space-y-1 text-xs text-slate-600 font-mono"
          style={{ animation: "fadeIn 0.6s ease-out 1.2s backwards" }}
        >
          <p style={{ animation: "fadeInText 0.4s ease-out 1.4s backwards" }}>
            → Establishing secure connection...
          </p>
          <p style={{ animation: "fadeInText 0.4s ease-out 1.6s backwards" }}>
            → Loading resources...
          </p>
          <p style={{ animation: "fadeInText 0.4s ease-out 1.8s backwards" }}>
            → Preparing interface...
          </p>
        </div>
      </div>

      {/* Inline Keyframe Animations */}
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInText {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes loadProgress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
