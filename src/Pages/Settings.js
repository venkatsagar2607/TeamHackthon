import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import { Bell, Shield, Palette, Save, CheckCircle2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const { t, i18n } = useTranslation();

    // Sync i18n with global context whenever language changes
    React.useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    const [settings, setSettings] = useState({
        notifications: true,
        privacy: false,
        timezone: "Asia/Kolkata",
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-[#100427] text-white" : "bg-gray-100 text-gray-900"} relative transition-all`}>
            <Navbar />

            {/* Glow */}
            <div className="absolute -top-1/3 -left-1/3 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl" />

            {/* Page */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    {t("settings")}
                </h1>
                <div className="bg-white/10 backdrop-blur-md border border-purple-700/40 rounded-2xl shadow-lg p-8 space-y-10">
                    {/* Theme */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Palette className="text-purple-400" size={22} />
                            <div>
                                <h3 className="font-semibold">{t("darkMode")}</h3>
                                <p className="text-sm text-gray-400">Switch between dark and light themes</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={theme === "dark"}
                                onChange={toggleTheme}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 transition-all"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></span>
                        </label>
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell className="text-pink-400" size={22} />
                            <div>
                                <h3 className="font-semibold">{t("notifications")}</h3>
                                <p className="text-sm text-gray-400">Receive important alerts and updates</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={() =>
                                    setSettings({ ...settings, notifications: !settings.notifications })
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 transition-all"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></span>
                        </label>
                    </div>

                    {/* Privacy */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="text-yellow-400" size={22} />
                            <div>
                                <h3 className="font-semibold">{t("privacyMode")}</h3>
                                <p className="text-sm text-gray-400">Hide your profile from public visibility</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.privacy}
                                onChange={() =>
                                    setSettings({ ...settings, privacy: !settings.privacy })
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-600 transition-all"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></span>
                        </label>
                    </div>

                    {/* Language */}
                    <div>
                        <h3 className="font-semibold mb-2">{t("language")}</h3>
                        <select
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="w-full md:w-1/2 px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="te">తెలుగు</option>
                            <option value="ta">தமிழ்</option>
                        </select>
                    </div>

                    {/* Timezone */}
                    <div>
                        <h3 className="font-semibold mb-2">{t("timezone")}</h3>
                        <select
                            value={settings.timezone}
                            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                            className="w-full md:w-1/2 px-4 py-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option>Asia/Kolkata (GMT +5:30)</option>
                            <option>Europe/London (GMT +0)</option>
                            <option>America/New_York (GMT -5)</option>
                            <option>Australia/Sydney (GMT +10)</option>
                        </select>
                    </div>

                    {/* Save */}
                    <div className="text-center pt-4">
                        <button
                            onClick={handleSave}
                            className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 flex items-center justify-center mx-auto gap-2 transition-all"
                        >
                            <Save size={18} /> {t("save")}
                        </button>

                        {saved && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                                <CheckCircle2 size={18} /> {t("saved")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
