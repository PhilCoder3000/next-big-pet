import { createEvent, createStore, combine } from 'effector'

export const plus = createEvent()

export const $counter = createStore(1).on(plus, n => n + 1)
const $counterText = $counter.map(n => `current value = ${n}`)
const $counterCombined = combine({counter: $counter, text: $counterText})