import React from 'react'

const useRefWithSetter = <T>(
  initialValue: T
): [{ current: T }, (newValue: T | ((prevValue: T) => T)) => void] => {
  const ref = React.useRef<T>(initialValue)

  const setterCallback = React.useCallback(
    (newValue: T | ((prevValue: T) => T)): void => {
      if (typeof newValue === 'function') {
        ref.current = (newValue as (prevValue: T) => T)(ref.current)
      } else {
        ref.current = newValue
      }
    },
    [ref]
  )

  return [ref, setterCallback]
}

export default useRefWithSetter
