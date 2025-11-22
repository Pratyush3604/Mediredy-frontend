import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';

const AIDoctor = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;  
      recognition.interimResults = true;  
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          handleVoiceMessage(transcript);
          setTranscript('');
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech error:', event.error);
        if (event.error === 'no-speech') {
          console.log('No speech detected, still listening...');
        } else if (event.error === 'aborted') {
          setIsListening(false);
        } else {
          setIsListening(false);
          setTimeout(() => {
            if (isListening) startListening();
          }, 1000);
        }
      };
      
      recognition.onend = () => {
        console.log('Recognition ended');
        if (isListening) {
          console.log('Restarting recognition...');
          try {
            recognition.start();
          } catch (e) {
            console.error('Error restarting:', e);
            setIsListening(false);
          }
        }
      };
      
      recognitionRef.current = recognition;
    }

    // Start camera automatically
    startCamera();
  }, []);

  // Add message to chat
  const addMessageToChat = (role, content) => {
    setChatHistory(prev => [...prev, { role, content }]);
  };

  // Start listening
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        console.log('Started listening');
      } catch (e) {
        console.error('Recognition start error:', e);
        if (e.message && e.message.includes('already started')) setIsListening(true);
      }
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        setIsListening(false);
        recognitionRef.current.stop();
        console.log('Stopped listening');
      } catch (e) {
        console.error('Recognition stop error:', e);
        setIsListening(false);
      }
    }
  };

  // Handle voice message
  const handleVoiceMessage = async (text) => {
    if (!text.trim()) return;
    
    addMessageToChat('user', text);
    
    try {
      const history = chatHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));
      
      const response = await api.post('/api/chat', {
        message: text,
        history: history
      });
      
      const aiResponse = response.data.response;
      const audioBase64 = response.data.audio;
      
      addMessageToChat('assistant', aiResponse);
      
      if (audioBase64) {
        playAudio(audioBase64);
      } else {
        speakText(aiResponse, 8000); // max 8s
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessageToChat('assistant', 'I apologize, I encountered an error. Please try again.');
    }
  };

// Text to speech with max duration
const speakText = async (text, maxDuration = 30000) => { // 30 seconds
  try {
    const response = await api.post('/api/voice/text-to-speech', { text });
    if (response.data.audio) {
      playAudio(response.data.audio);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.5;

      const timeoutId = setTimeout(() => {
        window.speechSynthesis.cancel();
      }, maxDuration);

      utterance.onend = () => clearTimeout(timeoutId);
      window.speechSynthesis.speak(utterance);
    }
  } catch {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.5;

    const timeoutId = setTimeout(() => {
      window.speechSynthesis.cancel();
    }, maxDuration);

    utterance.onend = () => clearTimeout(timeoutId);
    window.speechSynthesis.speak(utterance);
  }
};


  // Play audio
  const playAudio = (base64Audio) => {
    const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audio.play().catch(e => console.error('Audio play error:', e));
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera error:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  // Capture image
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    
    return imageData;
  };

  // Analyze injury
  const analyzeInjury = async () => {
    const imageData = captureImage();
    if (!imageData) return;
    
    stopListening();
    setIsAnalyzing(true);
    
    try {
      const blob = await fetch(imageData).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob, 'injury.jpg');
      
      const response = await api.post('/api/injury-detection', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const analysis = response.data.analysis;
      addMessageToChat('assistant', `🔍 Injury Analysis:\n\n${analysis}`);
      await speakText("I've analyzed the image. " + analysis.substring(0, 200), 8000);
      startListening();
    } catch (error) {
      console.error('Injury analysis error:', error);
      addMessageToChat('assistant', '❌ Failed to analyze injury.');
      alert('Failed to analyze injury.');
      startListening();
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Analyze report (capture)
  const analyzeReport = async () => {
    const imageData = captureImage();
    if (!imageData) return;
    
    stopListening();
    setIsAnalyzing(true);
    
    try {
      const blob = await fetch(imageData).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob, 'report.jpg');
      
      const response = await api.post('/api/report-analysis', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const analysis = response.data.analysis;
      addMessageToChat('assistant', `📋 Report Analysis:\n\n${analysis}`);
      await speakText("I've analyzed the report. " + analysis.substring(0, 200), 8000);
      startListening();
    } catch (error) {
      console.error('Report analysis error:', error);
      addMessageToChat('assistant', '❌ Failed to analyze report.');
      alert('Failed to analyze report.');
      startListening();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🏥 AI Doctor Consultation</h1>
      <p className="page-subtitle">Voice-powered medical consultation with real-time image analysis</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* Video Feed Column */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>📹 Live Camera</h2>
            {isListening && (
              <span style={{ 
                marginLeft: '1rem', 
                color: '#10b981', 
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ 
                  animation: 'pulse 2s ease-in-out infinite',
                  marginRight: '0.5rem'
                }}>●</span>
                Listening...
              </span>
            )}
          </div>
          
          {/* Video Container */}
          <div style={{ 
            position: 'relative',
            background: '#000',
            borderRadius: '8px',
            overflow: 'hidden',
            height: '400px'
          }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '3px solid white',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
              />
            )}
            
            {isAnalyzing && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px'
              }}>
                <div className="spinner" style={{ margin: '0 auto 0.5rem', width: '30px', height: '30px' }}></div>
                Analyzing...
              </div>
            )}
          </div>

          {/* Buttons in 1 line */}
          <div style={{ 
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={isListening ? stopListening : startListening}
              className={`btn ${isListening ? 'btn-danger' : 'btn-primary'}`}
              style={{ fontSize: '0.9rem', padding: '0.75rem', flex: 1 }}
            >
              {isListening ? '🔴 Stop' : '🎤 Start'}
            </button>
            
            <button
              onClick={analyzeInjury}
              disabled={isAnalyzing}
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.75rem', flex: 1 }}
            >
              📸 Capture Injury
            </button>
            
            <button
              onClick={analyzeReport}
              disabled={isAnalyzing}
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.75rem', flex: 1 }}
            >
              📋 Capture Report Image
            </button>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#f3f4f6', 
              borderRadius: '8px'
            }}>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.5rem' }}>
                You're saying:
              </p>
              <p style={{ margin: 0, color: '#111827' }}>{transcript}</p>
            </div>
          )}
        </div>

        {/* Chat Column */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          height: '600px'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>💬 Conversation</h2>
          
          {/* Chat Messages */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            marginBottom: '1rem',
            padding: '0.5rem'
          }}>
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '1rem'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: msg.role === 'user' ? '#4f46e5' : '#f3f4f6',
                    color: msg.role === 'user' ? 'white' : '#111827',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDoctor;
