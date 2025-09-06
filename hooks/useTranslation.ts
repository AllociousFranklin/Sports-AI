import { useContext } from 'react';
import { translations, TranslationKey, Language } from '@/constants/translations';

// Mock language context - in real app would use React Context
const currentLanguage: Language = 'en';

export function useTranslation() {
  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (language: Language) => {
    // Implementation would update context/storage
    console.log('Changing language to:', language);
  };

  return { t, changeLanguage, currentLanguage };
}