'use client'

import { useLayoutEffect, useRef } from 'react'

interface FitTextProps {
  children: string
  maxSize?: number
  minSize?: number
  className?: string
}

export default function FitText({ children, maxSize = 22, minSize = 10, className = '' }: FitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let s = maxSize
    el.style.fontSize = `${s}px`
    while (el.scrollWidth > el.offsetWidth && s > minSize) {
      s -= 0.5
      el.style.fontSize = `${s}px`
    }
  }, [children, maxSize, minSize])

  return (
    <span
      ref={ref}
      style={{ fontSize: `${maxSize}px` }}
      className={`block w-full whitespace-nowrap overflow-hidden ${className}`}
    >
      {children}
    </span>
  )
}
