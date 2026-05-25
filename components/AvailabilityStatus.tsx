'use client'

import { CheckCircle } from 'lucide-react'

export function AvailabilityStatus() {
  const status = {
    available: true,
    currentProject: 'RevStar Consulting & RevHero'
  }

  return (
    <div className="fixed bottom-20 left-6 z-30">
      <div className="bg-card border border-border rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
        <div className="relative">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <span className="text-sm font-medium">Available for Projects</span>
      </div>
    </div>
  )
}