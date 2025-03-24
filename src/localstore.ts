import { writable, type Writable } from 'svelte/store'
import { startDate } from './constants'

const stored = localStorage.content

export const content = writable(stored || "Hello")

content.subscribe((value) => localStorage.content = value)

function localStore<T extends any>(key: string, defaultValue: T, fromString: ((value: string) => T), toString: ((value: T) => string)): Writable<T> {
    let stored: T | undefined
    if (localStorage[key] != undefined) {
        stored = fromString(localStorage[key])
    }
    const store = writable<T>(stored || defaultValue)
    store.subscribe((value) => localStorage[key] = toString(value))
    return store
}

function stringLocalStore(key: string): Writable<string> {
    return localStore(key, "", (value) => value, (value) => value)
}

function dateLocalStore(key: string, defaultValue: Date): Writable<Date> {
    return localStore(key, defaultValue, (value) => new Date(value), (value) => value.toDateString())
}

export const newsTitleStore = stringLocalStore("news-title")
export const newsBodyStore = stringLocalStore("news-body")
export const newsAuthorStore = stringLocalStore("news-author")
export const newsDateStore = dateLocalStore("news-date", startDate)

