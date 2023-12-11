import { useCallback, useEffect, useState } from 'react'

type ElementSize = {
  width: number
  height: number
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  ElementSize,
] {
  const [ref, setRef] = useState<T | null>(null)
  const [elementSize, setElementSize] = useState<ElementSize>({
    width: 0,
    height: 0,
  })

  const resize = useCallback(() => {
    setElementSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })
  }, [ref?.offsetHeight, ref?.offsetWidth])

  useEffect(() => {
    console.log(ref)
    document.addEventListener('resize', resize)
    return () => document.removeEventListener('resize', resize)
  }, [])

  return [setRef, elementSize]
}
