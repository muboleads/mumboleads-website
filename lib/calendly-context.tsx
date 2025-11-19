"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { CalendlyWidget } from "@/components/booking/calendly-widget"

interface CalendlyContextType {
  openCalendly: () => void
  closeCalendly: () => void
  isCalendlyOpen: boolean
}

interface CalendlySettings {
  calendlyUrl?: string
}

const CalendlyContext = createContext<CalendlyContextType | undefined>(undefined)

export function CalendlyProvider({
  children,
  calendlySettings
}: {
  children: ReactNode
  calendlySettings?: CalendlySettings
}) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const openCalendly = () => setIsCalendlyOpen(true)
  const closeCalendly = () => setIsCalendlyOpen(false)

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly, isCalendlyOpen }}>
      {children}
      <CalendlyWidget
        isOpen={isCalendlyOpen}
        onClose={closeCalendly}
        url={calendlySettings?.calendlyUrl}
      />
    </CalendlyContext.Provider>
  )
}

export function useCalendly() {
  const context = useContext(CalendlyContext)
  if (context === undefined) {
    throw new Error("useCalendly must be used within a CalendlyProvider")
  }
  return context
}
