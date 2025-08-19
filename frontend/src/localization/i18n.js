import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend'

const fallbackLng = ["en"]

i18n
    .use(initReactI18next)
    .use(resourcesToBackend((lng,namespace) => import(`./locales/${lng}/${namespace}.json`)))
    .on('failedLoading', (lng, ns, msg) => console.error(msg))
    .init({
        ns: ['translation'],
        defaultNS: 'translation',
        debug: true,
        fallbackLng: 'en'
})

export default i18n