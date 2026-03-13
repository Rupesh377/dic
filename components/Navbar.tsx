'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/clubs', label: 'Clubs' },
    { href: '/members', label: 'Members' },
    { href: '/projects', label: 'Projects' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/activities', label: 'Activities' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/resources', label: 'Resources' },
    { href: '/collaborate', label: 'Collaborate' },
    { href: '/certificates', label: 'Certificates' },
    { href: '/help', label: 'Help' },
    { href: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setIsMoreOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside as any)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside as any)
    }
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-background/90 backdrop-blur-lg border-b border-blue-500/30 shadow-lg'
        : 'bg-background/60 backdrop-blur-sm border-b border-blue-500/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - click goes to loading page then home */}
          <Link href="/loading" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/dic-logo.png"
                alt="DIC Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-primary">DIC</div>
              <div className="text-xs text-muted-foreground">Development And Innovation Centre</div>
            </div>
          </Link>

          {/* Desktop / Tablet Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.slice(0, 8).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-all duration-200 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            {navLinks.length > 8 && (
              <div className="relative group" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen((prev) => !prev)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-all duration-200"
                >
                  More {isMoreOpen ? '▲' : '▼'}
                </button>
                <div className={`absolute right-0 mt-0 w-48 bg-card/95 backdrop-blur border border-blue-500/20 rounded-lg shadow-lg transition-all duration-200 ${isMoreOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                  }`}>
                  {navLinks.slice(8).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 first:rounded-t-lg last:rounded-b-lg transition-all"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <Link
              href="/contact"
              className="ml-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
            >
              Join
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-all duration-200 hover:scale-110"
            >
              {isOpen ? (
                <X size={24} className="text-primary animate-spin" style={{ animationDuration: '0.3s' }} />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (phones only) */}
        {isOpen && (
          <div className="fixed left-0 right-0 top-16 md:hidden bg-card/95 backdrop-blur border-b border-blue-500/20 pb-4 animate-in fade-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-64px)] overflow-y-auto z-40">
            <div className="px-4 space-y-2">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-muted-foreground hover:bg-secondary/50 hover:text-primary rounded-lg transition-all duration-200 text-sm font-medium border border-blue-500/10 hover:border-blue-500/30"
                  style={{ animationDelay: `${idx * 30}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

