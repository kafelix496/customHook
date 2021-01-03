import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import useThrottle from '../useThrottle'

jest.useFakeTimers()
describe('Test useThrottle', () => {
  const callback = jest.fn()

  const { result } = renderHook(() => {
    const isMounted = React.useRef(false)
    const [count, setCount] = React.useState(0)
    const throttled = useThrottle(count, 500)

    React.useEffect(() => {
      if (isMounted.current) {
        callback()
      } else {
        isMounted.current = true
      }
    }, [throttled])

    return {
      countState: {
        count,
        setCount
      },
      throttled: throttled
    }
  })

  test('function call is going to be called only one time within 0.5 seconds', () => {
    ;(act as Function)(() => {
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(100)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(100)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(100)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(100)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(100)
      result.current.countState.setCount((prev) => prev + 1)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(400)
      result.current.countState.setCount((prev) => prev + 1)
      result.current.countState.setCount((prev) => prev + 1)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(100)
      result.current.countState.setCount((prev) => prev + 1)
    })

    expect(callback).toBeCalledTimes(2)
  })
})
