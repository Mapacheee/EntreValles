import { useId } from 'react'
import Avatar from './Avatar'
import type { AvatarAppearance } from './Avatar'

type JourneySceneProps = {
  activeStation: string
  completed: string[]
  onSelect: (station: string) => void
  appearance: AvatarAppearance
  interests: string[]
  pathways?: string[]
}

const stations = [
  { id: 'start', name: 'Mi punto de partida', number: '01', x: 140, y: 484 },
  { id: 'interests', name: 'Lo que me mueve', number: '02', x: 318, y: 326 },
  { id: 'study', name: 'Destinos para estudiar', number: '03', x: 548, y: 428 },
  { id: 'service', name: 'Vocación de servicio', number: '+', x: 548, y: 174 },
  { id: 'funding', name: 'Apoyos para el camino', number: '04', x: 727, y: 277 },
  { id: 'access', name: 'Otras puertas', number: '05', x: 863, y: 397 },
  { id: 'plan', name: 'Mi próximo paso', number: '06', x: 978, y: 192 },
]

function Tree({ x, y, scale = 1, variant = 0 }: { x: number; y: number; scale?: number; variant?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0v25m0-17-7-8m7 6 7-7" stroke="#44664d" strokeWidth="3" strokeLinecap="round" />
      {variant === 1 ? (
        <path d="m0-38-17 34 8-1-14 22h45L9-5l8 1z" fill="#63866a" />
      ) : (
        <path d="M-4-29c-16-5-25 6-22 17-9 18 5 29 21 23 13 10 29 0 26-13 7-12-4-29-16-24z" fill={variant === 2 ? '#a0ad7e' : '#759478'} />
      )}
      <path d="M0 18v-22m0 4 8-8m-8 14-9-8" stroke="#44664d" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function House({ x, y, scale = 1, color = '#d4785b' }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="m-21-3 21-18 23 17v30h-44z" fill={color} />
      <path d="m-27-1 26-24L28-1" stroke="#3a5b50" strokeWidth="5" strokeLinejoin="round" />
      <path d="M-3 9h10v17" fill="#faf4df" />
      <path d="M-15 4h7v9h-7zm29 0h7v9h-7z" fill="#faf4df" />
      <path d="M-12 5v7m29-7v7" stroke="#759478" strokeWidth="1.4" />
    </g>
  )
}

/** Hand-composed SVG geography: a journey, not a geographically exact map. */
export default function JourneyScene({ activeStation, completed, onSelect, appearance, interests, pathways = [] }: JourneySceneProps) {
  const patternId = useId().replace(/:/g, '')
  const current = stations.find((station) => station.id === activeStation) ?? stations[0]
  const path = 'M140 484C155 438 146 402 216 389S286 377 318 326 336 267 389 285 461 383 493 411 565 464 604 393 642 271 727 277 778 394 863 397 925 319 920 271 965 225 978 192'

  return (
    <div
      className="journey-scene"
      role="group"
      aria-label="Mapa de tu recorrido"
      style={{ position: 'relative', aspectRatio: '1100 / 620', isolation: 'isolate' }}
    >
      <svg className="journey-landscape" viewBox="0 0 1100 620" fill="none" aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%' }}>
        <defs>
          <pattern id={`grain-${patternId}`} width="17" height="17" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="3" r=".6" fill="#183f3c" opacity=".08" />
            <circle cx="11" cy="12" r=".4" fill="#183f3c" opacity=".09" />
          </pattern>
        </defs>
        <path d="M0 0h1100v620H0z" fill="#f6f2e6" />
        {/* Background ridges are cut-paper shapes, with plenty of breathing room. */}
        <path d="M690 123 771 59 815 105 873 37 919 100 956 64 1031 132 1100 98v190H711z" fill="#d2dfe9" />
        <path d="m873 37-40 77 28-13 19 16 16-16 23-1z" fill="#f4f7fa" />
        <path d="M355 161c63-65 141-66 209-38s93 41 150 15 90-8 137 34 95 26 132 44 87 34 117 11v252H317z" fill="#dce3cc" />
        <path d="M0 247c83-33 148-35 197-6s104 50 158 29 139-24 189 36 116 87 178 59 183-19 378 54v201H0z" fill="#e8e9d7" />
        <path d="M575 515c83-44 122-57 192-40s100 55 163 38 109-16 170 4v103H541z" fill="#d9e0c7" />
        <path d="M0 0h82c-32 54 22 98 10 150s-60 83-44 130 26 56 4 104 16 77 62 103 13 99-10 133H0z" fill="#e8d5b0" />
        <path d="M0 0h63c-39 55 12 100-1 146S12 222 27 278s24 59 4 100 10 81 56 113 15 89-4 129H0z" fill="#a2c5d7" />
        <path d="M49 2c-33 61 15 103 0 151S4 225 17 279s26 61 5 99 10 85 53 116 15 87-3 122" stroke="#edf4e6" strokeWidth="3" />
        <path d="m7 123 12 3 9-3m-19 68 9 3 10-3m-21 144 9 3 11-3M18 451l10 3 10-3m-10 96 12 3 13-3" stroke="#6996b1" strokeWidth="2" strokeLinecap="round" />
        {/* A few imperfect contour lines provide a printed field-guide character. */}
        <path d="M350 165c79-53 160-39 218-10m198 319c84 7 103 40 162 29m-735-277c39 1 55 13 85 22m475-116c33-15 55-10 75 8" stroke="#afbc99" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M697 546c38-21 85-17 125-4m-99 16c30-11 62-8 90 0m-81 11c26-6 46-4 65 0" stroke="#b7c29f" strokeWidth="2" strokeLinecap="round" />
        {/* The continuous path is the dominant shape. */}
        <path d={path} stroke="#cabc98" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path} stroke="#f9f5e7" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path} stroke="#c3b68f" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
        <path d="M396 289c30-53 102-43 152-115" stroke="#c9c1a4" strokeWidth="16" strokeLinecap="round" />
        <path d="M396 289c30-53 102-43 152-115" stroke="#f8f5e9" strokeWidth="12" strokeLinecap="round" />
        <path d="M396 289c30-53 102-43 152-115" stroke="#b1aa8d" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" />
        {/* Coast lookout and a small collection of Valparaíso-like hillside houses. */}
        <g transform="translate(174 318) rotate(-8)">
          <path d="M-46 17h75v12h-75z" fill="#a38d6c" />
          <path d="M-42 13v-17m23 16V-8M5 8V-9m22 20V-6M-44-2l73-2" stroke="#6f795e" strokeWidth="3" />
          <path d="M-32 22v18m48-18v18" stroke="#a38d6c" strokeWidth="4" />
        </g>
        <House x={210} y={217} scale={0.76} color="#d2a759" />
        <House x={253} y={233} scale={0.83} color="#d4785b" />
        <House x={173} y={257} scale={0.69} color="#8bab9c" />
        <path d="m156 287 31-2 19-10 43 4" stroke="#b3b68d" strokeWidth="2" strokeLinecap="round" />
        <Tree x={350} y={203} scale={0.94} />
        <Tree x={377} y={218} scale={0.65} variant={2} />
        <Tree x={276} y={448} scale={1.07} />
        <Tree x={313} y={466} scale={0.74} variant={2} />
        <Tree x={656} y={206} scale={1.05} variant={1} />
        <Tree x={683} y={220} scale={0.67} variant={1} />
        <Tree x={800} y={433} scale={0.76} variant={2} />
        <Tree x={1014} y={414} scale={1.06} />
        <Tree x={1043} y={431} scale={0.69} variant={2} />
        <Tree x={981} y={467} scale={0.83} variant={1} />
        {/* An open-air study pavilion; buildings remain scenery, never a ranking. */}
        <g transform="translate(538 330)">
          <path d="M-37-13h74v35h-74z" fill="#f7eed6" />
          <path d="m-46-14 45-26 47 26z" fill="#c47557" />
          <path d="M-34-11v34m22-34v34m23-34v34m22-34v34" stroke="#76907a" strokeWidth="5" />
          <path d="M-41 23h82m-45-5v-25" stroke="#c5b89a" strokeWidth="4" />
          <path d="M-41 29h83" stroke="#a5ad89" strokeWidth="3" />
        </g>
        {/* Wind, a lighthouse and a flying flag invite exploration. */}
        <g transform="translate(538 108)">
          <path d="m-11 18 4-37H7l4 37z" fill="#faf4df" />
          <path d="m-9-6 18 1 1 9H-10z" fill="#d4785b" />
          <path d="M-10-21h20v-6H-10z" fill="#52796a" />
          <path d="m-12-28 12-8 12 8z" fill="#d4785b" />
          <path d="M-6-24v-5m12 5v-5" stroke="#f8f5eb" strokeWidth="2" />
          <path d="M-19 20h38" stroke="#a9b38d" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g transform="translate(974 97)">
          <path d="M0 37V-20" stroke="#496b55" strokeWidth="3" strokeLinecap="round" />
          <path d="M2-20c12-7 17 5 32-1v21C19 6 14-6 2 1z" fill="#d4785b" />
          <path d="m-14 37 15-7 17 8" fill="#a0b18c" />
        </g>
        <g transform="translate(852 297)">
          <path d="M-26 20v-35h48v35m-48-26h48" stroke="#a1835d" strokeWidth="5" />
          <path d="m-29-17 14-9 40 9" stroke="#a1835d" strokeWidth="4" strokeLinecap="round" />
          <path d="M-11 20V-2h20v22" fill="#769478" />
          <path d="M15-32c0-12 14-16 18-6 4 11-8 17-18 6" fill="#94a87a" />
        </g>
        <g transform="translate(736 201)">
          <path d="M-27 9c17-20 35-20 52 0v11H-27z" fill="#c9b694" />
          <path d="M-15 20c7-18 15-18 23 0" fill="#dce3cc" />
          <path d="M-24 3v-8m12-4v-8m12 5v-8m12 11v-8m11 19V-3m-48-2c19-15 35-13 48 4" stroke="#9d8869" strokeWidth="2.5" />
        </g>
        {/* Small marks look drawn, while the overall composition stays quiet. */}
        <g stroke="#8ea17a" strokeWidth="1.6" strokeLinecap="round">
          <path d="m221 478 3-7 4 6m-5-3-6-2m198-121 3-8 4 7m-4-4-5-2m235 108 3-8 4 7m-4-3-6-2m239-196 3-8 4 7m-4-3-6-2m-7 186 4-9 4 8m-4-4-6-2M407 463l3-8 4 7m-4-3-6-2M608 154l3-7 4 6" />
        </g>
        <g fill="#b6be9f">
          <ellipse cx="409" cy="519" rx="8" ry="3" />
          <ellipse cx="422" cy="516" rx="4" ry="2" />
          <ellipse cx="802" cy="184" rx="7" ry="3" />
          <ellipse cx="813" cy="182" rx="4" ry="2" />
          <ellipse cx="620" cy="486" rx="7" ry="3" />
        </g>
        <path d="M119 114q8-8 16 0 8-8 16 0m42-40q6-6 12 0 6-6 12 0m434 27q7-6 13 0 7-6 14 0" stroke="#6b887b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="292" cy="81" r="24" fill="#e6bd73" />
        <path d="m32 427 5-33 14 31z" fill="#faf5e3" />
        <path d="m23 429 35-2-8 8H29z" fill="#c5795e" />
        <path d="M0 0h1100v620H0z" fill={`url(#grain-${patternId})`} style={{ pointerEvents: 'none' }} />
        <g fill="#768b77" fontFamily="inherit" fontSize="10" letterSpacing="3" fontWeight="600">
          <text x="126" y="151">LA COSTA</text>
          <text x="368" y="109">LOS CERROS</text>
          <text x="710" y="585">EL VALLE</text>
        </g>
        <g transform="translate(1030 548)" stroke="#7c907b" strokeWidth="1.3">
          <path d="M0-20v39m-19-19h38M0-20-5-7 0-10 5-7z" fill="#7c907b" />
          <circle r="13" />
          <text y="-27" textAnchor="middle" fill="#7c907b" stroke="none" fontFamily="inherit" fontSize="9">N</text>
        </g>
      </svg>

      {stations.map((station) => {
        const isActive = station.id === activeStation
        const isComplete = completed.includes(station.id)
        return (
          <button
            key={station.id}
            type="button"
            className={`scene-station${isActive ? ' is-active' : ''}${isComplete ? ' is-complete' : ''}${station.id === 'service' ? ' is-optional' : ''}`}
            style={{ position: 'absolute', left: `${station.x / 11}%`, top: `${station.y / 6.2}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => onSelect(station.id)}
            aria-current={isActive ? 'step' : undefined}
            aria-label={`${station.name}${station.id === 'service' ? ', ruta opcional' : `, estación ${station.number}`}${isComplete ? ', explorada' : ''}${isActive ? ', estás aquí' : ''}`}
          >
            <span className="scene-station-number" aria-hidden="true">
              {isComplete ? <svg viewBox="0 0 20 20" width="15" height="15" fill="none"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> : station.number}
            </span>
            <span className="scene-station-label">{station.name}</span>
            {station.id === 'service' && <span className="scene-station-optional">Ruta opcional</span>}
          </button>
        )
      })}

      <div
        className="journey-traveler"
        style={{ position: 'absolute', left: `${(current.x - 30) / 11}%`, top: `${(current.y - 22) / 6.2}%`, transform: 'translate(-50%, -100%)', width: '7.5%', zIndex: 3, pointerEvents: 'none' }}
      >
        <span className="traveler-tag">Tú estás aquí</span>
        <Avatar appearance={appearance} interests={interests} pathways={pathways} size={90} />
      </div>
    </div>
  )
}
