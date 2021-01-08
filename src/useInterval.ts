import React from 'react'

const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = React.useRef(callback)

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    const timerId = setInterval(() => {
      savedCallback.current()
    }, delay)

    return () => clearInterval(timerId)
  }, [delay])
}

export default useInterval
