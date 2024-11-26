import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import KR_TRANSLATION from './locales/kr/translation.json';
import EN_TRANSLATION from './locales/en/translation.json';
// import KR_LOGIN from './locales/kr/login.json';
// import KR_HOMECHART from './locales/kr/home-chart.json';
// import KR_HOMECARD from './locales/kr/home-card.json';
import LanguageDetector from 'i18next-browser-languagedetector';

export const i18nLanguages = { en: 'English', kr: '한글' };
export type I18nLanguage = keyof typeof i18nLanguages;
export const i18nDefaultLang: I18nLanguage = 'kr';

const i18nNamespaces = ['common', 'login', 'homeChart', 'homeCard'] as const;
export type I18nNamespace = (typeof i18nNamespaces)[number];
export const i18nDefaultNs: I18nNamespace = 'common';

export const resources = {
  kr: {
    translation: KR_TRANSLATION     
  },
  en: {
    translation: EN_TRANSLATION     
  },
} as const;

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',  // 기본 언어 설정
  debug: true,  // 개발 모드에서 디버그 정보 출력
  lng: i18nDefaultLang,
  ns: i18nNamespaces,
  defaultNS: i18nDefaultNs,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],  // 감지 순서
    caches: ['localStorage', 'cookie'],  // 언어 설정을 저장할 위치
    lookupQuerystring: 'lng',  // URL 쿼리스트링 파라미터에서 언어 설정을 찾을 때 사용할 키
    lookupCookie: 'i18next',  // 언어 설정을 저장할 쿠키의 이름
    lookupLocalStorage: 'i18nextLng',  // 로컬 스토리지에 저장할 키
    excludeCacheFor: ['cimode']  // 캐시를 사용하지 않을 언어 목록
  }
});



export default i18n;
