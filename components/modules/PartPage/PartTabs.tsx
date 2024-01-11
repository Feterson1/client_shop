import { $boilerPart } from '@/context/boilerPart'
import { $mode } from '@/context/mode'
import styles from '@/styles/Part/index.module.scss'
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const PartTabs = () => {
  const mode = useStore($mode)
  const boilderPart = useStore($boilerPart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ``
  const [showDescription, setShowDescription] = useState(true)
  const [showCompatibility, setShowCompatibility] = useState(false)
  const handleShowDescription = () => {
    setShowDescription(true)
    setShowCompatibility(false)
  }
  const handleShowCompatibility = () => {
    setShowCompatibility(true)
    setShowDescription(false)
  }

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Описание
        </button>
        <button
          className={showCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}
        >
          Совместимость
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__contents}
        >
          <h3
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}
          >
            {boilderPart.name}
          </h3>
          <p
            className={`${styles.part__tabs__content__descrtiption} ${darkModeClass}`}
          >
            {boilderPart.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__contents}
        >
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {boilderPart.compatibility}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default PartTabs
