import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import useInterval from '../useInterval'

interface RenderHookRtn {
  intervalState: {
    value: number
    setValue: Function
  }
  setCallbackNum: Function
}

jest.useFakeTimers()

describe('Test useInterval', () => {
  const callbackStorage = {
    '01': () => {},
    '02': () => {}
  }

  const spy01 = jest.spyOn(callbackStorage, '01')
  const spy02 = jest.spyOn(callbackStorage, '02')

  afterEach(() => {
    jest.clearAllMocks()
  })

  const _renderHook = (): RenderHookRtn => {
    const [callbackNum, setCallbackNum] = React.useState('01')
    const [delay, setDelay] = React.useState(500)

    useInterval(callbackStorage[callbackNum as '01' | '02'], delay)

    return {
      intervalState: {
        value: delay,
        setValue: setDelay
      },
      setCallbackNum
    }
  }

  test('if delay value is changed, setInterval function is reset', () => {
    const { result } = renderHook(() => _renderHook())

    ;(act as Function)(() => {
      result.current.intervalState.setValue(100)
      result.current.intervalState.setValue(50)
      jest.advanceTimersByTime(500)
    })

    expect(spy01).toBeCalledTimes(10)
  })

  test('if callback function is changed, setInterval function is reset as well', () => {
    const { result } = renderHook(() => _renderHook())

    ;(act as Function)(() => {
      result.current.intervalState.setValue(200)
      result.current.intervalState.setValue(100)
      result.current.setCallbackNum('02')
      result.current.intervalState.setValue(50)
      jest.advanceTimersByTime(500)
    })

    expect(spy01).toBeCalledTimes(0)
    expect(spy02).toBeCalledTimes(10)
  })
})
