type CacheEntry<T> = {
  key: string
  value: T
}

export class Cache<T> {
  private cache: CacheEntry<T>[] = []

  constructor() {}

  get(key: string) {
    return this.cache.find((e) => e.key === key)?.value
  }

  set(entry: CacheEntry<T>) {
    const indx = this.cache.findIndex((e) => e.key === entry.key)
    if (indx === -1) this.cache.push(entry)

    this.cache[indx] = entry
  }
}
