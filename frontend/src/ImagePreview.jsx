import styles from './ImagePreview.module.css'

function ImagePreview({ image, isEnglish }) {
  if (!image) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEnglish ? 'Image Preview' : 'प्रतिमा पूर्वावलोकन'}
      </h2>
      <img
        src={URL.createObjectURL(image)}
        alt={isEnglish ? 'Preview' : 'पूर्वावलोकन'}
        className={styles.image}
      />
    </div>
  )
}

export default ImagePreview 