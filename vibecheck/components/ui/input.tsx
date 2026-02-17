'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          'h-9 w-full min-w-0 rounded-lg border px-3 py-2 text-base transition-colors outline-none placeholder:opacity-70 disabled:pointer-events-none disabled:opacity-50 md:text-sm',
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
Input.displayName = 'Input'

export { Input }
