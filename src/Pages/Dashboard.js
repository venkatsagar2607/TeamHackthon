import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import { AlertTriangle, Clock, Activity } from "lucide-react";

// Simulate sparkline with CSS gradient
function Sparkline({ color }) {
    return (
        <div
            className={`h-2 w-full rounded-full bg-gradient-to-r ${color} mt-2`}
            style={{ boxShadow: "0 0 8px rgba(192,132,252,0.5)" }}
        ></div>
    );
}

function KPICard({ title, value, icon, color }) {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-5 shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-sm text-gray-400">{title}</h3>
                    <h2 className="text-2xl font-bold text-white">{value}</h2>
                </div>
                <div
                    className={`p-2 rounded-lg ${color} text-white shadow-md shadow-purple-700/40`}
                >
                    {icon}
                </div>
            </div>
            <Sparkline color="from-purple-400 via-pink-500 to-yellow-400" />
        </div>
    );
}

export default function Dashboard() {
    const [activeIncidents, setActiveIncidents] = useState(42);
    const [avgResponse, setAvgResponse] = useState(4.2);
    const [cityHealth, setCityHealth] = useState(87);

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIncidents((prev) => Math.max(20, prev + (Math.random() * 10 - 5)));
            setAvgResponse((prev) =>
                Math.max(3.5, Math.min(6, prev + (Math.random() * 0.5 - 0.25)))
            );
            setCityHealth((prev) =>
                Math.max(70, Math.min(100, prev + (Math.random() * 4 - 2)))
            );
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const notifications = [
        "🚦 Traffic congestion detected at Jubilee Hills — rerouting suggested.",
        "🏥 Ambulance dispatched near Banjara Hills — ETA: 3 min.",
        "🌧️ Rain alert issued for Secunderabad zone.",
        "💡 Power fluctuation resolved in Somajiguda area.",
    ];

    const quickActions = [
        { name: "Report Traffic", icon: "🚦" },
        { name: "Raise Emergency Alert", icon: "🚨" },
        { name: "Add Incident", icon: "📝" },
        { name: "Notify Department", icon: "📢" },
    ];

    return (
        <div className="min-h-screen bg-[#100427] text-white relative">
            <Navbar />

            {/* Background Glow */}
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-20 blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    Dashboard
                </h1>

                {/* KPI CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <KPICard
                        title="Active Incidents"
                        value={activeIncidents.toFixed(0)}
                        icon={<AlertTriangle size={20} />}
                        color="bg-gradient-to-r from-red-500 to-yellow-500"
                    />
                    <KPICard
                        title="Avg Response Time"
                        value={`${avgResponse.toFixed(1)} min`}
                        icon={<Clock size={20} />}
                        color="bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                    <KPICard
                        title="City Health Index"
                        value={`${cityHealth.toFixed(0)}%`}
                        icon={<Activity size={20} />}
                        color="bg-gradient-to-r from-green-400 to-emerald-600"
                    />
                </div>

                {/* Notifications + Quick Actions */}
                <div className="grid md:grid-cols-3 gap-10">
                    {/* Notifications */}
                    <div className="md:col-span-2 bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Live Notifications</h2>
                        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50">
                            {notifications.map((note, i) => (
                                <div
                                    key={i}
                                    className="p-3 bg-purple-900/40 rounded-lg hover:bg-purple-800/40 transition"
                                >
                                    {note}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                        <div className="space-y-4">
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    className="w-full flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition"
                                >
                                    <span>{action.name}</span>
                                    <span>{action.icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
