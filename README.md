# YouTube Video Summarizer

<p align="center">
  <img src="icons/icon128.png" alt="YouTube Video Summarizer Logo" width="128" height="128">
</p>

<p align="center">
  <strong>Transform YouTube videos into structured, actionable notes with AI</strong>
</p>

<p align="center">
  <a href="https://chrome.google.com/webstore">
    <img src="https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white" alt="Chrome Extension">
  </a>
  <img src="https://img.shields.io/badge/Version-1.0.0-brightgreen" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="MIT License">
  <img src="https://img.shields.io/badge/Languages-50+-purple" alt="50+ Languages">
</p>

<p align="center">
  <a href="https://chrome.google.com/webstore">Add to Chrome</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#faq">FAQ</a>
</p>

---

## Overview

**YouTube Video Summarizer** is a Chrome extension that generates AI-powered video summaries with clickable chapters, timestamps, and key insights using Google Gemini. Transform hours of video content into structured, actionable notes in seconds.

### Why Choose This Extension?

| Feature | Our Extension | Other Tools |
|---------|--------------|-------------|
| **AI Quality** | Google Gemini (latest) | GPT-3.5 or older models |
| **Output Format** | Structured with chapters & timestamps | Plain text only |
| **Timestamp Links** | Clickable, jump to video | Static text |
| **Language Support** | 50+ output languages | Limited |
| **Privacy** | API key stored locally | May track usage |
| **Price** | Free (use your own API key) | Subscription required |

---

## Features

### 🎯 Core Features

- **AI-Powered Summaries**: Generate comprehensive video summaries using Google's Gemini AI
- **Clickable Timestamps**: Jump to any moment in the video by clicking timestamps in the summary
- **Auto-Generated Chapters**: AI creates topic-based chapters for easy video navigation
- **Multi-Language Output**: Generate summaries in 50+ languages regardless of original video language
- **Notable Quotes**: Extracted quotes with precise time ranges for easy reference

### 📝 Summary Output Format

The extension generates structured summaries including:

| Section | Description |
|---------|-------------|
| 🎬 **Overview** | 2-3 sentence executive summary with video type identification |
| 📑 **Chapters** | Clickable timestamps for major topic sections |
| 📌 **Key Points** | Important insights with timestamps |
| 📝 **Detailed Summary** | Comprehensive content breakdown |
| 💬 **Notable Quotes** | Significant quotes with time ranges |
| 💡 **Takeaways** | Actionable conclusions and insights |
| 🏷️ **Tags** | Topic keywords for quick reference |

### 🎨 User Experience

- **Privacy-First**: Your API key is stored locally on your device, never shared
- **Free to Use**: Use your own Gemini API key (generous free tier available)
- **Beautiful UI**: Clean, non-intrusive panel integrated into YouTube
- **Dark Mode Support**: Automatically adapts to YouTube's theme
- **One-Click Summarize**: Get summaries with a single button click
- **Copy to Clipboard**: Instantly copy summaries to your notes

### 📊 Smart Content Scaling

The extension automatically adjusts output based on video duration:

| Duration | Chapters | Detail Level |
|----------|----------|--------------|
| < 5 min | 3-5 | Concise |
| 5-15 min | 4-7 | Balanced |
| 15-30 min | 6-10 | Comprehensive |
| 30+ min | 8-12 | Detailed analysis |

---

## Installation

### From Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) (link coming soon)
2. Click **Add to Chrome**
3. Confirm the installation when prompted
4. The extension panel appears on YouTube video pages

**Supported Browsers**: Chrome, Microsoft Edge, Brave, Opera, Vivaldi, and other Chromium-based browsers.

### From Source (Developer Mode)

