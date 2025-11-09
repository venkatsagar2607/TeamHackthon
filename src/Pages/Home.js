// src/pages/Home.js
import React from "react";
import Navbar from '../Navigation/Navbar'
import Footer from "../Navigation/Footer";
import Contact from '../Navigation/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#100427] text-white overflow-x-hidden pt-16">
      <Navbar />

      {/* Cosmic background effects */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-full opacity-20 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-purple-400 via-pink-500 to-yellow-400 rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          WELCOME TO{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
            CITYASSIST 🚀
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
          CityAssist is an AI-powered Smart City platform that empowers citizens and
          administrators with real-time monitoring of city health — from incidents to air
          quality, and security alerts — all visualized beautifully.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-md hover:bg-white/20 transition-all duration-300 border border-purple-700/30">
            <h2 className="text-xl font-semibold mb-2 text-purple-300">📊 Dashboard</h2>
            <p className="text-gray-300">
              View city KPIs, AI-driven insights, and live metrics at a glance.
            </p>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-md hover:bg-white/20 transition-all duration-300 border border-purple-700/30">
            <h2 className="text-xl font-semibold mb-2 text-pink-300">🗺️ Map View</h2>
            <p className="text-gray-300">
              Monitor live incidents, environmental sensors, and alerts citywide.
            </p>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-md hover:bg-white/20 transition-all duration-300 border border-purple-700/30">
            <h2 className="text-xl font-semibold mb-2 text-yellow-300">
              ⚙️ Settings & Profile
            </h2>
            <p className="text-gray-300">
              Manage your account preferences, notifications, and privacy settings.
            </p>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-16 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-purple-300">🧭 Getting Started</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Access your Dashboard for key insights and live data.</li>
            <li>Use Map View to visualize ongoing incidents and alerts.</li>
            <li>Visit Settings to customize your experience.</li>
          </ul>
        </div>
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
