'use client'

import { useEffect, useRef, useState } from 'react'
import { Courier_Prime } from 'next/font/google'
import { PortableText } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'

const courierPrime = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'] })

interface BioProps {
  filmMode: boolean
  normalBio: PortableTextBlock[]
  scriptBio: PortableTextBlock[]
}

type BlockType = 'label' | 'slug' | 'action'

const CLASS: Record<BlockType, string> = {
  label:  'text-[10px] tracking-[0.18em] uppercase text-[#888880] mb-6',
  slug:   'text-[15px] font-bold text-[#1c1c1a] tracking-[0.04em] mb-4',
  action: 'text-[15px] leading-[1.85] text-[#2c2c28] mb-[1.1rem] last:mb-0',
}

// Converts a PortableText block to an HTML string for the typewriter.
// Block style: h1 → label, h2 → slug, normal → action.
function blockToHtml(block: PortableTextBlock): string {
  const b = block as { children?: Array<{ _type: string; text: string; marks?: string[] }> }
  return (b.children ?? [])
    .map(child => {
      if (child._type !== 'span') return ''
      let text = child.text
      if (child.marks?.includes('em')) text = `<em>${text}</em>`
      if (child.marks?.includes('strong')) text = `<strong>${text}</strong>`
      return text
    })
    .join('')
}

function blockType(block: PortableTextBlock): BlockType {
  const style = (block as { style?: string }).style ?? 'normal'
  if (style === 'h1') return 'label'
  if (style === 'h2') return 'slug'
  return 'action'
}

const normalBioComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[16px] leading-[1.85] text-[#2c2c28] font-light mb-[1.1rem]">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a
        href={value?.href}
        className="text-[#1c1c1a] border-b border-[#c8c6be] cursor-pointer hover:border-[#1c1c1a]"
      >
        {children}
      </a>
    ),
  },
}

export default function Bio({ filmMode, normalBio, scriptBio }: BioProps) {
  const scriptBlocks = scriptBio
    .filter(b => b._type === 'block')
    .map(b => ({ type: blockType(b), html: blockToHtml(b) }))

  const [revealed, setRevealed] = useState<string[]>(scriptBlocks.map(() => ''))
  const typewriterDone = useRef(false)

  // Reset typewriter state when scriptBio changes
  useEffect(() => {
    setRevealed(scriptBlocks.map(() => ''))
    typewriterDone.current = false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptBio])

  useEffect(() => {
    if (!filmMode || typewriterDone.current || scriptBlocks.length === 0) return
    typewriterDone.current = true

    let blockIdx = 0
    let charIdx = 0
    let timerId: ReturnType<typeof setTimeout>
    let active = true

    function tick() {
      if (!active || blockIdx >= scriptBlocks.length) return
      const { html } = scriptBlocks[blockIdx]

      if (charIdx <= html.length) {
        let cut = charIdx
        const sub = html.slice(0, cut)
        const openTags = (sub.match(/</g) || []).length
        const closeTags = (sub.match(/>/g) || []).length
        if (openTags > closeTags) cut = html.indexOf('>', cut) + 1

        const block = blockIdx
        const content = html.slice(0, cut)
        setRevealed(prev => { const n = [...prev]; n[block] = content; return n })
        charIdx++
        timerId = setTimeout(tick, 12)
      } else {
        const block = blockIdx
        const content = html
        setRevealed(prev => { const n = [...prev]; n[block] = content; return n })
        blockIdx++
        charIdx = 0
        timerId = setTimeout(tick, 80)
      }
    }

    tick()

    return () => {
      active = false
      clearTimeout(timerId)
      setRevealed(scriptBlocks.map(b => b.html))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filmMode, scriptBio])

  if (filmMode) {
    return (
      <div className={`${courierPrime.className} max-w-full mb-10`}>
        {scriptBlocks.map((block, i) => (
          <p
            key={i}
            className={CLASS[block.type]}
            dangerouslySetInnerHTML={{ __html: revealed[i] }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-full mb-10">
      <PortableText value={normalBio} components={normalBioComponents} />
    </div>
  )
}
