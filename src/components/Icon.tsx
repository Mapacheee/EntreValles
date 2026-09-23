export type IconName = 'map' | 'compass' | 'book' | 'arrow' | 'chevron' | 'check' | 'close' | 'spark' | 'heart' | 'search' | 'external' | 'pin' | 'palette' | 'tool' | 'leaf' | 'people' | 'bulb' | 'flag' | 'wallet' | 'door' | 'download' | 'edit' | 'reset' | 'list' | 'anchor' | 'compare' | 'sun'
const paths: Record<IconName, React.ReactNode> = {
  map: <><path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Z"/><path d="M9 3v16M15 5v16"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/></>,
  book: <><path d="M5 3h14v18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM5 17h14M7 7h8M7 10h5"/></>,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6"/>, chevron: <path d="m9 5 7 7-7 7"/>, check: <path d="m5 12 4 4L19 6"/>, close: <path d="m6 6 12 12M6 18 18 6"/>,
  spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/></>,
  heart: <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>, external: <><path d="M14 3h7v7m0-7L10 14M10 3H4v17h17v-6"/></>,
  pin: <><path d="M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2"/></>,
  palette: <><path d="M12 3a9 9 0 0 0 0 18h1a2 2 0 0 0 2-2c0-1-1-1.5-1-2.5s1-1.5 2-1.5h2c2 0 3-2 3-4a9 9 0 0 0-9-8Z"/><path d="M7 10h.01M10 6.5h.01M15 7h.01M17 11h.01" strokeWidth="3"/></>,
  tool: <path d="m14 6 4 4 3-3a6 6 0 0 1-8 8L6 22l-4-4 7-7a6 6 0 0 1 8-8l-3 3Z"/>,
  leaf: <><path d="M20 3C8 2 1 8 5 16s17 3 15-13Z"/><path d="m4 21 11-12"/></>,
  people: <><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 3 5v3"/></>,
  bulb: <><path d="M8 17c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8H8ZM9 21h6M9 17h6"/></>,
  flag: <><path d="M5 22V3m0 1c5-5 9 5 15 0v11c-6 5-10-5-15 0"/></>,
  wallet: <><path d="M3 6h17v15H3V6Zm0 0V3h14v3"/><path d="M15 11h6v5h-6z"/></>, door: <><path d="M4 21h16M7 21V3h12v18M11 12h.01"/></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>, edit: <><path d="m15 3 6 6-11 11-7 1 1-7L15 3ZM12 6l6 6"/></>,
  reset: <><path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/></>, list: <><path d="M9 6h12M9 12h12M9 18h12M3 6h.1M3 12h.1M3 18h.1"/></>,
  anchor: <><circle cx="12" cy="4" r="2"/><path d="M12 6v15M7 10h10M3 14v4c6 5 12 5 18 0v-4M1 16l2-2 2 2m14 0 2-2 2 2"/></>,
  compare: <><path d="M8 4v16M16 4v16M3 8h10M11 16h10"/><circle cx="8" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 1v2M12 21v2M1 12h2M21 12h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>,
}
export default function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name]}</svg>
}
