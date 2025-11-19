"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { CalModal } from "@/components/booking/cal-modal"

interface CalContextType {
  openCalModal: () => void
  closeCalModal: () => void
  isCalModalOpen: boolean
}

interface CalSettings {
  calLink?: string
  layout?: string
}

const CalContext = createContext<CalContextType | undefined>(undefined)

export function CalProvider({
  children,
  calSettings
}: {
  children: ReactNode
  calSettings?: CalSettings
}) {
  const [isCalModalOpen, setIsCalModalOpen] = useState(false)

  const openCalModal = () => setIsCalModalOpen(true)
  const closeCalModal = () => setIsCalModalOpen(false)

  return (
    <CalContext.Provider value={{ openCalModal, closeCalModal, isCalModalOpen }}>
      {children}
      <CalModal
        isOpen={isCalModalOpen}
        onClose={closeCalModal}
        calSettings={calSettings}
      />
    </CalContext.Provider>
  )
}

export function useCalModal() {
  const context = useContext(CalContext)
  if (context === undefined) {
    throw new Error("useCalModal must be used within a CalProvider")
  }
  return context
}
