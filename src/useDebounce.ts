import React from 'react'

const useDebounce = <T>(initialValue: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(initialValue)

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(initialValue)
    }, delay)

    return () => {
      clearTimeout(timerId)
    }
  }, [initialValue, delay])

  return debouncedValue
}

export default useDebounce
