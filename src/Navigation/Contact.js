import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-[#0f0426] text-white flex flex-col">
            <Navbar />

            {/* Background Glow Effects */}
            <div className="absolute -top-1/3 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-20 blur-3xl" />

            {/* Contact Section */}
            <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
                {/* LEFT SIDE — Contact Info */}
                <div className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                        Get in Touch
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Have any questions, feedback, or partnership inquiries?
                        We'd love to hear from you — our team will respond within 24 hours.
                    </p>

                    <div className="space-y-5 text-gray-300">
                        <div className="flex items-center gap-3">
                            <Mail className="text-purple-400" />
                            <span>contact@smartcity.ai</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-purple-400" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-purple-400" />
                            <span>Hyderabad, Telangana, India</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-8">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-purple-800/40 hover:bg-purple-700/70 transition"
                        >
                            <Facebook size={18} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-purple-800/40 hover:bg-purple-700/70 transition"
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-purple-800/40 hover:bg-purple-700/70 transition"
                        >
                            <Instagram size={18} />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-purple-800/40 hover:bg-purple-700/70 transition"
                        >
                            <Github size={18} />
                        </a>
                    </div>
                </div>

                {/* RIGHT SIDE — Contact Form */}
                <div className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl shadow-2xl p-8">
                    <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Subject"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 bg-purple-900/40 border border-purple-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Write your message here..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </main>

        </div>
    );
}
