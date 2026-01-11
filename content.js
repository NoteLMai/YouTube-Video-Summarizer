// YouTube Video Summarizer - NoteLM.ai
// Content Script: Panel injection, API key management, and Gemini AI integration
// Version 1.2 - i18n internationalization support
// Uses Chrome's chrome.i18n API for UI localization
// Localized strings are in _locales/[lang]/messages.json

// ============================================================
// LEGACY UI STRINGS (kept as fallback, not used by i18n function)
// New translations should be added to _locales/[lang]/messages.json
// ============================================================
const UI_STRINGS = {
  // Panel
  panelTitle: 'YouTube Video Summarizer',
  settings: 'Settings',
  collapse: 'Collapse',
  expand: 'Expand',
  poweredBy: 'Built with Gemini AI',
  moreToolsAt: 'More tools at',
  
  // Loading - Progress stages
  generating: 'Generating summary...',
  loadingStage1: 'Preparing video content...',
  loadingStage2: 'Analyzing transcript...',
  loadingStage3: 'Generating AI summary...',
  loadingStage4: 'Formatting results...',
  estimatedTime: 'Estimated time',
  seconds: 'seconds',
  almostDone: 'Almost done...',
  takingLonger: 'This is taking longer than usual...',
  pleaseWait: 'Please wait, AI is thinking...',
  
  // Actions
  outputLanguage: 'Output Language',
  copy: 'Copy',
  regenerate: 'Regenerate',
  summarizeVideo: 'Summarize Video',
  tryAgain: 'Try Again',
  refreshPage: 'Refresh Page',
  configureApiKey: 'Configure API Key',
  
  // Setup
  setupRequired: 'Setup Required',
  setupDescription: "Add your Gemini API key to start summarizing videos. It's free and stays on your device.",
  readyToSummarize: 'Ready to Summarize',
  readyDescription: 'Click the button below to generate an AI summary of this video.',
  subtitleHint: 'For best results: 1) Play the video for a few seconds first, 2) Click the "CC" button to enable subtitles if available.',
  
  // Settings Modal
  geminiApiKey: 'Gemini API Key',
  enterApiKey: 'Enter your Gemini API key',
  getApiKey: 'Learn how to get your free API key at',
  apiKeyConfigured: 'API key configured',
  cancel: 'Cancel',
  save: 'Save',
  verify: 'Verify',
  verifying: 'Verifying...',
  selectModel: 'Select Model',
  model: 'Model',
  noModelsAvailable: 'No models available',
  apiKeyVerified: 'API key verified!',
  apiKeyInvalid: 'Invalid API key',
  verifyFirst: 'Please verify your API key first',
  loadingModels: 'Loading models...',
  modelSelected: 'Model selected',
  recommendedModel: 'Recommended',
  currentModel: 'Current model',
  
  // Toast Messages
  apiKeySaved: 'API key saved successfully!',
  apiKeyCleared: 'API key cleared',
  copied: 'Summary copied to clipboard!',
  copyFailed: 'Failed to copy summary',
  
  // Errors - General
  error: 'Error',
  howToFix: 'How to fix:',
  
  // Errors - Subtitles
  noSubtitles: 'No subtitles available. Please play the video first to load subtitles.',
  failedToFetchSubtitles: 'Failed to fetch video subtitles.',
  videoNotPlayed: 'Play the Video First',
  playVideoToCapture: 'Please play the video for a few seconds so we can capture the subtitles.',
  ccNotEnabled: 'Enable Subtitles (CC)',
  enableCCFirst: 'Subtitles need to be enabled for us to capture them.',
  subtitleNotCaptured: 'Subtitles Not Captured',
  refreshMayHelp: "We couldn't capture the subtitle data. This sometimes happens due to timing issues.",
  noSubtitlesAvailable: 'No Subtitles Available',
  videoNoSubtitles: "This video doesn't appear to have subtitles or closed captions.",
  subtitleError: 'Subtitle Error',
  couldNotGetSubtitles: 'Could not retrieve subtitle data.',
  subtitleFetchError: 'Failed to Load Subtitles',
  subtitleFetchErrorMsg: 'Could not fetch subtitle data from YouTube.',
  insufficientContent: 'Not Enough Content',
  subtitlesTooShort: 'The subtitle content is too short to generate a meaningful summary.',
  tryLongerVideo: 'This video may be too short or have minimal spoken content.',
  
  // Errors - API
  invalidApiKey: 'Invalid API Key',
  apiKeyInvalidMsg: 'Your Gemini API key is invalid or has been revoked.',
  checkApiKey: 'Please check your API key in settings or visit notelm.ai/support/api-key-guide for help.',
  apiKeyTooShort: 'The API key appears to be invalid. Please check and re-enter your Gemini API key.',
  getNewApiKey: 'Learn how to get a valid API key at notelm.ai',
  requestError: 'Request Error',
  badRequestMsg: 'The request to Gemini API failed.',
  tryAgainLater: 'Please try again later.',
  unauthorized: 'Unauthorized',
  apiKeyUnauthorized: 'Your API key is not authorized to use this service.',
  checkApiKeyPermissions: 'Make sure your API key has the correct permissions.',
  accessDenied: 'Access Denied',
  apiKeyForbidden: 'Access to Gemini API is forbidden with this API key.',
  checkApiKeyOrRegion: 'Your API key may be restricted or Gemini may not be available in your region.',
  rateLimitExceeded: 'Rate Limit Exceeded',
  tooManyRequests: 'You have exceeded the API rate limit or quota.',
  waitAndRetry: 'Please wait a few minutes and try again. Consider upgrading your API plan if this persists.',
  serverError: 'Server Error',
  geminiServerError: 'Gemini API is experiencing issues.',
  apiError: 'API Error',
  unknownApiError: 'An error occurred while calling Gemini API.',
  contentFiltered: 'Content Filtered',
  safetyFilterTriggered: 'The content was filtered by safety settings.',
  tryDifferentVideo: 'Try a different video with less sensitive content.',
  noSummaryGenerated: 'No Summary Generated',
  aiDidNotRespond: 'The AI did not generate a response.',
  summaryIncomplete: 'Summary May Be Incomplete',
  outputTruncated: 'The AI response was cut off due to length limits.',
  tryDifferentModel: 'Try switching to a more powerful model (e.g. gemini-2.5-pro) and regenerate.',
  switchModel: 'Switch Model',
  retryWithOptions: 'Retry with Options',
  
  // Step instructions
  step1Play: 'Click play on the video',
  step2Wait: 'Wait 3-5 seconds',
  step3Summarize: 'Click "Summarize Video" again',
  step1EnableCC: 'Click the CC button on the video player',
  step2PlayAgain: 'Play the video for a few seconds',
  tryRefresh: 'Refresh the page (F5)',
  playWithCC: 'Play the video with CC enabled',
  trySummarize: 'Try summarizing again',
  tryRefreshCheck: 'Try refreshing the page - sometimes the CC button loads late',
  checkOtherVideos: 'If no CC button appears, this video has no subtitles',
  tryAnotherVideo: 'Try a different video with CC available',
  refreshAndRetry: 'Refresh the page and try again.',
  
  // Language options for output (native names for selector display)
  // YouTube i18nLanguages API BCP-47 codes - sorted alphabetically by code
  langAfrikaans: 'Afrikaans',
  langAmharic: 'አማርኛ',
  langArabic: 'العربية',
  langAssamese: 'অসমীয়া',
  langAzerbaijani: 'Azərbaycan',
  langBelarusian: 'Беларуская',
  langBulgarian: 'Български',
  langBangla: 'বাংলা',
  langBosnian: 'Bosanski',
  langCatalan: 'Català',
  langCzech: 'Čeština',
  langDanish: 'Dansk',
  langGerman: 'Deutsch',
  langGreek: 'Ελληνικά',
  langEnglish: 'English',
  langEnglishUK: 'English (UK)',
  langEnglishIN: 'English (India)',
  langSpanish: 'Español',
  langSpanishLatam: 'Español (Latinoamérica)',
  langSpanishUS: 'Español (US)',
  langEstonian: 'Eesti',
  langBasque: 'Euskara',
  langPersian: 'فارسی',
  langFinnish: 'Suomi',
  langFilipino: 'Filipino',
  langFrench: 'Français',
  langFrenchCA: 'Français (Canada)',
  langGalician: 'Galego',
  langGujarati: 'ગુજરાતી',
  langHindi: 'हिन्दी',
  langCroatian: 'Hrvatski',
  langHungarian: 'Magyar',
  langArmenian: 'Հայերեն',
  langIndonesian: 'Bahasa Indonesia',
  langIcelandic: 'Íslenska',
  langItalian: 'Italiano',
  langHebrew: 'עברית',
  langJapanese: '日本語',
  langGeorgian: 'ქართული',
  langKazakh: 'Қазақша',
  langKhmer: 'ខ្មែរ',
  langKannada: 'ಕನ್ನಡ',
  langKorean: '한국어',
  langKyrgyz: 'Кыргызча',
  langLao: 'ລາວ',
  langLithuanian: 'Lietuvių',
  langLatvian: 'Latviešu',
  langMacedonian: 'Македонски',
  langMalayalam: 'മലയാളം',
  langMongolian: 'Монгол',
  langMarathi: 'मराठी',
  langMalay: 'Bahasa Melayu',
  langBurmese: 'မြန်မာ',
  langNepali: 'नेपाली',
  langDutch: 'Nederlands',
  langNorwegian: 'Norsk',
  langOdia: 'ଓଡ଼ିଆ',
  langPunjabi: 'ਪੰਜਾਬੀ',
  langPolish: 'Polski',
  langPortuguese: 'Português',
  langPortuguesePT: 'Português (Portugal)',
  langRomanian: 'Română',
  langRussian: 'Русский',
  langSinhala: 'සිංහල',
  langSlovak: 'Slovenčina',
  langSlovenian: 'Slovenščina',
  langAlbanian: 'Shqip',
  langSerbian: 'Српски',
  langSerbianLatin: 'Srpski (latinica)',
  langSwedish: 'Svenska',
  langSwahili: 'Kiswahili',
  langTamil: 'தமிழ்',
  langTelugu: 'తెలుగు',
  langThai: 'ภาษาไทย',
  langTurkish: 'Türkçe',
  langUkrainian: 'Українська',
  langUrdu: 'اردو',
  langUzbek: "Oʻzbek",
  langVietnamese: 'Tiếng Việt',
  langChineseCN: '中文 (简体)',
  langChineseHK: '中文 (香港)',
  langChineseTW: '中文 (繁體)',
  langZulu: 'isiZulu'
};

/**
 * Chrome i18n helper function
 * Retrieves localized messages from _locales/[lang]/messages.json
 * @param {string} key - The message key from messages.json
 * @param {string|string[]} [substitutions] - Optional substitution strings for placeholders
 * @returns {string} The localized message or the key if not found
 */
const i18n = (key, substitutions) => {
  const message = chrome.i18n.getMessage(key, substitutions);
  return message || key;
};

const STORAGE_KEYS = {
  API_KEY: 'nlm_gemini_api_key',
  SUBTITLE_URL: 'yt_subtitle_url',
  VIDEO_ID: 'yt_current_video_id',
  OUTPUT_LANG: 'nlm_output_language',
  SELECTED_MODEL: 'nlm_selected_model',
  AVAILABLE_MODELS: 'nlm_available_models'
};

