"use client"

import { useEffect, useState } from "react"
import { PopupModal } from "react-calendly"

interface CalendlyWidgetProps {
  isOpen: boolean
  onClose: () => void
  url?: string
}

export function CalendlyWidget({ isOpen, onClose, url }: CalendlyWidgetProps) {
  const calendlyUrl = url || "https://calendly.com/hopewell-mumboleads/30min"
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <PopupModal
      url={calendlyUrl}
      onModalClose={onClose}
      open={isOpen}
      rootElement={document.body}
      pageSettings={{
        backgroundColor: 'ffffff',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: '7bca52',
        textColor: '4d5055'
      }}
    />
  )
}
