import type { Language } from "./i18n";

export const diseaseDB: Record<string, Record<string, any>> = {
    tomato: {
        severity: "Moderate",
        sev: "#F59E0B",
        cause: "Alternaria solani",
        emoji: "🍅",
        en: {
            name: "Tomato — Early Blight",
            symptoms: "Dark concentric rings with yellow halos. Lesions appear on older, lower leaves first.",
            treatment: "Remove infected leaves. Apply copper fungicide every 7–10 days.",
            prevention: "Rotate crops annually. Use resistant varieties. Space plants for airflow."
        },
        ta: {
            name: "தக்காளி — ஆரம்ப கருகல் நோய்",
            symptoms: "மஞ்சள் வளையங்களுடன் இருண்ட வட்டங்கள். முதலில் பழைய, கீழ் இலைகளில் புண்கள் தோன்றும்.",
            treatment: "பாதிக்கப்பட்ட இலைகளை அகற்றவும். செம்பு பூஞ்சாணக்கொல்லியை 7-10 நாட்களுக்கு ஒருமுறை தெளிக்கவும்.",
            prevention: "ஆண்டுதோறும் பயிர் சுழற்சி செய்யவும். எதிர்ப்பு ரகங்களை பயன்படுத்தவும்."
        },
        hi: {
            name: "टमाटर — अगेती झुलसा",
            symptoms: "पीले घेरे के साथ गहरे छल्ले। सबसे पहले पुरानी, निचली पत्तियों पर धब्बे दिखाई देते हैं।",
            treatment: "संक्रमित पत्तियों को हटा दें। हर 7-10 दिनों में कॉपर कवकनाशी लगाएं।",
            prevention: "सालाना फसल चक्र अपनाएं। प्रतिरोधी किस्मों का प्रयोग करें।"
        }
    },
    potato: {
        severity: "Severe",
        sev: "#EF4444",
        cause: "Phytophthora infestans",
        emoji: "🥔",
        en: {
            name: "Potato — Late Blight",
            symptoms: "Water-soaked patches turning dark brown-black. White mold on undersides.",
            treatment: "Apply Mancozeb or Chlorothalonil fungicide. Destroy infected plants.",
            prevention: "Plant certified seed only. Scout fields weekly. Avoid excessive nitrogen."
        },
        ta: {
            name: "உருளைக்கிழங்கு — தாமதமான கருகல் நோய்",
            symptoms: "தண்ணீர் தேங்கிய தழும்புகள் பழுப்பு-கருப்பாக மாறும். இலைக்கு அடியில் வெள்ளை பூஞ்சை.",
            treatment: "Mancozeb அல்லது Chlorothalonil பூஞ்சாணக்கொல்லியைப் பயன்படுத்தவும். பாதிக்கப்பட்ட தாவரங்களை அழிக்கவும்.",
            prevention: "சான்றளிக்கப்பட்ட விதைகளை மட்டும் நடவும். அதிகப்படியான நைட்ரஜனைத் தவிர்க்கவும்."
        },
        hi: {
            name: "आलू — पछेती झुलसा",
            symptoms: "पानी से भीगे हुए धब्बे गहरे भूरे-काले हो जाते हैं। निचली सतह पर सफेद फफूंद।",
            treatment: "मैन्कोजेब या क्लोरोथालोनिल कवकनाशी लगाएं। संक्रमित पौधों को नष्ट करें।",
            prevention: "केवल प्रमाणित बीज बोएं। अत्यधिक नाइट्रोजन से बचें।"
        }
    },
    corn: {
        severity: "Mild",
        sev: "#22C55E",
        cause: "Exserohilum turcicum",
        emoji: "🌽",
        en: {
            name: "Corn — Northern Leaf Blight",
            symptoms: "Long cigar-shaped gray-green lesions running parallel to veins.",
            treatment: "Apply foliar fungicide at onset. Ensure adequate potassium nutrition.",
            prevention: "Plant resistant hybrids. Rotate with soybeans. Manage crop residue."
        },
        ta: {
            name: "சோளம் — வடக்கு இலை கருகல்",
            symptoms: "நரம்புகளுக்கு இணையாக ஓடும் நீண்ட சாம்பல்-பச்சை புண்கள்.",
            treatment: "காளான் கொல்லி தெளிக்கவும். போதுமான பொட்டாசியம் ஊட்டம் உறுதி செய்யவும்.",
            prevention: "எதிர்ப்பு கலப்பினங்களை நடவும். சோயாபீன்ஸ் கொண்டு பயிர் சுழற்சி செய்யவும்."
        },
        hi: {
            name: "मक्का — उत्तरी पत्ती झुलसा",
            symptoms: "शिराओं के समानांतर चलने वाले लंबे भूरे-हरे धब्बे।",
            treatment: "शुरुआत में पर्ण कवकनाशी लगाएं। पर्याप्त पोटेशियम पोषण सुनिश्चित करें।",
            prevention: "प्रतिरोधी संकर किस्में बोएं। फसल अवशेषों का प्रबंधन करें।"
        }
    },
    apple: {
        severity: "Moderate",
        sev: "#F59E0B",
        cause: "Venturia inaequalis",
        emoji: "🍎",
        en: {
            name: "Apple — Scab",
            symptoms: "Olive-green to black spots on leaves and fruit. Leaves may twist and drop.",
            treatment: "Use Captan or Myclobutanil fungicides. Remove fallen leaves.",
            prevention: "Prune trees to improve air circulation. Plant scab-resistant varieties."
        },
        ta: {
            name: "ஆப்பிள் — சொறி நோய்",
            symptoms: "இலைகள் மற்றும் பழங்களில் ஆலிவ்-பச்சை முதல் கருப்பு நிற புள்ளிகள்.",
            treatment: "பூஞ்சாணக்கொல்லிகளைப் பயன்படுத்தவும். உதிர்ந்த இலைகளை அகற்றவும்.",
            prevention: "காற்று நுழைய மரங்களை கத்தரிக்கவும். எதிர்ப்பு ரகங்களை நடவும்."
        },
        hi: {
            name: "सेब — स्कैब",
            symptoms: "पत्तियों और फलों पर हरे-भूरे से काले धब्बे। पत्तियां मुड़कर गिर सकती हैं।",
            treatment: "कवकनाशी का प्रयोग करें। गिरे हुए पत्तों को हटा दें।",
            prevention: "हवा के प्रवाह के लिए पेड़ों की छंटाई करें।"
        }
    },
    grape: {
        severity: "Severe",
        sev: "#EF4444",
        cause: "Guignardia bidwellii",
        emoji: "🍇",
        en: {
            name: "Grape — Black Rot",
            symptoms: "Reddish-brown leaf spots. Berries turn into hard, black mummies.",
            treatment: "Apply protective fungicides before rain. Remove mummified berries.",
            prevention: "Ensure good canopy management for airflow. Practice vineyard sanitation."
        },
        ta: {
            name: "திராட்சை — கருப்பு அழுகல்",
            symptoms: "சிவப்பு-பழுப்பு இலை புள்ளிகள். பழங்கள் கடினமான, கருப்பு நிறமாக மாறும்.",
            treatment: "மழைக்கு முன் பூஞ்சாணக்கொல்லியைத் தெளிக்கவும்.",
            prevention: "நல்ல காற்று ஓட்டத்திற்கு கொடிகளை பராமரிக்கவும்."
        },
        hi: {
            name: "अंगूर — काला सड़न",
            symptoms: "लाल-भूरे रंग के पत्तों के धब्बे। जामुन कठोर, काले ममी में बदल जाते हैं।",
            treatment: "बारिश से पहले कवकनाशी लगाएं।",
            prevention: "अच्छी वायु प्रवाह बनाए रखें।"
        }
    },
    pepper: {
        severity: "Severe",
        sev: "#EF4444",
        cause: "Xanthomonas campestris",
        emoji: "🌶️",
        en: {
            name: "Pepper — Bacterial Spot",
            symptoms: "Small, water-soaked spots on leaves turning brown. Premature leaf drop.",
            treatment: "Use copper-based bactericides. Avoid overhead watering.",
            prevention: "Use disease-free seeds and transplants. Rotate pepper crops."
        },
        ta: {
            name: "மிளகாய் — பாக்டீரியா புள்ளி",
            symptoms: "இலைகளில் சிறிய புள்ளிகள் பழுப்பு நிறமாக மாறும். முன்கூட்டியே இலைகள் உதிரும்.",
            treatment: "செம்பு ভিত্তিক பாக்டீரியா கொல்லிகளைப் பயன்படுத்தவும்.",
            prevention: "நோய் இல்லாத விதைகலை பயன்படுத்தவும். பயிர் சுழற்சி செய்யவும்."
        },
        hi: {
            name: "मिर्च — जीवाणु धब्बा",
            symptoms: "पत्तियों पर छोटे पानी से भीगे धब्बे जो भूरे हो जाते हैं।",
            treatment: "कॉपर आधारित जीवाणुनाशकों का प्रयोग करें।",
            prevention: "रोग मुक्त बीज का उपयोग करें।"
        }
    }
};

