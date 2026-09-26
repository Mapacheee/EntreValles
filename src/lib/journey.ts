export const STORAGE_KEY = 'entrevalles.journey.v1'
export const stationIds = ['start', 'interests', 'study', 'service', 'funding', 'access', 'plan'] as const
export type StationId = typeof stationIds[number]
export const interestIds = ['creative', 'build', 'research', 'care', 'nature', 'organize'] as const
export const motivationOptions = ['Aprender algo que me interese', 'Tener más herramientas para trabajar', 'Aportar a mi comunidad', 'Desarrollar un proyecto propio', 'Explorar antes de decidir']
export const jacketColors = ['#ce7859', '#527a78', '#c4a358', '#7f7192']
export const skinColors = ['#efc5a2', '#c68e63', '#895c43', '#573e34']
export const hairColors = ['#293d36', '#714e35', '#b18042']
export const presentations = ['masculine', 'feminine', 'neutral'] as const
export const hairStyles = ['short', 'long', 'curly'] as const
export interface AvatarAppearance {
  jacket: string; skin: string; hair: string
  presentation: typeof presentations[number]
  hairStyle: typeof hairStyles[number]
  glasses: boolean
}
export interface JourneyState {
  version: 1
  station: StationId
  course: string
  startStep: number
  motivations: string[]
  concern: string
  interests: string[]
  completed: string[]
  favorites: string[]
  supports: string[]
  checkedSteps: string[]
  note: string
  appearance: AvatarAppearance
}
export function freshJourney(): JourneyState {
  return { version: 1, station: 'start', course: '', startStep: 0, motivations: [], concern: '', interests: [], completed: [], favorites: [], supports: [], checkedSteps: [], note: '', appearance: { jacket: jacketColors[0], skin: skinColors[1], hair: hairColors[0], presentation: 'masculine', hairStyle: 'short', glasses: false } }
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)
const strings = (value: unknown, max = 30): string[] => Array.isArray(value) ? [...new Set(value.filter((v): v is string => typeof v === 'string' && v.length <= 150))].slice(0, max) : []
export function restoreJourney(raw: string | null): JourneyState {
  const initial = freshJourney()
  if (!raw) return initial
  try {
    const v: unknown = JSON.parse(raw)
    if (!isRecord(v) || v.version !== 1) return initial
    const appearance = isRecord(v.appearance) ? v.appearance : {}
    return { ...initial,
      station: stationIds.includes(v.station as StationId) ? v.station as StationId : 'start',
      course: ['3° medio', '4° medio'].includes(v.course as string) ? v.course as string : '',
      startStep: Number.isInteger(v.startStep) && Number(v.startStep) >= 0 && Number(v.startStep) <= 2 ? Number(v.startStep) : 0,
      motivations: strings(v.motivations, Infinity).filter(value => motivationOptions.includes(value)).slice(0, 2), concern: typeof v.concern === 'string' ? v.concern.slice(0, 150) : '',
      interests: strings(v.interests, Infinity).filter(id => interestIds.includes(id as typeof interestIds[number])),
      completed: strings(v.completed, Infinity).filter(id => stationIds.includes(id as StationId)),
      favorites: strings(v.favorites), supports: strings(v.supports), checkedSteps: strings(v.checkedSteps),
      note: typeof v.note === 'string' ? v.note.slice(0, 2000) : '',
      appearance: { presentation: presentations.includes(appearance.presentation as AvatarAppearance['presentation']) ? appearance.presentation as AvatarAppearance['presentation'] : initial.appearance.presentation, hairStyle: hairStyles.includes(appearance.hairStyle as AvatarAppearance['hairStyle']) ? appearance.hairStyle as AvatarAppearance['hairStyle'] : initial.appearance.hairStyle, glasses: typeof appearance.glasses === 'boolean' ? appearance.glasses : false, jacket: jacketColors.includes(appearance.jacket as string) ? appearance.jacket as string : initial.appearance.jacket, skin: skinColors.includes(appearance.skin as string) ? appearance.skin as string : initial.appearance.skin, hair: hairColors.includes(appearance.hair as string) ? appearance.hair as string : initial.appearance.hair },
    }
  } catch { return initial }
}
export function toggleItem(items: string[], id: string): string[] {
  return items.includes(id) ? items.filter(item => item !== id) : [...items, id]
}
export function completeStation(state: JourneyState, id: string): JourneyState {
  if (!stationIds.includes(id as StationId) || state.completed.includes(id)) return state
  return { ...state, completed: [...state.completed, id] }
}
