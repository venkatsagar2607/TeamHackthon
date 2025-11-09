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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyReports() {
    const [myReports, setMyReports] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warn("⚠️ Please sign in to view your reports.");
            return;
        }

        // ✅ Fetch both incident + patient reports for logged-in user
        Promise.all([
            fetch("http://localhost:8080/api/reports/incident/my", {
                headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:8080/api/reports/patient/my", {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
            .then(([incidentRes, patientRes]) => {
                if (!incidentRes.ok || !patientRes.ok)
                    throw new Error("Failed to load reports");
                return Promise.all([incidentRes.json(), patientRes.json()]);
            })
            .then(([incidentData, patientData]) => {
                // ✅ Normalize & merge both datasets
                const incidentReports = incidentData.map((r) => ({
                    id: r.id,
                    type: "incident",
                    category: r.category,
                    description: r.description,
                    location: r.location,
                    time: new Date(r.createdAt).toLocaleString(),
                }));

                const patientReports = patientData.map((p) => ({
                    id: p.id,
                    type: "patient",
                    name: p.name,
                    age: p.age,
                    aqi: p.aqi,
                    disease: p.disease,
                    time: new Date(p.createdAt).toLocaleString(),
                }));

                // Combine & sort newest first
                const allReports = [...incidentReports, ...patientReports].sort(
                    (a, b) => b.id - a.id
                );
                setMyReports(allReports);
            })
            .catch(() => toast.error("❌ Failed to load reports. Please try again."));
    }, []);

    return (
        <div className="min-h-screen bg-[#0f0426] text-white relative">
            <Navbar />
            <ToastContainer position="top-right" theme="dark" autoClose={2000} />

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
                        {myReports.map((r) => (
                            <div
                                key={r.id}
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
                                        <p className="text-sm text-gray-300 mb-2">
                                            {r.description}
                                        </p>
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