1. Download or clone this repository:
   ```bash
   git clone https://github.com/NoteLMai/YouTube-Video-Summarizer.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `app/YouTube Video Summarizer` folder

---

## Setup

### Get Your Gemini API Key (Free)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API key**
4. Copy the generated key

**Free Tier Limits**: 15 requests/minute, 1,500 requests/day, 1 million tokens/minute

### Configure the Extension

1. Navigate to any YouTube video
2. Click the gear icon (⚙️) in the NoteLM panel
3. Paste your Gemini API key
4. Click **Save**

Your API key is stored locally and never sent anywhere except directly to Google's Gemini API.

---

## Usage

### Quick Start

1. Navigate to any YouTube video
2. Play the video briefly to load subtitles
3. Select your preferred **output language** from the dropdown
4. Click **"Summarize Video"** in the NoteLM panel
5. Wait for the AI to generate your summary
6. **Click any timestamp** to jump to that moment in the video
7. Use the **Copy** button to save the summary to your clipboard

### Workflow Examples

**Example 1: Study a Lecture**
1. Open lecture video → Play briefly
2. Select output language → Click "Summarize Video"
3. Use chapters to navigate between topics
4. Copy key points for your notes

**Example 2: Research Content**
1. Open documentary/explainer video
2. Generate summary with timestamps
3. Click timestamps to verify important claims
4. Export notable quotes for citations

---

## Technical Details

### How It Works

1. **Subtitle Capture**: The extension intercepts YouTube's `timedtext` API to capture video transcripts with timestamps
2. **Metadata Collection**: When you click "Summarize", it collects video metadata (title, channel, duration)
3. **AI Processing**: The transcript with timestamp markers is sent to Google's Gemini API
4. **Smart Generation**: Gemini generates a structured summary with chapters and clickable timestamps
5. **Interactive Display**: Results appear in a clean panel where you can click any timestamp to jump to that moment

### File Structure

```
YouTube Video Summarizer/
├── manifest.json       # Extension configuration (Manifest V3)
├── background.js       # Subtitle URL interception (webRequest API)
├── content.js          # Main logic, UI, and timestamp handling
├── styles.css          # Panel styling with timestamp styles
├── _locales/           # Internationalization (50+ languages)
│   ├── en/
│   ├── zh_CN/
│   ├── ja/
│   └── ...
├── icons/
│   ├── icon16.png      # Toolbar icon
│   ├── icon48.png      # Extension page icon
│   └── icon128.png     # Chrome Web Store icon
└── README.md
```

### Required Permissions

| Permission | Purpose |
|------------|---------|
| `storage` | Store API key and preferences locally |
| `webRequest` | Intercept YouTube's subtitle API URLs |
| `host_permissions: youtube.com` | Access YouTube pages only |

---

## Supported Languages

### Output Languages (50+)

- **Asian**: Chinese (Simplified/Traditional), Japanese, Korean, Vietnamese, Thai, Hindi, Bengali
- **European**: English, Spanish, French, German, Portuguese, Italian, Russian, Dutch, Polish
- **Middle Eastern**: Arabic, Turkish, Hebrew, Persian
- **And many more**: Indonesian, Filipino, Swedish, Norwegian, Danish, Finnish, Greek, etc.

---

## FAQ

### General Questions

**Q: Why do I need to play the video first?**
> YouTube loads captions dynamically when you start playing. The extension intercepts this data, so you need to trigger the loading by playing briefly.

**Q: Can I summarize videos without subtitles?**
> No, the extension requires subtitles or closed captions to generate summaries. Most videos have auto-generated captions available.

**Q: Is my data safe?**
> Yes. Your API key is stored locally in Chrome. Transcripts are sent directly to Google's Gemini API—we never see your data.

### Troubleshooting

**"No subtitles available"**
- Play the video for a few seconds first
- Check if the video has CC (closed captions) available
- Try refreshing the page

**"Invalid API key"**
- Verify your API key at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Make sure there are no extra spaces when pasting
- Try creating a new API key

**Panel not showing**
- Make sure you're on a YouTube watch page (`youtube.com/watch?v=...`)
- Try refreshing the page
- Check if the extension is enabled in `chrome://extensions/`

**Timestamps not clickable**
- Ensure the video player is visible on the page
- Try regenerating the summary if timestamps appear incorrect

**API Rate Limit Errors**
- Wait a minute and try again
- The free tier allows 15 requests per minute

---

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Fully Supported | Recommended |
| Edge | ✅ Fully Supported | Chromium-based |
| Brave | ✅ Fully Supported | Chromium-based |
| Opera | ✅ Fully Supported | Chromium-based |
| Vivaldi | ✅ Fully Supported | Chromium-based |
| Firefox | ❌ Not Available | Different extension API |
| Safari | ❌ Not Available | Different extension API |

---

## Privacy

- **No Data Collection**: We don't collect any user data
- **Local Storage Only**: Your API key is stored in Chrome's local storage
- **Direct API Calls**: Transcripts are sent directly to Google's API
- **No Tracking**: Zero analytics, zero telemetry
- **Open Source**: Transparent codebase you can verify yourself

---

## Related Tools

- **[YouTube Subtitle Downloader](../YouTube%20Subtitle%20Downloader/)** - Download subtitles in SRT format
- **[NoteLM.ai Website](https://notelm.ai)** - Learn more about our tools
- **[YouTube Transcript Generator](https://notelm.ai/tools/youtube-transcript-generator)** - Online transcript tool

---

## Support

Having issues or suggestions?

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/NoteLMai/YouTube-Video-Summarizer/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/NoteLMai/YouTube-Video-Summarizer/discussions)
- 📧 **Email**: hello@notelm.ai
- 🌐 **Website**: [notelm.ai](https://notelm.ai)

---

## License

MIT License - Feel free to modify and distribute.

```
MIT License

Copyright (c) 2024-2026 NoteLM.ai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Credits

Built with ❤️ by [NoteLM.ai](https://notelm.ai) - Your AI-powered note-taking companion.

Built with [Google Gemini AI](https://deepmind.google/technologies/gemini/).

<p align="center">
  <a href="https://notelm.ai">
    <img src="https://notelm.ai/logo.svg" alt="NoteLM.ai" width="120">
  </a>
</p>

---

## Version History

### v1.0.0 (Current Release)
- 🎉 Initial public release
- ✨ AI-powered video summaries with Google Gemini
- 📑 Auto-generated chapters with clickable timestamps
- 💬 Notable quotes extraction with time ranges
- 🌐 50+ output languages support
- 📊 Dynamic content scaling based on video length
- 🎨 Beautiful UI with dark mode support
- 🔒 Privacy-first design with local API key storage
