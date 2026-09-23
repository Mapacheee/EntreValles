import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  completeStation,
  freshJourney,
  hairColors,
  interestIds,
  jacketColors,
  motivationOptions,
  restoreJourney,
  skinColors,
  stationIds,
  toggleItem,
} from '../src/lib/journey.ts'

const restore = (values: Record<string, unknown>) =>
  restoreJourney(JSON.stringify({ version: 1, ...values }))

describe('restoreJourney: saved progress is untrusted input', () => {
  it('recovers from missing, truncated and malformed localStorage data', () => {
    for (const raw of [null, '', 'undefined', '{', '{"version":1,', 'not JSON']) {
      assert.deepEqual(restoreJourney(raw), freshJourney(), `Failed for ${raw}`)
    }
  })

  it('rejects primitive values, arrays, missing versions and unsupported versions', () => {
    for (const value of [null, true, 1, 'hello', [], [{ version: 1 }], {},
      { version: '1' }, { version: 0 }, { version: 2, station: 'plan' }]) {
      assert.deepEqual(restoreJourney(JSON.stringify(value)), freshJourney())
    }
  })

  it('round-trips a personalized journey without losing student work', () => {
    const saved = {
      ...freshJourney(),
      station: 'funding' as const,
      course: '4° medio',
      startStep: 2,
      motivations: motivationOptions.slice(0, 2),
      concern: 'Me interesa estudiar y trabajar.',
      interests: ['creative', 'nature'],
      completed: ['start', 'interests', 'study'],
      favorites: ['university-one', 'institute-two'],
      supports: ['gratuidad', 'fuas'],
      checkedSteps: ['compare-programs'],
      note: 'Conversar con orientación sobre opciones en Valparaíso.',
      appearance: { jacket: jacketColors[2], skin: skinColors[0], hair: hairColors[1] },
    }
    assert.deepEqual(restoreJourney(JSON.stringify(saved)), saved)
  })

  it('falls back safely when persisted fields have the wrong types', () => {
    assert.deepEqual(restore({
      station: ['study'], course: 4, startStep: '2', motivations: 'autonomy',
      concern: { text: 'hello' }, interests: { creative: true }, completed: true,
      favorites: null, supports: 12, checkedSteps: false, note: ['note'],
      appearance: ['#ce7859'],
    }), freshJourney())
  })

  it('accepts only supported routes, course levels, steps and appearance colors', () => {
    const result = restore({
      station: 'unknown', course: '2° medio', startStep: 3,
      interests: ['creative', 'unknown', 'care'],
      completed: ['start', 'missing', 'service'],
      appearance: { jacket: 'red', skin: '#ffffff', hair: 'url(https://invalid.test)' },
    })
    assert.equal(result.station, 'start')
    assert.equal(result.course, '')
    assert.equal(result.startStep, 0)
    assert.deepEqual(result.interests, ['creative', 'care'])
    assert.deepEqual(result.completed, ['start', 'service'])
    assert.deepEqual(result.appearance, freshJourney().appearance)

    for (const station of stationIds) assert.equal(restore({ station }).station, station)
    for (const course of ['3° medio', '4° medio']) assert.equal(restore({ course }).course, course)
    for (const startStep of [0, 1, 2]) assert.equal(restore({ startStep }).startStep, startStep)
    for (const startStep of [-1, 0.5, 3, '1', true, null]) {
      assert.equal(restore({ startStep }).startStep, 0)
    }
  })

  it('restores valid appearance fields independently of invalid siblings', () => {
    const result = restore({ appearance: { jacket: jacketColors[1], skin: 123, hair: hairColors[2] } })
    assert.deepEqual(result.appearance, {
      jacket: jacketColors[1], skin: freshJourney().appearance.skin, hair: hairColors[2],
    })
  })

  it('deduplicates selections, removes invalid entries and preserves their order', () => {
    const mixed = ['first', null, 123, {}, 'first', 'x'.repeat(151), 'second', 'third']
    const result = restore({
      motivations: [motivationOptions[0], null, 123, motivationOptions[0], ...motivationOptions.slice(1)],
      favorites: mixed, supports: mixed, checkedSteps: mixed,
      interests: ['creative', 1, 'creative', 'care', null],
      completed: ['start', 'start', false, 'study'],
    })
    assert.deepEqual(result.motivations, motivationOptions.slice(0, 2))
    for (const field of ['favorites', 'supports', 'checkedSteps'] as const) {
      assert.deepEqual(result[field], ['first', 'second', 'third'])
    }
    assert.deepEqual(result.interests, ['creative', 'care'])
    assert.deepEqual(result.completed, ['start', 'study'])
  })

  it('caps free text and selection lists so oversized stored data stays bounded', () => {
    const many = Array.from({ length: 100 }, (_, i) => `item-${i}`)
    const result = restore({
      concern: 'c'.repeat(4000), note: 'n'.repeat(6000), motivations: [...many, ...motivationOptions],
      favorites: many, supports: many, checkedSteps: many,
    })
    assert.equal(result.concern, 'c'.repeat(150))
    assert.equal(result.note, 'n'.repeat(2000))
    assert.deepEqual(result.motivations, motivationOptions.slice(0, 2))
    for (const field of ['favorites', 'supports', 'checkedSteps'] as const) {
      assert.deepEqual(result[field], many.slice(0, 30))
    }
    assert.deepEqual(restore({ favorites: ['x'.repeat(150), 'x'.repeat(151)] }).favorites,
      ['x'.repeat(150)])
  })

  it('keeps recognized interests and stations after a long run of unknown values', () => {
    const unknown = Array.from({ length: 40 }, (_, i) => `unknown-${i}`)
    const result = restore({
      interests: [...unknown, ...interestIds],
      completed: [...unknown, ...stationIds],
    })
    assert.deepEqual(result.interests, [...interestIds])
    assert.deepEqual(result.completed, [...stationIds])
  })

  it('removes obsolete motivations so the student can select current options', () => {
    const result = restore({ motivations: ['autonomy', 'opportunities'] })
    assert.deepEqual(result.motivations, [])
    assert.deepEqual(toggleItem(result.motivations, motivationOptions[0]), [motivationOptions[0]])

    const mixed = restore({
      motivations: ['autonomy', 'opportunities', motivationOptions[3], 'unknown',
        motivationOptions[3], motivationOptions[1], motivationOptions[0]],
    })
    assert.deepEqual(mixed.motivations, [motivationOptions[3], motivationOptions[1]])
  })

  it('discards extra properties and cannot inject a persisted prototype', () => {
    const result = restoreJourney('{"version":1,"admin":true,"__proto__":{"polluted":true},"appearance":{"constructor":"evil"}}')
    assert.deepEqual(result, freshJourney())
    assert.equal(Object.hasOwn(result, '__proto__'), false)
    assert.equal(Object.hasOwn(result, 'admin'), false)
    assert.equal(Object.getPrototypeOf(result), Object.prototype)
    assert.equal(Object.getPrototypeOf(result.appearance), Object.prototype)
  })
})