// Get default language based on browser language
// Maps browser locale to YouTube i18nLanguages BCP-47 codes
const getDefaultOutputLanguage = () => {
  const browserLang = chrome.i18n.getUILanguage();
  const langMap = {
    // Direct mappings to YouTube BCP-47 codes
    'af': 'af',
    'am': 'am',
    'ar': 'ar',
    'as': 'as',
    'az': 'az',
    'be': 'be',
    'bg': 'bg',
    'bn': 'bn',
    'bs': 'bs',
    'ca': 'ca',
    'cs': 'cs',
    'da': 'da',
    'de': 'de',
    'el': 'el',
    'en': 'en',
    'en-GB': 'en-GB',
    'en-IN': 'en-IN',
    'en-US': 'en',
    'en-AU': 'en-GB',
    'es': 'es',
    'es-419': 'es-419',
    'es-US': 'es-US',
    'es-MX': 'es-419',
    'es-AR': 'es-419',
    'et': 'et',
    'eu': 'eu',
    'fa': 'fa',
    'fi': 'fi',
    'fil': 'fil',
    'fr': 'fr',
    'fr-CA': 'fr-CA',
    'gl': 'gl',
    'gu': 'gu',
    'hi': 'hi',
    'hr': 'hr',
    'hu': 'hu',
    'hy': 'hy',
    'id': 'id',
    'is': 'is',
    'it': 'it',
    'iw': 'iw',
    'he': 'iw',  // Hebrew: standard BCP-47 'he' maps to YouTube's 'iw'
    'ja': 'ja',
    'ka': 'ka',
    'kk': 'kk',
    'km': 'km',
    'kn': 'kn',
    'ko': 'ko',
    'ky': 'ky',
    'lo': 'lo',
    'lt': 'lt',
    'lv': 'lv',
    'mk': 'mk',
    'ml': 'ml',
    'mn': 'mn',
    'mr': 'mr',
    'ms': 'ms',
    'my': 'my',
    'ne': 'ne',
    'nl': 'nl',
    'no': 'no',
    'nb': 'no',  // Norwegian Bokmål maps to 'no'
    'nn': 'no',  // Norwegian Nynorsk maps to 'no'
    'or': 'or',
    'pa': 'pa',
    'pl': 'pl',
    'pt': 'pt',
    'pt-BR': 'pt',
    'pt-PT': 'pt-PT',
    'ro': 'ro',
    'ru': 'ru',
    'si': 'si',
    'sk': 'sk',
    'sl': 'sl',
    'sq': 'sq',
    'sr': 'sr',
    'sr-Latn': 'sr-Latn',
    'sv': 'sv',
    'sw': 'sw',
    'ta': 'ta',
    'te': 'te',
    'th': 'th',
    'tr': 'tr',
    'uk': 'uk',
    'ur': 'ur',
    'uz': 'uz',
    'vi': 'vi',
    'zh-CN': 'zh-CN',
    'zh-Hans': 'zh-CN',
    'zh-TW': 'zh-TW',
    'zh-Hant': 'zh-TW',
    'zh-HK': 'zh-HK',
    'zu': 'zu'
  };
  
  // Check exact match first
  if (langMap[browserLang]) return langMap[browserLang];
  
  // Check language prefix for regional variants
  const prefix = browserLang.split('-')[0];
  if (prefix === 'zh') return 'zh-CN';  // Default Chinese to Simplified
  if (prefix === 'en') return 'en';
  if (prefix === 'es') return 'es';
  if (prefix === 'fr') return 'fr';
  if (prefix === 'pt') return 'pt';
  if (langMap[prefix]) return langMap[prefix];
  
  return 'en';
};

// Gemini API endpoints
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODELS_ENDPOINT = `${GEMINI_API_BASE}/models`;
const getGeminiGenerateEndpoint = (modelName) => `${GEMINI_API_BASE}/models/${modelName}:generateContent`;

// Default model if none selected (most capable model)
const DEFAULT_MODEL = 'gemini-2.5-pro';

// Model ranking for sorting (higher = better)
// Based on https://ai.google.dev/gemini-api/docs/models official ordering
const MODEL_RANKING = {
  // Gemini 3 series (newest, most capable) - Dec 2025
  'gemini-3-pro': 200,
  'gemini-3-pro-preview': 195,
  'gemini-3-flash': 190,
  'gemini-3-flash-preview': 185,
  // Gemini 2.5 series
  'gemini-2.5-flash': 170,           // Fast and intelligent (stable)
  'gemini-2.5-flash-preview': 165,
  'gemini-2.5-flash-lite': 160,      // Ultra fast
  'gemini-2.5-flash-lite-preview': 155,
  'gemini-2.5-pro': 150,             // Advanced thinking model
  'gemini-2.5-pro-preview': 145,
  // Gemini 2.0 series (previous generation)
  'gemini-2.0-flash': 130,
  'gemini-2.0-flash-001': 125,
  'gemini-2.0-flash-lite': 120,
  'gemini-2.0-flash-lite-001': 115,
  // Gemini 1.5 series (legacy)
  'gemini-1.5-pro': 100,
  'gemini-1.5-flash': 95,
  'gemini-1.5-flash-8b': 90,
  // Gemini 1.0 series (legacy)
  'gemini-pro': 50,
  // Default for unknown models
  'default': 10
};

// Models to exclude (non-text output models)
// These models don't output text or are specialized for other tasks
const EXCLUDED_MODEL_PATTERNS = [
  'image',           // Image generation models (gemini-*-image-*)
  'tts',             // Text-to-speech models (gemini-*-tts)
  'audio',           // Audio/Live models (gemini-*-audio-*, native-audio)
  'embedding',       // Embedding models
  'aqa',             // AQA (Attributed Question Answering) models
  'vision',          // Vision-only models
  'veo',             // Video generation
  'imagen',          // Image generation
  'lyria',           // Music generation
];

// Language display names for the prompt
// YouTube i18nLanguages API BCP-47 codes - sorted alphabetically by code
const LANGUAGE_NAMES = {
  'af': 'Afrikaans',
  'am': 'Amharic',
  'ar': 'Arabic',
  'as': 'Assamese',
  'az': 'Azerbaijani',
  'be': 'Belarusian',
  'bg': 'Bulgarian',
  'bn': 'Bangla',
  'bs': 'Bosnian',
  'ca': 'Catalan',
  'cs': 'Czech',
  'da': 'Danish',
  'de': 'German',
  'el': 'Greek',
  'en': 'English',
  'en-GB': 'English (United Kingdom)',
  'en-IN': 'English (India)',
  'es': 'Spanish',
  'es-419': 'Spanish (Latin America)',
  'es-US': 'Spanish (United States)',
  'et': 'Estonian',
  'eu': 'Basque',
  'fa': 'Persian',
  'fi': 'Finnish',
  'fil': 'Filipino',
  'fr': 'French',
  'fr-CA': 'French (Canada)',
  'gl': 'Galician',
  'gu': 'Gujarati',
  'hi': 'Hindi',
  'hr': 'Croatian',
  'hu': 'Hungarian',
  'hy': 'Armenian',
  'id': 'Indonesian',
  'is': 'Icelandic',
  'it': 'Italian',
  'iw': 'Hebrew',
  'ja': 'Japanese',
  'ka': 'Georgian',
  'kk': 'Kazakh',
  'km': 'Khmer',
  'kn': 'Kannada',
  'ko': 'Korean',
  'ky': 'Kyrgyz',
  'lo': 'Lao',
  'lt': 'Lithuanian',
  'lv': 'Latvian',
  'mk': 'Macedonian',
  'ml': 'Malayalam',
  'mn': 'Mongolian',
  'mr': 'Marathi',
  'ms': 'Malay',
  'my': 'Burmese',
  'ne': 'Nepali',
  'nl': 'Dutch',
  'no': 'Norwegian',
  'or': 'Odia',
  'pa': 'Punjabi',
  'pl': 'Polish',
  'pt': 'Portuguese',
  'pt-PT': 'Portuguese (Portugal)',
  'ro': 'Romanian',
  'ru': 'Russian',
  'si': 'Sinhala',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'sq': 'Albanian',
  'sr': 'Serbian',
  'sr-Latn': 'Serbian (Latin)',
  'sv': 'Swedish',
  'sw': 'Swahili',
  'ta': 'Tamil',
  'te': 'Telugu',
  'th': 'Thai',
  'tr': 'Turkish',
  'uk': 'Ukrainian',
  'ur': 'Urdu',
  'uz': 'Uzbek',
  'vi': 'Vietnamese',
  'zh-CN': 'Chinese (Simplified)',
  'zh-HK': 'Chinese (Hong Kong)',
  'zh-TW': 'Chinese (Traditional)',
  'zu': 'Zulu'
};

// Icons as SVG strings
const ICONS = {
  settings: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  collapse: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`,
  expand: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
  refresh: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  video: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`
};

class YouTubeSummarizer {
  constructor() {
    this.panel = null;
    this.isCollapsed = false;
    this.currentVideoId = null;
    this.summary = null;
    this.isLoading = false;
    this.apiKey = null;
    this.outputLanguage = getDefaultOutputLanguage();
    this.currentError = null; // Store current error for display
    this.selectedModel = DEFAULT_MODEL; // User's selected model
    this.availableModels = []; // List of available models from API
    
    // Loading progress state
    this.loadingStage = 0; // 0-4 stages
    this.loadingStartTime = null;
    this.loadingTimer = null;
    this.estimatedDuration = 15; // seconds
    
    this.init();
  }

