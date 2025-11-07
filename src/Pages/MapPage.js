import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import { CloudRain, Wind, TrafficCone } from "lucide-react";

export default function MapPage() {
    const [layers, setLayers] = useState({
        traffic: true,
        weather: true,
        pollution: true,
    });

    // Mock locations
    const trafficData = [
        { id: 1, name: "Traffic Jam", position: [17.385, 78.4867] },
        { id: 2, name: "Road Block", position: [17.395, 78.48] },
    ];

    const weatherData = [
        { id: 1, name: "Rain Alert", position: [17.45, 78.42] },
    ];

    const pollutionData = [
        { id: 1, name: "High AQI", position: [17.4, 78.5] },
    ];

    // Custom marker icons
    const trafficIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
        iconSize: [30, 30],
    });

    const weatherIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
        iconSize: [30, 30],
    });

    const pollutionIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1067/1067566.png",
        iconSize: [30, 30],
    });

    return (
        <div className="min-h-screen bg-[#0f0426] text-white overflow-y-auto">
            <Navbar />

            {/* Glowing Background */}
            <div className="absolute -top-1/3 -left-1/3 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    SmartCity Map & Commuter Assistant
                </h1>

                {/* Layer Toggles */}
                <div className="flex justify-center gap-6 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={layers.traffic}
                            onChange={() => setLayers({ ...layers, traffic: !layers.traffic })}
                        />
                        <TrafficCone className="text-yellow-400" size={18} />
                        <span>Traffic</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={layers.weather}
                            onChange={() => setLayers({ ...layers, weather: !layers.weather })}
                        />
                        <CloudRain className="text-blue-400" size={18} />
                        <span>Weather</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={layers.pollution}
                            onChange={() => setLayers({ ...layers, pollution: !layers.pollution })}
                        />
                        <Wind className="text-green-400" size={18} />
                        <span>Pollution</span>
                    </label>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg border border-purple-700/40">
                    <MapContainer
                        center={[17.385, 78.4867]}
                        zoom={12}
                        style={{ height: "70vh", width: "100%" }}
                        scrollWheelZoom={true}
                    >
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer checked name="Satellite View">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                            </LayersControl.BaseLayer>

                            <LayersControl.BaseLayer name="Street View">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                        {/* Markers */}
                        {layers.traffic &&
                            trafficData.map((p) => (
                                <Marker key={p.id} position={p.position} icon={trafficIcon}>
                                    <Popup>{p.name}</Popup>
                                </Marker>
                            ))}

                        {layers.weather &&
                            weatherData.map((p) => (
                                <Marker key={p.id} position={p.position} icon={weatherIcon}>
                                    <Popup>{p.name}</Popup>
                                </Marker>
                            ))}

                        {layers.pollution &&
                            pollutionData.map((p) => (
                                <Marker key={p.id} position={p.position} icon={pollutionIcon}>
                                    <Popup>{p.name}</Popup>
                                </Marker>
                            ))}
                    </MapContainer>
                </div>
            </div>

            <Footer />
        </div>
    );
}
