export const translations = {
  hi: {
    // Navigation
    navbar: {
      home: "होम",
      schemes: "योजनाएं", 
      tracker: "आवेदन ट्रैकर",
      chat: "AI सहायता",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      login: "लॉगिन",
      register: "रजिस्टर करें",
      language: "भाषा",
      searchPlaceholder: "योजनाएं खोजें...",
    },
    
    // Auth Pages
    auth: {
      loginTitle: "नमस्ते 🙏",
      loginSubtitle: "अपने खाते में लॉगिन करें",
      registerTitle: "नमस्ते 🙏",
      registerSubtitle: "नया खाता बनाएं",
      email: "ईमेल पता",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड दोबारा डालें",
      name: "पूरा नाम",
      phone: "मोबाइल नंबर",
      emailOptional: "ईमेल (वैकल्पिक)",
      passwordPlaceholder: "••••••••",
      emailPlaceholder: "aapka@email.com",
      namePlaceholder: "जैसे: राम कुमार",
      phonePlaceholder: "10 अंक का नंबर",
      forgotPassword: "पासवर्ड भूल गए?",
      loginButton: "लॉगिन करें",
      registerButton: "खाता बनाएं",
      loggingIn: "लॉगिन हो रहा है...",
      registering: "खाता बन रहा है...",
      googleLogin: "Google से Login करें",
      googleRegister: "Google से Register करें",
      or: "या",
      noAccount: "खाता नहीं है?",
      haveAccount: "पहले से खाता है?",
      termsAgreement: "मैं Terms of Service से सहमत हूं",
      passwordStrength: "पासवर्ड की मजबूती",
      weak: "कमज़ोर",
      medium: "ठीक है",
      strong: "मज़बूत",
      emailInvalid: "सही ईमेल पता डालें",
      passwordMinLength: "पासवर्ड कम से कम 8 अक्षर होना चाहिए",
      passwordNumberRequired: "पासवर्ड में कम से कम एक नंबर होना चाहिए",
      passwordMismatch: "पासवर्ड मेल नहीं खाता",
      nameRequired: "नाम कम से कम 2 अक्षर होना चाहिए",
      phoneInvalid: "सही 10 अंक का मोबाइल नंबर डालें",
      termsRequired: "Terms से सहमत होना ज़रूरी है",
      loginError: "ईमेल या पासवर्ड गलत है",
      loginSuccess: "Login सफल! 🎉",
      registerError: "रजिस्टर में कुछ गलत हो गया",
      registerSuccess: "खाता बन गया! 🎉",
      genericError: "कुछ गलत हो गया, कृपया फिर से प्रयास करें",
    },

    // Hero Section
    home: {
      heroTitle: "सरकारी योजनाओं का लाभ उठाएं",
      heroSubtitle: "हर भारतीयों को सरकारी योजनाओं का लाभ दिलाने का हमारा मिशन",
      searchButton: "खोजें",
      getStarted: "मुफ्त में शुरू करें",
      learnMore: "और जानें",
      stats: {
        users: "पंजीकृत उपयोगकर्ता",
        schemes: "सरकारी योजनाएं",
        applications: "सफल आवेदन",
        states: "राज्य कवर"
      },
      featuresTitle: "क्यों सरकारी सैथी अलग है?",
      featuresSubtitle: "AI के माध्यम से योजनाएं खोजें, आवेदन करें, और ट्रैक करें - बिल्कुल किसी झंझाझ के बिना",
      testimonialsTitle: "लोगों क्या कहते हैं",
      testimonialsSubtitle: "लाखों भारतीयों ने हमारी सेवाओं से लाभ उठाया है",
      testimonials: {
        user1: {
          name: "रमेश प्रसाद",
          role: "किसान, बिहार",
          content: "सरकारी सैथी के कारण मुझे पीएम किसान योजना का लाभ मिला। बहुत आसान प्रक्रिया थी।"
        },
        user2: {
          name: "सुनीता देवी",
          role: "छात्रा, उत्तर प्रदेश",
          content: "छात्रवृत्ति योजनाएं ढूंढना बहुत आसान हो गया। AI चैटबॉट ने बहुत मदद की।"
        },
        user3: {
          name: "मोहम्मद अली",
          role: "व्यवसायी, गुजरात",
          content: "उद्योग ऋण योजना मिली, मेरा व्यापार बढ़ने में मदद मिली।"
        }
      }
    },
    
    // Dashboard
    dashboard: {
      welcome: "नमस्ते, {name}! 🙏",
      welcomeSubtitle: "आज नई सरकारी योजनाओं का लाभ उठाएं",
      profileCompletion: "प्रोफाइल पूर्णता",
      matchedSchemes: "आपके लिए {count} योजनाएं मिली हैं!",
      viewAllSchemes: "सभी योजनाएं देखें",
      newSearch: "नई खोज करें",
      findSchemes: "योजनाएं खोजें",
      noSchemesFound: "अभी AI से अपनी योजनाएं खोजें",
      stats: {
        total: "कुल आवेदन",
        approved: "स्वीकृत",
        pending: "विचाराधीन",
        saved: "सहेजा गया",
      },
      upcomingReminders: "आने वाली अंतिम तिथियां",
      viewAllReminders: "सभी रिमाइंडर देखें",
      aiQuickHelp: "AI त्वरित सहायता",
      askAIDesc: "कोई भी सरकारी योजना का सवाल हिंदी में पूछें",
      openAIAssistant: "AI साथी खोलें",
      recentActivity: "हाल की गतिविधि",
      days: "दिन",
    },

    // Sidebar/Navigation
    sidebar: {
      dashboard: "डैशबोर्ड",
      finder: "योजना खोजें",
      aiAssistant: "AI साथी",
      mySchemes: "मेरी योजनाएं",
      applicationTracker: "आवेदन ट्रैकर",
      family: "परिवार",
      documents: "दस्तावेज़",
      reminders: "रिमाइंडर",
      nearby: "नज़दीकी मदद",
      settings: "सेटिंग",
      profile: "प्रोफाइल",
      logout: "लॉगआउट",
      premium: "प्रीमियम लें",
    },
    
    // Voice Assistant
    voice: {
      title: "AI वॉइस सहायता",
      subtitle: "हिंदी और अंग्रेजी में बातचीत से बात करें, सरकारी योजनाओं के बारे में सहायता पाएं",
      speechRecognition: "वॉइस रिकॉग्नीशन",
      textToSpeech: "टेक्स्ट टू स्पीच",
      multilingual: "बहुभाषा समर्थन",
      browserSupport: "ब्राउज़र का समर्थन",
      startSpeaking: "बोलें शुरू करें",
      speaking: "बोल रहे हैं...",
      processing: "प्रोसेसिंग...",
      clickMic: "माइक्रोफोन दबाएं और बोलें",
      language: "भाषा",
      status: "स्थिति",
    },
    
    // Footer
    footer: {
      companyName: "सरकारी सैथी",
      copyright: " 2026 सरकारी सैथी. सभी अधिकार सुरक्षित हैं।",
    }
  },
  
  en: {
    // Navigation
    navbar: {
      home: "Home",
      schemes: "Schemes", 
      tracker: "Application Tracker",
      chat: "AI Assistant",
      about: "About Us",
      contact: "Contact",
      login: "Login",
      register: "Register",
      language: "Language",
      searchPlaceholder: "Search schemes...",
    },

    // Auth Pages
    auth: {
      loginTitle: "Hello 🙏",
      loginSubtitle: "Login to your account",
      registerTitle: "Hello 🙏",
      registerSubtitle: "Create a new account",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Full Name",
      phone: "Mobile Number",
      emailOptional: "Email (Optional)",
      passwordPlaceholder: "••••••••",
      emailPlaceholder: "your@email.com",
      namePlaceholder: "e.g., Ram Kumar",
      phonePlaceholder: "10-digit number",
      forgotPassword: "Forgot Password?",
      loginButton: "Login",
      registerButton: "Create Account",
      loggingIn: "Logging in...",
      registering: "Creating account...",
      googleLogin: "Login with Google",
      googleRegister: "Register with Google",
      or: "or",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      termsAgreement: "I agree to the Terms of Service",
      passwordStrength: "Password Strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      emailInvalid: "Please enter a valid email address",
      passwordMinLength: "Password must be at least 8 characters",
      passwordNumberRequired: "Password must contain at least one number",
      passwordMismatch: "Passwords do not match",
      nameRequired: "Name must be at least 2 characters",
      phoneInvalid: "Please enter a valid 10-digit mobile number",
      termsRequired: "You must agree to the terms",
      loginError: "Invalid email or password",
      loginSuccess: "Login successful! 🎉",
      registerError: "Something went wrong during registration",
      registerSuccess: "Account created successfully! 🎉",
      genericError: "Something went wrong, please try again",
    },

    // Hero Section
    home: {
      heroTitle: "Get Benefits of Government Schemes",
      heroSubtitle: "Our mission is to help every Indian get the benefits of government schemes",
      searchButton: "Search",
      getStarted: "Get Started for Free",
      learnMore: "Learn More",
      stats: {
        users: "Registered Users",
        schemes: "Government Schemes",
        applications: "Successful Applications",
        states: "States Covered"
      },
      featuresTitle: "Why Sarkari Saathi is Different?",
      featuresSubtitle: "Find schemes, apply, and track with AI-powered assistance - completely hassle-free",
      testimonialsTitle: "What People Are Saying",
      testimonialsSubtitle: "Millions of Indians have benefited from our services",
      testimonials: {
        user1: {
          name: "Ramesh Prasad",
          role: "Farmer, Bihar",
          content: "Sarkari Saathi helped me get PM Kisan scheme benefit. Very easy process."
        },
        user2: {
          name: "Sunita Devi",
          role: "Student, Uttar Pradesh",
          content: "Finding scholarship schemes became very easy. AI chatbot helped a lot."
        },
        user3: {
          name: "Mohammad Ali",
          role: "Businessman, Gujarat",
          content: "Got industry loan scheme, helped grow my business."
        }
      }
    },
    
    // Dashboard
    dashboard: {
      welcome: "Hello, {name}! 🙏",
      welcomeSubtitle: "Access new government schemes today",
      profileCompletion: "Profile Completion",
      matchedSchemes: "Found {count} schemes for you!",
      viewAllSchemes: "View All Schemes",
      newSearch: "New Search",
      findSchemes: "Find Schemes",
      noSchemesFound: "Find your schemes with AI now",
      stats: {
        total: "Total Applications",
        approved: "Approved",
        pending: "Pending",
        saved: "Saved",
      },
      upcomingReminders: "Upcoming Deadlines",
      viewAllReminders: "View All Reminders",
      aiQuickHelp: "AI Quick Help",
      askAIDesc: "Ask any government scheme question",
      openAIAssistant: "Open AI Assistant",
      recentActivity: "Recent Activity",
      days: "days",
    },

    // Sidebar/Navigation
    sidebar: {
      dashboard: "Dashboard",
      finder: "Scheme Finder",
      aiAssistant: "AI Assistant",
      mySchemes: "My Schemes",
      applicationTracker: "Application Tracker",
      family: "Family",
      documents: "Documents",
      reminders: "Reminders",
      nearby: "Nearby Help",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      premium: "Get Premium",
    },
    
    // Voice Assistant
    voice: {
      title: "AI Voice Assistant",
      subtitle: "Get help in Hindi and English with voice commands and text-to-speech",
      speechRecognition: "Voice Recognition",
      textToSpeech: "Text-to-Speech",
      multilingual: "Multilingual Support",
      browserSupport: "Browser Compatible",
      startSpeaking: "Start Speaking",
      speaking: "Speaking...",
      processing: "Processing...",
      clickMic: "Click microphone and speak",
      language: "Language",
      status: "Status",
    },
    
    // Footer
    footer: {
      companyName: "Sarkari Saathi",
      copyright: " 2026 Sarkari Saathi. All rights reserved.",
    }
  }
};

export type Language = "hi" | "en";

// Hook helper remains the same but updated for parameters if needed
export function useTranslation(language: Language) {
  return (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') return key;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = (value as string).replace(`{${k}}`, String(v));
      });
    }
    
    return value;
  };
}
