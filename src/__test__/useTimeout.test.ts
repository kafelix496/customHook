import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import useTimeout from '../useTimeout'

interface RenderHookRtn {
  delayState: {
    value: number
    setValue: Function
  }
  setCallbackNum: Function
}

jest.useFakeTimers()

describe('Test useTimeout', () => {
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

    useTimeout(callbackStorage[callbackNum as '01' | '02'], delay)

    return {
      delayState: {
        value: delay,
        setValue: setDelay
      },
      setCallbackNum
    }
  }

  test('if delay value is changed, setTimeout function is reset', () => {
    const { result } = renderHook(() => _renderHook())

    ;(act as Function)(() => {
      result.current.delayState.setValue(400)
      result.current.delayState.setValue(200)
      jest.advanceTimersByTime(500)
    })

    expect(spy01).toBeCalledTimes(1)
  })

  test('if callback function is changed, setTimeout function is reset as well', () => {
    const { result } = renderHook(() => _renderHook())

    ;(act as Function)(() => {
      result.current.delayState.setValue(400)
      result.current.delayState.setValue(200)
      result.current.setCallbackNum('02')
      result.current.delayState.setValue(300)
      jest.advanceTimersByTime(500)
    })

    expect(spy01).toBeCalledTimes(0)
    expect(spy02).toBeCalledTimes(1)
  })
})
