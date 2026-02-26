'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|;:,.<>?'

interface EncryptedTextProps {
  text: string
  className?: string
  revealDelayMs?: number
  flipDelayMs?: number
  charset?: string
  encryptedClassName?: string
  revealedClassName?: string
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  flipDelayMs = 50,
  charset = DEFAULT_CHARSET,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const [displayedText, setDisplayedText] = useState<string[]>(() =>
    text.split('').map(() => charset[Math.floor(Math.random() * charset.length)])
  )
  const [revealedCount, setRevealedCount] = useState(0)

  useEffect(() => {
    setDisplayedText(text.split('').map(() => charset[Math.floor(Math.random() * charset.length)]))
    setRevealedCount(0)
  }, [text, charset])

  // Reveal characters one by one
  useEffect(() => {
    if (revealedCount >= text.length) return
    const t = setTimeout(() => setRevealedCount((c) => c + 1), revealDelayMs)
    return () => clearTimeout(t)
  }, [revealedCount, text.length, revealDelayMs])

  // Flip gibberish for unrevealed chars
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev.map((_, i) =>
          i < revealedCount ? text[i] : charset[Math.floor(Math.random() * charset.length)]
        )
      )
    }, flipDelayMs)
    return () => clearInterval(interval)
  }, [revealedCount, text, charset, flipDelayMs])

  return (
    <span className={cn('inline', className)}>
      {displayedText.map((char, i) => (
        <span
          key={i}
          className={i < revealedCount ? revealedClassName : encryptedClassName}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
