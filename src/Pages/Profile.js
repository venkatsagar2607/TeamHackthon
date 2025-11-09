import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import { MapPin, Github, Twitter, Instagram, Globe } from "lucide-react";
import Footer from "../Navigation/Footer";
import { toast } from "react-toastify"; // ✅ Toastify import

export default function Profile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    });

    // ✅ Fetch user data from backend
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:8080/api/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    dob: data.dob || "",
                    address1: data.address1 || "",
                    address2: data.address2 || "",
                    city: data.city || "",
                    state: data.state || "",
                    country: data.country || "",
                    pincode: data.pincode || "",
                });
            })
            .catch((err) => {
                console.error("Failed to load user profile:", err);
                toast.error("Failed to load user data!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });
            });
    }, []);

    // ✅ Handle input changes (with auto city/state from pincode)
    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === "pincode") {
            setFormData((prev) => ({ ...prev, pincode: value }));

            if (value.length === 6) {
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
                    const data = await response.json();

                    if (data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice[0]) {
                        const post = data[0].PostOffice[0];
                        setFormData((prev) => ({
                            ...prev,
                            city: post.Block || post.District || "",
                            state: post.State || "",
                            country: post.Country || "India",
                            pincode: value,
                        }));
                        toast.success("📍 Location details auto-filled!", {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "colored",
                        });
                    } else {
                        setFormData((prev) => ({
                            ...prev,
                            pincode: value,
                            city: "",
                            state: "",
                            country: "",
                        }));
                        toast.warn("⚠️ Invalid pincode entered.", {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "colored",
                        });
                    }
                } catch (error) {
                    console.error("❌ Error fetching pincode details:", error);
                    setFormData((prev) => ({
                        ...prev,
                        pincode: value,
                        city: "",
                        state: "",
                        country: "",
                    }));
                    toast.error("❌ Could not fetch location details!", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                    });
                }
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // ✅ Save profile updates to backend
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("⚠️ You are not logged in!", {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
            });
            return;
        }

        fetch("http://localhost:8080/api/user/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("✅ Profile updated successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "colored",
                    });
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    toast.error("❌ Failed to update profile!", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                    });
                }
            })
            .catch((err) => {
                console.error("❌ Error updating profile:", err);
                toast.error("⚠️ Could not connect to server!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                });
            });
    };

    const userInitial = formData.name ? formData.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="min-h-screen bg-[#0f0426] text-white pt-20 relative overflow-hidden">
            <Navbar />

            {/* Background gradient glows */}
            <div className="absolute -top-1/3 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-20 blur-3xl" />

            {/* Main container */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
                {/* LEFT PROFILE CARD */}
                <div className="col-span-1 bg-white/10 backdrop-blur-md border border-purple-800/40 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 flex items-center justify-center text-4xl font-bold shadow-lg">
                        {userInitial}
                    </div>

                    <h2 className="mt-4 text-2xl font-bold">{formData.name || "Loading..."}</h2>
                    <p className="text-gray-400">{formData.email}</p>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                        <MapPin size={14} /> {formData.city || "City"}, {formData.state || "State"}
                    </p>

                    <div className="mt-5 flex gap-4">
                        <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold">
                            Follow
                        </button>
                        <button className="px-5 py-2 border border-purple-500 rounded-lg text-purple-300 hover:bg-purple-800/30 transition-all">
                            Message
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="mt-8 space-y-3 w-full text-left text-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Globe size={16} className="text-purple-400" />
                                <span>Website</span>
                            </div>
                            <span className="text-gray-400">@smartcity.vercel.app</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Github size={16} className="text-purple-400" />
                                <span>Github</span>
                            </div>
                            <span className="text-gray-400">@{formData.name}226</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Twitter size={16} className="text-purple-400" />
                                <span>Twitter</span>
                            </div>
                            <span className="text-gray-400">@__{formData.name}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Instagram size={16} className="text-purple-400" />
                                <span>Instagram</span>
                            </div>
                            <span className="text-gray-400">@{formData.name}__</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT PROFILE FORM */}
                <div className="col-span-2 bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl shadow-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                ["name", "Full Name", "text"],
                                ["email", "Email", "email", true],
                                ["phone", "Phone", "text"],
                                ["dob", "Date of Birth", "date"],
                                ["address1", "Address Line 1", "text"],
                                ["address2", "Address Line 2", "text"],
                                ["city", "City", "text"],
                                ["state", "State", "text"],
                                ["country", "Country", "text"],
                                ["pincode", "Pincode", "text"],
                            ].map(([key, label, type, readOnly]) => (
                                <div key={key}>
                                    <label className="block text-sm mb-1 text-gray-300">{label}</label>
                                    <input
                                        type={type}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        readOnly={readOnly}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        className="w-full px-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
