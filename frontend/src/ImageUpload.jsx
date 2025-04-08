import { useState, useRef } from 'react'
import styles from './ImageUpload.module.css'

function ImageUpload({ onImageSelect, isEnglish }) {
  const [isDragging, setIsDragging] = useState(false)
  const dropRef = useRef(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Only set dragging to false if we're leaving the drop zone itself
    // not its children
    if (e.target === dropRef.current) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      validateAndProcessFile(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      validateAndProcessFile(files[0])
    }
  }

  const validateAndProcessFile = (file) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    onImageSelect(file)
  }

  const handleClick = () => {
    // Trigger the hidden file input when the drop zone is clicked
    document.getElementById('fileInput').click()
  }

  return (
    <div
      ref={dropRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
    >
      <input
        type="file"
        id="fileInput"
        onChange={handleFileInput}
        accept="image/*"
        className={styles.fileInput}
      />
      <div>
        <div className={styles.icon}>📷</div>
        <p className={styles.mainText}>
          {isDragging 
            ? (isEnglish ? 'Drop your image here' : 'येथे प्रतिमा ड्रॉप करा')
            : (isEnglish 
                ? 'Drag and drop an image here, or click to select'
                : 'येथे प्रतिमा ड्रॅग आणि ड्रॉप करा किंवा निवडण्यासाठी क्लिक करा')
          }
        </p>
        <p className={styles.supportText}>
          {isEnglish ? 'Supports: JPG, PNG, GIF' : 'समर्थित: JPG, PNG, GIF'}
        </p>
      </div>
    </div>
  )
}

export default ImageUpload