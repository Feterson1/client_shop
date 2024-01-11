import { useStore } from 'effector-react'
import { $boilerPart } from '@/context/boilerPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useState } from 'react'
import PartImagesItem from './PartImagesItem'
import styles from '@/styles/Part/index.module.scss'

const PartImagesList = () => {
  const boilerPart = useStore($boilerPart)
  const isMobile = useMediaQuery(850)
  const images = boilerPart.images
    ? (JSON.parse(boilerPart.images) as string[])
    : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')
  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <div />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={boilerPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, id) => (
              <PartImagesItem
                callBack={setCurrentImgSrc}
                key={id}
                alt={`image-${id + 1}`}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