// Fallback logic for any unknown disease class
export function getDiseaseDetails(plantType: string, lang: Language) {
    const defaultData = {
        severity: "N/A",
        sev: "#22C55E",
        cause: "Analyzing...",
        emoji: "🍃",
        en: {
            name: "Unknown / Healthy",
            symptoms: "Detailed diagnostic data not yet available for this specific class.",
            treatment: "Monitor the plant closely and follow general health guidelines.",
            prevention: "Regular site inspection and soil health management."
        },
        ta: {
            name: "தெரியவில்லை / ஆரோக்கியமானது",
            symptoms: "இந்த வகைக்கான விரிவான தரவுகள் கிடைக்கவில்லை.",
            treatment: "தாவரத்தை உற்று நோக்கி, பொது சுகாதார வழிகாட்டுதல்களைப் பின்பற்றவும்.",
            prevention: "வழக்கமான ஆய்வு மற்றும் மண் வள மேலாண்மை."
        },
        hi: {
            name: "अज्ञात / स्वस्थ",
            symptoms: "इस श्रेणी के लिए विस्तृत नैदानिक डेटा अभी उपलब्ध नहीं है।",
            treatment: "पौधे पर करीब से नज़र रखें और सामान्य स्वास्थ्य दिशानिर्देशों का पालन करें।",
            prevention: "नियमित निरीक्षण और मृदा स्वास्थ्य प्रबंधन।"
        }
    };

    const plantKey = plantType.trim().toLowerCase();
    const specificData = diseaseDB[plantKey];

    if (specificData) {
        return {
            severity: specificData.severity,
            sev: specificData.sev,
            cause: specificData.cause,
            emoji: specificData.emoji,
            name: specificData[lang].name,
            symptoms: specificData[lang].symptoms,
            treatment: specificData[lang].treatment,
            prevention: specificData[lang].prevention
        };
    }

    return {
        severity: defaultData.severity,
        sev: defaultData.sev,
        cause: defaultData.cause,
        emoji: defaultData.emoji,
        name: defaultData[lang].name,
        symptoms: defaultData[lang].symptoms,
        treatment: defaultData[lang].treatment,
        prevention: defaultData[lang].prevention
    };
}
