'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'text-white [background:var(--btn-primary-bg)] hover:[background:var(--btn-primary-hover)] focus-visible:ring-[var(--accent-primary)]',
        destructive:
          'bg-[var(--error-bg)] text-[var(--error-text)] hover:opacity-90 focus-visible:ring-[var(--error-text)]',
        outline:
          'border bg-transparent hover:bg-[var(--bg-hover)] focus-visible:ring-[var(--accent-primary)]',
        secondary:
          'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] focus-visible:ring-[var(--accent-primary)]',
        ghost:
          'hover:bg-[var(--bg-hover)] focus-visible:ring-[var(--accent-primary)]',
        link:
          'text-[var(--text-link)] underline-offset-4 hover:underline focus-visible:ring-[var(--text-link)]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-lg px-6',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        data-slot="button"
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
