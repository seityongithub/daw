"use client"

import { useState, useEffect } from "react"

interface ClickToEnterProps {
  onEnter?: () => void
}

export function ClickToEnter({ onEnter }: ClickToEnterProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  const handleClick = () => {
    setIsFading(true)
    // Wait for fade animation to complete
    setTimeout(() => {
      setIsVisible(false)
      onEnter?.()
    }, 500)
  }

  // Handle keyboard enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleClick()
      }
    }
    
    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown)
    }
    
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center cursor-pointer transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClick}
    >
      <p className="text-white text-lg md:text-xl font-light tracking-wide animate-pulse">
        click to enter...
      </p>
    </div>
  )
}
