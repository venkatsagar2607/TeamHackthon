import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

// SVG for logo
const LogoIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
    >
        <path
            d="M27.3331 10.6521V0H16.6811L27.3331 10.6521Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
        />
        <path
            d="M0.666992 17.3479V28H11.319L0.666992 17.3479Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
        />
    </svg>
);

// Google Icon
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303
        c-1.649,4.657-6.08,8-11.303,8
        c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12
        c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        C34.046,6.053,29.268,4,24,4
        C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20
        c11.045,0,20-8.955,20-20
        C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819
        C14.655,15.108,18.961,12,24,12
        c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        C34.046,6.053,29.268,4,24,4
        C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
            fill="#4CAF50"
            d="M24,44
        c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
        C29.211,35.091,26.715,36,24,36
        c-5.222,0-9.641-3.38-11.28-7.94l-6.522,5.023
        C9.505,39.556,16.227,44,24,44z"
        />
        <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303
        c-0.792,2.237-2.231,4.166-4.088,5.574l6.19,5.238
        C42.021,35.79,44,30.134,44,24
        C44,22.659,43.862,21.35,43.611,20.083z"
        />
    </svg>
);

// Facebook Icon
const FacebookIcon = () => (
    <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14
      c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.64 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
);

export default function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repassword: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="relative flex flex-col md:flex-row h-screen w-full font-inter bg-[#100427] text-white overflow-hidden">
            {/* Background effects */}
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-full opacity-30 blur-3xl" />
            <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 rounded-full opacity-40 blur-3xl" />
            {[...Array(40)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-70"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                />
            ))}

            {/* Left Side */}
            <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-between p-8 sm:p-12">
                <div className="flex items-center space-x-2">
                    <LogoIcon />
                </div>

                <div className="mt-auto mb-8 text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        START YOUR
                    </h1>
                    <span className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                        ADVENTURE!
                    </span>
                </div>
            </div>

            {/* Right Side Form */}
            <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
                <div className="max-w-md w-full bg-black/10 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl space-y-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-bold">SIGN UP</h2>
                        <p className="mt-2 text-gray-400">Create your account to get started</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {/* Email */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Re-enter Password */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </span>
                            <input
                                type="password"
                                name="repassword"
                                placeholder="Re-enter Password"
                                value={formData.repassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Redirect */}
                    <p className="text-sm text-center text-gray-400 mt-2">
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="text-purple-400 hover:text-purple-300 font-semibold"
                        >
                            Sign in
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center justify-center space-x-4 mt-4">
                        <span className="h-px w-full bg-gray-600"></span>
                        <span className="text-gray-400 text-sm whitespace-nowrap">
                            Or continue with
                        </span>
                        <span className="h-px w-full bg-gray-600"></span>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#32384D] hover:bg-[#414863] rounded-lg transition-colors duration-300">
                            <GoogleIcon />
                            <span className="font-medium">Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#32384D] hover:bg-[#414863] rounded-lg transition-colors duration-300">
                            <FacebookIcon />
                            <span className="font-medium">Facebook</span>
                        </button>
                    </div>

                    <p className="text-xs text-center text-gray-400">
                        By signing up, you agree to our{" "}
                        <a href="#" className="text-purple-400 hover:underline">
                            Terms and Conditions
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
