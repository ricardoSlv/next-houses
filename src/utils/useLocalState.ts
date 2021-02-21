import { useState, useEffect } from 'react'

export function useLocalState<T = undefined>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined' && window?.localStorage) {
      const saved = window.localStorage.getItem(key)

      if (saved) return JSON.parse(saved)
    }
    return initial
  })

  useEffect(() => {
    if (window?.localStorage) {
      console.log(
        (value as any).viewState?.transitionInterpolator,
        (value as any).viewState?.transitionInterpolator?.arePropsEqual,
        (value as any).oldViewState?.transitionInterpolator?.arePropsEqual
      )
      try {
        const jsonString = JSON.stringify(value)
        window.localStorage.setItem(key, jsonString)
      } catch (e) {
        console.log(e)
      }
    }
  }, [value])
  return [value, setValue] as [typeof value, typeof setValue]
}
