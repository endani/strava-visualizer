const getFromLocalStorage = (key: string) => {
  try {
    return JSON.parse(localStorage?.getItem(key) as string)
  } catch {
    return null
  }
}

const setToLocalStorage = (key: string, value: any) => {
  const currentStoreValue = getFromLocalStorage(key)

  const newValue = {
    ...currentStoreValue,
    ...value,
  }

  localStorage?.setItem(key, JSON.stringify(newValue))
}

const unitToPrefixMap = {
  miles: 'mi',
  kilometers: 'km',
}

const meterstoUnits = (unit: 'miles' | 'kilometers', meters: number) => {
  const multiplier = unit === 'miles' ? 0.000621371 : 0.001

  const distance = (meters * multiplier).toFixed(2)

  return `${distance} ${unitToPrefixMap[unit]}`
}

const secondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours}:${minutes}:${remainingSeconds}`
}

export { getFromLocalStorage, setToLocalStorage, meterstoUnits, secondsToTime }
