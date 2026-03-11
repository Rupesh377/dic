'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xs">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-9 bg-background/50 border-blue-500/20"
          disabled={status === 'loading'}
          aria-label="Email for newsletter"
        />
      </div>
      <Button type="submit" size="sm" disabled={status === 'loading'} className="shrink-0">
        {status === 'loading' ? '...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
      </Button>
    </form>
  )
}
