// YouTube Video Summarizer - NoteLM.ai
// Content Script: Panel injection, API key management, and Gemini AI integration
// Version 2.0 - Enhanced with timestamps, chapters, and optimized prompts

// UI Strings (hardcoded English - summary output language is configurable separately)
const UI_STRINGS = {
  // Panel
  panelTitle: 'YouTube Video Summarizer',
  settings: 'Settings',
  collapse: 'Collapse',
  expand: 'Expand',
  poweredBy: 'Built with Gemini AI',
  moreToolsAt: 'More tools at',
  
  // Loading
  generating: 'Generating summary...',
  
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
  getApiKey: 'Get your free API key from',
  apiKeyConfigured: 'API key configured',
  cancel: 'Cancel',
  save: 'Save',
  
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
  checkApiKey: 'Please check your API key in settings or get a new one from Google AI Studio.',
  apiKeyTooShort: 'The API key appears to be invalid. Please check and re-enter your Gemini API key.',
  getNewApiKey: 'Get a valid API key from Google AI Studio',
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
  langAzerbaijani: 'Azərbaycan',
  langBulgarian: 'Български',
  langBengali: 'বাংলা',
  langCatalan: 'Català',
  langCzech: 'Čeština',
  langDanish: 'Dansk',
  langGerman: 'Deutsch',
  langGreek: 'Ελληνικά',
  langEnglish: 'English',
  langSpanish: 'Español',
  langFinnish: 'Suomi',
  langFilipino: 'Filipino',
  langFrench: 'Français',
  langGujarati: 'ગુજરાતી',
  langHindi: 'हिन्दी',
  langCroatian: 'Hrvatski',
  langHungarian: 'Magyar',
  langIndonesian: 'Bahasa Indonesia',
  langItalian: 'Italiano',
  langJapanese: '日本語',
  langKazakh: 'Қазақша',
  langKhmer: 'ខ្មែរ',
  langKannada: 'ಕನ್ನಡ',
  langKorean: '한국어',
  langMalayalam: 'മലയാളം',
  langMarathi: 'मराठी',
  langMalay: 'Bahasa Melayu',
  langBurmese: 'မြန်မာ',
  langNepali: 'नेपाली',
  langDutch: 'Nederlands',
  langNorwegian: 'Norsk',
  langPunjabi: 'ਪੰਜਾਬੀ',
  langPolish: 'Polski',
  langPortuguese: 'Português',
  langRomanian: 'Română',
  langRussian: 'Русский',
  langSinhala: 'සිංහල',
  langSlovak: 'Slovenčina',
  langSerbian: 'Српски',
  langSwedish: 'Svenska',
  langSwahili: 'Kiswahili',
  langTamil: 'தமிழ்',
  langTelugu: 'తెలుగు',
  langThai: 'ภาษาไทย',
  langTurkish: 'Türkçe',
  langUkrainian: 'Українська',
  langUzbek: "Oʻzbek",
  langVietnamese: 'Tiếng Việt',
  langChinese: '中文',
  langTraditionalChinese: '繁體中文'
};

// i18n helper function (now uses hardcoded strings)
const i18n = (key) => UI_STRINGS[key] || key;

const STORAGE_KEYS = {
  API_KEY: 'nlm_gemini_api_key',
  SUBTITLE_URL: 'yt_subtitle_url',
  VIDEO_ID: 'yt_current_video_id',
  OUTPUT_LANG: 'nlm_output_language'
};

