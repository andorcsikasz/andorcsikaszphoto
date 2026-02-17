'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Redirects to main app - AI Chat is now integrated into the main GatherGo nav.
 */
export default function DemoAIPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/?tab=ai')
  }, [router])
  return null
}
