"use client"

import { PopupModal } from "react-calendly"

interface CalendlyWidgetProps {
  isOpen: boolean
  onClose: () => void
  url?: string
}

export function CalendlyWidget({ isOpen, onClose, url }: CalendlyWidgetProps) {
  const calendlyUrl = url || "https://calendly.com/hopewell-mumboleads/30min"

  if (typeof document === 'undefined') {
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
