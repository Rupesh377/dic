'use client'

import type React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { PageLoadingAnimation } from '@/components/PageLoadingAnimation'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'
import ClickSpark from '@/components/ui/ClickSpark'

type Props = {
  children: React.ReactNode
}

export function RootClientShell({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <PageLoadingAnimation />
      <ScrollProgress />
      <ClickSpark sparkColor="#38bdf8" sparkSize={10} sparkRadius={18} sparkCount={10} duration={420}>
        {children}
        <BackToTop />
      </ClickSpark>
    </ThemeProvider>
  )
}

