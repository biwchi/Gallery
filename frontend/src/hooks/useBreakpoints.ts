import { useEffect, useState } from 'react'

import { Breakpoints } from '@/common'

const breakpointsOff = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
}

export function useBreakpoints() {
  const [breakpoint, setBreakpoint] = useState<Breakpoints>(breakpointsOff)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = () => {
    return setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    if (0 < windowSize.width && windowSize.width < 600) {
      setBreakpoint({ ...breakpointsOff, xs: true })
    } else if (600 < windowSize.width && windowSize.width < 960) {
      setBreakpoint({ ...breakpointsOff, sm: true })
    } else if (960 < windowSize.width && windowSize.width < 1280) {
      setBreakpoint({ ...breakpointsOff, md: true })
    } else if (1280 < windowSize.width && windowSize.width < 1920) {
      setBreakpoint({ ...breakpointsOff, lg: true })
    } else if (windowSize.width >= 1920) {
      setBreakpoint({ ...breakpointsOff, xl: true })
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [windowSize.width])

  return {
    breakpoint,
    windowSize,
  }
}
