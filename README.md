# YouTube Video Summarizer

<p align="center">
  <img src="icon128.png" alt="YouTube Video Summarizer Logo" width="128" height="128">
</p>

<p align="center">
  <strong>🎬 Transform YouTube videos into structured, actionable notes with AI</strong>
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/youtube-video-summarizer/behmahfjdnhfodnailemeaapflmilpic">
    <img src="https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white" alt="Chrome Extension">
  </a>
  <img src="https://img.shields.io/badge/Version-1.2.0-brightgreen" alt="Version 1.2.0">
  <img src="https://img.shields.io/badge/Manifest-V3-blue" alt="Manifest V3">
  <img src="https://img.shields.io/badge/AI-Google_Gemini-8E44AD" alt="Google Gemini">
  <img src="https://img.shields.io/badge/UI_Languages-20-purple" alt="20 UI Languages">
  <img src="https://img.shields.io/badge/Output_Languages-65+-orange" alt="65+ Output Languages">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/youtube-video-summarizer/behmahfjdnhfodnailemeaapflmilpic">📦 Add to Chrome</a> •
  <a href="#-features">✨ Features</a> •
  <a href="#-installation">📥 Installation</a> •
  <a href="#%EF%B8%8F-setup">⚙️ Setup</a> •
  <a href="#-usage">🚀 Usage</a> •
  <a href="#-technical-architecture">🔧 Technical</a> •
  <a href="#-faq">❓ FAQ</a>
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
  - [Core Features](#-core-features)
  - [Summary Output Format](#-summary-output-format)
  - [Smart Content Scaling](#-smart-content-scaling)
  - [User Experience](#-user-experience)
- [Installation](#-installation)
  - [From Chrome Web Store](#from-chrome-web-store-recommended)
  - [From Source](#from-source-developer-mode)
- [Setup](#%EF%B8%8F-setup)
  - [Get Your Gemini API Key](#get-your-gemini-api-key-free)
  - [Configure the Extension](#configure-the-extension)
  - [Model Selection](#model-selection)
- [Usage](#-usage)
  - [Quick Start](#quick-start)
  - [Workflow Examples](#workflow-examples)
  - [Tips for Best Results](#tips-for-best-results)
- [Technical Architecture](#-technical-architecture)
  - [How It Works](#how-it-works)
  - [File Structure](#file-structure)
  - [Required Permissions](#required-permissions)
  - [Supported Gemini Models](#supported-gemini-models)
- [Internationalization (i18n)](#-internationalization-i18n)
  - [How i18n Works](#how-i18n-works)
  - [Supported UI Languages](#supported-ui-languages)
  - [Adding a New Language](#adding-a-new-language)
  - [RTL Language Support](#rtl-language-support)
- [Supported Languages](#-supported-languages)
  - [UI Languages (20)](#ui-languages-20)
  - [Output Languages (65+)](#output-languages-65)
- [Browser Compatibility](#-browser-compatibility)
- [Privacy & Security](#-privacy--security)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Related Tools](#-related-tools)
- [Support](#-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Version History](#-version-history)
- [Credits](#-credits)

---

## 🌟 Overview

**YouTube Video Summarizer** is a powerful Chrome extension that leverages Google's Gemini AI to generate comprehensive, structured summaries of YouTube videos. Transform hours of video content into actionable notes in seconds, complete with clickable timestamps, auto-generated chapters, notable quotes, and key insights.

### Why Choose This Extension?

| Feature | Our Extension | Other Tools |
|---------|--------------|-------------|
| **AI Quality** | Google Gemini (latest models including Gemini 3) | GPT-3.5 or older models |
| **Model Selection** | Choose from 10+ Gemini models | Fixed model |
| **Output Format** | Structured with chapters, timestamps & hashtags | Plain text only |
| **Timestamp Links** | Clickable, jump to video instantly | Static text |
| **Language Support** | 65+ output languages, 20 UI languages | Limited |
| **Privacy** | API key stored locally, direct API calls | May track usage |
| **Price** | Free (use your own API key) | Subscription required |
| **Dark Mode** | Automatic YouTube theme detection | Manual toggle |
| **RTL Support** | Full support for Arabic, Hebrew, etc. | Limited or none |

---

## ✨ Features

### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| **AI-Powered Summaries** | Generate comprehensive video summaries using Google's latest Gemini AI models |
| **Clickable Timestamps** | Jump to any moment in the video by clicking timestamps in the summary |
| **Auto-Generated Chapters** | AI creates topic-based chapters for easy video navigation |
| **Multi-Language Output** | Generate summaries in 65+ languages regardless of original video language |
| **Notable Quotes** | Extracted quotes with precise time ranges for easy reference |
| **Clickable Hashtags** | Tags link directly to YouTube hashtag search |
| **Dynamic Model Selection** | Choose from all available Gemini models with automatic ranking |
| **API Key Validation** | Verify your API key and see available models before saving |

### 📝 Summary Output Format

The extension generates rich, structured summaries with the following sections:

| Section | Icon | Description |
|---------|------|-------------|
| **Overview** | 🎬 | 2-3 sentence executive summary with video type identification (tutorial, review, lecture, interview, vlog, news, etc.) |
| **Chapters** | 📑 | Clickable timestamps for major topic sections with brief descriptions |
| **Key Points** | 📌 | Important insights with timestamps and relevant details |
| **Detailed Summary** | 📝 | Comprehensive content breakdown organized by topic or chronological flow |
| **Notable Quotes** | 💬 | Significant quotes with time ranges, translated to output language |
| **Takeaways** | 💡 | Actionable conclusions and practical insights with timestamps |
| **Tags** | 🏷️ | Topic keywords as clickable YouTube hashtag links |

### 📊 Smart Content Scaling

The extension automatically adjusts output based on video duration for optimal results:

| Duration | Chapters | Key Points | Summary Length | Detail Level |
|----------|----------|------------|----------------|--------------|
| **< 5 min** | 3-5 | 4-6 | 100-150 words | Concise |
| **5-15 min** | 4-7 | 5-7 | 150-250 words | Balanced |
| **15-30 min** | 6-10 | 6-8 | 200-350 words | Comprehensive |
| **30+ min** | 8-12 | 7-10 | 300-500 words | Detailed analysis |

### 🎨 User Experience

| Feature | Description |
|---------|-------------|
| **Privacy-First** | Your API key is stored locally in Chrome's storage, never shared with third parties |
| **Free to Use** | Use your own Gemini API key (generous free tier: 15 req/min, 1,500 req/day) |
| **Model Selection** | Choose from all available Gemini models, auto-sorted by capability |
| **Beautiful UI** | Clean, non-intrusive panel integrated seamlessly into YouTube |
| **Dark Mode Support** | Automatically adapts to YouTube's dark/light theme |
| **One-Click Summarize** | Get summaries with a single button click |
| **Copy to Clipboard** | Instantly copy summaries to your notes with Markdown formatting preserved |
| **Progress Indicator** | Visual loading stages with estimated time remaining |
| **Detailed Error Messages** | Contextual error handling with step-by-step fix instructions |

---

## 📥 Installation

### From Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/youtube-video-summarizer/behmahfjdnhfodnailemeaapflmilpic)
2. Click **Add to Chrome**
3. Confirm the installation when prompted
4. The extension panel will appear automatically on YouTube video pages

**Supported Browsers**: 
- ✅ Google Chrome
- ✅ Microsoft Edge (Chromium)
- ✅ Brave
- ✅ Opera
- ✅ Vivaldi
- ✅ Arc
- ✅ Other Chromium-based browsers

### From Source (Developer Mode)

1. **Clone or download** this repository:

```bash
git clone https://github.com/NoteLMai/YouTube-Video-Summarizer.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked**

5. Select the `YouTube Video Summarizer` folder

6. The extension is now installed and ready to use!

---

## ⚙️ Setup

### Get Your Gemini API Key (Free)

1. Visit our [API Key Guide](https://www.notelm.ai/support/api-key-guide) for step-by-step instructions
2. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Sign in with your Google account
4. Click **Create API key**
5. Copy the generated key

**Free Tier Limits**:
| Limit | Value |
|-------|-------|
| Requests per minute | 15 |
| Requests per day | 1,500 |
| Tokens per minute | 1,000,000 |

### Configure the Extension

1. Navigate to any YouTube video
2. Click the **gear icon (⚙️)** in the NoteLM panel
3. Paste your Gemini API key
4. Click **Verify** to validate your API key and load available models
5. Select your preferred AI model (the best model is recommended by default)
6. Click **Save**

### Model Selection

The extension automatically:
- Fetches all available Gemini models from your API key
- Filters out non-text models (image, audio, TTS, embedding)
- Ranks models by capability based on Google's official documentation
- Recommends the most powerful model by default

**Model Ranking Order** (highest to lowest):
1. Gemini 3 Pro/Flash
2. Gemini 2.5 Flash/Pro
3. Gemini 2.0 Flash
4. Gemini 1.5 Pro/Flash
5. Gemini Pro (legacy)

Your API key and model selection are stored locally in Chrome and never sent anywhere except directly to Google's Gemini API.

---

## 🚀 Usage

### Quick Start

1. **Navigate** to any YouTube video
2. **Play** the video briefly (3-5 seconds) to load subtitles
3. **Select** your preferred **output language** from the dropdown
4. **Click** "Summarize Video" in the NoteLM panel
5. **Wait** for the AI to generate your summary (15-30 seconds typically)
6. **Click** any timestamp to jump to that moment in the video
7. **Click** any hashtag to search for related content on YouTube
8. **Copy** the summary to your clipboard with one click

### Workflow Examples

#### 📚 Example 1: Study a Lecture

1. Open lecture video → Play briefly to load captions
2. Select your native language → Click "Summarize Video"
3. Use **Chapters** to navigate between topics
4. Click timestamps to revisit specific explanations
5. Copy **Key Points** for your study notes

#### 🔬 Example 2: Research Content

1. Open documentary/explainer video
2. Generate summary with timestamps
3. Click timestamps to verify important claims
4. Export **Notable Quotes** for citations
5. Use **Tags** to find related content

#### 🎓 Example 3: Quick Overview

1. Open any video you're considering watching
2. Generate quick summary to decide if it's worth your time
3. Review **Overview** and **Takeaways** sections
4. Jump to specific interesting parts using chapters

### Tips for Best Results

| Tip | Why It Helps |
|-----|--------------|
| **Play video for 3-5 seconds first** | Ensures YouTube loads subtitle data |
| **Enable CC if available** | Some videos require CC button to be clicked |
| **Choose appropriate output language** | AI translates the entire summary |
| **Use a powerful model for long videos** | Gemini 2.5 Pro handles 30+ min videos better |
| **Check timestamps accuracy** | AI uses real timestamps from the transcript |

---

## 🔧 Technical Architecture

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    YouTube Video Page                        │
├─────────────────────────────────────────────────────────────┤
│  1. Background.js intercepts YouTube's timedtext API        │
│     └── Captures subtitle URL when video plays              │
│                                                              │
│  2. User clicks "Summarize Video"                           │
│     └── content.js requests subtitle URL from background    │
│                                                              │
│  3. Content.js fetches and processes subtitles              │
│     └── Extracts text with timestamp markers every ~30s     │
│                                                              │
│  4. Collects video metadata                                 │
│     └── Title, channel, duration, description               │
│                                                              │
│  5. Builds optimized prompt with multi-layer language       │
│     enforcement                                              │
│     └── Dynamic scaling based on video duration             │
│                                                              │
│  6. Calls Gemini API directly                               │
│     └── No intermediary servers, direct to Google           │
│                                                              │
│  7. Renders interactive summary with clickable timestamps   │
│     └── Timestamps seek video, hashtags link to YT search   │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
YouTube Video Summarizer/
├── manifest.json          # Extension configuration (Manifest V3)
├── background.js          # Service Worker - subtitle URL interception
├── content.js             # Main logic - UI, API calls, timestamp handling
│   ├── YouTubeSummarizer  # Main class (2700+ lines)
│   ├── i18n helper        # Chrome i18n API wrapper
│   ├── Model ranking      # Gemini model capability sorting
│   ├── Language picker    # 65+ languages with search
│   └── Error handling     # Detailed contextual errors
├── styles.css             # Panel styling (2200+ lines)
│   ├── CSS Variables      # Theme-aware colors
│   ├── Dark mode          # YouTube dark theme detection
│   ├── RTL support        # Right-to-left languages
│   ├── Timestamp styles   # Clickable timestamp links
│   ├── Loading animation  # 4-stage progress indicator
│   └── Responsive design  # Mobile-friendly
├── _locales/              # Internationalization (20 UI languages)
│   ├── en/                # English (default)
│   │   └── messages.json  # 100+ translated strings
│   ├── ar/                # Arabic (RTL)
│   ├── de/                # German
│   ├── es/                # Spanish (Spain)
│   ├── es_419/            # Spanish (Latin America)
│   ├── es_US/             # Spanish (US)
│   ├── en_GB/             # English (UK)
│   ├── fr/                # French
│   ├── fr_CA/             # French (Canada)
│   ├── it/                # Italian
│   ├── ja/                # Japanese
│   ├── ko/                # Korean
│   ├── pl/                # Polish
│   ├── pt/                # Portuguese (Brazil)
│   ├── pt_PT/             # Portuguese (Portugal)
│   ├── ru/                # Russian
│   ├── uk/                # Ukrainian
│   ├── zh_CN/             # Chinese (Simplified)
│   ├── zh_HK/             # Chinese (Hong Kong)
│   └── zh_TW/             # Chinese (Traditional)
├── icon16.png             # Toolbar icon
├── icon48.png             # Extension page icon
├── icon128.png            # Chrome Web Store icon
└── README.md              # This documentation
```

### Required Permissions

| Permission | Purpose | Scope |
|------------|---------|-------|
| `storage` | Store API key, model selection, and output language locally | Local only |
| `webRequest` | Intercept YouTube's timedtext API to capture subtitle URLs | youtube.com only |
| `host_permissions: youtube.com` | Access YouTube pages to inject the summarizer panel | youtube.com |
| `host_permissions: googleapis.com` | Call Gemini API directly from the extension | generativelanguage.googleapis.com |

### Supported Gemini Models

The extension automatically filters and ranks models. Here are the supported model categories:

| Model Series | Models | Capability |
|--------------|--------|------------|
| **Gemini 3** | gemini-3-pro, gemini-3-flash | Newest, most capable |
| **Gemini 2.5** | gemini-2.5-flash, gemini-2.5-pro, gemini-2.5-flash-lite | Fast and intelligent |
| **Gemini 2.0** | gemini-2.0-flash, gemini-2.0-flash-lite | Previous generation |
| **Gemini 1.5** | gemini-1.5-pro, gemini-1.5-flash, gemini-1.5-flash-8b | Legacy, still capable |
| **Gemini 1.0** | gemini-pro | Legacy |

**Excluded models** (not for text generation):
- Image generation models (gemini-*-image-*)
- Text-to-speech models (gemini-*-tts)
- Audio/Live models (gemini-*-audio-*)
- Embedding models
- Vision-only models
- Veo, Imagen, Lyria (media generation)

---

## 🌐 Internationalization (i18n)

This extension follows Chrome's standard internationalization practices for seamless multilingual support.

### How i18n Works

The extension uses Chrome's `chrome.i18n` API to provide localized UI strings:

```javascript
// Simple message
const title = chrome.i18n.getMessage('panelTitle');

// With substitutions ($1, $2, etc. in message)
const greeting = chrome.i18n.getMessage('greeting', [userName]);

// Using the i18n helper function (handles missing translations)
const buttonText = i18n('summarizeVideo');
```

### Supported UI Languages

| Language Family | Languages |
|-----------------|-----------|
| **East Asian** | 简体中文 (zh_CN), 繁體中文 Taiwan (zh_TW), 繁體中文 Hong Kong (zh_HK), 日本語 (ja), 한국어 (ko) |
| **Romance** | Español (es), Español Latinoamérica (es_419), Español US (es_US), Français (fr), Français Canada (fr_CA), Italiano (it), Português Brasil (pt), Português Portugal (pt_PT) |
| **Germanic** | English (en), English UK (en_GB), Deutsch (de) |
| **Slavic** | Русский (ru), Українська (uk), Polski (pl) |
| **RTL** | العربية (ar) - Full RTL layout support |

### Adding a New Language

1. **Create the locale directory**:

```bash
mkdir _locales/[LANG_CODE]
```

Use [BCP-47 language tags](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (e.g., `es`, `fr`, `de`, `pt_BR`, `zh_TW`).

2. **Copy the English messages file**:

```bash
cp _locales/en/messages.json _locales/[LANG_CODE]/messages.json
```

3. **Translate the messages**: Edit the copied file and translate only the `"message"` values.

#### messages.json Structure

```json
{
  "extName": {
    "message": "YouTube Video Summarizer",
    "description": "The name of the extension displayed in Chrome"
  },
  "summarizeVideo": {
    "message": "Summarize Video",
    "description": "Main action button text"
  },
  "jumpToTimestamp": {
    "message": "Jump to $1",
    "description": "Tooltip for timestamp links",
    "placeholders": {
      "1": {
        "content": "$1",
        "example": "5:23"
      }
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `message` | The translated text to display (required) |
| `description` | Context for translators (not displayed to users) |
| `placeholders` | Variable substitution definitions |

### RTL Language Support

The extension includes comprehensive CSS support for RTL (right-to-left) languages:

- **Arabic (ar)**
- **Hebrew (he/iw)**
- **Persian/Farsi (fa)**
- **Urdu (ur)**

RTL styles are automatically applied based on:
- Document's `dir="rtl"` attribute
- `lang` attribute (`:lang(ar)`, `:lang(he)`, etc.)

**RTL-adjusted elements**:
- Header layout (reversed)
- Footer layout (reversed)
- List indentation (right-side)
- Blockquote borders (right-side)
- Input icons (right-positioned)
- Modal layouts
- Error message layouts

### Testing Localization

**Method 1: Chrome Settings**
1. Go to `chrome://settings/languages`
2. Add your target language
3. Move it to the top of the list
4. Restart Chrome

**Method 2: Command Line**

```bash
# macOS
open -a "Google Chrome" --args --lang=es

# Windows
chrome.exe --lang=es

# Linux
google-chrome --lang=es
```

### Translation Guidelines

| Guideline | Example |
|-----------|---------|
| Keep it concise | UI space is limited |
| Preserve placeholders | Keep `$1`, `$2`, `[M:SS]` formats unchanged |
| Match tone | Friendly, professional |
| Test all states | Loading, error, success |
| Consider text expansion | Some languages are 30-40% longer than English |

---

## 🗣️ Supported Languages

### UI Languages (20)

The extension interface is fully translated into 20 languages:

| Region | Languages |
|--------|-----------|
| **Americas** | English (US/UK), Español (Spain/LatAm/US), Français (Canada), Português (Brazil/Portugal) |
| **Europe** | Deutsch, Français, Italiano, Polski, Русский, Українська |
| **Asia-Pacific** | 简体中文, 繁體中文 (Taiwan/HK), 日本語, 한국어 |
| **Middle East** | العربية (with full RTL support) |

### Output Languages (65+)

AI summaries can be generated in 65+ languages, organized by first letter:

<details>
<summary><strong>Click to expand full language list</strong></summary>

| Letter | Languages |
|--------|-----------|
| **A** | Afrikaans (af), Albanian (sq), Amharic (am), Arabic (ar), Armenian (hy), Assamese (as), Azerbaijani (az) |
| **B** | Bangla (bn), Basque (eu), Belarusian (be), Bosnian (bs), Bulgarian (bg), Burmese (my) |
| **C** | Catalan (ca), Chinese Simplified (zh-CN), Chinese Traditional (zh-TW), Chinese Hong Kong (zh-HK), Croatian (hr), Czech (cs) |
| **D** | Danish (da), Dutch (nl) |
| **E** | English (en), English UK (en-GB), English India (en-IN), Estonian (et) |
| **F** | Filipino (fil), Finnish (fi), French (fr), French Canada (fr-CA) |
| **G** | Galician (gl), Georgian (ka), German (de), Greek (el), Gujarati (gu) |
| **H** | Hebrew (iw), Hindi (hi), Hungarian (hu) |
| **I** | Icelandic (is), Indonesian (id), Italian (it) |
| **J** | Japanese (ja) |
| **K** | Kannada (kn), Kazakh (kk), Khmer (km), Korean (ko), Kyrgyz (ky) |
| **L** | Lao (lo), Latvian (lv), Lithuanian (lt) |
| **M** | Macedonian (mk), Malay (ms), Malayalam (ml), Marathi (mr), Mongolian (mn) |
| **N** | Nepali (ne), Norwegian (no) |
| **O** | Odia (or) |
| **P** | Persian (fa), Polish (pl), Portuguese (pt), Portuguese Portugal (pt-PT), Punjabi (pa) |
| **R** | Romanian (ro), Russian (ru) |
| **S** | Serbian (sr), Serbian Latin (sr-Latn), Sinhala (si), Slovak (sk), Slovenian (sl), Spanish (es), Spanish LatAm (es-419), Spanish US (es-US), Swahili (sw), Swedish (sv) |
| **T** | Tamil (ta), Telugu (te), Thai (th), Turkish (tr) |
| **U** | Ukrainian (uk), Urdu (ur), Uzbek (uz) |
| **V** | Vietnamese (vi) |
| **Z** | Zulu (zu) |

</details>

---

## 🖥️ Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| **Google Chrome** | ✅ Fully Supported | Recommended, primary development target |
| **Microsoft Edge** | ✅ Fully Supported | Chromium-based, excellent compatibility |
| **Brave** | ✅ Fully Supported | Chromium-based |
| **Opera** | ✅ Fully Supported | Chromium-based |
| **Vivaldi** | ✅ Fully Supported | Chromium-based |
| **Arc** | ✅ Fully Supported | Chromium-based |
| **Firefox** | ❌ Not Available | Different extension API (Manifest V3 differences) |
| **Safari** | ❌ Not Available | Different extension API |

---

## 🔒 Privacy & Security

| Aspect | Details |
|--------|---------|
| **No Data Collection** | We don't collect any user data whatsoever |
| **Local Storage Only** | Your API key is stored in Chrome's local storage on your device |
| **Direct API Calls** | Transcripts are sent directly to Google's Gemini API—we never see your data |
| **No Tracking** | Zero analytics, zero telemetry, zero third-party scripts |
| **No External Servers** | No intermediary servers between you and Google's API |
| **Open Source** | Transparent codebase you can verify yourself |
| **Minimal Permissions** | Only requests permissions absolutely necessary for functionality |

### Data Flow

```
Your Browser ←→ YouTube (subtitles) ←→ Google Gemini API (summary)
     ↓
Local Storage (API key, preferences)

❌ No data sent to NoteLM servers
❌ No analytics or tracking
❌ No third-party data sharing
```

---

## 🔧 Troubleshooting

### Common Issues

<details>
<summary><strong>"No subtitles available"</strong></summary>

**Cause**: The extension captures subtitles when YouTube loads them, which requires video playback.

**Solutions**:
1. ▶️ Play the video for 3-5 seconds
2. 🔄 Refresh the page if needed
3. 📝 Click the CC button if available
4. 🎬 Try "Summarize Video" again

</details>

<details>
<summary><strong>"Invalid API key"</strong></summary>

**Cause**: The API key is incorrect, expired, or has no permissions.

**Solutions**:
1. 🔑 Follow our [API Key Guide](https://www.notelm.ai/support/api-key-guide)
2. 📋 Make sure there are no extra spaces when pasting
3. 🆕 Try creating a new API key at [Google AI Studio](https://aistudio.google.com/app/apikey)
4. ✅ Click "Verify" in settings to validate before saving

</details>

<details>
<summary><strong>Panel not showing</strong></summary>

**Cause**: The extension may not be active or YouTube hasn't loaded properly.

**Solutions**:
1. 🔗 Make sure you're on a YouTube watch page (`youtube.com/watch?v=...`)
2. 🔄 Refresh the page
3. ✅ Check if the extension is enabled at `chrome://extensions/`
4. 🔃 Try reinstalling the extension

</details>

<details>
<summary><strong>Timestamps not clickable</strong></summary>

**Cause**: The video player may not be accessible.

**Solutions**:
1. 👁️ Ensure the video player is visible on the page
2. 🔄 Try regenerating the summary
3. 📜 Scroll so the video is in view before clicking

</details>

<details>
<summary><strong>API Rate Limit Errors</strong></summary>

**Cause**: You've exceeded the free tier limits.

**Solutions**:
1. ⏰ Wait 1 minute (15 req/min limit)
2. 📅 Wait until next day if daily limit reached (1,500/day)
3. 💳 Consider upgrading your API plan for higher limits

</details>

<details>
<summary><strong>Summary is incomplete/truncated</strong></summary>

**Cause**: The AI output was cut off due to length limits.

**Solutions**:
1. 🔄 Switch to a more powerful model (e.g., gemini-2.5-pro)
2. 🔁 Regenerate the summary
3. 📊 For very long videos (2+ hours), consider summarizing in sections

</details>

---

## ❓ FAQ

### General Questions

**Q: Why do I need to play the video first?**
> YouTube loads captions dynamically when you start playing. The extension intercepts this data via the `webRequest` API, so you need to trigger the loading by playing briefly.

**Q: Can I summarize videos without subtitles?**
> No, the extension requires subtitles or closed captions to generate summaries. Most videos have auto-generated captions available. Look for the CC button on the video player.

**Q: Is my data safe?**
> Yes. Your API key is stored locally in Chrome's storage. Transcripts are sent directly to Google's Gemini API—we never see your data. There are no analytics or tracking.

**Q: How much does it cost?**
> The extension is free. You only need a Gemini API key, which has a generous free tier (15 requests/minute, 1,500 requests/day). Most users never need to pay.

**Q: Which model should I use?**
> The extension automatically recommends the best available model. For most videos, gemini-2.5-flash offers the best balance of speed and quality. For very long or complex videos, try gemini-2.5-pro.

**Q: Can I change the output language?**
> Yes! Select any of the 65+ supported languages from the dropdown before clicking "Summarize Video". The AI will translate and generate the entire summary in your chosen language.

**Q: Does it work with live streams?**
> Only after the stream ends and YouTube processes the captions. Live streams don't have subtitles available in real-time.

**Q: Can I summarize private or unlisted videos?**
> Yes, as long as you have access to the video and it has captions available.

---

## 🔗 Related Tools

| Tool | Description |
|------|-------------|
| **[YouTube Subtitle Downloader](../YouTube%20Subtitle%20Downloader/)** | Download subtitles in SRT, TXT, or JSON format |
| **[NoteLM.ai Website](https://notelm.ai)** | Learn more about our AI-powered tools |
| **[YouTube Transcript Generator](https://notelm.ai/tools/youtube-transcript-generator)** | Online transcript extraction tool |
| **[API Key Guide](https://www.notelm.ai/support/api-key-guide)** | Step-by-step guide to get your Gemini API key |

---

## 💬 Support

Having issues or suggestions? We'd love to hear from you!

| Channel | Link |
|---------|------|
| 🐛 **Bug Reports** | [GitHub Issues](https://github.com/NoteLMai/YouTube-Video-Summarizer/issues) |
| 💡 **Feature Requests** | [GitHub Discussions](https://github.com/NoteLMai/YouTube-Video-Summarizer/discussions) |
| 📧 **Email** | hello@notelm.ai |
| 🌐 **Website** | [notelm.ai](https://notelm.ai) |
| 📖 **Documentation** | [Support Center](https://www.notelm.ai/support) |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. **🌍 Translations**: Add support for new UI languages
2. **🐛 Bug Fixes**: Submit pull requests for issues
3. **✨ Features**: Propose and implement new features
4. **📖 Documentation**: Improve this README or add guides
5. **🧪 Testing**: Report bugs or test on different browsers

### Development Setup

```bash
# Clone the repository
git clone https://github.com/NoteLMai/YouTube-Video-Summarizer.git

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the cloned folder
```

### Code Style

- Use modern JavaScript (ES6+)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and small
- Use meaningful variable names

---

## 📄 License

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

## 📜 Version History

### v1.2.0 (January 2026) - Current Release
- 🌍 **20 UI Languages**: Full interface localization with Chrome i18n API
  - East Asian: 简体中文, 繁體中文 (Taiwan/Hong Kong), 日本語, 한국어
  - Romance: Español (Spain/LatAm/US), Français (France/Canada), Italiano, Português (Brazil/Portugal)
  - Germanic: English (US/UK), Deutsch
  - Slavic: Русский, Українська, Polski
  - RTL: العربية (Arabic) with complete RTL layout support
- 📁 **Chrome i18n API Integration**: All UI strings externalized to `_locales/[lang]/messages.json`
- ↔️ **RTL Support**: Complete right-to-left layout for Arabic, Hebrew, Persian, Urdu
- 🔤 **Localized Language Names**: Language picker shows names in current UI language
- 📖 **Comprehensive i18n Documentation**: Guide for adding new translations
- 🔧 **Enhanced Error Messages**: All error messages now support localization

### v1.1.0 (January 2026)
- 🎯 **Dynamic Model Selection**: Choose from all available Gemini models
- ✅ **API Key Verification**: Validate keys and load available models before saving
- 📊 **Model Ranking System**: Auto-sort models by capability (Gemini 3 → 2.5 → 2.0 → 1.5)
- 🔤 **65+ Output Languages**: Extended language picker with search functionality
- 🏷️ **Clickable Hashtags**: Tags link directly to YouTube hashtag search
- 📊 **Enhanced Loading UI**: 4-stage progress indicator with estimated time
- 🔧 **Detailed Error Handling**: Contextual errors with step-by-step fix instructions
- 📱 **Language Picker Modal**: Beautiful modal with alphabetical grouping and search
- 🎨 **UI Improvements**: Modern settings modal, model list, verify button

### v1.0.0 (2024)
- 🎉 Initial public release
- ✨ AI-powered video summaries with Google Gemini
- 📑 Auto-generated chapters with clickable timestamps
- 💬 Notable quotes extraction with time ranges
- 🌐 Basic output language support
- 📊 Dynamic content scaling based on video length
- 🎨 Beautiful UI with dark mode support
- 🔒 Privacy-first design with local API key storage
- 📋 Copy to clipboard functionality
- ⏱️ Clickable timestamp navigation

---

## 🙏 Credits

<p align="center">
  Built with ❤️ by <a href="https://notelm.ai">NoteLM.ai</a> - Your AI-powered note-taking companion
</p>

<p align="center">
  Powered by <a href="https://deepmind.google/technologies/gemini/">Google Gemini AI</a>
</p>

<p align="center">
  <a href="https://notelm.ai">
    <img src="https://notelm.ai/logo.svg" alt="NoteLM.ai" width="120">
  </a>
</p>

---

<p align="center">
  <strong>⭐ If you find this extension useful, please consider leaving a review on the Chrome Web Store! ⭐</strong>
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/youtube-video-summarizer/behmahfjdnhfodnailemeaapflmilpic">
    Rate on Chrome Web Store
  </a>
</p>
