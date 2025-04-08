import { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import PredictionResult from './PredictionResult'
import Toggle from './components/Toggle'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEnglish, setIsEnglish] = useState(true)

  const handleLanguageChange = (isEnglish) => {
    setIsEnglish(isEnglish)
  }

  const handleImageSelect = (image) => {
    setSelectedImage(image)
    setPrediction(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedImage)

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to get prediction')
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <Toggle onLanguageChange={handleLanguageChange} />
      <h1>{isEnglish ? 'Plant Disease Classifier' : 'वनस्पती रोग वर्गीकरण'}</h1>
      <div className="main-content">
        <div className="left-panel">
          <ImageUpload onImageSelect={handleImageSelect} isEnglish={isEnglish} />
          <ImagePreview image={selectedImage} isEnglish={isEnglish} />
        </div>
        <div className="right-panel">
          <PredictionResult 
            prediction={prediction}
            isLoading={isLoading}
            error={error}
            isEnglish={isEnglish}
          />
          {selectedImage && (
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (isEnglish ? 'Processing...' : 'प्रक्रिया करत आहे...') : (isEnglish ? 'Classify Image' : 'प्रतिमा वर्गीकृत करा')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
