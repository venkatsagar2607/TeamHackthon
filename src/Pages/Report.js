import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import {
    CloudRain,
    Ambulance,
    TrafficCone,
    Zap,
    Wind,
    UploadCloud,
    Stethoscope,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Report() {
    const [activeTab, setActiveTab] = useState("incident");

    // INCIDENT FORM
    const [formData, setFormData] = useState({
        category: "",
        location: "",
        description: "",
        image: null,
    });
    const [imageUploaded, setImageUploaded] = useState(false);
    const [reports, setReports] = useState([]);

    // PATIENT FORM
    const [patientData, setPatientData] = useState({
        name: "",
        age: "",
        aqi: "",
        disease: "",
        otherDisease: "",
    });
    const [patients, setPatients] = useState([]);

    // ✅ Load user's reports from backend
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        Promise.all([
            fetch("http://localhost:8080/api/reports/incident/my", {
                headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:8080/api/reports/patient/my", {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
            .then(([incRes, patRes]) => Promise.all([incRes.json(), patRes.json()]))
            .then(([incData, patData]) => {
                setReports(incData);
                setPatients(patData);
            })
            .catch(() => toast.error("❌ Error loading reports"));
    }, []);

    // ✅ Incident form change
    const handleIncidentChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData({ ...formData, image: file });
            setImageUploaded(true);
            toast.success("✅ Image uploaded successfully!");
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // ✅ Incident submit
    const handleIncidentSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category || !formData.description || !formData.location) {
            toast.warn("⚠️ Please fill all fields before submitting!");
            return;
        }

        const token = localStorage.getItem("token");
        const report = {
            category: formData.category,
            location: formData.location,
            description: formData.description,
            imageUrl: "", // will handle image upload later if needed
        };

        try {
            const res = await fetch("http://localhost:8080/api/reports/incident", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(report),
            });

            if (res.ok) {
                const saved = await res.json();
                setReports([saved, ...reports]);
                setFormData({ category: "", location: "", description: "", image: null });
                setImageUploaded(false);
                toast.success("✅ Incident Report submitted successfully!");
            } else {
                toast.error("❌ Failed to submit incident report!");
            }
        } catch {
            toast.error("⚠️ Could not connect to backend!");
        }
    };

    // ✅ Patient form change
    const handlePatientChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    // ✅ Patient submit
    const handlePatientSubmit = async (e) => {
        e.preventDefault();

        if (!patientData.name || !patientData.age || !patientData.aqi || !patientData.disease) {
            toast.warn("⚠️ Please fill all fields before submitting!");
            return;
        }

        const token = localStorage.getItem("token");
        const patientReport = {
            name: patientData.name,
            age: patientData.age,
            aqi: patientData.aqi,
            disease:
                patientData.disease === "Other"
                    ? patientData.otherDisease
                    : patientData.disease,
        };

        try {
            const res = await fetch("http://localhost:8080/api/reports/patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(patientReport),
            });

            if (res.ok) {
                const saved = await res.json();
                setPatients([saved, ...patients]);
                setPatientData({ name: "", age: "", aqi: "", disease: "", otherDisease: "" });
                toast.success("✅ Patient Report submitted successfully!");
            } else {
                toast.error("❌ Failed to submit patient report!");
            }
        } catch {
            toast.error("⚠️ Could not connect to backend!");
        }
    };

    // ✅ UI
    return (
        <div className="min-h-screen bg-[#0f052e] text-white relative">
            <Navbar />
            <ToastContainer />
            <div className="absolute -top-1/3 -left-1/3 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-20 blur-3xl" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    Smart City Report Center
                </h1>

                {/* Tabs */}
                <div className="flex mb-8 border-b border-purple-600">
                    <button
                        onClick={() => setActiveTab("incident")}
                        className={`px-6 py-2 font-semibold ${activeTab === "incident"
                            ? "text-purple-400 border-b-4 border-purple-500"
                            : "text-gray-400 hover:text-purple-300"
                            }`}
                    >
                        🚨 Incident Reports
                    </button>
                    <button
                        onClick={() => setActiveTab("patient")}
                        className={`px-6 py-2 font-semibold ${activeTab === "patient"
                            ? "text-purple-400 border-b-4 border-purple-500"
                            : "text-gray-400 hover:text-purple-300"
                            }`}
                    >
                        🩺 Patient Health Reports
                    </button>
                </div>

                {/* INCIDENT FORM */}
                {activeTab === "incident" && (
                    <form
                        onSubmit={handleIncidentSubmit}
                        className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-8 shadow-lg mb-12"
                    >
                        <h2 className="text-2xl font-semibold mb-6">Raise a New Incident Report</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm text-gray-300">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleIncidentChange}
                                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Weather">🌧️ Weather</option>
                                    <option value="Ambulance">🚑 Ambulance</option>
                                    <option value="Traffic">🚦 Traffic</option>
                                    <option value="Power">⚡ Power</option>
                                    <option value="Pollution">🌫️ Pollution</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-300">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter location"
                                    value={formData.location}
                                    onChange={handleIncidentChange}
                                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block mb-2 text-sm text-gray-300">Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                placeholder="Describe the issue..."
                                value={formData.description}
                                onChange={handleIncidentChange}
                                className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200"
                            ></textarea>
                        </div>
                        <div className="mt-6">
                            <label className="block mb-2 text-sm text-gray-300">Upload Image</label>
                            <label
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-700/50 rounded-lg cursor-pointer bg-purple-900/30 transition ${imageUploaded ? "opacity-60 cursor-not-allowed" : "hover:bg-purple-800/40"
                                    }`}
                            >
                                {!imageUploaded ? (
                                    <>
                                        <UploadCloud size={24} className="text-purple-400 mb-2" />
                                        <p className="text-sm text-gray-400">
                                            Click to upload or drag and drop
                                        </p>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleIncidentChange}
                                            className="hidden"
                                        />
                                    </>
                                ) : (
                                    <p className="text-green-400 font-semibold">
                                        ✅ Image Uploaded
                                    </p>
                                )}
                            </label>
                        </div>
                        <div className="text-center mt-8">
                            <button
                                type="submit"
                                className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                            >
                                Submit Incident
                            </button>
                        </div>
                    </form>
                )}

                {/* PATIENT FORM */}
                {activeTab === "patient" && (
                    <form
                        onSubmit={handlePatientSubmit}
                        className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-8 shadow-lg mb-12"
                    >
                        <h2 className="text-2xl font-semibold mb-6">Add Patient Health Report</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm text-gray-300">Patient Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={patientData.name}
                                    onChange={handlePatientChange}
                                    placeholder="Enter patient name"
                                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-300">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={patientData.age}
                                    onChange={handlePatientChange}
                                    placeholder="Enter age"
                                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-300">AQI Level</label>
                                <input
                                    type="number"
                                    name="aqi"
                                    value={patientData.aqi}
                                    onChange={handlePatientChange}
                                    placeholder="Enter AQI (Air Quality Index)"
                                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-300">Health Condition</label>
                                <select
                                    name="disease"
                                    value={patientData.disease}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200"
                                >
                                    <option value="">Select Condition</option>
                                    <option value="Cancer">Cancer</option>
                                    <option value="Asthma">Asthma</option>
                                    <option value="Eye Irritation">Eye Irritation</option>
                                    <option value="Heart Disease">Heart Disease</option>
                                    <option value="Skin Allergy">Skin Allergy</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            {patientData.disease === "Other" && (
                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-sm text-gray-300">
                                        Specify Other Condition
                                    </label>
                                    <input
                                        type="text"
                                        name="otherDisease"
                                        value={patientData.otherDisease}
                                        onChange={handlePatientChange}
                                        placeholder="Enter custom condition"
                                        className="w-full px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-center mt-8">
                            <button
                                type="submit"
                                className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                            >
                                Submit Patient Report
                            </button>
                        </div>
                    </form>
                )}

                {/* RECENT REPORTS */}
                <div className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">
                        {activeTab === "incident"
                            ? "Recent Incident Reports"
                            : "Recent Patient Reports"}
                    </h2>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50">
                        {(activeTab === "incident" ? reports : patients).map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start gap-4 bg-purple-900/40 rounded-lg p-4 hover:bg-purple-800/40 transition"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {activeTab === "incident" ? (
                                        item.category === "Weather" ? (
                                            <CloudRain className="text-blue-400" />
                                        ) : item.category === "Traffic" ? (
                                            <TrafficCone className="text-yellow-400" />
                                        ) : item.category === "Ambulance" ? (
                                            <Ambulance className="text-red-400" />
                                        ) : item.category === "Power" ? (
                                            <Zap className="text-amber-400" />
                                        ) : (
                                            <Wind className="text-green-400" />
                                        )
                                    ) : (
                                        <Stethoscope className="text-pink-400" />
                                    )}
                                </div>
                                <div>
                                    {activeTab === "incident" ? (
                                        <>
                                            <h3 className="font-semibold text-white">
                                                {item.category} Report
                                            </h3>
                                            <p className="text-gray-300 text-sm">
                                                {item.description}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                📍 {item.location} —{" "}
                                                {new Date(item.createdAt).toLocaleString()}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="font-semibold text-white">
                                                {item.name} ({item.age} yrs)
                                            </h3>
                                            <p className="text-gray-300 text-sm">
                                                Condition: {item.disease} | AQI: {item.aqi}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                🕒 {new Date(item.createdAt).toLocaleString()}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
