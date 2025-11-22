import React, { useState } from 'react';
import { detectInjury } from '../services/api';

const InjuryDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const analysis = await detectInjury(selectedFile);
      setResult(analysis);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze injury. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">🩹 Injury Detection</h1>
      <p className="page-subtitle">Upload an image of your injury for AI-powered assessment</p>

      <div className="file-upload" onClick={() => document.getElementById('injury-file').click()}>
        <input
          id="injury-file"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
        <p>Click to upload an image of the injury</p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Supports: JPG, PNG, GIF
        </p>
      </div>

      {preview && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>Preview:</h3>
          <img 
            src={preview} 
            alt="Injury preview" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '400px', 
              borderRadius: '10px',
              marginTop: '1rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }} 
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleAnalyze}
          disabled={loading || !selectedFile}
        >
          {loading ? 'Analyzing...' : 'Analyze Injury'}
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      {result && !loading && (
        <div className="result-box">
          <h3>Injury Analysis Results</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <strong>Detected Injuries:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
             {Array.isArray(result?.detected_injuries) && result.detected_injuries.map((injury, idx) => (
            <li key={idx}>{injury}</li>

              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <strong>Severity Level:</strong>
            <span style={{ 
              marginLeft: '1rem',
              padding: '0.25rem 1rem',
              background: result.severity === 'severe' ? '#dc3545' : 
                         result.severity === 'moderate' ? '#ffc107' : '#28a745',
              color: 'white',
              borderRadius: '20px',
              textTransform: 'capitalize'
            }}>
              {result.severity}
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <strong>Recommendations:</strong>
            <p style={{ marginTop: '0.5rem' }}>{result.recommendations}</p>
          </div>

          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
            <strong>Detailed Analysis:</strong>
            <div style={{ marginTop: '0.5rem' }}>{result.analysis}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InjuryDetection;
