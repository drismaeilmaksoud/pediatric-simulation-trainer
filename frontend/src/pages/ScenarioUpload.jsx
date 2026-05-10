import { useState } from 'react';
import api from '../utils/api';
import '../styles/ScenarioUpload.css';

function ScenarioUpload() {
  const [formData, setFormData] = useState({
    title: '',
    specialty: '',
    difficultyLevel: 'beginner',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [uploadedScenarios, setUploadedScenarios] = useState([]);

  const specialties = [
    'General Pediatrics',
    'Pediatric Emergency Medicine',
    'Neonatology',
    'Pediatric ICU',
    'Pediatric Surgery',
    'Pediatric Cardiology',
    'Other'
  ];

  const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/json', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage({ type: 'error', text: 'Only JSON and PDF files are allowed' });
        setFile(null);
        return;
      }
      // Validate file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 50MB' });
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setMessage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file' });
      return;
    }

    setLoading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('title', formData.title);
    uploadFormData.append('specialty', formData.specialty);
    uploadFormData.append('difficultyLevel', formData.difficultyLevel);
    uploadFormData.append('description', formData.description);
    uploadFormData.append('file', file);

    try {
      const response = await api.post('/scenarios', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: 'Scenario uploaded successfully!' });
      setFormData({
        title: '',
        specialty: '',
        difficultyLevel: 'beginner',
        description: '',
      });
      setFile(null);
      
      // Add to uploaded scenarios list
      setUploadedScenarios(prev => [response.data, ...prev]);
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to upload scenario'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>📤 Upload Clinical Scenario</h1>
      <p>Upload new pediatric clinical cases for resident training</p>

      <div className="upload-container">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Case Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Fever and Rash in a 3-year-old"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="specialty">Specialty *</label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                required
              >
                <option value="">Select specialty...</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficultyLevel">Difficulty Level *</label>
              <select
                id="difficultyLevel"
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleInputChange}
              >
                {difficultyLevels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the clinical scenario, learning objectives, and key decision points..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">Scenario File (JSON or PDF) *</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept=".json,.pdf"
                required
              />
              <span className="file-name">
                {file ? file.name : 'Choose file or drag and drop'}
              </span>
            </div>
            <p className="file-hint">Supported formats: JSON, PDF (Max 50MB)</p>
          </div>

          {message && (
            <div className={`message message-${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Scenario'}
          </button>
        </form>

        <div className="scenario-info">
          <h3>📋 Expected JSON Structure</h3>
          <pre>{`{
  "title": "Case Title",
  "initialPresentation": "Patient presentation",
  "nodes": [
    {
      "id": "node1",
      "type": "decision",
      "question": "What is your diagnosis?",
      "options": [
        {
          "text": "Option A",
          "correct": true,
          "feedback": "Correct! This is...",
          "nextNode": "node2"
        }
      ]
    }
  ]
}`}</pre>
        </div>
      </div>

      {uploadedScenarios.length > 0 && (
        <div className="uploaded-scenarios">
          <h2>Recent Uploads</h2>
          <div className="scenarios-list">
            {uploadedScenarios.map(scenario => (
              <div key={scenario.id} className="scenario-card">
                <h4>{scenario.title}</h4>
                <p><strong>Specialty:</strong> {scenario.specialty}</p>
                <p><strong>Difficulty:</strong> {scenario.difficultyLevel}</p>
                <p><strong>Uploaded:</strong> {new Date(scenario.uploadedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScenarioUpload;
