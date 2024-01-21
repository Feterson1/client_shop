import {
  removeClassNameForOverlayAndBody,
  toggleClassNameForOverlayAndBody,
} from '@/utils/common'
import { useEffect, useState } from 'react'

export const usePopup = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    window.scrollTo(0, 0)
    toggleClassNameForOverlayAndBody()
    setOpen(!open)
  }
  const ClosePopup = () => {
    removeClassNameForOverlayAndBody()
    setOpen(false)
  }

  useEffect(() => {
    const overlay = document.querySelector('.overlay')
    overlay?.addEventListener('click', ClosePopup)

    return () => overlay?.removeEventListener('click', ClosePopup)
  }, [open])

  return { toggleOpen, open, ClosePopup }
}
