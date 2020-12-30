import { renderHook, act } from '@testing-library/react-hooks'

import useRefWithSetter from '../useRefWithSetter'

describe('Test useRefWithSetter', () => {
  const { result } = renderHook(() => useRefWithSetter(1))

  const [valueRef, setValue] = result.current

  test('you can return value through setter function', () => {
    ;(act as Function)(() => {
      setValue(2)
    })

    expect(valueRef.current).toBe(2)
  })

  test('you can return callback function through setter function', () => {
    ;(act as Function)(() => {
      setValue((prev) => prev + 3)
    })

    expect(valueRef.current).toBe(5)
  })
})
