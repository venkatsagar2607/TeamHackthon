//OpenStreetMap

import React, { useEffect, useState } from "react";
import {
    // PhoneCall,
    MapPin,
    Map,
    Search,
    Loader2,
    Building2,
    HeartPulse,
    Home,
    Stethoscope,
    X,
} from "lucide-react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";

const FALLBACK_COORDS = { lat: 17.385, lng: 78.4867 };

function distanceKm(lat1, lon1, lat2, lon2) {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default function LocalServices() {
    const [userPos, setUserPos] = useState(null);
    const [services, setServices] = useState([]);
    const [filter, setFilter] = useState("All");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // 🌍 Get user location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    setLoading(false);
                },
                () => {
                    setUserPos(FALLBACK_COORDS);
                    setLoading(false);
                }
            );
        } else {
            setUserPos(FALLBACK_COORDS);
            setLoading(false);
        }
    }, []);

    // 🔍 Fetch nearby data from OpenStreetMap Overpass API
    useEffect(() => {
        if (!userPos) return;

        const fetchOSMData = async () => {
            setLoading(true);
            try {
                const radius = 5000; // 5 km
                const query = `
          [out:json];
          (
            node["amenity"="hospital"](around:${radius},${userPos.lat},${userPos.lng});
            node["amenity"="pharmacy"](around:${radius},${userPos.lat},${userPos.lng});
            node["amenity"="shelter"](around:${radius},${userPos.lat},${userPos.lng});
            node["amenity"="community_centre"](around:${radius},${userPos.lat},${userPos.lng});
            node["amenity"="doctors"](around:${radius},${userPos.lat},${userPos.lng});
          );
          out;
        `;

                const response = await fetch(
                    `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
                );
                const data = await response.json();

                const mapped = data.elements.map((el) => ({
                    id: el.id,
                    name: el.tags.name || "Unknown",
                    address:
                        el.tags["addr:full"] ||
                        `${el.tags["addr:street"] || "Nearby"}, ${el.tags["addr:city"] || "Hyderabad"
                        }`,
                    type:
                        el.tags.amenity === "hospital"
                            ? "Hospital"
                            : el.tags.amenity === "pharmacy"
                                ? "Pharmacy"
                                : el.tags.amenity === "community_centre"
                                    ? "Community Center"
                                    : el.tags.amenity === "shelter"
                                        ? "Shelter"
                                        : "Clinic",
                    lat: el.lat,
                    lng: el.lon,
                    phone: el.tags.phone || "N/A",
                    notes: el.tags.description || "",
                    distance: distanceKm(userPos.lat, userPos.lng, el.lat, el.lon),
                }));

                mapped.sort((a, b) => a.distance - b.distance);
                setServices(mapped);
            } catch (err) {
                console.error("OSM fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOSMData();
    }, [userPos]);

    // 🔍 Search + Filter
    const filtered = services.filter((s) => {
        const q = query.toLowerCase();
        const matchesQuery =
            s.name.toLowerCase().includes(q) ||
            (s.address && s.address.toLowerCase().includes(q)) ||
            (s.notes && s.notes.toLowerCase().includes(q));
        const matchesType = filter === "All" || s.type === filter;
        return matchesQuery && matchesType;
    });

    const openDirections = (lat, lng) =>
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
            "_blank"
        );

    const getIcon = (type) => {
        switch (type) {
            case "Hospital":
                return <HeartPulse className="text-red-400" size={22} />;
            case "Pharmacy":
                return <Stethoscope className="text-green-400" size={22} />;
            case "Shelter":
                return <Home className="text-yellow-400" size={22} />;
            case "Community Center":
                return <Building2 className="text-purple-400" size={22} />;
            default:
                return <MapPin className="text-blue-400" size={22} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b0123] via-[#1a0230] to-[#30044d] text-white relative">
            <Navbar />

            {/* background glows */}
            <div className="absolute -top-32 left-0 w-[500px] h-[500px] bg-purple-700/30 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <h1 style={{ marginTop: "1rem" }} className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-fuchsia-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    🌆 Local Services Near You
                </h1>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="flex items-center bg-white/10 border border-purple-700/40 rounded-xl px-4 py-2 flex-1">
                        <Search size={18} className="text-gray-300 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by name, address, or notes..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-transparent w-full outline-none text-gray-200 placeholder:text-gray-400"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="p-1 hover:bg-purple-800/40 rounded-lg"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white/10 border border-purple-700/40 text-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="All">All Services</option>
                        <option value="Hospital">Hospitals</option>
                        <option value="Pharmacy">Pharmacies</option>
                        <option value="Shelter">Shelters</option>
                        <option value="Community Center">Community Centers</option>
                    </select>
                </div>

                {/* User location info */}
                <div className="flex items-center gap-2 text-gray-400 mb-6">
                    <MapPin className="text-purple-400" />
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={14} /> Locating nearby services…
                        </span>
                    ) : (
                        <span>
                            Showing results near{" "}
                            <span className="text-gray-200">
                                ({userPos.lat.toFixed(4)}, {userPos.lng.toFixed(4)})
                            </span>
                        </span>
                    )}
                </div>

                {/* Service cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!loading &&
                        filtered.map((s) => (
                            <div
                                key={s.id}
                                className="group bg-white/10 border border-purple-700/30 rounded-2xl p-5 backdrop-blur-md shadow-lg hover:shadow-fuchsia-500/40 transition hover:scale-[1.02]"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {getIcon(s.type)}
                                        <h3 className="text-lg font-semibold">{s.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {s.distance.toFixed(2)} km
                                    </p>
                                </div>
                                <p className="text-sm text-gray-300">{s.type}</p>
                                <p className="text-xs text-gray-400 mt-1">{s.address}</p>
                                <p className="text-xs text-gray-500 mt-1 italic">{s.notes}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        onClick={() => openDirections(s.lat, s.lng)}
                                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition text-white"
                                    >
                                        <Map size={15} /> Directions
                                    </button>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-purple-700/40 hover:bg-purple-600/50 transition text-gray-200"
                                    >
                                        <MapPin size={15} /> View
                                    </a>
                                </div>
                            </div>
                        ))}

                    {!loading && filtered.length === 0 && (
                        <div className="col-span-full text-center text-gray-400 py-10 border border-purple-700/40 rounded-xl bg-white/5">
                            No nearby results found.
                        </div>
                    )}
                </div>

                <p className="text-xs text-gray-500 mt-8 text-center">
                    💡 Data from OpenStreetMap — fully free and open source.
                </p>
            </div>

            <Footer />
        </div>
    );
}
