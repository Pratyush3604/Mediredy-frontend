import React, { useState } from 'react';
import { analyzeReport } from '../services/api';

const ReportAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('');

  const reportTypes = [
    'Chest X-ray',
    'Abdominal X-ray',
    'Brain MRI',
    'Spinal MRI',
    'Knee X-ray',
    'Hand X-ray',
    'CT Scan',
    'Other Medical Report'
  ];

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
      alert('Please select a report first');
      return;
    }

    setLoading(true);
    try {
      const analysis = await analyzeReport(selectedFile);
      setResult(analysis);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setReportType('');
  };

  return (
    <div className="page-container">
      <h1 className="page-title">📋 Medical Report Analysis</h1>
      <p className="page-subtitle">Upload X-rays, MRIs, or other medical reports for AI analysis</p>

      <div className="form-group">
        <label>Report Type:</label>
        <select 
          value={reportType} 
          onChange={(e) => setReportType(e.target.value)}
          style={{ 
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        >
          <option value="">Select report type...</option>
          {reportTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="file-upload" onClick={() => document.getElementById('report-file').click()}>
        <input
          id="report-file"
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileSelect}
        />
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏥</div>
        <p>Click to upload your medical report</p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Supports: JPG, PNG, PDF
        </p>
      </div>

      {preview && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>Preview:</h3>
          <img 
            src={preview} 
            alt="Report preview" 
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
          {loading ? 'Analyzing...' : 'Analyze Report'}
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
          <h3>Report Analysis Results</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <strong>Report Type:</strong> {result.report_type}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <strong>File Name:</strong> {result.filename}
          </div>

          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
            <strong>Analysis:</strong>
            <div style={{ marginTop: '0.5rem' }}>{result.analysis}</div>
          </div>

          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: '#fff3cd',
            borderRadius: '8px',
            borderLeft: '4px solid #ffc107'
          }}>
            <strong>⚠️ {result.disclaimer}</strong>
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: '#e7f3ff',
        borderRadius: '10px'
      }}>
        <h4 style={{ color: '#0056b3', marginBottom: '0.5rem' }}>💡 Supported Report Types</h4>
        <ul style={{ paddingLeft: '1.5rem', color: '#0056b3' }}>
          <li>X-rays (Chest, Abdominal, Skeletal)</li>
          <li>MRI Scans (Brain, Spinal, Joint)</li>
          <li>CT Scans</li>
          <li>Ultrasound Reports</li>
          <li>Lab Test Results</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportAnalysis;
