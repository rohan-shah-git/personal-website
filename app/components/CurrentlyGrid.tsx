import { DM_Mono, Lora } from 'next/font/google'

const dmMono = DM_Mono({ weight: '500', subsets: ['latin'] })
const lora = Lora({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'] })

interface CurrentlyItem {
  category: string
  value: string
  url?: string
}

interface CurrentlyGridProps {
  filmMode: boolean
  items: CurrentlyItem[]
}

export default function CurrentlyGrid({ filmMode: _, items }: CurrentlyGridProps) {
  return (
    <div className="border-t border-t-[#d8d6d0] border-t-[0.5px] pt-6 mb-10">
      <p className={`${dmMono.className} text-[11px] font-medium tracking-[0.14em] uppercase text-[#6a6a62] mb-4`}>
        currently
      </p>

      <div className="grid grid-cols-3 gap-y-4 gap-x-10">
        {items.map(({ category, value, url }) => (
          <div key={category} className="flex flex-col gap-[3px]">
            <span className={`${dmMono.className} text-[11px] font-medium tracking-[0.1em] uppercase text-[#888880]`}>
              {category}
            </span>
            <span className={`${lora.className} text-[13px] text-[#1c1c1a] italic leading-[1.4]`}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black border-b border-[#c8c6be] no-underline italic hover:border-black"
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
