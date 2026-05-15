import { DM_Mono } from 'next/font/google'
import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'

const dmMono = DM_Mono({ weight: ['400', '500'], subsets: ['latin'] })

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[13px] font-light text-[#3c3c38] leading-[1.65] mb-[0.5em] last:mb-0">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

export interface Entry {
  dateRange: string
  title: string
  companyDescription?: string
  subtitle: string
  description: unknown[]
}

interface EntryListProps {
  label: string
  entries: Entry[]
}

export default function EntryList({ label, entries }: EntryListProps) {
  return (
    <div>
      <p className={`${dmMono.className} text-[11px] font-medium tracking-[0.14em] uppercase text-[#6a6a62] mb-5`}>
        {label}
      </p>

      <div>
        {entries.map((entry, i) => (
          <div
            key={i}
            className="grid grid-cols-[130px_1fr] gap-x-6 py-4 border-t border-t-[0.5px] border-t-[#dedad4] last:border-b last:border-b-[0.5px] last:border-b-[#dedad4]"
          >
            <span className={`${dmMono.className} text-[11px] text-[#6a6a62] font-normal tracking-[0.04em] pt-[2px]`}>
              {entry.dateRange}
            </span>

            <div>
              <div className="flex items-baseline gap-2 mb-[3px]">
                <p className="text-[16px] font-medium text-[#1c1c1a]">
                  {entry.title}
                </p>
                {entry.companyDescription && (
                  <p className="text-[13px] font-light text-[#3c3c38]">
                    {entry.companyDescription}
                  </p>
                )}
              </div>
              <p className={`${dmMono.className} text-[13px] font-normal text-[#6a6a62] tracking-[0.03em] mb-[5px]`}>
                {entry.subtitle}
              </p>
              <div>
                <PortableText value={entry.description as any} components={portableTextComponents} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
