export const translations = {
  en: {
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    submit: 'Submit',
    
    // Authentication
    welcome: 'Welcome to Sports AI',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    name: 'Full Name',
    selectRole: 'Select Your Role',
    athlete: 'Athlete',
    coach: 'Coach/Trainer',
    official: 'Sports Official',
    
    // Dashboard
    dashboard: 'Dashboard',
    takeTest: 'Take a Test',
    myProgress: 'My Progress',
    leaderboard: 'Leaderboard',
    achievements: 'Achievements',
    profile: 'Profile',
    settings: 'Settings',
    
    // Sports
    selectSport: 'Select Sport',
    startAssessment: 'Start Assessment',
    preparingCamera: 'Preparing Camera...',
    analyzing: 'Analyzing Performance...',
    results: 'Results',
    
    // Performance
    score: 'Score',
    percentile: 'Percentile',
    benchmark: 'Benchmark',
    improvement: 'Improvement',
    streak: 'Current Streak',
    personalBest: 'Personal Best',
  },
  hi: {
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    retry: 'पुनः प्रयास',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    submit: 'जमा करें',
    
    // Authentication
    welcome: 'स्पोर्ट्स AI में आपका स्वागत है',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    signOut: 'साइन आउट',
    email: 'ईमेल',
    phone: 'फ़ोन नंबर',
    password: 'पासवर्ड',
    name: 'पूरा नाम',
    selectRole: 'अपनी भूमिका चुनें',
    athlete: 'खिलाड़ी',
    coach: 'कोच/प्रशिक्षक',
    official: 'खेल अधिकारी',
    
    // Dashboard
    dashboard: 'डैशबोर्ड',
    takeTest: 'परीक्षा लें',
    myProgress: 'मेरी प्रगति',
    leaderboard: 'लीडरबोर्ड',
    achievements: 'उपलब्धियां',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    
    // Sports
    selectSport: 'खेल चुनें',
    startAssessment: 'मूल्यांकन शुरू करें',
    preparingCamera: 'कैमरा तैयार किया जा रहा है...',
    analyzing: 'प्रदर्शन का विश्लेषण...',
    results: 'परिणाम',
    
    // Performance
    score: 'स्कोर',
    percentile: 'प्रतिशतक',
    benchmark: 'बेंचमार्क',
    improvement: 'सुधार',
    streak: 'वर्तमान स्ट्रीक',
    personalBest: 'व्यक्तिगत सर्वश्रेष्ठ',
  }
};

export type TranslationKey = keyof typeof translations.en;
export type Language = keyof typeof translations;