describe('journey actions', () => {
  it('creates independent state objects when a student starts or resets a journey', () => {
    const first = freshJourney()
    const second = freshJourney()
    first.interests.push('creative')
    first.appearance.jacket = jacketColors[1]
    assert.deepEqual(second, restoreJourney(null))
    assert.notStrictEqual(first.appearance, second.appearance)
    assert.notStrictEqual(first.completed, second.completed)
  })

  it('lets a student add and undo a selection without mutating the previous state', () => {
    const original = ['creative']
    const selected = toggleItem(original, 'nature')
    assert.deepEqual(selected, ['creative', 'nature'])
    assert.deepEqual(original, ['creative'])
    assert.notStrictEqual(selected, original)
    const undone = toggleItem(selected, 'nature')
    assert.deepEqual(undone, original)
    assert.deepEqual(selected, ['creative', 'nature'])
  })

  it('can remove an existing choice and select it again', () => {
    const original = ['creative', 'care']
    assert.deepEqual(toggleItem(original, 'creative'), ['care'])
    assert.deepEqual(toggleItem(toggleItem(original, 'care'), 'care'), original)
    assert.deepEqual(toggleItem(['care', 'care'], 'care'), [])
  })

  it('completes a station once while preserving saved answers and appearance', () => {
    const previous = { ...freshJourney(), interests: ['creative'], note: 'Mi próximo paso' }
    const next = completeStation(previous, 'interests')
    assert.notStrictEqual(next, previous)
    assert.deepEqual(previous.completed, [])
    assert.deepEqual(next, { ...previous, completed: ['interests'] })
    assert.strictEqual(completeStation(next, 'interests'), next)
  })

  it('allows free exploration and the optional service branch without prerequisites', () => {
    const initial = freshJourney()
    const service = completeStation(initial, 'service')
    assert.deepEqual(service.completed, ['service'])
    const plan = completeStation(initial, 'plan')
    assert.deepEqual(plan.completed, ['plan'])
    assert.equal(plan.completed.includes('service'), false)
  })

  it('ignores unrecognized completion requests', () => {
    const initial = freshJourney()
    for (const id of ['', 'unknown', '__proto__', 'START']) {
      assert.strictEqual(completeStation(initial, id), initial)
    }
  })
})
