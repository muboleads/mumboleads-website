"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface CalModalProps {
  isOpen: boolean
  onClose: () => void
  calSettings?: {
    calLink?: string
    layout?: string
  }
}

export function CalModal({ isOpen, onClose, calSettings }: CalModalProps) {
  // Use settings from Sanity or fallback to defaults
  const calLink = calSettings?.calLink || "your-cal-username/consultation"
  const layout = calSettings?.layout || "month_view"

  // Normalize the Cal link (remove https://cal.com/ if present)
  const normalizedCalLink = calLink.replace(/^https?:\/\/(www\.)?cal\.com\//, '')
  const fullCalUrl = `https://cal.com/${normalizedCalLink}`
  useEffect(() => {
    if (isOpen) {
      // Load Cal.com embed script
      const script = document.createElement("script")
      script.src = "https://app.cal.com/embed/embed.js"
      script.async = true
      document.body.appendChild(script)

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"

      return () => {
        document.body.removeChild(script)
        document.body.style.overflow = "unset"
      }
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        {/* Cal.com embed */}
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          <div
            data-cal-link={normalizedCalLink}
            data-cal-config={`{"layout":"${layout}"}`}
            className="min-h-[600px]"
          >
            {/* Fallback content */}
            <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
              <h3 className="text-2xl font-bold mb-4">Book a Consultation</h3>
              <p className="text-gray-600 mb-6">
                Schedule a call with our team to discuss how we can help grow your business.
              </p>
              <a
                href={fullCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary-700 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-600 hover:shadow-xl"
              >
                Open Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
