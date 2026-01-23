import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508057198894-247b23fe5ade')",
      }}
    >
      {/* Dark Blue-Green Overlay */}
      <div className="absolute inset-0 bg-blue-900/70"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
        {/* Logo / Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4">
          Vendor
          <span className="text-cyan-300">Locator</span>
        </h1>

        {/* Tagline */}
        <p className="text-center text-lg md:text-xl text-blue-100 mb-12 max-w-2xl">
          Find trusted local vendors or grow your business digitally
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* User Card */}
          <Link to="/user">
            <div className="group bg-white/15 backdrop-blur-lg border border-emerald-300/30 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/30 cursor-pointer">
              <div className="text-5xl mb-4 text-emerald-300">📍</div>
              <h2 className="text-2xl font-semibold mb-2">Join as User</h2>
              <p className="text-blue-100 mb-6">
                Discover nearby vendors, compare services and get directions
              </p>
              <button className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition font-semibold text-white">
                Explore Vendors
              </button>
            </div>
          </Link>

          {/* Vendor Card */}
          <Link to="/vendor">
            <div className="group bg-white/15 backdrop-blur-lg border border-cyan-300/30 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 cursor-pointer">
              <div className="text-5xl mb-4 text-cyan-300">🏪</div>
              <h2 className="text-2xl font-semibold mb-2">Join as Vendor</h2>
              <p className="text-blue-100 mb-6">
                List your business, reach local customers and grow faster
              </p>
              <button className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold text-white">
                Grow Business
              </button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-blue-200">
          Local-first • Fast • Reliable
        </p>
      </div>
    </div>
  );
};

export default Landing;
