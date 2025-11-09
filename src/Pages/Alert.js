import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import {
    AlertTriangle,
    CloudRain,
    Wind,
    Zap,
    TrafficCone,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function Alert() {
    const [alerts, setAlerts] = useState([]);
    const [acknowledged, setAcknowledged] = useState([]);

    // ✅ Fetch existing alerts from backend
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.warn("⚠️ Please sign in to view live alerts.");
            return;
        }

        fetch("http://localhost:8080/api/reports/incident", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch alerts");
                return res.json();
            })
            .then((data) => {
                const formatted = data.map((r) => ({
                    id: r.id,
                    type: r.category,
                    message: `🚨 ${r.category} reported at ${r.location}. ${r.description}`,
                    time: new Date(r.createdAt).toLocaleString(),
                    icon:
                        r.category === "Weather" ? (
                            <CloudRain className="text-blue-400" />
                        ) : r.category === "Traffic" ? (
                            <TrafficCone className="text-yellow-400" />
                        ) : r.category === "Power" ? (
                            <Zap className="text-yellow-300" />
                        ) : (
                            <Wind className="text-green-400" />
                        ),
                    severity:
                        r.category === "Weather"
                            ? "high"
                            : r.category === "Traffic"
                                ? "medium"
                                : "low",
                }));
                setAlerts(formatted);
            })
            .catch(() => toast.error("❌ Failed to load alerts from server."));
    }, []);

    // ✅ Real-time WebSocket updates
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("✅ Connected to WebSocket");
                stompClient.subscribe("/topic/alerts", (message) => {
                    const newAlert = JSON.parse(message.body);
                    const formatted = {
                        id: newAlert.id,
                        type: newAlert.category,
                        message: `🚨 ${newAlert.category} reported at ${newAlert.location}. ${newAlert.description}`,
                        time: new Date(newAlert.createdAt).toLocaleString(),
                        icon:
                            newAlert.category === "Weather" ? (
                                <CloudRain className="text-blue-400" />
                            ) : newAlert.category === "Traffic" ? (
                                <TrafficCone className="text-yellow-400" />
                            ) : newAlert.category === "Power" ? (
                                <Zap className="text-yellow-300" />
                            ) : (
                                <Wind className="text-green-400" />
                            ),
                        severity:
                            newAlert.category === "Weather"
                                ? "high"
                                : newAlert.category === "Traffic"
                                    ? "medium"
                                    : "low",
                    };
                    setAlerts((prev) => [formatted, ...prev]);
                    toast.info(`🚨 New ${newAlert.category} alert reported!`);
                });
            },
        });

        stompClient.activate();
        return () => stompClient.deactivate();
    }, []);

    // ✅ Acknowledge + Dismiss buttons
    const handleAcknowledge = (id) => {
        setAcknowledged((prev) => [...prev, id]);
    };

    const handleDismiss = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#100427] text-white relative">
            <Navbar />
            <ToastContainer position="top-right" theme="dark" autoClose={2000} />

            {/* Background glow effects */}
            <div className="absolute -top-1/3 -left-1/3 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-20 blur-3xl" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    City Alerts & Warnings
                </h1>

                {/* Active Alerts */}
                <div className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <AlertTriangle className="text-yellow-400" /> Active Alerts
                    </h2>

                    {alerts.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">
                            🎉 All systems are normal. No active alerts.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg border ${alert.severity === "high"
                                            ? "border-red-500/50 bg-red-900/20"
                                            : alert.severity === "medium"
                                                ? "border-yellow-500/50 bg-yellow-900/20"
                                                : "border-green-500/50 bg-green-900/20"
                                        } hover:bg-purple-800/30 transition`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-purple-900/50 rounded-lg">
                                            {alert.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">
                                                {alert.type} Alert
                                            </h3>
                                            <p className="text-gray-300 text-sm">
                                                {alert.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {alert.time}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 ml-auto">
                                        {!acknowledged.includes(alert.id) ? (
                                            <button
                                                onClick={() =>
                                                    handleAcknowledge(alert.id)
                                                }
                                                className="flex items-center gap-2 text-sm bg-green-600/70 hover:bg-green-700 px-3 py-2 rounded-lg transition"
                                            >
                                                <CheckCircle2 size={16} /> Acknowledge
                                            </button>
                                        ) : (
                                            <span className="flex items-center gap-1 text-green-400 text-sm">
                                                <CheckCircle2 size={16} /> Acknowledged
                                            </span>
                                        )}
                                        <button
                                            onClick={() =>
                                                handleDismiss(alert.id)
                                            }
                                            className="flex items-center gap-2 text-sm bg-red-600/70 hover:bg-red-700 px-3 py-2 rounded-lg transition"
                                        >
                                            <XCircle size={16} /> Dismiss
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Alert Summary */}
                <div className="mt-12 bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">System Summary</h2>
                    <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
                        <li>🌦️ Weather Alerts: {alerts.filter(a => a.type === "Weather").length}</li>
                        <li>🚦 Traffic Warnings: {alerts.filter(a => a.type === "Traffic").length}</li>
                        <li>⚡ Power Notifications: {alerts.filter(a => a.type === "Power").length}</li>
                        <li>🌫️ Pollution Alerts: {alerts.filter(a => a.type === "Pollution").length}</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
}
