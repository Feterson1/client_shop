import Accordion from '@/components/elements/Accordion/Accordion'
import { $mode } from '@/context/mode'
import styles from '@/styles/Part/index.module.scss'
import { IPartAccordionProps } from '@/types/part'
import { useStore } from 'effector-react'

const PartAccordion = ({ children, title }: IPartAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ``
  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(
      `.${styles.part__accordion__title}`
    )
    accordionTitles.forEach((title) => {
      const item = title as HTMLElement
      if (!expanded) {
        item.style.borderBottomLeftRadius = '0'
        item.style.borderBottomRightRadius = '0'
      } else {
        item.style.borderBottomLeftRadius = '4px'
        item.style.borderBottomRightRadius = '4px'
      }
    })
  }

  return (
    <Accordion
      title={title}
      titleClass={`${styles.part__accordion__title} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      boxShadowStyles="0px 2px 8px rgba(0,0,0,0.1)"
      callBack={handleExpandAccordion}
    >
      {children}
    </Accordion>
  )
}

export default PartAccordion
