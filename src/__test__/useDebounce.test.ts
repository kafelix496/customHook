import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import useDebounce from '../useDebounce'

jest.useFakeTimers()

describe('Test useDebounce', () => {
  const callback = jest.fn()

  const { result } = renderHook(() => {
    const isMounted = React.useRef(false)
    const [count, setCount] = React.useState(0)
    const debounced = useDebounce(count, 500)

    React.useEffect(() => {
      if (isMounted.current) {
        callback()
      } else {
        isMounted.current = true
      }
    }, [debounced])

    return {
      countState: {
        count,
        setCount
      },
      debounced: debounced
    }
  })

  test('function call is going to be canceled if that function is called again within 0.5 seconds', () => {
    ;(act as Function)(() => {
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(499)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(499)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(499)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(499)
      jest.advanceTimersByTime(1)
      result.current.countState.setCount((prev) => prev + 1)
      jest.advanceTimersByTime(500)
    })

    expect(callback).toBeCalledTimes(2)
  })
})
