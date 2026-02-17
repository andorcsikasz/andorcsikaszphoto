'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          'flex min-h-16 w-full rounded-lg border px-3 py-2 text-base transition-colors outline-none placeholder:opacity-70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-primary)]',
          className
        )}
        style={{
          backgroundColor: 'var(--bg-input)',
          color: 'var(--text-primary)',
          borderColor: 'var(--border-primary)',
        }}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
