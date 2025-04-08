import styles from './PredictionResult.module.css'
import diseaseSolutionsData from './data/plant_diseases_bilingual.json'

function PredictionResult({ prediction, isLoading, error, isEnglish }) {
  const translations = {
    loading: {
      en: 'Processing image...',
      mr: 'प्रतिमा प्रक्रिया करत आहे...'
    },
    error: {
      en: 'Error:',
      mr: 'त्रुटी:'
    },
    placeholder: {
      en: 'Upload an image and click "Classify Image" to get the prediction result',
      mr: 'अंदाज परिणाम मिळविण्यासाठी प्रतिमा अपलोड करा आणि "प्रतिमा वर्गीकृत करा" वर क्लिक करा'
    },
    analysisResult: {
      en: 'Analysis Result',
      mr: 'विश्लेषण परिणाम'
    },
    condition: {
      en: 'Condition:',
      mr: 'स्थिती:'
    },
    confidence: {
      en: 'Confidence:',
      mr: 'आत्मविश्वास:'
    },
    description: {
      en: 'Description',
      mr: 'वर्णन'
    },
    recommendedSolutions: {
      en: 'Recommended Solutions',
      mr: 'शिफारस केलेले उपाय'
    },
    noInfo: {
      en: 'No specific information available for this condition.',
      mr: 'या स्थितीसाठी विशिष्ट माहिती उपलब्ध नाही.'
    },
    consultExpert: {
      en: 'Consult with a local agricultural expert for specific advice.',
      mr: 'विशिष्ट सल्ल्यासाठी स्थानिक कृषी तज्ञांचा सल्ला घ्या.'
    }
  }

  const diseaseNames = {
    'Pepper__bell___Bacterial_spot': {
      en: 'Bell Pepper Bacterial Spot',
      mr: 'शिमला मिरची बॅक्टेरियल स्पॉट'
    },
    'Pepper__bell___healthy': {
      en: 'Bell Pepper Healthy',
      mr: 'निरोगी शिमला मिरची'
    },
    'Potato___Early_blight': {
      en: 'Potato Early Blight',
      mr: 'बटाटा अर्ली ब्लाइट'
    },
    'Potato___Late_blight': {
      en: 'Potato Late Blight',
      mr: 'बटाटा लेट ब्लाइट'
    },
    'Potato___healthy': {
      en: 'Potato Healthy',
      mr: 'निरोगी बटाटा'
    },
    'Tomato_Bacterial_spot': {
      en: 'Tomato Bacterial Spot',
      mr: 'टोमॅटो बॅक्टेरियल स्पॉट'
    },
    'Tomato_Early_blight': {
      en: 'Tomato Early Blight',
      mr: 'टोमॅटो अर्ली ब्लाइट'
    },
    'Tomato_Late_blight': {
      en: 'Tomato Late Blight',
      mr: 'टोमॅटो लेट ब्लाइट'
    },
    'Tomato_Leaf_Mold': {
      en: 'Tomato Leaf Mold',
      mr: 'टोमॅटो लीफ मोल्ड'
    },
    'Tomato_Septoria_leaf_spot': {
      en: 'Tomato Septoria Leaf Spot',
      mr: 'टोमॅटो सेप्टोरिया लीफ स्पॉट'
    },
    'Tomato_Spider_mites_Two_spotted_spider_mite': {
      en: 'Tomato Two Spotted Spider Mite',
      mr: 'टोमॅटो टू स्पॉटेड स्पायडर माइट'
    },
    'Tomato__Target_Spot': {
      en: 'Tomato Target Spot',
      mr: 'टोमॅटो टारगेट स्पॉट'
    },
    'Tomato__Tomato_YellowLeaf__Curl_Virus': {
      en: 'Tomato Yellow Leaf Curl Virus',
      mr: 'टोमॅटो पिवळे पान कुरतडणे विषाणू'
    },
    'Tomato__Tomato_mosaic_virus': {
      en: 'Tomato Mosaic Virus',
      mr: 'टोमॅटो मोझेक विषाणू'
    },
    'Tomato_healthy': {
      en: 'Tomato Healthy',
      mr: 'निरोगी टोमॅटो'
    }
  }

  const getTranslation = (key) => {
    return isEnglish ? translations[key].en : translations[key].mr
  }

  const getDiseaseName = (diseaseClass) => {
    const disease = diseaseNames[diseaseClass] || {
      en: formatDiseaseName(diseaseClass),
      mr: formatDiseaseName(diseaseClass)
    }
    return isEnglish ? disease.en : disease.mr
  }

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.7) return '#4CAF50'  // Green for high confidence
    if (confidence > 0.4) return '#FFC107'  // Yellow for medium confidence
    return '#F44336'  // Red for low confidence
  }

  const formatConfidence = (confidence) => {
    return (confidence * 100).toFixed(2) + '%'
  }

  const formatDiseaseName = (name) => {
    return name.split('__').join(' ').replace(/_/g, ' ')
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          {getTranslation('loading')}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.result} style={{backgroundColor: '#2c1c1c'}}>
          <span style={{color: '#ff4444'}}>{getTranslation('error')} {error}</span>
        </div>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          {getTranslation('placeholder')}
        </div>
      </div>
    )
  }

  const diseaseInfo = diseaseSolutionsData[prediction.class] || {
    description: {
      en: getTranslation('noInfo'),
      mr: getTranslation('noInfo')
    },
    solutions: {
      en: [getTranslation('consultExpert')],
      mr: [getTranslation('consultExpert')]
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        <h2 className={styles.title}>{getTranslation('analysisResult')}</h2>
        <div className={styles.section}>
          <div className={styles.diseaseInfo}>
            <span className={styles.label}>{getTranslation('condition')}</span>
            <span className={styles.value}>{getDiseaseName(prediction.class)}</span>
          </div>
          <div className={styles.confidenceInfo}>
            <span className={styles.label}>{getTranslation('confidence')}</span>
            <span className={styles.value} style={{color: getConfidenceColor(prediction.confidence)}}>
              {formatConfidence(prediction.confidence)}
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.subtitle}>{getTranslation('description')}</h3>
          <p className={styles.description}>
            {isEnglish ? diseaseInfo.description.en : diseaseInfo.description.mr}
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.subtitle}>{getTranslation('recommendedSolutions')}</h3>
          <ul className={styles.solutionsList}>
            {(isEnglish ? diseaseInfo.solutions.en : diseaseInfo.solutions.mr).map((solution, index) => (
              <li key={index} className={styles.solutionItem}>{solution}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Add the keyframes for the spinner animation
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
document.head.appendChild(styleSheet)

export default PredictionResult 