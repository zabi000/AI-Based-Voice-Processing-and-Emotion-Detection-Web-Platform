<div align="center">

<br/>

<img src="Frontend/FYP-project/public/logo.svg" alt="VoiceLab Logo" width="100" height="100"/>

<br/>

# VoiceLab

### AI-Powered Voice Processing Platform

*An end-to-end intelligent audio processing system combining Deep Learning, ASR, and TTS into a single web platform.*

<br/>

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

[![OpenAI Whisper](https://img.shields.io/badge/OpenAI-Whisper-412991?style=flat-square&logo=openai&logoColor=white)](https://github.com/openai/whisper)
[![Edge TTS](https://img.shields.io/badge/Microsoft-Edge_TTS-0078D4?style=flat-square&logo=microsoft&logoColor=white)](https://github.com/rany2/edge-tts)
[![MUI](https://img.shields.io/badge/MUI-v5-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22B5BF?style=flat-square)](https://recharts.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/yourusername/voicelab?style=flat-square&color=gold)](https://github.com/yourusername/voicelab/stargazers)

<br/>

[**Explore the Docs**](http://127.0.0.1:8000/docs) · [**Report a Bug**](https://github.com/yourusername/voicelab/issues) · [**Request a Feature**](https://github.com/yourusername/voicelab/issues)

<br/>

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#️-system-architecture)
- [Tech Stack](#-tech-stack)
- [AI / ML Models](#-ai--ml-models)
- [Datasets Used](#-datasets-used)
- [Project Structure](#-project-structure)
- [Installation Guide](#️-installation-guide)
- [API Endpoints](#-api-endpoints)
- [Usage Guide](#-usage-guide)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Authors](#-authors)
- [License](#-license)

---

## 🧠 Overview

**VoiceLab** is a full-stack, AI-powered audio intelligence platform built as a Final Year Project. It provides a unified, browser-accessible workspace for a wide range of intelligent voice processing tasks — all in one place.

```
  Detect Emotions  →  Transcribe Speech  →  Synthesize Voice  →  Clean Audio
```

The platform is architected as a clean, decoupled system: a **Python/FastAPI** backend handles all heavy AI computation (CNN-BiLSTM, Whisper, Edge TTS, spectral processing), while a **React/Vite** frontend delivers a modern, cyberpunk-themed responsive UI with real-time waveform visualization.

**Who is it for?**

| Audience | Use Case |
|---|---|
| 🎓 Students & Researchers | Audio analysis, emotion datasets, speech experiments |
| 🎬 Content Creators | Clean recordings, generate voiceovers, transcribe interviews |
| 🏢 Businesses | Automate audio workflows, analyze customer call sentiment |
| 👩‍💻 Developers | REST API for integrating voice AI into any application |

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

**🎭 Emotion Detection**
Classifies spoken audio into 5 emotions — Angry, Fear, Happy, Neutral, Sad — using a custom CNN-BiLSTM model trained on RAVDESS, TESS, and CREMA-D. Displays per-class confidence in a real-time cyberpunk bar chart.

</td>
<td width="50%">

**✍️ Voice-to-Text (ASR)**
Transcribes MP3, WAV, M4A, FLAC, and WebM files using OpenAI Whisper. Pre-processes audio with noise reduction before inference and returns full transcripts with timestamped segments.

</td>
</tr>
<tr>
<td width="50%">

**🗣️ Text-to-Voice (TTS)**
Generates natural, neural speech from any text (up to 5,000 chars) using Microsoft Azure Neural Voices via `edge-tts`. Choose from 4 distinct voice personalities.

</td>
<td width="50%">

**🔇 Noise Reduction**
Removes background hiss, hum, and static using spectral gating with adaptive noise estimation. Adjustable Low / Medium / High strength. Compare original vs. cleaned audio side-by-side.

</td>
</tr>
<tr>
<td width="50%">

**✨ Voice Enhancement**
Applies EQ clarity boosting, soft compression, and LUFS loudness normalization for broadcast-quality audio output. Fully configurable parameters.

</td>
<td width="50%">

**🎙️ Live Recording**
Record audio directly in the browser via the Web MediaRecorder API on any feature page — no external software needed.

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT  (Browser)                        │
│                                                                  │
│   React 18 + Vite  ──  React Router v6  ──  Axios (HTTP)        │
│   MUI v5  ──  Recharts  ──  WaveSurfer.js  ──  Vanta.js         │
└──────────────────────────────┬──────────────────────────────────┘
                               │  HTTP/REST  (multipart/form-data)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND  (FastAPI / Python)                   │
│                                                                  │
│   ┌─────────────────┐   ┌──────────────────┐   ┌─────────────┐  │
│   │   /transcribe   │   │ /emotion-detect  │   │/text-to-    │  │
│   │  OpenAI Whisper │   │  CNN-BiLSTM      │   │  voice      │  │
│   │  (base model)   │   │  TensorFlow/Keras│   │  Edge TTS   │  │
│   └─────────────────┘   └──────────────────┘   └─────────────┘  │
│                                                                  │
│   ┌─────────────────┐   ┌──────────────────────────────────────┐ │
│   │ /noise-reduction│   │          /enhance-audio              │ │
│   │  noisereduce    │   │  EQ  +  Compression  +  pyloudnorm   │ │
│   │  spectral gate  │   │  scipy Butterworth filter            │ │
│   └─────────────────┘   └──────────────────────────────────────┘ │
│                                                                  │
│   Audio Pre-processing Pipeline                                  │
│   librosa ── soundfile ── noisereduce ── scipy ── pydub          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │   uploads/          │   Temp audio input
                    │   outputs/          │   Processed output
                    └─────────────────────┘
```

**Typical request lifecycle:**

1. User uploads or records audio in the browser
2. Frontend sends a `multipart/form-data` POST to FastAPI
3. Backend saves file, runs the appropriate AI pipeline
4. Results (JSON + audio URL) are returned to the frontend
5. Temporary files are cleaned up post-processing

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Python** | 3.10+ | Core language |
| **FastAPI** | 0.115+ | REST API framework |
| **TensorFlow / Keras** | 2.x | CNN-BiLSTM emotion model inference |
| **OpenAI Whisper** | base | Automatic speech recognition |
| **edge-tts** | latest | Microsoft Azure neural TTS |
| **librosa** | latest | Audio loading, MFCC, Mel spectrogram |
| **noisereduce** | latest | Spectral gating noise reduction |
| **soundfile** | latest | Audio I/O (WAV read/write) |
| **pydub** | latest | WAV → MP3 conversion |
| **pyloudnorm** | latest | LUFS loudness normalization |
| **scipy** | latest | Butterworth filters, signal processing |
| **NumPy** | latest | Numerical computation |
| **Uvicorn** | latest | ASGI server |

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3 | UI framework |
| **Vite** | 5.4 | Build tool & dev server |
| **React Router** | v6 | Client-side routing |
| **Axios** | latest | HTTP client |
| **MUI (Material UI)** | v5 | Component library |
| **Recharts** | 2.15 | Emotion data visualization |
| **WaveSurfer.js** | latest | Waveform visualization |
| **Vanta.js + Three.js** | latest | Animated 3D hero background |
| **react-toastify** | latest | Notifications |
| **react-hook-form + yup** | latest | Form validation |
| **TanStack Query** | latest | Server state management |

---

## 🤖 AI / ML Models

### 1. Speech Emotion Recognition — CNN-BiLSTM

The core model is a custom-trained **Convolutional Neural Network + Bidirectional LSTM** architecture, designed to capture both local spectral patterns and long-range temporal dependencies in speech.

**Input features:**

| Feature | Details |
|---|---|
| Mel Spectrogram | 128 mel bands, converted to dB scale |
| MFCC | 13 coefficients |
| Combined input shape | `141 × 200 × 1` (padded/truncated to 200 frames) |
| Normalization | Z-score normalized before inference |

**Output:** Softmax over 5 emotion classes → `['Angry', 'Fear', 'Happy', 'Neutral', 'Sad']`

**Model file:** `app/model/cnn_bilstm_improved.keras`

```
Input (141, 200, 1)
  │
  ├─▶ Conv2D(32) + BatchNorm + MaxPool2D
  ├─▶ Conv2D(64) + BatchNorm + MaxPool2D
  ├─▶ Reshape → sequence of feature vectors
  ├─▶ Bidirectional LSTM(128)
  ├─▶ Dense(64) + Dropout(0.4)
  └─▶ Dense(5) + Softmax
```

---

### 2. Automatic Speech Recognition — OpenAI Whisper

| Setting | Value |
|---|---|
| Model size | `whisper-base` (~74M params) |
| Loading | Once at server startup |
| Language | English |
| Decoding | `beam_size=5`, `best_of=5` |
| Pre-processing | Silence trim + spectral noise reduction |
| Output | Full transcript + timestamped segments |

---

### 3. Neural Text-to-Speech — Microsoft Edge TTS

Powered by `edge-tts`, which interfaces with the Microsoft Azure Cognitive Speech Service:

| Voice ID | Neural Voice | Character |
|---|---|---|
| `lisa` | `en-US-JennyNeural` | Female · Natural |
| `aria` | `en-US-AriaNeural` | Female · Soft |
| `mike` | `en-US-GuyNeural` | Male · Strong |
| `david` | `en-GB-RyanNeural` | Male · Calm |

---

## 📊 Datasets Used

| Dataset | Actors | Emotions | Clips | Used For |
|---|---|---|---|---|
| **RAVDESS** | 24 professional actors | 8 emotions | ~1,500 | Primary training data |
| **TESS** | 2 female actors | 7 emotions | ~2,800 | Supplementary training |
| **CREMA-D** | 91 actors | 6 emotions | 7,442 | Robustness & augmentation |

> The final model was trained on a **balanced combined subset** of RAVDESS + TESS, mapped to 5 unified emotion labels: `Angry`, `Fear`, `Happy`, `Neutral`, `Sad`.

---

## 📁 Project Structure

```
VoiceLab/
│
├── Backend/
│   ├── app/
│   │   ├── main.py                       # FastAPI app — all routes & AI pipelines
│   │   └── model/
│   │       ├── cnn_bilstm_improved.keras  # ✅ Production emotion model
│   │       └── cnn_bilstm_2.keras         # 🧪 Experimental model
│   ├── uploads/                           # Temp storage for incoming audio
│   ├── outputs/                           # Processed / generated audio output
│   ├── requirements.txt
│   └── README.md
│
└── Frontend/
    └── FYP-project/
        ├── public/
        │   └── logo.svg
        ├── src/
        │   ├── App.jsx                    # Root router configuration
        │   ├── assets/                    # Developer profile images
        │   │
        │   ├── components/
        │   │   ├── AppShell.jsx           # Layout wrapper (Header + Footer)
        │   │   ├── AudioPlayer.jsx        # Custom HTML5 audio player
        │   │   ├── Recorder.jsx           # Microphone recording component
        │   │   ├── UploadDropzone.jsx     # Drag-and-drop file upload
        │   │   ├── Layout/
        │   │   │   ├── Header.jsx
        │   │   │   └── Footer.jsx
        │   │   └── Recorder/
        │   │       └── useRecorder.js     # MediaRecorder custom hook
        │   │
        │   └── pages/
        │       ├── Dashboard.jsx          # Landing page with Vanta.js hero
        │       ├── About.jsx              # Architecture overview page
        │       ├── PrivacyPolicy.jsx
        │       └── Voice/
        │           ├── VoiceHub.jsx       # Feature selection hub
        │           ├── EmotionDetection.jsx
        │           ├── VoiceToText.jsx
        │           ├── TextToVoice.jsx
        │           ├── NoiseReduction.jsx
        │           └── VoiceEnhancement.jsx
        │
        ├── package.json
        ├── vite.config.js
        └── index.html
```

---

## ⚙️ Installation Guide

### Prerequisites

Ensure the following are installed on your system before proceeding:

| Requirement | Version | Notes |
|---|---|---|
| Python | 3.10+ | |
| Node.js | 18+ | |
| npm | 9+ | Bundled with Node.js |
| FFmpeg | any | Required by pydub for audio conversion |

**Install FFmpeg:**

```bash
# Windows (via winget)
winget install ffmpeg

# macOS (via Homebrew)
brew install ffmpeg

# Ubuntu / Debian
sudo apt install ffmpeg
```

---

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/voicelab.git
cd voicelab

# 2. Navigate to the backend directory
cd Backend

# 3. Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# 4. Install Python dependencies
pip install fastapi uvicorn openai-whisper tensorflow librosa soundfile \
            noisereduce edge-tts pydub pyloudnorm scipy numpy

# 5. Verify the model file is present
# Backend/app/model/cnn_bilstm_improved.keras  ← required

# 6. Start the FastAPI development server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at `http://127.0.0.1:8000`

Interactive Swagger docs: `http://127.0.0.1:8000/docs`

> **Note:** On first run, Whisper will automatically download the `base` model weights (~140 MB). Ensure you have an active internet connection.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory (from project root)
cd Frontend/FYP-project

# 2. Install Node.js dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The app will be available at `http://localhost:5173`

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Lint source files
npm run lint
```

> **Important:** The frontend expects the backend running on `http://127.0.0.1:8000`. Update the Axios base URL in the source if deploying to a different host.

---

## 📡 API Endpoints

All endpoints are served from `http://127.0.0.1:8000`. Full interactive documentation is available at `/docs`.

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `GET` | `/` | Health check | — |
| `POST` | `/emotion-detection` | Detect emotion from audio | `file` (MP3/WAV, max 5 MB) |
| `POST` | `/transcribe` | Speech-to-text transcription | `file` (MP3/WAV/M4A/FLAC/WebM) |
| `POST` | `/text-to-voice` | Text-to-speech synthesis | `text` (string), `voice_id` |
| `POST` | `/noise-reduction` | Remove background noise | `file`, `strength` (Low/Medium/High) |
| `POST` | `/enhance-audio` | Enhance voice quality | `file`, `clarityLevel`, `normalizeVolume`, `noiseStrength`, `compression` |
| `GET` | `/audio/{file_name}` | Stream a processed audio file | — |
| `GET` | `/download/{filename}` | Download a processed audio file | — |

### Example: Emotion Detection

**Request:**
```bash
curl -X POST "http://127.0.0.1:8000/emotion-detection" \
     -F "file=@your_audio.wav"
```

**Response:**
```json
{
  "emotion": "Happy",
  "confidence": 78.43,
  "all_scores": {
    "Angry": 4.21,
    "Fear": 2.11,
    "Happy": 78.43,
    "Neutral": 12.05,
    "Sad": 3.20
  }
}
```

### Example: Transcription

**Request:**
```bash
curl -X POST "http://127.0.0.1:8000/transcribe" \
     -F "file=@speech.wav"
```

**Response:**
```json
{
  "transcript": "Hello, this is a test of the transcription service.",
  "segments": [
    { "start": 0.0, "end": 3.5, "text": "Hello, this is a test..." }
  ]
}
```

### Example: Text-to-Voice

**Request:**
```bash
curl -X POST "http://127.0.0.1:8000/text-to-voice" \
     -F "text=Welcome to VoiceLab." \
     -F "voice_id=lisa"
```

**Response:**
```json
{
  "audio_url": "/audio/tts_output_abc123.mp3"
}
```

---

## 📖 Usage Guide

### 🎭 Emotion Detection
1. Navigate to **Voice Hub → Emotion Detection**
2. Upload an MP3 or WAV file (max 5 MB), or record directly in the browser
3. The CNN-BiLSTM model analyzes pitch, tone, and temporal patterns
4. View the dominant emotion, confidence score, and a live bar chart of all 5 class probabilities

### ✍️ Voice-to-Text
1. Navigate to **Voice Hub → Voice-to-Text**
2. Upload MP3/WAV/M4A/FLAC/WebM (max 1 min), or click **Start Recording**
3. Click **Transcribe Audio** and wait for Whisper to process
4. Edit the transcript inline, then **Copy** or **Download as TXT/DOCX**

### 🗣️ Text-to-Voice
1. Navigate to **Voice Hub → Text-to-Voice**
2. Type or paste your text (max 5,000 characters)
3. Select a voice actor — Lisa, Aria, Mike, or David
4. Click **Generate Audio**, then listen and download the MP3

### 🔇 Noise Reduction
1. Navigate to **Voice Hub → Noise Reduction**
2. Upload or record audio (max 5 MB / 2 min)
3. Set the **Reduction Strength** (Low / Medium / High)
4. Click **Start Noise Reduction**
5. Compare original vs. cleaned audio side-by-side and download the result

### ✨ Voice Enhancement
1. Navigate to **Voice Hub → Voice Enhancement**
2. Upload or record audio (max 10 MB / 2 min)
3. Configure **Clarity Level** and toggle **Volume Normalization**
4. Click **Enhance Voice**, compare before/after, and download the enhanced MP3

---

## 📸 Screenshots

> Place screenshots in `docs/screenshots/` and they will render here automatically.

<br/>

**Home Page**

![Home Page](docs/screenshots/dashboard.png)

> *The cyberpunk-themed landing page with animated Vanta.js hero background and feature overview.*

<br/>

**Emotion Detection**

![Emotion Detection](docs/screenshots/emotion.png)

> *Real-time emotion analysis with confidence scores displayed in a cyberpunk bar chart (Recharts).*

<br/>

**Speech To Text**

![Speech To Text](docs/screenshots/vtt.png)

> *Whisper-powered transcription with editable output and TXT/DOCX download support.*

<br/>

**Noise Reduction**

![Noise Reduction](docs/screenshots/noise.png)

> *Side-by-side original vs. cleaned audio comparison with waveform visualization.*

<br/>

**Voice Enhancement**

![Voice Enhancement](docs/screenshots/enhancement.png)

> *EQ, compression, and LUFS normalization pipeline with before/after audio playback.*

---

## 🚀 Future Enhancements

- [ ] **Multilingual ASR** — Extend Whisper support to Urdu, Arabic, French, and Spanish
- [ ] **Speaker Diarization** — Identify and label multiple speakers in a single audio file
- [ ] **Real-time Streaming Transcription** — WebSocket-based live transcription pipeline
- [ ] **Emotion Trend Analysis** — Track emotional states across time for customer service analytics
- [ ] **Extended Emotion Classes** — Add Disgust, Surprise, and Contempt to the emotion model
- [ ] **More TTS Voice Actors** — Expand the voice library with additional neural voices and styles
- [ ] **Batch Processing** — Process multiple audio files in a single queued job
- [ ] **User Authentication** — JWT-based accounts with usage history and rate limiting
- [ ] **Cloud Storage Integration** — Save outputs to AWS S3 or Google Drive
- [ ] **Mobile App** — React Native or Flutter cross-platform client


---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to open issues, submit pull requests, and propose new features.

```bash
# Fork the repository, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<br/>

**Built with ❤️ using Python, React, and Deep Learning**

*VoiceLab — Transforming audio intelligence, one waveform at a time.*

<br/>

⭐ If you found this project useful, please consider starring the repository!

<br/>

</div>
