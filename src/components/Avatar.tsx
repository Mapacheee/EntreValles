import { useId } from 'react'

import type { AvatarAppearance } from '../lib/journey'
export type { AvatarAppearance } from '../lib/journey'

type AvatarProps = {
  appearance: AvatarAppearance
  interests: string[]
  className?: string
  size?: number
  pathways?: string[]
}

const accessoryNames: Record<string, string> = {
  creative: 'libreta de ideas',
  build: 'insignia de herramientas',
  research: 'lupa',
  care: 'insignia de cuidado',
  nature: 'ramita de exploración',
  organize: 'mapa de viaje',
}

/** An original, layered vector character. Clothing choices never imply a career. */
export default function Avatar({ appearance, interests, className, size = 100, pathways = [] }: AvatarProps) {
  const titleId = useId()
  const accessories = interests.map((interest) => accessoryNames[interest]).filter(Boolean)

  return (
    <svg
      className={className}
      width={size}
      height={size * 1.36}
      viewBox="0 0 120 163"
      fill="none"
      role="img"
      aria-labelledby={titleId}
      style={{ maxWidth: '100%', height: 'auto', overflow: 'visible' }}
    >
      <title id={titleId}>
        {accessories.length ? `Tu personaje con ${accessories.join(', ')}` : 'Tu personaje, listo para explorar'}
        {`. Presentación ${appearance.presentation === 'feminine' ? 'femenina' : appearance.presentation === 'neutral' ? 'neutra' : 'masculina'}, cabello ${appearance.hairStyle === 'long' ? 'largo' : appearance.hairStyle === 'curly' ? 'rizado' : 'corto'}${appearance.glasses ? ', con lentes' : ''}`}
        {pathways.length > 0 ? `. Rutas guardadas: ${pathways.join(', ')}` : ''}
      </title>
      <ellipse cx="61" cy="153" rx="29" ry="5" fill="#183f3c" opacity=".12" />
      {/* Backpack, straps and objects sit behind the person. */}
      <path d="M69 60c18-4 23 4 24 20l1 29c-6 8-20 9-29 2l-3-36z" fill="#577b71" />
      <path d="M86 69c5 5 5 21 5 31" stroke="#244d46" strokeWidth="3" strokeLinecap="round" />
      {interests.includes('creative') && (
        <g transform="rotate(13 87 65)">
          <rect x="81" y="45" width="18" height="28" rx="2" fill="#eed28d" stroke="#183f3c" strokeWidth="1.5" />
          <path d="M85 46v26m4-18 6 5-6 5" stroke="#bd704e" strokeWidth="1.8" />
        </g>
      )}
      {interests.includes('nature') && (
        <g stroke="#406b50" strokeWidth="2" strokeLinecap="round">
          <path d="m86 65 8-39" />
          <path d="M90 46c-9-2-8-9-8-9 8 0 9 8 9 8m2-9c0-8 8-10 8-10 1 7-6 10-8 10m-5 19c-9-1-11-8-11-8 9-3 12 6 12 6" fill="#759478" />
        </g>
      )}
      {appearance.hairStyle === 'long' && <path d="M39 30c0-29 45-29 45 0l4 48c-14 8-35 7-51-1z" fill={appearance.hair}/>}
      {/* A long, relaxed silhouette keeps the character appropriate for teenagers. */}
      <path d="m42 103-1 39 11 2 11-36m-1-3 5 40 12-1 1-40" fill="#274b4c" />
      <path d="m42 136-2 12 14 1 1-12m12 0 1 12 14-1-3-12" fill="#355a59" />
      <path d="M40 145c-3 2-8 4-9 9 6 3 17 2 24 0l-1-9m14 0-1 10c6 2 17 2 23 0-1-4-7-7-10-10" fill="#f1e9d5" stroke="#183f3c" strokeWidth="1.5" />
      <path d="M39 64c5-9 33-13 43 0l3 42c-12 6-32 7-46 0z" fill={appearance.jacket} />
      <path d="M41 66C30 67 28 90 27 105l10 2 9-26m33-16c8 2 12 20 14 35l-10 3-9-24" fill={appearance.jacket} />
      <path d="m28 102-1 9c-1 7 8 10 10 3l1-10m45-5 1 10c1 7 9 6 10 0l-1-10" fill={appearance.skin} />
      <path d="M38 100 28 98m54-2 11-3" stroke="#183f3c" strokeWidth="2" opacity=".5" />
      <path d="M60 64v40m-14-16 9 1m12-1 10-1" stroke="#183f3c" strokeWidth="1.5" strokeLinecap="round" opacity=".45" />
      <path d="M49 54v9l11 9 10-11-2-11" fill={appearance.skin} />
      <path d="m48 60 12 12-9 6-8-14m26-4-9 12 9 5 6-13" fill="#f2e9d5" />
      <path d="M74 58c4 11 5 26 5 46" stroke="#294f49" strokeWidth="5" strokeLinecap="round" />
      <path d="m76 76 5-1" stroke="#d8d5ac" strokeWidth="3" />
      {/* Face and deliberately slightly irregular hair. */}
      <path d="M42 28c-2-20 34-24 39-5l-3 25-35-1z" fill={appearance.hair} />
      <ellipse cx="43" cy="41" rx="4" ry="6" fill={appearance.skin} />
      <ellipse cx="78" cy="41" rx="4" ry="6" fill={appearance.skin} />
      <path d="M45 28c4 0 10-3 13-7 5 7 12 9 19 8v17c-1 11-8 16-16 16-9 0-16-7-16-17z" fill={appearance.skin} />
      {appearance.hairStyle === 'curly' ? <path d="M39 39c-9-4-10-14-4-19-3-9 5-16 13-14 6-8 16-6 21-2 11-4 20 4 19 12 10 6 7 19-4 23l-8-10c-8 1-13-5-17-10-3 7-8 11-15 12z" fill={appearance.hair}/> : <path d="M43 34c-8-16 2-25 14-23 5-7 20-4 25 7 3 8-1 15-5 19l-1-9c-8 1-13-5-17-10-3 7-8 11-15 12z" fill={appearance.hair} />}
      <path d="M53 39h1m14 0h1" stroke="#183f3c" strokeWidth="2.8" strokeLinecap="round" />
      <path d="m61 40-1 6 3 1m-8 5c3 2 6 2 9 0" stroke="#6d493a" strokeWidth="1.6" strokeLinecap="round" />
      {appearance.glasses && <g stroke="#183f3c" strokeWidth="1.8"><rect x="47" y="34" width="12" height="11" rx="4"/><rect x="64" y="34" width="12" height="11" rx="4"/><path d="M59 38h5m-20-1h3m29 0h4"/></g>}
      {/* Collected items remain readable as independent, reversible choices. */}
      {interests.includes('build') && (
        <g>
          <circle cx="48" cy="86" r="6" fill="#eed28d" />
          <path d="m45 89 5-6m-1-1 2 2" stroke="#244d46" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {interests.includes('care') && (
        <path d="M65 87c-7-4-6-10-2-9 2 0 2 2 2 2s1-2 3-2c4 0 5 6-3 9" fill="#f2e9d5" stroke="#183f3c" strokeWidth="1" />
      )}
      {interests.includes('research') && (
        <g transform="rotate(-15 32 111)">
          <path d="M33 110v16" stroke="#bd704e" strokeWidth="5" strokeLinecap="round" />
          <circle cx="33" cy="104" r="8" fill="#b6d3ce" stroke="#183f3c" strokeWidth="3" />
          <path d="m29 102 4-3" stroke="#f8f5eb" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {interests.includes('organize') && (
        <g transform="rotate(9 85 112)">
          <path d="m79 103 6 2 6-3 5 2v20l-5-2-6 3-6-3z" fill="#f3e5b9" stroke="#183f3c" strokeWidth="1.2" />
          <path d="m85 105 1 17m5-18v16" stroke="#baae80" />
          <path d="m81 114 6-3 6 6" stroke="#d4785b" strokeWidth="1.6" strokeDasharray="2 2" />
        </g>
      )}
      {pathways.slice(0, 3).map((pathway, index) => (
        <g key={pathway} transform={`translate(87 ${80 + index * 11}) rotate(-5)`}>
          <rect width="23" height="10" rx="2" fill={['#eed28d', '#c7d9c1', '#e9bba5'][index]} stroke="#244d46" strokeWidth=".8" />
          <text x="11.5" y="7" textAnchor="middle" fill="#244d46" fontSize="6" fontWeight="700" fontFamily="sans-serif">{pathway === 'Universidad' ? 'U' : pathway}</text>
        </g>
      ))}
    </svg>
  )
}