  async init() {
    // Wait for YouTube page to load
    await this.waitForElement('#secondary');
    
    // Load saved API key, output language, and model selection
    await this.loadApiKey();
    await this.loadOutputLanguage();
    await this.loadSelectedModel();
    await this.loadAvailableModels();
    
    // Create and inject panel
    this.createPanel();
    this.injectPanel();
    
    // Listen for URL changes (YouTube SPA navigation)
    this.observeUrlChanges();
    
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'TOGGLE_PANEL') {
        this.toggleCollapse();
      }
    });
  }

  waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        return resolve(element);
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found`));
      }, timeout);
    });
  }

  // ============================================================
  // UTILITY METHODS - Timestamp formatting and video control
  // ============================================================

  /**
   * Format milliseconds to timestamp string (M:SS or H:MM:SS)
   */
  formatTimestamp(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Format seconds to human-readable duration (e.g., "5m 30s" or "1h 20m")
   */
  formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return 'Unknown';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  /**
   * Convert timestamp string (M:SS or H:MM:SS) to seconds
   */
  timestampToSeconds(timestamp) {
    const parts = timestamp.split(':').map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return parts[0] * 60 + parts[1];
  }

  /**
   * Seek video to specific time in seconds
   */
  seekToTime(seconds) {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = seconds;
      video.play().catch(() => {}); // Ignore autoplay errors
      video.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ============================================================
  // STORAGE METHODS - API key and language persistence
  // ============================================================

  async loadApiKey() {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.API_KEY], (result) => {
        this.apiKey = result[STORAGE_KEYS.API_KEY] || null;
        resolve();
      });
    });
  }

  async saveApiKey(key) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEYS.API_KEY]: key }, () => {
        this.apiKey = key;
        resolve();
      });
    });
  }

  async loadOutputLanguage() {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.OUTPUT_LANG], (result) => {
        if (result[STORAGE_KEYS.OUTPUT_LANG]) {
          this.outputLanguage = result[STORAGE_KEYS.OUTPUT_LANG];
        }
        resolve();
      });
    });
  }

  async saveOutputLanguage(lang) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEYS.OUTPUT_LANG]: lang }, () => {
        this.outputLanguage = lang;
        resolve();
      });
    });
  }

  async loadSelectedModel() {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.SELECTED_MODEL], (result) => {
        if (result[STORAGE_KEYS.SELECTED_MODEL]) {
          this.selectedModel = result[STORAGE_KEYS.SELECTED_MODEL];
        }
        resolve();
      });
    });
  }

  async saveSelectedModel(model) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEYS.SELECTED_MODEL]: model }, () => {
        this.selectedModel = model;
        resolve();
      });
    });
  }

  async loadAvailableModels() {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.AVAILABLE_MODELS], (result) => {
        if (result[STORAGE_KEYS.AVAILABLE_MODELS]) {
          this.availableModels = result[STORAGE_KEYS.AVAILABLE_MODELS];
        }
        resolve();
      });
    });
  }

  async saveAvailableModels(models) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEYS.AVAILABLE_MODELS]: models }, () => {
        this.availableModels = models;
        resolve();
      });
    });
  }

  // ============================================================
  // MODEL MANAGEMENT - Fetch, validate, and select models
  // ============================================================

  /**
   * Fetch available models from Gemini API
   * This also serves as API key validation
   */
  async fetchAvailableModels(apiKey) {
    const url = `${GEMINI_MODELS_ENDPOINT}?key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 400 || response.status === 401 || response.status === 403) {
          throw new Error('INVALID_API_KEY');
        }
        throw new Error(`API_ERROR_${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.models || !Array.isArray(data.models)) {
        throw new Error('INVALID_RESPONSE');
      }
      
      // Filter and process models - only include models that support generateContent and output text
      const supportedModels = data.models
        .filter(model => {
          const modelId = model.name?.replace('models/', '') || '';
          const modelIdLower = modelId.toLowerCase();
          
          // Check if model supports generateContent method
          const supportsGenerate = model.supportedGenerationMethods?.includes('generateContent');
          if (!supportsGenerate) return false;
          
          // Must be a Gemini model
          if (!modelId.includes('gemini')) return false;
          
          // Exclude non-text output models (image, tts, audio, embedding, etc.)
          const isExcluded = EXCLUDED_MODEL_PATTERNS.some(pattern => 
            modelIdLower.includes(pattern.toLowerCase())
          );
          if (isExcluded) return false;
          
          return true;
        })
        .map(model => ({
          id: model.name.replace('models/', ''), // e.g., "gemini-2.0-flash"
          name: model.displayName || model.name.replace('models/', ''),
          description: model.description || '',
          inputTokenLimit: model.inputTokenLimit,
          outputTokenLimit: model.outputTokenLimit
        }));
      
      // Sort models by ranking (best first) based on official Google documentation order
      supportedModels.sort((a, b) => {
        const rankA = this.getModelRank(a.id);
        const rankB = this.getModelRank(b.id);
        return rankB - rankA; // Higher rank first
      });
      
      return supportedModels;
      
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  /**
   * Get model ranking score for sorting
   * Based on https://ai.google.dev/gemini-api/docs/models official ordering
   */
  getModelRank(modelId) {
    // Check exact match first
    if (MODEL_RANKING[modelId]) {
      return MODEL_RANKING[modelId];
    }
    
    // Check partial matches - find the best matching prefix
    let bestMatch = null;
    let bestMatchLength = 0;
    
    for (const [key, rank] of Object.entries(MODEL_RANKING)) {
      if (key !== 'default' && modelId.startsWith(key) && key.length > bestMatchLength) {
        bestMatch = rank;
        bestMatchLength = key.length;
      }
    }
    
    if (bestMatch !== null) {
      return bestMatch - 1; // Slightly lower than exact match
    }
    
    // Assign rank based on version number patterns (fallback)
    // Following Google's official model ordering
    if (modelId.includes('gemini-3')) {
      if (modelId.includes('pro')) return 190;
      if (modelId.includes('flash')) return 180;
      return 175;
    }
    if (modelId.includes('2.5')) {
      if (modelId.includes('flash-lite')) return 155;
      if (modelId.includes('flash')) return 165;
      if (modelId.includes('pro')) return 145;
      return 140;
    }
    if (modelId.includes('2.0')) {
      if (modelId.includes('flash-lite')) return 115;
      if (modelId.includes('flash')) return 125;
      return 110;
    }
    if (modelId.includes('1.5')) {
      if (modelId.includes('pro')) return 100;
      if (modelId.includes('flash')) return 95;
      return 90;
    }
    if (modelId.includes('1.0') || modelId === 'gemini-pro') return 50;
    
    return MODEL_RANKING.default;
  }

  /**
   * Get the best available model from the list
   */
  getBestModel(models) {
    if (!models || models.length === 0) {
      return DEFAULT_MODEL;
    }
    // Models are already sorted by rank, so first one is best
    return models[0].id;
  }

  /**
   * Validate API key by attempting to fetch models
   */
  async validateApiKey(apiKey) {
    try {
      const models = await this.fetchAvailableModels(apiKey);
      return { valid: true, models };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  // ============================================================
  // METADATA COLLECTION - Video information extraction
  // ============================================================

  /**
   * Collect comprehensive video metadata from the page
   */
  getVideoMetadata() {
    // Video title
    const titleEl = document.querySelector(
      'h1.ytd-video-primary-info-renderer, h1 yt-formatted-string, h1.style-scope.ytd-watch-metadata'
    );
    const title = titleEl?.textContent?.trim() || 
                  document.title.replace(' - YouTube', '').trim() || 
                  'Untitled Video';
    
    // Channel name
    const channelEl = document.querySelector(
      '#channel-name a, ytd-channel-name a, #owner #channel-name'
    );
    const channel = channelEl?.textContent?.trim() || 'Unknown Channel';
    
    // Video duration from player
    const video = document.querySelector('video');
    const durationSeconds = video && !isNaN(video.duration) ? Math.floor(video.duration) : 0;
    const duration = this.formatDuration(durationSeconds);
    
    // Video description (first 200 characters)
    const descEl = document.querySelector(
      '#description-inline-expander yt-attributed-string, #description yt-formatted-string, #description'
    );
    const description = descEl?.textContent?.trim().substring(0, 200) || '';
    
    return { title, channel, duration, durationSeconds, description };
  }

  // ============================================================
  // SUBTITLE EXTRACTION - With timestamp preservation
  // ============================================================

  /**
   * Fetch and parse subtitles, preserving timestamp information
   */
  async fetchSubtitles(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Extract segments with timing
      const segments = [];
      for (const event of data.events || []) {
        if (event.segs && event.tStartMs !== undefined) {
          const text = event.segs
            .map(seg => seg.utf8 || '')
            .join('')
            .trim();
          
          if (text && text !== '\n') {
            segments.push({
              startMs: event.tStartMs,
              durationMs: event.dDurationMs || 0,
              text: text
            });
          }
        }
      }
      
      if (segments.length === 0) {
        throw new Error(i18n('noSubtitles'));
      }
      
      // Format transcript with timestamp markers every ~30 seconds
      let transcript = '';
      let lastMarkerTime = -30000;
      
      for (const seg of segments) {
        // Insert timestamp marker every 30 seconds
        if (seg.startMs - lastMarkerTime >= 30000) {
          const timeStr = this.formatTimestamp(seg.startMs);
          transcript += `\n\n[${timeStr}]\n`;
          lastMarkerTime = seg.startMs;
        }
        transcript += seg.text + ' ';
      }
      
      return {
        text: transcript.trim(),
        totalDurationMs: segments.length > 0 
          ? segments[segments.length - 1].startMs + (segments[segments.length - 1].durationMs || 0)
          : 0,
        segmentCount: segments.length
      };
      
    } catch (error) {
      console.error('Error fetching subtitles:', error);
      throw new Error(i18n('failedToFetchSubtitles'));
    }
  }

  // ============================================================
  // PROMPT BUILDER - Dynamic prompt generation with language enforcement
  // ============================================================

  /**
   * Get content scale guidance based on video duration
   */
  getDurationGuidance(durationSeconds) {
    if (durationSeconds < 300) { // < 5 min
      return {
        chapters: '3-5',
        keyPoints: '4-6',
        summaryWords: '100-150',
        label: 'SHORT (under 5 min)'
      };
    } else if (durationSeconds < 900) { // 5-15 min
      return {
        chapters: '4-7',
        keyPoints: '5-7',
        summaryWords: '150-250',
        label: 'MEDIUM (5-15 min)'
      };
    } else if (durationSeconds < 1800) { // 15-30 min
      return {
        chapters: '6-10',
        keyPoints: '6-8',
        summaryWords: '200-350',
        label: 'LONG (15-30 min)'
      };
    } else { // > 30 min
      return {
        chapters: '8-12',
        keyPoints: '7-10',
        summaryWords: '300-500',
        label: 'EXTENDED (30+ min)'
      };
    }
  }

  /**
   * Build the complete optimized prompt with multi-layer language enforcement
   */
  buildPrompt(metadata) {
    const langName = LANGUAGE_NAMES[this.outputLanguage];
    const langCode = this.outputLanguage;
    const scale = this.getDurationGuidance(metadata.durationSeconds);
    
    return `###############################################################
# ⚠️ CRITICAL: OUTPUT LANGUAGE REQUIREMENT
###############################################################
# TARGET LANGUAGE: ${langName} (${langCode})
#
# You MUST write your ENTIRE response in ${langName}.
# This includes ALL of the following:
#   - Section headings (translate them to ${langName})
#   - Bullet points and descriptions
#   - Summary paragraphs
#   - Quote translations/paraphrases
#   - Tag keywords
#
# ONLY timestamps like [0:00] remain in numeric format.
# Everything else = ${langName}. No exceptions.
###############################################################

You are an expert video content analyst. Analyze the transcript below and create a comprehensive summary in ${langName} with clickable timestamps.

## Video Information
- **Title**: ${metadata.title}
- **Channel**: ${metadata.channel}
- **Duration**: ${metadata.duration}
${metadata.description ? `- **About**: ${metadata.description}...` : ''}

## Content Scale (${scale.label})
- Chapters: ${scale.chapters}
- Key Points: ${scale.keyPoints}
- Summary Length: ${scale.summaryWords} words

## Output Format (Write EVERYTHING in ${langName})

### 🎬 Overview [${langName}]
Write 2-3 sentences summarizing the video's main message and value proposition. Identify the video type (tutorial, review, lecture, interview, vlog, news, entertainment, etc.).

### 📑 Chapters [${langName}]
Create ${scale.chapters} logical chapters based on topic flow. Use this EXACT format:
- **[0:00]** [Chapter Title in ${langName}] - [Brief description in ${langName}]
- **[M:SS]** [Chapter Title in ${langName}] - [Brief description in ${langName}]

Rules:
✓ First chapter MUST start at [0:00]
✓ Use ONLY timestamps that appear in the transcript
✓ Space chapters logically based on topic changes

### 📌 Key Points [${langName}]
List ${scale.keyPoints} important points with timestamps:
- **[M:SS]** [Specific insight in ${langName}] - include relevant details, numbers, or names

### 📝 Summary [${langName}]
Write ${scale.summaryWords} words covering the main content. Organize by topic or chronological flow. Reference key moments with timestamps like: "At [M:SS], the speaker discusses..."

### 💬 Notable Quotes [${langName}]
Include 2-3 significant quotes. Translate or paraphrase into ${langName}:
> **[START - END]** "[Quote translated to ${langName}]..."

### 💡 Takeaways [${langName}]
List 3-5 actionable conclusions:
- **[M:SS]** [Practical takeaway in ${langName}]

### 🏷️ Tags [${langName}]
List 3-5 relevant hashtags in ${langName}. Format each tag with # prefix (e.g., #AI, #Tutorial, #Technology).
These tags will be clickable links to YouTube hashtag search.

---
🔔 LANGUAGE REMINDER: You are writing in ${langName}!
   Timestamps stay as [M:SS] format, all other text = ${langName}.
   Native ${langName} speakers should be able to read your response naturally.
---

## Quality Guidelines
✅ Use ONLY timestamps from the transcript (don't invent times)
✅ Be specific - avoid vague or generic statements
✅ Preserve important names, numbers, and technical terms
✅ Match the video's tone (casual/professional/educational)
✅ Each section should add unique value (no repetition)

###############################################################
# 📝 FINAL REMINDER: Your complete response MUST be in ${langName}
# Do NOT leave any untranslated text (except [M:SS] timestamps).
###############################################################

TRANSCRIPT (with [M:SS] timestamp markers):
`;
  }

  // ============================================================
  // API INTEGRATION - Gemini API calls with optimized parameters
  // ============================================================

  /**
   * Call Gemini API with optimized parameters
   */
  async callGeminiAPI(prompt, transcriptText, metadata) {
    // Use selected model or default
    const modelId = this.selectedModel || DEFAULT_MODEL;
    const url = `${getGeminiGenerateEndpoint(modelId)}?key=${this.apiKey}`;
    
    // Send full transcript without truncation
    // Gemini models support 1M+ input tokens, no need to truncate
    const processedText = transcriptText;
    
    console.log(`[NLM] Using model: ${modelId}, no output token limit`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt + processedText
          }]
        }],
        generationConfig: {
          temperature: 0.3,        // Lower = more consistent output
          topP: 0.85,
          topK: 40
          // No maxOutputTokens limit - let the model complete naturally
        }
      })
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: { message: 'Unknown error' } };
      }
      
      const errorMessage = errorData.error?.message || '';
      
      if (response.status === 400) {
        // Invalid API key or bad request
        if (errorMessage.toLowerCase().includes('api key')) {
          throw {
            type: 'INVALID_API_KEY',
            title: i18n('invalidApiKey') || 'Invalid API Key',
            message: i18n('apiKeyInvalidMsg') || 'Your Gemini API key is invalid or has been revoked.',
            suggestion: i18n('checkApiKey') || 'Please check your API key in settings or visit notelm.ai/support/api-key-guide for help.',
            icon: 'settings',
            action: 'settings'
          };
        }
        throw {
          type: 'BAD_REQUEST',
          title: i18n('requestError') || 'Request Error',
          message: errorMessage || i18n('badRequestMsg') || 'The request to Gemini API failed.',
          suggestion: i18n('tryAgainLater') || 'Please try again later.',
          icon: 'error'
        };
      } else if (response.status === 401) {
        throw {
          type: 'UNAUTHORIZED',
          title: i18n('unauthorized') || 'Unauthorized',
          message: i18n('apiKeyUnauthorized') || 'Your API key is not authorized to use this service.',
          suggestion: i18n('checkApiKeyPermissions') || 'Make sure your API key has the correct permissions.',
          icon: 'settings',
          action: 'settings'
        };
      } else if (response.status === 403) {
        throw {
          type: 'FORBIDDEN',
          title: i18n('accessDenied') || 'Access Denied',
          message: i18n('apiKeyForbidden') || 'Access to Gemini API is forbidden with this API key.',
          suggestion: i18n('checkApiKeyOrRegion') || 'Your API key may be restricted or Gemini may not be available in your region.',
          icon: 'error'
        };
      } else if (response.status === 429) {
        throw {
          type: 'RATE_LIMITED',
          title: i18n('rateLimitExceeded') || 'Rate Limit Exceeded',
          message: i18n('tooManyRequests') || 'You have exceeded the API rate limit or quota.',
          suggestion: i18n('waitAndRetry') || 'Please wait a few minutes and try again. Consider upgrading your API plan if this persists.',
          icon: 'warning'
        };
      } else if (response.status >= 500) {
        throw {
          type: 'SERVER_ERROR',
          title: i18n('serverError') || 'Server Error',
          message: i18n('geminiServerError') || 'Gemini API is experiencing issues.',
          suggestion: i18n('tryAgainLater') || 'Please try again later.',
          icon: 'error'
        };
      }
      
      throw {
        type: 'API_ERROR',
        title: i18n('apiError') || 'API Error',
        message: errorMessage || i18n('unknownApiError') || 'An error occurred while calling Gemini API.',
        suggestion: i18n('tryAgainLater') || 'Please try again later.',
        icon: 'error'
      };
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const finishReason = data.candidates?.[0]?.finishReason;
    
    if (!generatedText) {
      // Check for safety filters or other issues
      if (finishReason === 'SAFETY') {
        throw {
          type: 'CONTENT_FILTERED',
          title: i18n('contentFiltered') || 'Content Filtered',
          message: i18n('safetyFilterTriggered') || 'The content was filtered by safety settings.',
          suggestion: i18n('tryDifferentVideo') || 'Try a different video with less sensitive content.',
          icon: 'warning'
        };
      }
      
      throw {
        type: 'NO_RESPONSE',
        title: i18n('noSummaryGenerated') || 'No Summary Generated',
        message: i18n('aiDidNotRespond') || 'The AI did not generate a response.',
        suggestion: i18n('tryAgain') || 'Please try again.',
        icon: 'error'
      };
    }

    // Log response details for debugging
    console.log(`[NLM] API Response - finishReason: ${finishReason}, textLength: ${generatedText?.length}`);
    
    // Check if output was truncated
    // Possible finishReason values: STOP (normal), MAX_TOKENS (truncated), SAFETY, OTHER
    const isTruncated = finishReason === 'MAX_TOKENS' || 
                        finishReason === 'LENGTH' ||
                        // Also check for incomplete markdown patterns
                        (generatedText && (
                          generatedText.endsWith('**[') ||
                          generatedText.endsWith('- **') ||
                          generatedText.endsWith('###') ||
                          /\*\*\[\d+:?\d*$/.test(generatedText) // ends with incomplete timestamp
                        ));
    
    if (isTruncated) {
      console.warn(`[NLM] Summary was truncated! finishReason: ${finishReason}`);
      this.summaryTruncated = true;
      this.truncationReason = finishReason || 'INCOMPLETE_OUTPUT';
    } else {
      this.summaryTruncated = false;
      this.truncationReason = null;
    }

    return generatedText;
  }

  // ============================================================
  // MAIN SUMMARIZE FLOW
  // ============================================================

  async getSubtitleData() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_SUBTITLE_URL' }, (response) => {
        resolve(response || { url: null, videoId: null });
      });
    });
  }

  /**
   * Check if video has CC button available
   */
  hasSubtitleButton() {
    const ccButton = document.querySelector('.ytp-subtitles-button');
    return ccButton && ccButton.getAttribute('aria-pressed') !== undefined;
  }

  /**
   * Check if subtitles are currently enabled
   */
  areSubtitlesEnabled() {
    const ccButton = document.querySelector('.ytp-subtitles-button');
    return ccButton && ccButton.getAttribute('aria-pressed') === 'true';
  }

  /**
   * Start loading progress animation
   */
  startLoadingProgress(estimatedSeconds = 15) {
    this.loadingStage = 1;
    this.loadingStartTime = Date.now();
    this.estimatedDuration = estimatedSeconds;
    
    // Clear any existing timer
    if (this.loadingTimer) {
      clearInterval(this.loadingTimer);
    }
    
    // Update progress every second
    this.loadingTimer = setInterval(() => {
      const elapsed = (Date.now() - this.loadingStartTime) / 1000;
      
      // Progress through stages based on elapsed time
      if (elapsed < 2) {
        this.loadingStage = 1; // Preparing
      } else if (elapsed < 5) {
        this.loadingStage = 2; // Analyzing
      } else if (elapsed < this.estimatedDuration * 0.8) {
        this.loadingStage = 3; // Generating
      } else {
        this.loadingStage = 4; // Formatting / Almost done
      }
      
      // Update the loading display
      this.updateLoadingDisplay();
    }, 1000);
  }

  /**
   * Stop loading progress animation
   */
  stopLoadingProgress() {
    if (this.loadingTimer) {
      clearInterval(this.loadingTimer);
      this.loadingTimer = null;
    }
    this.loadingStage = 0;
    this.loadingStartTime = null;
  }

  /**
   * Update loading display without full re-render
   */
  updateLoadingDisplay() {
    const loadingText = this.panel?.querySelector('.nlm-loading-text');
    const progressBar = this.panel?.querySelector('.nlm-progress-bar-fill');
    const timeDisplay = this.panel?.querySelector('.nlm-loading-time');
    
    if (loadingText) {
      const stages = [
        i18n('loadingStage1'),
        i18n('loadingStage2'),
        i18n('loadingStage3'),
        i18n('loadingStage4')
      ];
      loadingText.textContent = stages[this.loadingStage - 1] || i18n('generating');
    }
    
    if (progressBar && this.loadingStartTime) {
      const elapsed = (Date.now() - this.loadingStartTime) / 1000;
      // Ease out progress - never quite reaches 100% until done
      const progress = Math.min(95, (elapsed / this.estimatedDuration) * 100 * 0.9 + this.loadingStage * 5);
      progressBar.style.width = `${progress}%`;
    }
    
    if (timeDisplay && this.loadingStartTime) {
      const elapsed = Math.floor((Date.now() - this.loadingStartTime) / 1000);
      const remaining = Math.max(0, this.estimatedDuration - elapsed);
      
      if (elapsed > this.estimatedDuration) {
        timeDisplay.textContent = i18n('almostDone');
        timeDisplay.classList.add('nlm-loading-slow');
      } else if (elapsed > this.estimatedDuration * 1.5) {
        timeDisplay.textContent = i18n('takingLonger');
      } else {
        timeDisplay.textContent = `~${remaining} ${i18n('seconds')}`;
      }
    }
  }

  /**
   * Main entry point for video summarization
   */
  async summarizeVideo() {
    // Check API key first
    if (!this.apiKey) {
      this.showSettingsModal();
      return;
    }

    // Validate API key format
    if (this.apiKey.length < 20) {
      this.showDetailedError('invalidApiKeyFormat', {
        title: i18n('invalidApiKey') || 'Invalid API Key',
        message: i18n('apiKeyTooShort') || 'The API key appears to be invalid. Please check and re-enter your Gemini API key.',
        suggestion: i18n('getNewApiKey') || 'Learn how to get a valid API key at notelm.ai',
        action: 'settings'
      });
      return;
    }

    this.isLoading = true;
    this.summary = null;
    this.currentError = null; // Clear any previous error
    
    // Start progress animation BEFORE rendering (estimate based on typical generation time)
    this.startLoadingProgress(25);
    
    // Now render with the correct loading state
    this.renderPanel();

    try {
      // Step 1: Check subtitle availability
      const subtitleData = await this.getSubtitleData();
      
      if (!subtitleData.url) {
        // Priority-based error detection for missing subtitles
        // The subtitle URL is captured by intercepting YouTube's timedtext API
        // This only happens when the video plays and subtitles are loaded
        
        const hasCC = this.hasSubtitleButton();
        const ccEnabled = this.areSubtitlesEnabled();
        const video = document.querySelector('video');
        const hasPlayed = video && video.currentTime > 0;
        
        // Priority 1: Video hasn't been played yet (most common case)
        if (!hasPlayed) {
          throw {
            type: 'VIDEO_NOT_PLAYED',
            title: i18n('videoNotPlayed') || 'Play the Video First',
            message: i18n('playVideoToCapture') || 'Please play the video for a few seconds so we can capture the subtitles.',
            suggestions: [
              i18n('step1Play') || '1. Click play on the video',
              i18n('step2Wait') || '2. Wait 3-5 seconds',
              i18n('step3Summarize') || '3. Click "Summarize Video" again'
            ],
            icon: 'video'
          };
        }
        
        // Priority 2: Video played but CC not enabled
        if (hasCC && !ccEnabled) {
          throw {
            type: 'CC_NOT_ENABLED',
            title: i18n('ccNotEnabled') || 'Enable Subtitles (CC)',
            message: i18n('enableCCFirst') || 'Subtitles need to be enabled for us to capture them.',
            suggestions: [
              i18n('step1EnableCC') || '1. Click the CC button on the video player',
              i18n('step2PlayAgain') || '2. Play the video for a few seconds',
              i18n('step3Summarize') || '3. Click "Summarize Video" again'
            ],
            icon: 'video'
          };
        }
        
        // Priority 3: CC enabled and video played, but URL not captured - try refresh
        if (hasCC && ccEnabled && hasPlayed) {
          throw {
            type: 'SUBTITLE_NOT_CAPTURED',
            title: i18n('subtitleNotCaptured') || 'Subtitles Not Captured',
            message: i18n('refreshMayHelp') || 'We couldn\'t capture the subtitle data. This sometimes happens due to timing issues.',
            suggestions: [
              i18n('tryRefresh') || '1. Refresh the page (F5)',
              i18n('playWithCC') || '2. Play the video with CC enabled',
              i18n('trySummarize') || '3. Try summarizing again'
            ],
            icon: 'warning',
            showRefreshButton: true
          };
        }
        
        // Priority 4: No CC button - video likely has no subtitles
        if (!hasCC) {
          throw {
            type: 'NO_SUBTITLES_AVAILABLE',
            title: i18n('noSubtitlesAvailable') || 'No Subtitles Available',
            message: i18n('videoNoSubtitles') || 'This video doesn\'t appear to have subtitles or closed captions.',
            suggestions: [
              i18n('tryRefreshCheck') || '1. Try refreshing the page - sometimes the CC button loads late',
              i18n('checkOtherVideos') || '2. If no CC button appears, this video has no subtitles',
              i18n('tryAnotherVideo') || '3. Try a different video with CC available'
            ],
            icon: 'warning',
            showRefreshButton: true
          };
        }
        
        // Fallback error
        throw {
          type: 'UNKNOWN_SUBTITLE_ERROR',
          title: i18n('subtitleError') || 'Subtitle Error',
          message: i18n('couldNotGetSubtitles') || 'Could not retrieve subtitle data.',
          suggestions: [
            i18n('tryRefresh') || '1. Refresh the page',
            i18n('playWithCC') || '2. Play video with CC enabled',
            i18n('trySummarize') || '3. Try again'
          ],
          icon: 'error',
          showRefreshButton: true
        };
      }

      // Step 2: Fetch subtitles with timestamps
      let subtitles;
      try {
        subtitles = await this.fetchSubtitles(subtitleData.url);
      } catch (fetchError) {
        throw {
          type: 'SUBTITLE_FETCH_ERROR',
          title: i18n('subtitleFetchError') || 'Failed to Load Subtitles',
          message: i18n('subtitleFetchErrorMsg') || 'Could not fetch subtitle data from YouTube.',
          suggestions: [
            i18n('subtitleFetchStep1') || '1. Refresh the page (F5)',
            i18n('subtitleFetchStep2') || '2. Play the video for 5-10 seconds',
            i18n('subtitleFetchStep3') || '3. Make sure the CC button is enabled',
            i18n('subtitleFetchStep4') || '4. Click "Try Again" below'
          ],
          icon: 'error',
          showRefreshButton: true
        };
      }

      if (!subtitles.text || subtitles.text.length < 50) {
        throw {
          type: 'INSUFFICIENT_CONTENT',
          title: i18n('insufficientContent') || 'Not Enough Content',
          message: i18n('subtitlesTooShort') || 'The subtitle content is too short to generate a meaningful summary.',
          suggestion: i18n('tryLongerVideo') || 'This video may be too short or have minimal spoken content.',
          icon: 'warning'
        };
      }

      // Step 3: Collect video metadata
      const metadata = this.getVideoMetadata();

      // Step 4: Build optimized prompt
      const prompt = this.buildPrompt(metadata);

      // Step 5: Call Gemini API
      this.summary = await this.callGeminiAPI(prompt, subtitles.text, metadata);
      
    } catch (error) {
      console.error('Summarization error:', error);
      this.summary = null;
      
      // Store error for display in renderPanel
      if (error.type) {
        this.currentError = error;
        // Add retry options flag for API errors
        if (['API_ERROR', 'RATE_LIMITED', 'SERVER_ERROR', 'NO_RESPONSE', 'CONTENT_FILTERED', 'INCOMPLETE_RESPONSE', 'SUBTITLE_FETCH_ERROR', 'NO_SUBTITLES', 'SUBTITLE_ERROR'].includes(error.type)) {
          this.currentError.showRetryOptions = true;
        }
      } else {
        this.currentError = {
          type: 'GENERIC_ERROR',
          title: i18n('error') || 'Error',
          message: error.message || 'An unknown error occurred',
          icon: 'error',
          showRetryOptions: true
        };
      }
    } finally {
      this.stopLoadingProgress();
      this.isLoading = false;
      this.renderPanel();
    }
  }

  // ============================================================
  // SUMMARY FORMATTING - Convert markdown to HTML with clickable timestamps
  // ============================================================

  /**
   * Format summary markdown to HTML with clickable timestamps
   */
  formatSummary(text) {
    // Step 1: Convert timestamps to clickable links
    // Matches: [0:00], [00:00], [0:00:00], [0:00 - 1:23], etc.
    const timestampRegex = /\[(\d{1,2}:\d{2}(?::\d{2})?(?:\s*-\s*\d{1,2}:\d{2}(?::\d{2})?)?)\]/g;
    
    let formatted = text.replace(timestampRegex, (match, timeStr) => {
      // For ranges, extract the start time
      const startTime = timeStr.split('-')[0].trim();
      const seconds = this.timestampToSeconds(startTime);
      return `<a class="nlm-timestamp" href="#" data-time="${seconds}" title="Jump to ${timeStr}">[${timeStr}]</a>`;
    });

    // Step 2: Convert hashtags to clickable YouTube hashtag links
    // Matches #hashtag patterns (alphanumeric and underscores, supports unicode for non-English tags)
    const hashtagRegex = /#([\w\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+)/g;
    formatted = formatted.replace(hashtagRegex, (match, tag) => {
      const tagLower = tag.toLowerCase().replace(/\s+/g, '');
      return `<a class="nlm-hashtag" href="https://www.youtube.com/hashtag/${encodeURIComponent(tagLower)}" target="_blank" title="Search #${tag} on YouTube">#${tag}</a>`;
    });

    // Step 3: Convert markdown to HTML
    formatted = formatted
      // Headings
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Blockquotes
      .replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>')
      // Unordered lists - handle both * and -
      .replace(/^[\*\-]\s+(.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive <li> elements in <ul>
    formatted = formatted.replace(/(<li>[\s\S]*?<\/li>)(\s*(?=<li>))?/g, '$1');
    formatted = formatted.replace(/(<li>[\s\S]*?<\/li>\s*)+/g, '<ul>$&</ul>');
    
    // Handle paragraphs - split by double newlines
    const blocks = formatted.split(/\n\n+/);
    formatted = blocks.map(block => {
      block = block.trim();
      if (!block) return '';
      // Don't wrap if already has block-level element
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<blockquote') || block.startsWith('<li')) {
        return block;
      }
      // Wrap single lines in paragraphs
      if (!block.includes('\n')) {
        return `<p>${block}</p>`;
      }
      return block.split('\n').map(line => {
        line = line.trim();
        if (!line) return '';
        if (line.startsWith('<')) return line;
        return `<p>${line}</p>`;
      }).join('\n');
    }).join('\n');
    
    // Cleanup: remove empty paragraphs and fix nesting issues
    formatted = formatted
      .replace(/<p>\s*<\/p>/g, '')
      .replace(/<p>(<h[23]>)/g, '$1')
      .replace(/(<\/h[23]>)<\/p>/g, '$1')
      .replace(/<p>(<ul>)/g, '$1')
      .replace(/(<\/ul>)<\/p>/g, '$1')
      .replace(/<p>(<blockquote>)/g, '$1')
      .replace(/(<\/blockquote>)<\/p>/g, '$1')
      .replace(/<p>(<li>)/g, '$1')
      .replace(/(<\/li>)<\/p>/g, '$1');

    return formatted;
  }

  // ============================================================
  // UI RENDERING - Panel creation and content display
  // ============================================================

  createPanel() {
    this.panel = document.createElement('div');
    this.panel.id = 'nlm-summarizer-panel';
    this.renderPanel();
  }

  renderPanel() {
    const hasApiKey = !!this.apiKey;
    const logoUrl = chrome.runtime.getURL('icon128.png');
    
    this.panel.innerHTML = `
      <div class="nlm-header">
        <div class="nlm-header-left">
          <img src="${logoUrl}" alt="NoteLM" class="nlm-logo" />
          <span class="nlm-title">${i18n('panelTitle')}</span>
        </div>
        <div class="nlm-header-right">
          <button class="nlm-icon-btn" id="nlm-settings-btn" title="${i18n('settings')}">
            ${ICONS.settings}
          </button>
          <button class="nlm-icon-btn" id="nlm-collapse-btn" title="${this.isCollapsed ? i18n('expand') : i18n('collapse')}">
            ${this.isCollapsed ? ICONS.expand : ICONS.collapse}
          </button>
        </div>
      </div>
      <div class="nlm-content">
        ${this.renderContent(hasApiKey)}
      </div>
      <div class="nlm-footer">
        <span>${i18n('poweredBy')}</span>
        <a href="https://notelm.ai" target="_blank">${i18n('moreToolsAt')} NoteLM.ai</a>
      </div>
    `;

    // Bind event listeners
    this.bindEvents();
  }

  renderContent(hasApiKey) {
    if (this.isLoading) {
      const stages = [
        { icon: '📋', text: i18n('loadingStage1') },
        { icon: '🔍', text: i18n('loadingStage2') },
        { icon: '🤖', text: i18n('loadingStage3') },
        { icon: '✨', text: i18n('loadingStage4') }
      ];
      const currentStage = this.loadingStage || 1;
      
      return `
        <div class="nlm-loading nlm-loading-enhanced">
          <div class="nlm-loading-animation">
            <div class="nlm-loading-circle"></div>
            <div class="nlm-loading-icon">${stages[currentStage - 1]?.icon || '🤖'}</div>
          </div>
          <span class="nlm-loading-text">${stages[currentStage - 1]?.text || i18n('generating')}</span>
          <div class="nlm-progress-bar">
            <div class="nlm-progress-bar-fill"></div>
          </div>
          <span class="nlm-loading-time">~${this.estimatedDuration} ${i18n('seconds')}</span>
          <div class="nlm-loading-stages">
            ${stages.map((stage, idx) => `
              <div class="nlm-stage ${idx < currentStage ? 'completed' : ''} ${idx === currentStage - 1 ? 'active' : ''}">
                <span class="nlm-stage-icon">${stage.icon}</span>
              </div>
            `).join('')}
          </div>
          <div class="nlm-loading-tip">${i18n('pleaseWait')}</div>
        </div>
      `;
    }

    // Show error if there is one
    if (this.currentError) {
      return this.renderError(this.currentError);
    }

    if (this.summary) {
      // Check if summary was truncated
      const truncatedWarning = this.summaryTruncated ? `
        <div class="nlm-truncated-warning">
          <div class="nlm-truncated-header">
            <span class="nlm-warning-icon">${ICONS.warning}</span>
            <span class="nlm-truncated-title">${i18n('summaryIncomplete')}</span>
          </div>
          <div class="nlm-truncated-hint">${i18n('tryDifferentModel')}</div>
        </div>
      ` : '';
      
      return `
        ${truncatedWarning}
        <div class="nlm-summary">${this.formatSummary(this.summary)}</div>
        <div class="nlm-regenerate-section">
          <div class="nlm-regenerate-row">
            <label class="nlm-regen-label">${i18n('outputLanguage')}:</label>
            ${this.generateLanguagePicker(true)}
          </div>
          <div class="nlm-regenerate-row">
            <label class="nlm-regen-label">${i18n('model')}:</label>
            ${this.renderModelSelector(true)}
          </div>
          <div class="nlm-action-bar">
            <button class="nlm-action-btn" id="nlm-copy-btn">
              ${ICONS.copy}
              <span>${i18n('copy')}</span>
            </button>
            <button class="nlm-action-btn nlm-action-btn-primary" id="nlm-regenerate-btn">
              ${ICONS.refresh}
              <span>${i18n('regenerate')}</span>
            </button>
          </div>
        </div>
      `;
    }

    if (!hasApiKey) {
      return `
        <div class="nlm-empty-state">
          <div class="nlm-empty-icon">${ICONS.settings}</div>
          <div class="nlm-empty-title">${i18n('setupRequired')}</div>
          <div class="nlm-empty-desc">
            ${i18n('setupDescription')}
          </div>
          <button class="nlm-btn-primary" id="nlm-setup-btn">
            ${ICONS.settings}
            <span>${i18n('configureApiKey')}</span>
          </button>
        </div>
      `;
    }

    return `
      <div class="nlm-empty-state">
        <div class="nlm-empty-icon">${ICONS.video}</div>
        <div class="nlm-empty-title">${i18n('readyToSummarize')}</div>
        <div class="nlm-empty-desc">
          ${i18n('readyDescription')}
        </div>
        <div class="nlm-hint">
          <div class="nlm-hint-icon">${ICONS.warning}</div>
          <div class="nlm-hint-text">${i18n('subtitleHint')}</div>
        </div>
        <div class="nlm-language-selector">
          <label class="nlm-lang-label">${i18n('outputLanguage')}:</label>
          ${this.generateLanguagePicker(false)}
        </div>
        <button class="nlm-btn-primary" id="nlm-summarize-btn">
          ${ICONS.sparkles}
          <span>${i18n('summarizeVideo')}</span>
        </button>
      </div>
    `;
  }

  /**
   * YouTube i18nLanguages BCP-47 codes - all languages sorted alphabetically by English name
   * Language names are localized via i18n
   */
  getAllLanguages() {
    return [
      { code: 'af', i18nKey: 'langAfrikaans', en: 'Afrikaans', native: 'Afrikaans' },
      { code: 'sq', i18nKey: 'langAlbanian', en: 'Albanian', native: 'Shqip' },
      { code: 'am', i18nKey: 'langAmharic', en: 'Amharic', native: 'አማርኛ' },
      { code: 'ar', i18nKey: 'langArabic', en: 'Arabic', native: 'العربية' },
      { code: 'hy', i18nKey: 'langArmenian', en: 'Armenian', native: 'Հայերեն' },
      { code: 'as', i18nKey: 'langAssamese', en: 'Assamese', native: 'অসমীয়া' },
      { code: 'az', i18nKey: 'langAzerbaijani', en: 'Azerbaijani', native: 'Azərbaycan' },
      { code: 'bn', i18nKey: 'langBangla', en: 'Bangla', native: 'বাংলা' },
      { code: 'eu', i18nKey: 'langBasque', en: 'Basque', native: 'Euskara' },
      { code: 'be', i18nKey: 'langBelarusian', en: 'Belarusian', native: 'Беларуская' },
      { code: 'bs', i18nKey: 'langBosnian', en: 'Bosnian', native: 'Bosanski' },
      { code: 'bg', i18nKey: 'langBulgarian', en: 'Bulgarian', native: 'Български' },
      { code: 'my', i18nKey: 'langBurmese', en: 'Burmese', native: 'မြန်မာ' },
      { code: 'ca', i18nKey: 'langCatalan', en: 'Catalan', native: 'Català' },
      { code: 'zh-HK', i18nKey: 'langChineseHK', en: 'Chinese (Hong Kong)', native: '中文 (香港)' },
      { code: 'zh-CN', i18nKey: 'langChineseCN', en: 'Chinese (Simplified)', native: '中文 (简体)' },
      { code: 'zh-TW', i18nKey: 'langChineseTW', en: 'Chinese (Traditional)', native: '中文 (繁體)' },
      { code: 'hr', i18nKey: 'langCroatian', en: 'Croatian', native: 'Hrvatski' },
      { code: 'cs', i18nKey: 'langCzech', en: 'Czech', native: 'Čeština' },
      { code: 'da', i18nKey: 'langDanish', en: 'Danish', native: 'Dansk' },
      { code: 'nl', i18nKey: 'langDutch', en: 'Dutch', native: 'Nederlands' },
      { code: 'en', i18nKey: 'langEnglish', en: 'English', native: 'English' },
      { code: 'en-IN', i18nKey: 'langEnglishIN', en: 'English (India)', native: 'English (IN)' },
      { code: 'en-GB', i18nKey: 'langEnglishUK', en: 'English (UK)', native: 'English (UK)' },
      { code: 'et', i18nKey: 'langEstonian', en: 'Estonian', native: 'Eesti' },
      { code: 'fil', i18nKey: 'langFilipino', en: 'Filipino', native: 'Filipino' },
      { code: 'fi', i18nKey: 'langFinnish', en: 'Finnish', native: 'Suomi' },
      { code: 'fr', i18nKey: 'langFrench', en: 'French', native: 'Français' },
      { code: 'fr-CA', i18nKey: 'langFrenchCA', en: 'French (Canada)', native: 'Français (CA)' },
      { code: 'gl', i18nKey: 'langGalician', en: 'Galician', native: 'Galego' },
      { code: 'ka', i18nKey: 'langGeorgian', en: 'Georgian', native: 'ქართული' },
      { code: 'de', i18nKey: 'langGerman', en: 'German', native: 'Deutsch' },
      { code: 'el', i18nKey: 'langGreek', en: 'Greek', native: 'Ελληνικά' },
      { code: 'gu', i18nKey: 'langGujarati', en: 'Gujarati', native: 'ગુજરાતી' },
      { code: 'iw', i18nKey: 'langHebrew', en: 'Hebrew', native: 'עברית' },
      { code: 'hi', i18nKey: 'langHindi', en: 'Hindi', native: 'हिन्दी' },
      { code: 'hu', i18nKey: 'langHungarian', en: 'Hungarian', native: 'Magyar' },
      { code: 'is', i18nKey: 'langIcelandic', en: 'Icelandic', native: 'Íslenska' },
      { code: 'id', i18nKey: 'langIndonesian', en: 'Indonesian', native: 'Indonesia' },
      { code: 'it', i18nKey: 'langItalian', en: 'Italian', native: 'Italiano' },
      { code: 'ja', i18nKey: 'langJapanese', en: 'Japanese', native: '日本語' },
      { code: 'kn', i18nKey: 'langKannada', en: 'Kannada', native: 'ಕನ್ನಡ' },
      { code: 'kk', i18nKey: 'langKazakh', en: 'Kazakh', native: 'Қазақша' },
      { code: 'km', i18nKey: 'langKhmer', en: 'Khmer', native: 'ខ្មែរ' },
      { code: 'ko', i18nKey: 'langKorean', en: 'Korean', native: '한국어' },
      { code: 'ky', i18nKey: 'langKyrgyz', en: 'Kyrgyz', native: 'Кыргызча' },
      { code: 'lo', i18nKey: 'langLao', en: 'Lao', native: 'ລາວ' },
      { code: 'lv', i18nKey: 'langLatvian', en: 'Latvian', native: 'Latviešu' },
      { code: 'lt', i18nKey: 'langLithuanian', en: 'Lithuanian', native: 'Lietuvių' },
      { code: 'mk', i18nKey: 'langMacedonian', en: 'Macedonian', native: 'Македонски' },
      { code: 'ms', i18nKey: 'langMalay', en: 'Malay', native: 'Melayu' },
      { code: 'ml', i18nKey: 'langMalayalam', en: 'Malayalam', native: 'മലയാളം' },
      { code: 'mr', i18nKey: 'langMarathi', en: 'Marathi', native: 'मराठी' },
      { code: 'mn', i18nKey: 'langMongolian', en: 'Mongolian', native: 'Монгол' },
      { code: 'ne', i18nKey: 'langNepali', en: 'Nepali', native: 'नेपाली' },
      { code: 'no', i18nKey: 'langNorwegian', en: 'Norwegian', native: 'Norsk' },
      { code: 'or', i18nKey: 'langOdia', en: 'Odia', native: 'ଓଡ଼ିଆ' },
      { code: 'fa', i18nKey: 'langPersian', en: 'Persian', native: 'فارسی' },
      { code: 'pl', i18nKey: 'langPolish', en: 'Polish', native: 'Polski' },
      { code: 'pt', i18nKey: 'langPortuguese', en: 'Portuguese', native: 'Português' },
      { code: 'pt-PT', i18nKey: 'langPortuguesePT', en: 'Portuguese (Portugal)', native: 'Português (PT)' },
      { code: 'pa', i18nKey: 'langPunjabi', en: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
      { code: 'ro', i18nKey: 'langRomanian', en: 'Romanian', native: 'Română' },
      { code: 'ru', i18nKey: 'langRussian', en: 'Russian', native: 'Русский' },
      { code: 'sr', i18nKey: 'langSerbian', en: 'Serbian', native: 'Српски' },
      { code: 'sr-Latn', i18nKey: 'langSerbianLatin', en: 'Serbian (Latin)', native: 'Srpski' },
      { code: 'si', i18nKey: 'langSinhala', en: 'Sinhala', native: 'සිංහල' },
      { code: 'sk', i18nKey: 'langSlovak', en: 'Slovak', native: 'Slovenčina' },
      { code: 'sl', i18nKey: 'langSlovenian', en: 'Slovenian', native: 'Slovenščina' },
      { code: 'es', i18nKey: 'langSpanish', en: 'Spanish', native: 'Español' },
      { code: 'es-419', i18nKey: 'langSpanishLatam', en: 'Spanish (Latin America)', native: 'Español (LA)' },
      { code: 'es-US', i18nKey: 'langSpanishUS', en: 'Spanish (US)', native: 'Español (US)' },
      { code: 'sw', i18nKey: 'langSwahili', en: 'Swahili', native: 'Kiswahili' },
      { code: 'sv', i18nKey: 'langSwedish', en: 'Swedish', native: 'Svenska' },
      { code: 'ta', i18nKey: 'langTamil', en: 'Tamil', native: 'தமிழ்' },
      { code: 'te', i18nKey: 'langTelugu', en: 'Telugu', native: 'తెలుగు' },
      { code: 'th', i18nKey: 'langThai', en: 'Thai', native: 'ไทย' },
      { code: 'tr', i18nKey: 'langTurkish', en: 'Turkish', native: 'Türkçe' },
      { code: 'uk', i18nKey: 'langUkrainian', en: 'Ukrainian', native: 'Українська' },
      { code: 'ur', i18nKey: 'langUrdu', en: 'Urdu', native: 'اردو' },
      { code: 'uz', i18nKey: 'langUzbek', en: 'Uzbek', native: "Oʻzbek" },
      { code: 'vi', i18nKey: 'langVietnamese', en: 'Vietnamese', native: 'Tiếng Việt' },
      { code: 'zu', i18nKey: 'langZulu', en: 'Zulu', native: 'isiZulu' }
    ];
  }
  
  /**
   * Get localized language name using i18n
   */
  getLocalizedLangName(lang) {
    if (lang.i18nKey) {
      const localized = i18n(lang.i18nKey);
      if (localized) return localized;
    }
    return lang.native || lang.en;
  }

  /**
   * Get languages grouped by first letter of English name
   */
  getLanguageData() {
    const allLangs = this.getAllLanguages();
    const groups = {};
    allLangs.forEach(lang => {
      const firstLetter = lang.en.charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(lang);
    });
    const sortedLetters = Object.keys(groups).sort();
    return {
      groups: sortedLetters.map(letter => ({
        id: letter,
        name: letter,
        languages: groups[letter]
      }))
    };
  }

  /**
   * Get language info by code
   */
  getLanguageByCode(code) {
    const allLangs = this.getAllLanguages();
    const lang = allLangs.find(l => l.code === code);
    return lang || { code, en: code, native: code };
  }

  /**
   * Generate language picker trigger button HTML
   */
  generateLanguagePicker(isCompact = false) {
    const currentLang = this.getLanguageByCode(this.outputLanguage);
    const compactClass = isCompact ? 'nlm-lang-picker-compact' : '';
    const langName = this.getLocalizedLangName(currentLang);
    
    return `
      <div class="nlm-lang-picker-wrapper ${compactClass}">
        <div class="nlm-lang-picker-trigger" id="nlm-lang-trigger">
          <span class="nlm-lang-picker-value">
            <span class="nlm-lang-picker-code">${currentLang.code}</span>
            <span>${langName}</span>
          </span>
          <svg class="nlm-lang-picker-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    `;
  }

  /**
   * Show language picker modal
   */
  showLanguagePickerModal() {
    // Remove existing modal if any
    const existing = document.querySelector('.nlm-lang-modal-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'nlm-lang-modal-overlay';
    overlay.innerHTML = `
      <div class="nlm-lang-modal">
        <div class="nlm-lang-modal-header">
          <span class="nlm-lang-modal-title">${i18n('outputLanguage')}</span>
          <button class="nlm-lang-modal-close" id="nlm-lang-close">
            ${ICONS.close}
          </button>
        </div>
        <div class="nlm-lang-search-box">
          <div class="nlm-lang-search-wrapper">
            <svg class="nlm-lang-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" class="nlm-lang-search-input" id="nlm-lang-search" placeholder="${i18n('searchLanguagePlaceholder') || 'Search: en, English, 中文, Español...'}">
          </div>
        </div>
        <div class="nlm-lang-grid-container" id="nlm-lang-grid">
          ${this.renderLanguageGrid()}
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Focus search input
    const searchInput = overlay.querySelector('#nlm-lang-search');
    setTimeout(() => searchInput?.focus(), 100);
    
    // Close button
    overlay.querySelector('#nlm-lang-close').addEventListener('click', () => overlay.remove());
    
    // Click outside to close
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    
    // Search functionality
    const gridContainer = overlay.querySelector('#nlm-lang-grid');
    searchInput?.addEventListener('input', (e) => {
      gridContainer.innerHTML = this.renderLanguageGrid(e.target.value);
      this.bindModalLanguageClicks(overlay);
    });
    
    // Language item clicks
    this.bindModalLanguageClicks(overlay);
  }

  /**
   * Bind click events to language items in modal
   */
  bindModalLanguageClicks(overlay) {
    const items = overlay.querySelectorAll('.nlm-lang-item');
    
    items.forEach(item => {
      item.addEventListener('click', async () => {
        const code = item.dataset.code;
        await this.saveOutputLanguage(code);
        
        // Update trigger display in panel
        const trigger = this.panel.querySelector('#nlm-lang-trigger');
        if (trigger) {
          const lang = this.getLanguageByCode(code);
          const langName = this.getLocalizedLangName(lang);
          const valueEl = trigger.querySelector('.nlm-lang-picker-value');
          if (valueEl) {
            valueEl.innerHTML = `
              <span class="nlm-lang-picker-code">${lang.code}</span>
              <span>${langName}</span>
            `;
          }
        }
        
        // Close modal
        overlay.remove();
      });
    });
  }

  /**
   * Render the language grid grouped by first letter
   */
  renderLanguageGrid(filter = '') {
    const data = this.getLanguageData();
    const filterLower = filter.toLowerCase().trim();
    let html = '';
    
    for (const group of data.groups) {
      // Filter languages - also search in localized names
      const filteredLangs = filterLower
        ? group.languages.filter(lang => {
            const localizedName = this.getLocalizedLangName(lang);
            return lang.code.toLowerCase().includes(filterLower) ||
              lang.en.toLowerCase().includes(filterLower) ||
              lang.native.toLowerCase().includes(filterLower) ||
              localizedName.toLowerCase().includes(filterLower);
          })
        : group.languages;
      
      if (filteredLangs.length === 0) continue;
      
      html += `
        <div class="nlm-lang-region" data-region="${group.id}">
          <div class="nlm-lang-region-header">
            <span class="nlm-lang-region-letter">${group.name}</span>
          </div>
          <div class="nlm-lang-grid">
            ${filteredLangs.map(lang => {
              const localizedName = this.getLocalizedLangName(lang);
              return `
              <div class="nlm-lang-item ${this.outputLanguage === lang.code ? 'selected' : ''}" 
                   data-code="${lang.code}" 
                   title="${lang.code} - ${localizedName} - ${lang.native}">
                <span class="nlm-lang-item-code">${lang.code}</span>
                <span class="nlm-lang-item-name">${localizedName}</span>
                <span class="nlm-lang-item-native">${lang.native}</span>
              </div>
            `;}).join('')}
          </div>
        </div>
      `;
    }
    
    if (!html) {
      html = `<div class="nlm-lang-no-results">${i18n('noLanguagesFound') || 'No languages found'}</div>`;
    }
    
    return html;
  }

  /**
   * Initialize language picker event handlers
   */
  initLanguagePicker() {
    const trigger = this.panel.querySelector('#nlm-lang-trigger');
    if (!trigger) return;
    
    // Click trigger to open modal
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showLanguagePickerModal();
    });
  }

  // ============================================================
  // EVENT HANDLING - Button clicks and timestamp navigation
  // ============================================================

  bindEvents() {
    // Settings button
    const settingsBtn = this.panel.querySelector('#nlm-settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.showSettingsModal());
    }

    // Collapse button
    const collapseBtn = this.panel.querySelector('#nlm-collapse-btn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => this.toggleCollapse());
    }

    // Setup button (when no API key)
    const setupBtn = this.panel.querySelector('#nlm-setup-btn');
    if (setupBtn) {
      setupBtn.addEventListener('click', () => this.showSettingsModal());
    }

    // Initialize advanced language picker
    this.initLanguagePicker();
    
    // Initialize model selector
    this.initModelSelector();

    // Summarize button
    const summarizeBtn = this.panel.querySelector('#nlm-summarize-btn');
    if (summarizeBtn) {
      summarizeBtn.addEventListener('click', () => this.summarizeVideo());
    }

    // Copy button
    const copyBtn = this.panel.querySelector('#nlm-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copySummary());
    }

    // Regenerate button
    const regenerateBtn = this.panel.querySelector('#nlm-regenerate-btn');
    if (regenerateBtn) {
      regenerateBtn.addEventListener('click', () => this.summarizeVideo());
    }

    // Error page buttons
    const retryBtn = this.panel.querySelector('#nlm-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.summarizeVideo());
    }

    const errorSettingsBtn = this.panel.querySelector('#nlm-error-settings-btn');
    if (errorSettingsBtn) {
      errorSettingsBtn.addEventListener('click', () => this.showSettingsModal());
    }

    const refreshBtn = this.panel.querySelector('#nlm-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => location.reload());
    }

    // Timestamp click handlers - for clickable navigation to video position
    this.panel.querySelectorAll('.nlm-timestamp').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const seconds = parseInt(e.currentTarget.dataset.time, 10);
        if (!isNaN(seconds)) {
          this.seekToTime(seconds);
        }
      });
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.panel.classList.toggle('collapsed', this.isCollapsed);
    
    const collapseBtn = this.panel.querySelector('#nlm-collapse-btn');
    if (collapseBtn) {
      collapseBtn.innerHTML = this.isCollapsed ? ICONS.expand : ICONS.collapse;
      collapseBtn.title = this.isCollapsed ? i18n('expand') : i18n('collapse');
    }
  }

  // ============================================================
  // MODALS AND NOTIFICATIONS
  // ============================================================

  showSettingsModal() {
    const overlay = document.createElement('div');
    overlay.className = 'nlm-modal-overlay';
    
    // Check if we have verified models
    const hasModels = this.availableModels && this.availableModels.length > 0;
    const currentModel = this.selectedModel || DEFAULT_MODEL;
    
    overlay.innerHTML = `
      <div class="nlm-modal nlm-modal-settings">
        <div class="nlm-modal-header">
          <span class="nlm-modal-title">${i18n('settings')}</span>
          <button class="nlm-modal-close" id="nlm-modal-close">
            ${ICONS.close}
          </button>
        </div>
        <div class="nlm-modal-body">
          <div class="nlm-form-group">
            <label class="nlm-label">${i18n('geminiApiKey')}</label>
            <div class="nlm-input-with-button">
              <input 
                type="password" 
                class="nlm-input nlm-input-flex" 
                id="nlm-api-key-input"
                placeholder="${i18n('enterApiKey')}"
                value="${this.apiKey || ''}"
              />
              <button class="nlm-btn-verify" id="nlm-verify-btn">
                ${i18n('verify')}
              </button>
            </div>
            <div class="nlm-help-text">
              ${i18n('getApiKey')} 
              <a href="https://www.notelm.ai/support/api-key-guide" target="_blank">NoteLM.ai</a>
            </div>
            <div class="nlm-verify-status" id="nlm-verify-status" style="display: none;"></div>
          </div>
          
          <div class="nlm-form-group nlm-model-section" id="nlm-model-section">
            <label class="nlm-label">${i18n('selectModel')}</label>
            <div class="nlm-model-list" id="nlm-model-list">
              ${hasModels ? this.renderModelList(this.availableModels, currentModel) : `
                <div class="nlm-model-empty">
                  <span>${i18n('verifyFirst')}</span>
                </div>
              `}
            </div>
            ${hasModels ? `
              <div class="nlm-current-model">
                <span class="nlm-current-model-label">${i18n('currentModel')}:</span>
                <span class="nlm-current-model-value" id="nlm-current-model-display">${currentModel}</span>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="nlm-modal-footer">
          <button class="nlm-btn-secondary" id="nlm-modal-cancel">${i18n('cancel')}</button>
          <button class="nlm-btn-primary" id="nlm-modal-save">${i18n('save')}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // State for this modal instance
    let pendingApiKey = this.apiKey || '';
    let pendingModel = this.selectedModel || DEFAULT_MODEL;
    let pendingModels = [...this.availableModels];
    let isVerifying = false;

    // Bind modal events
    const closeModal = () => {
      overlay.remove();
    };

    const updateVerifyStatus = (status, type = 'info') => {
      const statusEl = overlay.querySelector('#nlm-verify-status');
      if (statusEl) {
        statusEl.style.display = 'flex';
        statusEl.className = `nlm-verify-status nlm-verify-${type}`;
        statusEl.innerHTML = status;
      }
    };

    const updateModelList = (models, selectedModel) => {
      const listEl = overlay.querySelector('#nlm-model-list');
      const displayEl = overlay.querySelector('#nlm-current-model-display');
      if (listEl) {
        listEl.innerHTML = this.renderModelList(models, selectedModel);
        this.bindModelListEvents(overlay, (modelId) => {
          pendingModel = modelId;
          if (displayEl) displayEl.textContent = modelId;
          // Update visual selection
          listEl.querySelectorAll('.nlm-model-item').forEach(item => {
            item.classList.toggle('selected', item.dataset.modelId === modelId);
          });
        });
      }
      if (displayEl) {
        displayEl.textContent = selectedModel;
      }
    };

    overlay.querySelector('#nlm-modal-close').addEventListener('click', closeModal);
    overlay.querySelector('#nlm-modal-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Verify button click handler
    overlay.querySelector('#nlm-verify-btn').addEventListener('click', async () => {
      if (isVerifying) return;
      
      const input = overlay.querySelector('#nlm-api-key-input');
      const verifyBtn = overlay.querySelector('#nlm-verify-btn');
      const key = input.value.trim();
      
      if (!key) {
        updateVerifyStatus(i18n('enterApiKey'), 'error');
        return;
      }
      
      isVerifying = true;
      verifyBtn.innerHTML = `<span class="nlm-spinner-small"></span> ${i18n('verifying')}`;
      verifyBtn.disabled = true;
      
      try {
        const result = await this.validateApiKey(key);
        
        if (result.valid) {
          pendingApiKey = key;
          pendingModels = result.models;
          
          // Auto-select the best model
          const bestModel = this.getBestModel(result.models);
          pendingModel = bestModel;
          
          updateVerifyStatus(`✓ ${i18n('apiKeyVerified')} (${result.models.length} models)`, 'success');
          updateModelList(result.models, bestModel);
          
        } else {
          updateVerifyStatus(`✗ ${i18n('apiKeyInvalid')}`, 'error');
        }
      } catch (error) {
        updateVerifyStatus(`✗ ${i18n('apiKeyInvalid')}`, 'error');
      } finally {
        isVerifying = false;
        verifyBtn.innerHTML = i18n('verify');
        verifyBtn.disabled = false;
      }
    });

    // Bind model selection events if we already have models
    if (hasModels) {
      this.bindModelListEvents(overlay, (modelId) => {
        pendingModel = modelId;
        const displayEl = overlay.querySelector('#nlm-current-model-display');
        if (displayEl) displayEl.textContent = modelId;
        // Update visual selection
        const listEl = overlay.querySelector('#nlm-model-list');
        if (listEl) {
          listEl.querySelectorAll('.nlm-model-item').forEach(item => {
            item.classList.toggle('selected', item.dataset.modelId === modelId);
          });
        }
      });
    }

    // Save button click handler
    overlay.querySelector('#nlm-modal-save').addEventListener('click', async () => {
      const input = overlay.querySelector('#nlm-api-key-input');
      const key = input.value.trim();
      
      // If key changed but not verified, prompt to verify
      if (key && key !== this.apiKey && pendingModels.length === 0) {
        updateVerifyStatus(i18n('verifyFirst'), 'warning');
        return;
      }
      
      // Save API key
      if (key) {
        await this.saveApiKey(key);
      } else {
        await this.saveApiKey('');
        await this.saveAvailableModels([]);
        await this.saveSelectedModel(DEFAULT_MODEL);
      }
      
      // Save models and selection
      if (pendingModels.length > 0) {
        await this.saveAvailableModels(pendingModels);
        await this.saveSelectedModel(pendingModel);
        this.showToast(`${i18n('apiKeySaved')} - ${pendingModel}`);
      } else if (key) {
        this.showToast(i18n('apiKeySaved'));
      } else {
        this.showToast(i18n('apiKeyCleared'));
      }
      
      closeModal();
      this.renderPanel();
    });
  }

  /**
   * Render model list HTML
   */
  renderModelList(models, selectedModel) {
    if (!models || models.length === 0) {
      return `
        <div class="nlm-model-empty">
          <span>${i18n('noModelsAvailable')}</span>
        </div>
      `;
    }
    
    return models.map((model, index) => {
      const isSelected = model.id === selectedModel;
      const isRecommended = index === 0; // First model is best ranked
      
      return `
        <div class="nlm-model-item ${isSelected ? 'selected' : ''}" data-model-id="${model.id}">
          <div class="nlm-model-radio">
            <div class="nlm-model-radio-inner ${isSelected ? 'checked' : ''}"></div>
          </div>
          <div class="nlm-model-info">
            <div class="nlm-model-name">
              ${model.name}
              ${isRecommended ? `<span class="nlm-model-badge">${i18n('recommendedModel')}</span>` : ''}
            </div>
            <div class="nlm-model-id">${model.id}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Bind click events to model list items
   */
  bindModelListEvents(overlay, onSelect) {
    const items = overlay.querySelectorAll('.nlm-model-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const modelId = item.dataset.modelId;
        onSelect(modelId);
      });
    });
  }

  /**
   * Render compact model selector (dropdown style)
   */
  renderModelSelector(isCompact = false) {
    const models = this.availableModels || [];
    const currentModel = this.selectedModel || DEFAULT_MODEL;
    const compactClass = isCompact ? 'nlm-model-select-compact' : '';
    
    if (models.length === 0) {
      return `
        <select class="nlm-model-select ${compactClass}" id="nlm-model-select" disabled>
          <option value="${currentModel}">${currentModel}</option>
        </select>
      `;
    }
    
    const options = models.map(model => {
      const isSelected = model.id === currentModel;
      return `<option value="${model.id}" ${isSelected ? 'selected' : ''}>${model.id}</option>`;
    }).join('');
    
    return `
      <select class="nlm-model-select ${compactClass}" id="nlm-model-select">
        ${options}
      </select>
    `;
  }

  /**
   * Initialize model selector event handler
   */
  initModelSelector() {
    const select = this.panel?.querySelector('#nlm-model-select');
    if (select) {
      select.addEventListener('change', async (e) => {
        const newModel = e.target.value;
        await this.saveSelectedModel(newModel);
      });
    }
  }

  showError(message) {
    this.currentError = {
      type: 'GENERIC_ERROR',
      title: i18n('error') || 'Error',
      message: message,
      icon: 'error'
    };
    this.renderPanel();
  }

  /**
   * Render error HTML for display in panel
   */
  renderError(errorInfo) {
    // Get appropriate icon based on error type
    let icon = ICONS.error;
    let iconClass = 'nlm-error-icon';
    
    switch (errorInfo.icon) {
      case 'warning':
        icon = ICONS.warning;
        iconClass = 'nlm-error-icon nlm-warning-color';
        break;
      case 'video':
        icon = ICONS.video;
        iconClass = 'nlm-error-icon nlm-info-color';
        break;
      case 'settings':
        icon = ICONS.settings;
        iconClass = 'nlm-error-icon nlm-info-color';
        break;
      default:
        icon = ICONS.error;
        iconClass = 'nlm-error-icon';
    }

    // Build suggestions HTML - support both single suggestion and array of suggestions
    let suggestionsHtml = '';
    if (errorInfo.suggestions && Array.isArray(errorInfo.suggestions)) {
      // Multiple suggestions as a list
      const suggestionItems = errorInfo.suggestions.map(s => `<li>${s}</li>`).join('');
      suggestionsHtml = `
        <div class="nlm-error-suggestions">
          <div class="nlm-suggestions-header">
            ${ICONS.sparkles}
            <span>${i18n('howToFix') || 'How to fix:'}</span>
          </div>
          <ol class="nlm-suggestions-list">${suggestionItems}</ol>
        </div>
      `;
    } else if (errorInfo.suggestion) {
      // Single suggestion
      suggestionsHtml = `
        <div class="nlm-error-suggestion">
          <div class="nlm-suggestion-icon">${ICONS.sparkles}</div>
          <div class="nlm-suggestion-text">${errorInfo.suggestion}</div>
        </div>
      `;
    }

    // Build retry options section (model + language selectors)
    let retryOptionsHtml = '';
    if (errorInfo.showRetryOptions) {
      retryOptionsHtml = `
        <div class="nlm-error-retry-options">
          <div class="nlm-retry-option">
            <label class="nlm-retry-label">${i18n('model')}:</label>
            ${this.renderModelSelector(true)}
          </div>
          <div class="nlm-retry-option">
            <label class="nlm-retry-label">${i18n('outputLanguage')}:</label>
            ${this.generateLanguagePicker(true)}
          </div>
        </div>
      `;
    }

    // Build action buttons
    let actionButtons = '';
    
    if (errorInfo.showRefreshButton) {
      actionButtons += `
        <button class="nlm-btn-primary" id="nlm-refresh-btn">
          ${ICONS.refresh}
          <span>${i18n('refreshPage') || 'Refresh Page'}</span>
        </button>
      `;
    }
    
    if (errorInfo.action === 'settings') {
      actionButtons += `
        <button class="nlm-btn-primary" id="nlm-error-settings-btn">
          ${ICONS.settings}
          <span>${i18n('configureApiKey') || 'Configure API Key'}</span>
        </button>
      `;
    }
    
    actionButtons += `
      <button class="nlm-btn-secondary" id="nlm-retry-btn">
        ${ICONS.refresh}
        <span>${i18n('tryAgain') || 'Try Again'}</span>
      </button>
    `;

    return `
      <div class="nlm-error nlm-error-detailed">
        <div class="${iconClass}">${icon}</div>
        <div class="nlm-error-title">${errorInfo.title}</div>
        <div class="nlm-error-message">${errorInfo.message}</div>
        ${suggestionsHtml}
        ${retryOptionsHtml}
        <div class="nlm-error-actions">
          ${actionButtons}
        </div>
      </div>
    `;
  }

  /**
   * Show detailed error with icon, title, message, suggestions, and optional actions
   * @deprecated Use renderError() via renderPanel() instead
   */
  showDetailedError(type, errorInfo) {
    this.currentError = errorInfo;
    this.renderPanel();
  }

  copySummary() {
    if (!this.summary) return;
    
    navigator.clipboard.writeText(this.summary).then(() => {
      this.showToast(i18n('copied'));
    }).catch(() => {
      this.showToast(i18n('copyFailed'));
    });
  }

  showToast(message) {
    const existing = document.querySelector('.nlm-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'nlm-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  }

  // ============================================================
  // PANEL INJECTION AND URL OBSERVATION
  // ============================================================

  injectPanel() {
    const secondary = document.querySelector('#secondary');
    if (secondary && !document.querySelector('#nlm-summarizer-panel')) {
      secondary.insertBefore(this.panel, secondary.firstChild);
    }
  }

  observeUrlChanges() {
    let lastUrl = location.href;
    
    const observer = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        this.handleUrlChange();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  handleUrlChange() {
    // Reset state on video change
    if (location.pathname === '/watch') {
      this.summary = null;
      this.isLoading = false;
      this.currentError = null; // Clear error on video change
      this.renderPanel();
      
      // Re-inject panel if needed
      setTimeout(() => this.injectPanel(), 1000);
    }
  }
}

// Initialize when on a YouTube watch page
if (location.hostname.includes('youtube.com')) {
  // Only initialize on watch pages
  if (location.pathname === '/watch') {
    new YouTubeSummarizer();
  } else {
    // Watch for navigation to watch pages
    const observer = new MutationObserver(() => {
      if (location.pathname === '/watch' && !document.querySelector('#nlm-summarizer-panel')) {
        new YouTubeSummarizer();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}
