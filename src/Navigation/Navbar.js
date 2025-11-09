import React, { useState, useRef, useEffect } from "react";
import {
    Home,
    LayoutDashboard,
    FileText,
    Bell,
    Map,
    LogOut,
    ChevronDown,
    Building2,   // 🏢 good for "Services"
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";  // ✅ added
import "react-toastify/dist/ReactToastify.css";           // ✅ added

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Fetch logged-in user's name
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:8080/api/user/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch user info");
                return res.json();
            })
            .then((data) => setUserName(data.name || "User"))
            .catch((err) => {
                console.error("❌ Error fetching user:", err);
                setUserName("User");
            });
    }, []);

    const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ Toast on logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("✅ Logged out successfully!", { position: "top-right" });
        setTimeout(() => navigate("/"), 500);
    };

    const navItems = [
        { name: "Home", path: "/home", icon: <Home size={18} /> },
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Report", path: "/report", icon: <FileText size={18} /> },
        { name: "Alert", path: "/alert", icon: <Bell size={18} /> },
        { name: "Map", path: "/maps", icon: <Map size={18} /> },
        { name: "Local Services", path: "/localService", icon: <Building2 size={18} /> }, // 🏢 new one

    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-[#100427]/90 backdrop-blur-md border-b border-purple-700/40 shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-10 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/home"
                        className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent tracking-widest"
                    >
                        SmartCity
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 ml-auto mr-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-700/40 transition ${location.pathname === item.path
                                    ? "text-white bg-purple-800/40"
                                    : ""
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Avatar & Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 focus:outline-none"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                                <span className="text-white font-bold text-lg">{userInitial}</span>
                            </div>
                            <ChevronDown
                                size={18}
                                className={`text-gray-300 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-44 bg-[#1a0b3b]/90 backdrop-blur-md border border-purple-700/40 rounded-xl shadow-2xl p-2 animate-fadeIn z-50">
                                <div className="px-3 py-2 border-b border-purple-800/30 mb-2">
                                    <p className="text-sm text-gray-300">Signed in as</p>
                                    <p className="text-purple-300 font-semibold text-sm truncate">
                                        {userName || "Loading..."}
                                    </p>
                                </div>

                                <Link
                                    to="/profile"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-700/40 hover:text-white transition"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/myreports"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-700/40 hover:text-white transition"
                                >
                                    My Reports
                                </Link>
                                <Link
                                    to="/settings"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-700/40 hover:text-white transition"
                                >
                                    Settings
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-800/30 hover:text-red-300 transition"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

        </>
    );
}
