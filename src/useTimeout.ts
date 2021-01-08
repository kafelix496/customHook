import React from 'react'

const useTimeout = (callback: () => void, delay: number): void => {
  const savedCallback = React.useRef(callback)

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      savedCallback.current()
    }, delay)

    return () => clearTimeout(timerId)
  }, [delay])
}

export default useTimeout
