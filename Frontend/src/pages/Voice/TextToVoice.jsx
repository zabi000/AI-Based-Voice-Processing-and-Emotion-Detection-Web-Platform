import React, { useState } from 'react';
import styles from './TextToVoice.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppShell from '../../components/AppShell';

// --- ICONS ---
const ArrowLeft = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
const Zap = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const CheckCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const Headphones = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>);
const UsersIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const SlidersIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>);
const GlobeIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);

const MAX_CHARACTERS = 5000;

const MOCK_VOICES = [
    { id: 'lisa', name: 'Lisa (Female - Natural)' },
    { id: 'aria', name: 'Aria (Female - Soft)' },
    { id: 'mike', name: 'Mike (Male - Strong)' },
    { id: 'david', name: 'David (Male - Calm)' }
];

export default function TextToVoice() {
    const [textInput, setTextInput] = useState("Hello VoiceLab user. This is a demonstration of our text-to-voice synthesis.");
    const [selectedVoice, setSelectedVoice] = useState('lisa');
    const [jobStatus, setJobStatus] = useState('input');
    const [jobResult, setJobResult] = useState(null);
    const [error, setError] = useState(null);

    const isInputValid = textInput.trim().length > 0 && textInput.length <= MAX_CHARACTERS;
    const estimatedTime = Math.max(1, Math.ceil(textInput.length / 30));

    const startProcessing = async (e) => {
        e.preventDefault();
        if (!isInputValid) return;

        setJobStatus('processing');
        setJobResult(null);
        setError(null);

        const voice = MOCK_VOICES.find(v => v.id === selectedVoice) || MOCK_VOICES[0];

        try {
            const formData = new FormData();
            formData.append('text', textInput);
            formData.append('voice_id', voice.id);

            const response = await axios.post(
                'http://127.0.0.1:8000/text-to-voice',
                formData
            );

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            setJobResult({
                fileUrl: response.data.audio_url,
                fileName: `Synthesis_${voice.name.replace(/\s/g, '_')}.mp3`,
                voiceName: voice.name,
                textLength: textInput.length,
            });
            setJobStatus('completed');

        } catch (err) {
            console.error("Text to voice error:", err);
            const msg = err.response?.data?.error || err.response?.data?.detail || err.message || "Synthesis failed. Please verify server connection.";
            setError(msg);
            setJobStatus('input');
        }
    };

    const reset = () => {
        setJobStatus('input');
        setJobResult(null);
        setTextInput("");
        setError(null);
    };

    const renderInputArea = () => (
        <form onSubmit={startProcessing} className={styles.formGrid}>
            <div className={styles.inputContainer}>
                <div className={styles.formGroup} style={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 0 }}>
                    <label htmlFor="text-input" className={styles.inputLabel}>Drop text here</label>
                    <textarea
                        id="text-input"
                        className={styles.textArea}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value.slice(0, MAX_CHARACTERS))}
                        placeholder="Enter the text you want converted to speech..."
                        required
                    />
                    <div className={styles.charCounter}>
                        <span className={textInput.length > MAX_CHARACTERS ? styles.charLimitExceeded : ''}>
                            {textInput.length} / {MAX_CHARACTERS} Characters
                        </span>
                        <span>Estimated processing time: ~{estimatedTime}s</span>
                    </div>
                </div>
            </div>

            <div className={styles.settingsContainer}>
                <h3 className={styles.settingsTitle}>Synthesis Controls</h3>
                
                <div className={styles.formGroup}>
                    <label htmlFor="voice-select" className={styles.inputLabel}>Select Voice Actor</label>
                    <select 
                        id="voice-select" 
                        value={selectedVoice} 
                        onChange={(e) => setSelectedVoice(e.target.value)} 
                        className={styles.selectField}
                    >
                        {MOCK_VOICES.map(voice => (
                            <option key={voice.id} value={voice.id}>
                                {voice.name}
                            </option>
                        ))}
                    </select>
                </div>

                <p className={styles.comingSoonText}>
                    We are working on adding more voice actors and advanced controls.
                </p>

                <div className={styles.actionArea}>
                    <button 
                        type="submit" 
                        className={styles.primaryButton} 
                        disabled={!isInputValid}
                    >
                        <Zap className={styles.iconSmall} /> Generate Audio
                    </button>
                    {error && <p className={styles.errorText}>❌ {error}</p>}
                </div>
            </div>
        </form>
    );

    const renderProcessingArea = () => {
        const currentVoice = MOCK_VOICES.find(v => v.id === selectedVoice)?.name || "Selected Voice";
        return (
            <div className={styles.processingCard}>
                <div className={styles.spinner}></div>
                <h3 className={styles.processingTitle}>Synthesizing Speech</h3>
                <p className={styles.processingSubtext}>Please wait while the audio is generated.</p>
                <p className={styles.textDetails}>
                    Characters: {textInput.length} | Voice: {currentVoice}
                </p>
            </div>
        );
    };

    const renderResultArea = () => {
        if (jobStatus === 'completed' && jobResult) {
            return (
                <div className={styles.resultContainer}>
                    <div className={styles.resultHeader}>
                        <CheckCircle className={styles.resultIcon} />
                        <h3 className={styles.resultTitle}>Synthesis Complete</h3>
                        <p className={styles.resultSubtitle}>Generated by: <span className={styles.highlight}>{jobResult.voiceName}</span></p>
                    </div>
                    
                    <div className={styles.resultContent}>
                        <div className={styles.audioPreview}>
                            <Headphones className={styles.audioIcon} />
                            <p>Audio Preview</p>
                            <audio controls src={jobResult.fileUrl} className={styles.htmlAudioPlayer}></audio>
                        </div>
                        
                        <div className={styles.resultActions}>
                            <a 
                                href={jobResult.fileUrl} 
                                download={jobResult.fileName} 
                                className={styles.downloadButton}
                            >
                                Download MP3
                            </a>
                            <button onClick={reset} className={styles.resetButton}>
                                Start New Synthesis
                            </button>
                        </div>
                    </div>

                    <div className={styles.sourceTextPreview}>
                        <h4 className={styles.previewTitle}>Source Text</h4>
                        <p className={styles.previewText}>{textInput}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <AppShell>
            <div className={styles.pageContainer}>
                <header className={styles.header}>
                    <Link to="/voice" className={styles.backLink}>
                        <ArrowLeft className={styles.iconSmall} /> Back to Voice Hub
                    </Link>
                    <h1 className={styles.mainTitle}>Text-to-Voice Synthesis</h1>
                    <p className={styles.subtitleText}>
                        Transform any text into highly realistic human speech using edge neural models.
                    </p>
                </header>
                
                <div className={styles.contentArea}>
                    {jobStatus === 'input' && renderInputArea()}
                    {(jobStatus === 'processing' || jobStatus === 'completed') && (
                         <div className={styles.mainResultArea}>
                             {jobStatus === 'processing' && renderProcessingArea()}
                             {jobStatus === 'completed' && renderResultArea()}
                         </div>
                    )}
                </div>
                
                <div className={styles.footerCardsContainer}>
                    <h3 className={styles.footerCardsTitle}>Upcoming VoiceLab Features</h3>
                    <div className={styles.cardsGrid}>
                        <div className={styles.infoCard} style={{ animationDelay: '0s' }}>
                            <UsersIcon className={styles.infoCardIcon} />
                            <h4>More Voice Actors</h4>
                            <p>We are continuously training new models to bring a diverse range of regional and stylized actors.</p>
                        </div>
                        <div className={styles.infoCard} style={{ animationDelay: '0.1s' }}>
                            <SlidersIcon className={styles.infoCardIcon} />
                            <h4>Advanced Emotion Controls</h4>
                            <p>Fine-tune pitch, pace, and speaking inflection to fit your exact audio requirements.</p>
                        </div>
                        <div className={styles.infoCard} style={{ animationDelay: '0.2s' }}>
                            <GlobeIcon className={styles.infoCardIcon} />
                            <h4>Multilingual Support</h4>
                            <p>Support for global and regional languages including Spanish, French, German, and Urdu.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}