// Get default language based on browser language
const getDefaultOutputLanguage = () => {
  const browserLang = chrome.i18n.getUILanguage();
  const langMap = {
    'az': 'az',
    'bg': 'bg',
    'bn': 'bn',
    'ca': 'ca',
    'cs': 'cs',
    'da': 'da',
    'de': 'de',
    'el': 'el',
    'es': 'es',
    'fi': 'fi',
    'fil': 'fil',
    'fr': 'fr',
    'gu': 'gu',
    'hi': 'hi',
    'hr': 'hr',
    'hu': 'hu',
    'id': 'id',
    'it': 'it',
    'ja': 'ja',
    'kk': 'kk',
    'km': 'km',
    'kn': 'kn',
    'ko': 'ko',
    'ml': 'ml',
    'mr': 'mr',
    'ms': 'ms',
    'my': 'my',
    'ne': 'ne',
    'nl': 'nl',
    'no': 'no',
    'pa': 'pa',
    'pl': 'pl',
    'pt': 'pt',
    'pt-BR': 'pt',
    'ro': 'ro',
    'ru': 'ru',
    'si': 'si',
    'sk': 'sk',
    'sr': 'sr',
    'sv': 'sv',
    'sw': 'sw',
    'ta': 'ta',
    'te': 'te',
    'th': 'th',
    'tr': 'tr',
    'uk': 'uk',
    'uz': 'uz',
    'vi': 'vi',
    'zh-CN': 'zh',
    'zh-TW': 'zh-TW',
    'zh-HK': 'zh-TW'
  };
  
  // Check exact match first
  if (langMap[browserLang]) return langMap[browserLang];
  
  // Check language prefix
  const prefix = browserLang.split('-')[0];
  if (prefix === 'zh') return 'zh';
  if (langMap[prefix]) return langMap[prefix];
  
  return 'en';
};

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Language display names for the prompt (sorted alphabetically by code)
const LANGUAGE_NAMES = {
  az: 'Azerbaijani',
  bg: 'Bulgarian',
  bn: 'Bengali',
  ca: 'Catalan',
  cs: 'Czech',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  en: 'English',
  es: 'Spanish',
  fi: 'Finnish',
  fil: 'Filipino',
  fr: 'French',
  gu: 'Gujarati',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  kk: 'Kazakh',
  km: 'Khmer',
  kn: 'Kannada',
  ko: 'Korean',
  ml: 'Malayalam',
  mr: 'Marathi',
  ms: 'Malay',
  my: 'Burmese',
  ne: 'Nepali',
  nl: 'Dutch',
  no: 'Norwegian',
  pa: 'Punjabi',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  si: 'Sinhala',
  sk: 'Slovak',
  sr: 'Serbian',
  sv: 'Swedish',
  sw: 'Swahili',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  zh: 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)'
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
    
    this.init();
  }

  async init() {
    // Wait for YouTube page to load
    await this.waitForElement('#secondary');
    
    // Load saved API key and output language
    await this.loadApiKey();
    await this.loadOutputLanguage();
    
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
    const url = `${GEMINI_API_ENDPOINT}?key=${this.apiKey}`;
    
    // Smart truncation: preserve beginning and end for context
    const maxTranscriptLength = 28000;
    let processedText = transcriptText;
    
    if (transcriptText.length > maxTranscriptLength) {
      const headLength = Math.floor(maxTranscriptLength * 0.7);
      const tailLength = maxTranscriptLength - headLength - 100;
      processedText = 
        transcriptText.substring(0, headLength) +
        '\n\n[... content condensed for length ...]\n\n' +
        transcriptText.substring(transcriptText.length - tailLength);
    }
    
    // Dynamic token limit based on video duration
    const maxOutputTokens = metadata.durationSeconds > 1800 ? 4096 :
                            metadata.durationSeconds > 900  ? 3072 : 2048;
    
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
          topK: 40,
          maxOutputTokens: maxOutputTokens
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
            suggestion: i18n('checkApiKey') || 'Please check your API key in settings or get a new one from Google AI Studio.',
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
    
    if (!generatedText) {
      // Check for safety filters or other issues
      const finishReason = data.candidates?.[0]?.finishReason;
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
        suggestion: i18n('getNewApiKey') || 'Get a valid API key from Google AI Studio',
        action: 'settings'
      });
      return;
    }

    this.isLoading = true;
    this.summary = null;
    this.currentError = null; // Clear any previous error
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
          suggestion: i18n('refreshAndRetry') || 'Refresh the page and try again.',
          icon: 'error'
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
      } else {
        this.currentError = {
          type: 'GENERIC_ERROR',
          title: i18n('error') || 'Error',
          message: error.message || 'An unknown error occurred',
          icon: 'error'
        };
      }
    } finally {
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
    const logoUrl = chrome.runtime.getURL('icons/icon128.png');
    
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
      return `
        <div class="nlm-loading">
          <div class="nlm-spinner"></div>
          <span class="nlm-loading-text">${i18n('generating')}</span>
        </div>
      `;
    }

    // Show error if there is one
    if (this.currentError) {
      return this.renderError(this.currentError);
    }

    if (this.summary) {
      return `
        <div class="nlm-summary">${this.formatSummary(this.summary)}</div>
        <div class="nlm-regenerate-section">
          <div class="nlm-regenerate-lang">
            <label class="nlm-lang-label-inline">${i18n('outputLanguage')}:</label>
            <select class="nlm-lang-select-compact" id="nlm-output-lang">
              <option value="az" ${this.outputLanguage === 'az' ? 'selected' : ''}>${i18n('langAzerbaijani')}</option>
              <option value="bg" ${this.outputLanguage === 'bg' ? 'selected' : ''}>${i18n('langBulgarian')}</option>
              <option value="bn" ${this.outputLanguage === 'bn' ? 'selected' : ''}>${i18n('langBengali')}</option>
              <option value="ca" ${this.outputLanguage === 'ca' ? 'selected' : ''}>${i18n('langCatalan')}</option>
              <option value="cs" ${this.outputLanguage === 'cs' ? 'selected' : ''}>${i18n('langCzech')}</option>
              <option value="da" ${this.outputLanguage === 'da' ? 'selected' : ''}>${i18n('langDanish')}</option>
              <option value="de" ${this.outputLanguage === 'de' ? 'selected' : ''}>${i18n('langGerman')}</option>
              <option value="el" ${this.outputLanguage === 'el' ? 'selected' : ''}>${i18n('langGreek')}</option>
              <option value="en" ${this.outputLanguage === 'en' ? 'selected' : ''}>${i18n('langEnglish')}</option>
              <option value="es" ${this.outputLanguage === 'es' ? 'selected' : ''}>${i18n('langSpanish')}</option>
              <option value="fi" ${this.outputLanguage === 'fi' ? 'selected' : ''}>${i18n('langFinnish')}</option>
              <option value="fil" ${this.outputLanguage === 'fil' ? 'selected' : ''}>${i18n('langFilipino')}</option>
              <option value="fr" ${this.outputLanguage === 'fr' ? 'selected' : ''}>${i18n('langFrench')}</option>
              <option value="gu" ${this.outputLanguage === 'gu' ? 'selected' : ''}>${i18n('langGujarati')}</option>
              <option value="hi" ${this.outputLanguage === 'hi' ? 'selected' : ''}>${i18n('langHindi')}</option>
              <option value="hr" ${this.outputLanguage === 'hr' ? 'selected' : ''}>${i18n('langCroatian')}</option>
              <option value="hu" ${this.outputLanguage === 'hu' ? 'selected' : ''}>${i18n('langHungarian')}</option>
              <option value="id" ${this.outputLanguage === 'id' ? 'selected' : ''}>${i18n('langIndonesian')}</option>
              <option value="it" ${this.outputLanguage === 'it' ? 'selected' : ''}>${i18n('langItalian')}</option>
              <option value="ja" ${this.outputLanguage === 'ja' ? 'selected' : ''}>${i18n('langJapanese')}</option>
              <option value="kk" ${this.outputLanguage === 'kk' ? 'selected' : ''}>${i18n('langKazakh')}</option>
              <option value="km" ${this.outputLanguage === 'km' ? 'selected' : ''}>${i18n('langKhmer')}</option>
              <option value="kn" ${this.outputLanguage === 'kn' ? 'selected' : ''}>${i18n('langKannada')}</option>
              <option value="ko" ${this.outputLanguage === 'ko' ? 'selected' : ''}>${i18n('langKorean')}</option>
              <option value="ml" ${this.outputLanguage === 'ml' ? 'selected' : ''}>${i18n('langMalayalam')}</option>
              <option value="mr" ${this.outputLanguage === 'mr' ? 'selected' : ''}>${i18n('langMarathi')}</option>
              <option value="ms" ${this.outputLanguage === 'ms' ? 'selected' : ''}>${i18n('langMalay')}</option>
              <option value="my" ${this.outputLanguage === 'my' ? 'selected' : ''}>${i18n('langBurmese')}</option>
              <option value="ne" ${this.outputLanguage === 'ne' ? 'selected' : ''}>${i18n('langNepali')}</option>
              <option value="nl" ${this.outputLanguage === 'nl' ? 'selected' : ''}>${i18n('langDutch')}</option>
              <option value="no" ${this.outputLanguage === 'no' ? 'selected' : ''}>${i18n('langNorwegian')}</option>
              <option value="pa" ${this.outputLanguage === 'pa' ? 'selected' : ''}>${i18n('langPunjabi')}</option>
              <option value="pl" ${this.outputLanguage === 'pl' ? 'selected' : ''}>${i18n('langPolish')}</option>
              <option value="pt" ${this.outputLanguage === 'pt' ? 'selected' : ''}>${i18n('langPortuguese')}</option>
              <option value="ro" ${this.outputLanguage === 'ro' ? 'selected' : ''}>${i18n('langRomanian')}</option>
              <option value="ru" ${this.outputLanguage === 'ru' ? 'selected' : ''}>${i18n('langRussian')}</option>
              <option value="si" ${this.outputLanguage === 'si' ? 'selected' : ''}>${i18n('langSinhala')}</option>
              <option value="sk" ${this.outputLanguage === 'sk' ? 'selected' : ''}>${i18n('langSlovak')}</option>
              <option value="sr" ${this.outputLanguage === 'sr' ? 'selected' : ''}>${i18n('langSerbian')}</option>
              <option value="sv" ${this.outputLanguage === 'sv' ? 'selected' : ''}>${i18n('langSwedish')}</option>
              <option value="sw" ${this.outputLanguage === 'sw' ? 'selected' : ''}>${i18n('langSwahili')}</option>
              <option value="ta" ${this.outputLanguage === 'ta' ? 'selected' : ''}>${i18n('langTamil')}</option>
              <option value="te" ${this.outputLanguage === 'te' ? 'selected' : ''}>${i18n('langTelugu')}</option>
              <option value="th" ${this.outputLanguage === 'th' ? 'selected' : ''}>${i18n('langThai')}</option>
              <option value="tr" ${this.outputLanguage === 'tr' ? 'selected' : ''}>${i18n('langTurkish')}</option>
              <option value="uk" ${this.outputLanguage === 'uk' ? 'selected' : ''}>${i18n('langUkrainian')}</option>
              <option value="uz" ${this.outputLanguage === 'uz' ? 'selected' : ''}>${i18n('langUzbek')}</option>
              <option value="vi" ${this.outputLanguage === 'vi' ? 'selected' : ''}>${i18n('langVietnamese')}</option>
              <option value="zh" ${this.outputLanguage === 'zh' ? 'selected' : ''}>${i18n('langChinese')}</option>
              <option value="zh-TW" ${this.outputLanguage === 'zh-TW' ? 'selected' : ''}>${i18n('langTraditionalChinese')}</option>
            </select>
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
          <select class="nlm-lang-select" id="nlm-output-lang">
            <option value="az" ${this.outputLanguage === 'az' ? 'selected' : ''}>${i18n('langAzerbaijani')}</option>
            <option value="bg" ${this.outputLanguage === 'bg' ? 'selected' : ''}>${i18n('langBulgarian')}</option>
            <option value="bn" ${this.outputLanguage === 'bn' ? 'selected' : ''}>${i18n('langBengali')}</option>
            <option value="ca" ${this.outputLanguage === 'ca' ? 'selected' : ''}>${i18n('langCatalan')}</option>
            <option value="cs" ${this.outputLanguage === 'cs' ? 'selected' : ''}>${i18n('langCzech')}</option>
            <option value="da" ${this.outputLanguage === 'da' ? 'selected' : ''}>${i18n('langDanish')}</option>
            <option value="de" ${this.outputLanguage === 'de' ? 'selected' : ''}>${i18n('langGerman')}</option>
            <option value="el" ${this.outputLanguage === 'el' ? 'selected' : ''}>${i18n('langGreek')}</option>
            <option value="en" ${this.outputLanguage === 'en' ? 'selected' : ''}>${i18n('langEnglish')}</option>
            <option value="es" ${this.outputLanguage === 'es' ? 'selected' : ''}>${i18n('langSpanish')}</option>
            <option value="fi" ${this.outputLanguage === 'fi' ? 'selected' : ''}>${i18n('langFinnish')}</option>
            <option value="fil" ${this.outputLanguage === 'fil' ? 'selected' : ''}>${i18n('langFilipino')}</option>
            <option value="fr" ${this.outputLanguage === 'fr' ? 'selected' : ''}>${i18n('langFrench')}</option>
            <option value="gu" ${this.outputLanguage === 'gu' ? 'selected' : ''}>${i18n('langGujarati')}</option>
            <option value="hi" ${this.outputLanguage === 'hi' ? 'selected' : ''}>${i18n('langHindi')}</option>
            <option value="hr" ${this.outputLanguage === 'hr' ? 'selected' : ''}>${i18n('langCroatian')}</option>
            <option value="hu" ${this.outputLanguage === 'hu' ? 'selected' : ''}>${i18n('langHungarian')}</option>
            <option value="id" ${this.outputLanguage === 'id' ? 'selected' : ''}>${i18n('langIndonesian')}</option>
            <option value="it" ${this.outputLanguage === 'it' ? 'selected' : ''}>${i18n('langItalian')}</option>
            <option value="ja" ${this.outputLanguage === 'ja' ? 'selected' : ''}>${i18n('langJapanese')}</option>
            <option value="kk" ${this.outputLanguage === 'kk' ? 'selected' : ''}>${i18n('langKazakh')}</option>
            <option value="km" ${this.outputLanguage === 'km' ? 'selected' : ''}>${i18n('langKhmer')}</option>
            <option value="kn" ${this.outputLanguage === 'kn' ? 'selected' : ''}>${i18n('langKannada')}</option>
            <option value="ko" ${this.outputLanguage === 'ko' ? 'selected' : ''}>${i18n('langKorean')}</option>
            <option value="ml" ${this.outputLanguage === 'ml' ? 'selected' : ''}>${i18n('langMalayalam')}</option>
            <option value="mr" ${this.outputLanguage === 'mr' ? 'selected' : ''}>${i18n('langMarathi')}</option>
            <option value="ms" ${this.outputLanguage === 'ms' ? 'selected' : ''}>${i18n('langMalay')}</option>
            <option value="my" ${this.outputLanguage === 'my' ? 'selected' : ''}>${i18n('langBurmese')}</option>
            <option value="ne" ${this.outputLanguage === 'ne' ? 'selected' : ''}>${i18n('langNepali')}</option>
            <option value="nl" ${this.outputLanguage === 'nl' ? 'selected' : ''}>${i18n('langDutch')}</option>
            <option value="no" ${this.outputLanguage === 'no' ? 'selected' : ''}>${i18n('langNorwegian')}</option>
            <option value="pa" ${this.outputLanguage === 'pa' ? 'selected' : ''}>${i18n('langPunjabi')}</option>
            <option value="pl" ${this.outputLanguage === 'pl' ? 'selected' : ''}>${i18n('langPolish')}</option>
            <option value="pt" ${this.outputLanguage === 'pt' ? 'selected' : ''}>${i18n('langPortuguese')}</option>
            <option value="ro" ${this.outputLanguage === 'ro' ? 'selected' : ''}>${i18n('langRomanian')}</option>
            <option value="ru" ${this.outputLanguage === 'ru' ? 'selected' : ''}>${i18n('langRussian')}</option>
            <option value="si" ${this.outputLanguage === 'si' ? 'selected' : ''}>${i18n('langSinhala')}</option>
            <option value="sk" ${this.outputLanguage === 'sk' ? 'selected' : ''}>${i18n('langSlovak')}</option>
            <option value="sr" ${this.outputLanguage === 'sr' ? 'selected' : ''}>${i18n('langSerbian')}</option>
            <option value="sv" ${this.outputLanguage === 'sv' ? 'selected' : ''}>${i18n('langSwedish')}</option>
            <option value="sw" ${this.outputLanguage === 'sw' ? 'selected' : ''}>${i18n('langSwahili')}</option>
            <option value="ta" ${this.outputLanguage === 'ta' ? 'selected' : ''}>${i18n('langTamil')}</option>
            <option value="te" ${this.outputLanguage === 'te' ? 'selected' : ''}>${i18n('langTelugu')}</option>
            <option value="th" ${this.outputLanguage === 'th' ? 'selected' : ''}>${i18n('langThai')}</option>
            <option value="tr" ${this.outputLanguage === 'tr' ? 'selected' : ''}>${i18n('langTurkish')}</option>
            <option value="uk" ${this.outputLanguage === 'uk' ? 'selected' : ''}>${i18n('langUkrainian')}</option>
            <option value="uz" ${this.outputLanguage === 'uz' ? 'selected' : ''}>${i18n('langUzbek')}</option>
            <option value="vi" ${this.outputLanguage === 'vi' ? 'selected' : ''}>${i18n('langVietnamese')}</option>
            <option value="zh" ${this.outputLanguage === 'zh' ? 'selected' : ''}>${i18n('langChinese')}</option>
            <option value="zh-TW" ${this.outputLanguage === 'zh-TW' ? 'selected' : ''}>${i18n('langTraditionalChinese')}</option>
          </select>
        </div>
        <button class="nlm-btn-primary" id="nlm-summarize-btn">
          ${ICONS.sparkles}
          <span>${i18n('summarizeVideo')}</span>
        </button>
      </div>
    `;
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

    // Language selector
    const langSelect = this.panel.querySelector('#nlm-output-lang');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        this.saveOutputLanguage(e.target.value);
      });
    }

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
    overlay.innerHTML = `
      <div class="nlm-modal">
        <div class="nlm-modal-header">
          <span class="nlm-modal-title">${i18n('settings')}</span>
          <button class="nlm-modal-close" id="nlm-modal-close">
            ${ICONS.close}
          </button>
        </div>
        <div class="nlm-modal-body">
          <div class="nlm-form-group">
            <label class="nlm-label">${i18n('geminiApiKey')}</label>
            <input 
              type="password" 
              class="nlm-input" 
              id="nlm-api-key-input"
              placeholder="${i18n('enterApiKey')}"
              value="${this.apiKey || ''}"
            />
            <div class="nlm-help-text">
              ${i18n('getApiKey')} 
              <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a>
            </div>
          </div>
          ${this.apiKey ? `
            <div class="nlm-status">
              <span class="nlm-status-dot success"></span>
              <span>${i18n('apiKeyConfigured')}</span>
            </div>
          ` : ''}
        </div>
        <div class="nlm-modal-footer">
          <button class="nlm-btn-secondary" id="nlm-modal-cancel">${i18n('cancel')}</button>
          <button class="nlm-btn-primary" id="nlm-modal-save">${i18n('save')}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Bind modal events
    const closeModal = () => {
      overlay.remove();
    };

    overlay.querySelector('#nlm-modal-close').addEventListener('click', closeModal);
    overlay.querySelector('#nlm-modal-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    overlay.querySelector('#nlm-modal-save').addEventListener('click', async () => {
      const input = overlay.querySelector('#nlm-api-key-input');
      const key = input.value.trim();
      
      if (key) {
        await this.saveApiKey(key);
        this.showToast(i18n('apiKeySaved'));
      } else {
        await this.saveApiKey('');
        this.showToast(i18n('apiKeyCleared'));
      }
      
      closeModal();
      this.renderPanel();
    });
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
