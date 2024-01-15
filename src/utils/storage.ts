export const getLocalStorage = <T>(key: string): T | undefined => {
  const dataStr = localStorage.getItem(key)
  if (!dataStr) return undefined
  const { value = undefined, expiration = Number.MAX_VALUE } = JSON.parse(dataStr || '{}') as { value: T, expiration: number }
  const time = new Date().getTime()
  if (time > expiration) {
    localStorage.removeItem(key)
    return undefined
  }
  return value
}

export const setLocalStorage = (key: string, value: any, delay = 1000 * 60 * 60 * 24) => {
  const time = new Date().getTime()
  localStorage.setItem(key, JSON.stringify({ expiration: time + delay, value }))
}
