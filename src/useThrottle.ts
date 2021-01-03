import React from 'react'

const useThrottle = <T>(initialValue: T, delay: number): T => {
  const isProcessingRef = React.useRef<boolean>(false)
  const [throttleValue, setThrottleValue] = React.useState(initialValue)

  React.useEffect(() => {
    if (!isProcessingRef.current) {
      isProcessingRef.current = true
      setThrottleValue(initialValue)
      setTimeout(() => {
        isProcessingRef.current = false
      }, delay)
    }
  }, [initialValue, delay])

  return throttleValue
}

export default useThrottle
