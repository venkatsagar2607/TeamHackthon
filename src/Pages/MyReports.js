import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import {
    CloudRain,
    TrafficCone,
    Wind,
    Stethoscope,
    AlertTriangle,
} from "lucide-react";

export default function MyReports() {
    const [myReports, setMyReports] = useState([]);

    // ✅ Simulated user
    const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

    useEffect(() => {
        // Load stored reports
        const userKey = `myReports_${userEmail}`;
        const stored = JSON.parse(localStorage.getItem(userKey)) || [];

        // ✅ Add Mock Data if no stored data
        const mockReports = [
            {
                id: 1,
                type: "incident",
                category: "Traffic",
                description: "Heavy congestion reported at Banjara Hills main road.",
                location: "Banjara Hills, Hyderabad",
                time: "10 mins ago",
            },
            {
                id: 2,
                type: "incident",
                category: "Weather",
                description: "Severe rainfall causing local flooding.",
                location: "Hitech City, Hyderabad",
                time: "25 mins ago",
            },
            {
                id: 3,
                type: "incident",
                category: "Pollution",
                description: "AQI rising beyond 200 in industrial area.",
                location: "Patancheru, Hyderabad",
                time: "1 hour ago",
            },
            {
                id: 4,
                type: "patient",
                name: "Ravi Kumar",
                age: 34,
                aqi: 210,
                disease: "Asthma",
                time: "Today, 9:30 AM",
            },
            {
                id: 5,
                type: "patient",
                name: "Sneha Reddy",
                age: 28,
                aqi: 180,
                disease: "Eye Irritation",
                time: "Yesterday, 4:10 PM",
            },
            {
                id: 6,
                type: "patient",
                name: "Anil Sharma",
                age: 52,
                aqi: 250,
                disease: "Heart Disease",
                time: "2 days ago",
            },
        ];

        // Merge saved + mock
        const allReports =
            stored.length > 0 ? [...stored, ...mockReports] : mockReports;

        // Sort newest first
        const sorted = allReports.sort((a, b) => b.id - a.id);
        setMyReports(sorted);
    }, [userEmail]);

    return (
        <div className="min-h-screen bg-[#0f0426] text-white relative">
            <Navbar />

            {/* Background Glow */}
            <div className="absolute -top-1/3 -left-1/3 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-20 blur-3xl" />

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    My Reports
                </h1>

                {myReports.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <AlertTriangle className="mx-auto mb-3 text-purple-400" size={40} />
                        <p>You haven’t submitted any reports yet.</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Go to the Report page to add new incident or health reports.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {myReports.map((r, i) => (
                            <div
                                key={i}
                                className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-6 shadow-lg hover:bg-white/20 transition"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-3">
                                    {r.type === "incident" ? (
                                        r.category === "Weather" ? (
                                            <CloudRain className="text-blue-400" />
                                        ) : r.category === "Traffic" ? (
                                            <TrafficCone className="text-yellow-400" />
                                        ) : (
                                            <Wind className="text-green-400" />
                                        )
                                    ) : (
                                        <Stethoscope className="text-pink-400" />
                                    )}
                                    <h3 className="text-lg font-semibold">
                                        {r.type === "incident"
                                            ? `${r.category} Incident`
                                            : `${r.name} (${r.age} yrs)`}
                                    </h3>
                                </div>

                                {/* Body */}
                                {r.type === "incident" ? (
                                    <>
                                        <p className="text-sm text-gray-300 mb-2">{r.description}</p>
                                        <p className="text-xs text-gray-500">📍 {r.location}</p>
                                        <p className="text-xs text-gray-500 mt-1">🕒 {r.time}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-300 mb-1">
                                            Condition:{" "}
                                            <span className="text-purple-300">{r.disease}</span>
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            AQI: <span className="text-pink-400">{r.aqi}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">🕒 {r.time}</p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
