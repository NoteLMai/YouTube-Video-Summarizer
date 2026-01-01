// YouTube Video Summarizer - Background Service Worker
// Intercepts YouTube subtitle/timedtext API requests and caches the URL

const STORAGE_KEY = 'yt_subtitle_url';
const VIDEO_ID_KEY = 'yt_current_video_id';

// Extract video ID from YouTube URL
function extractVideoId(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v') || null;
  } catch {
    return null;
  }
}

// Intercept YouTube timedtext API requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes('fmt=json3')) {
      // Extract video ID from the timedtext URL
      const url = new URL(details.url);
      const videoId = url.searchParams.get('v');
      
      chrome.storage.local.set({ 
        [STORAGE_KEY]: details.url,
        [VIDEO_ID_KEY]: videoId
      });
    }
  },
  { urls: ['*://www.youtube.com/api/timedtext*'], types: ['xmlhttprequest'] }
);

// Handle extension icon click - open options or show status
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url?.includes('youtube.com/watch')) {
    // Send message to content script to toggle panel visibility
    chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_PANEL' });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_SUBTITLE_URL') {
    chrome.storage.local.get([STORAGE_KEY, VIDEO_ID_KEY], (result) => {
      sendResponse({
        url: result[STORAGE_KEY] || null,
        videoId: result[VIDEO_ID_KEY] || null
      });
    });
    return true; // Keep the message channel open for async response
  }
});

