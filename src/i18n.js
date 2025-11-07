import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: { translation: { settings: "Settings & Preferences", darkMode: "Dark Mode", notifications: "Notifications", privacyMode: "Privacy Mode", language: "Language", timezone: "Timezone", save: "Save Changes", saved: "Settings Saved!" } },
    hi: { translation: { settings: "सेटिंग्स और प्राथमिकताएं", darkMode: "डार्क मोड", notifications: "सूचनाएं", privacyMode: "गोपनीयता मोड", language: "भाषा", timezone: "समय क्षेत्र", save: "परिवर्तन सहेजें", saved: "सेटिंग्स सहेजी गईं!" } },
    te: { translation: { settings: "సెట్టింగులు మరియు ప్రాధాన్యతలు", darkMode: "డార్క్ మోడ్", notifications: "నోటిఫికేషన్లు", privacyMode: "గోప్యత మోడ్", language: "భాష", timezone: "సమయ మండలం", save: "మార్పులను సేవ్ చేయండి", saved: "సెట్టింగులు సేవ్ అయ్యాయి!" } },
    ta: { translation: { settings: "அமைப்புகள் மற்றும் விருப்பங்கள்", darkMode: "டார்க் மோட்", notifications: "அறிவிப்புகள்", privacyMode: "தனியுரிமை நிலை", language: "மொழி", timezone: "நேர மண்டலம்", save: "மாற்றங்களை சேமிக்கவும்", saved: "அமைப்புகள் சேமிக்கப்பட்டது!" } },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
