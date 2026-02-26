'use client'

import { useState, useEffect } from 'react'

interface TypingEffectProps {
  text: string
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  pauseAfterType?: number
  pauseAfterDelete?: number
  cursorClassName?: string
}

export function TypingEffect({
  text,
  className = '',
  typeSpeed = 120,
  deleteSpeed = 80,
  pauseAfterType = 1500,
  pauseAfterDelete = 400,
  cursorClassName = '',
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed

    if (!isDeleting && displayed.length === text.length) {
      // Just finished typing — pause then start deleting
      const timer = setTimeout(() => setIsDeleting(true), pauseAfterType)
      return () => clearTimeout(timer)
    }

    if (isDeleting && displayed.length === 0) {
      // Just finished deleting — pause then start typing again
      const timer = setTimeout(() => setIsDeleting(false), pauseAfterDelete)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayed(text.slice(0, displayed.length - 1))
      } else {
        setDisplayed(text.slice(0, displayed.length + 1))
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayed, isDeleting, text, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete])

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-0.5 h-[0.9em] ml-0.5 align-middle bg-current animate-pulse ${cursorClassName}`}
        aria-hidden
      />
    </span>
  )
}
