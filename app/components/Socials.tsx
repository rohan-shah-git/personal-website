import { DM_Mono } from 'next/font/google'

const dmMono = DM_Mono({ weight: '500', subsets: ['latin'] })

interface SocialsProps {
  email: string
  linkedin: string
  github: string
}

export default function Socials({ email, linkedin, github }: SocialsProps) {
  const links = [
    { label: 'email', href: `mailto:${email}` },
    { label: 'linkedin', href: linkedin },
    { label: 'github', href: github },
  ]

  return (
    <div className="flex gap-6 border-t border-t-[0.5px] border-t-[#d8d6d0] pt-6">
      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target={label !== 'email' ? '_blank' : undefined}
          rel={label !== 'email' ? 'noopener noreferrer' : undefined}
          className={`${dmMono.className} text-[11px] font-medium text-[#1c1c1a] no-underline tracking-[0.05em] hover:opacity-60`}
        >
          {label}
        </a>
      ))}
    </div>
  )
}
