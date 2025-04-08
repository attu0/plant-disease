import React, { useState } from 'react';
import styles from './Toggle.module.css';

const Toggle = ({ onLanguageChange }) => {
  const [isEnglish, setIsEnglish] = useState(true);

  const handleToggle = () => {
    setIsEnglish(!isEnglish);
    onLanguageChange(!isEnglish);
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        className={`${styles.toggleButton} ${isEnglish ? styles.active : ''}`}
        onClick={handleToggle}
      >
        <span className={styles.languageText}>{isEnglish ? 'EN' : 'मराठी'}</span>
      </button>
    </div>
  );
};

export default Toggle; 