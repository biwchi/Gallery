export type BreakpointsValues = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BreakpointsWidth = 320 | 600 | 960 | 1280 | 1920

export type Breakpoints = Record<BreakpointsValues, boolean>

export const breakpoints: Record<number, BreakpointsValues> = {
  320: 'xs',
  600: 'sm',
  960: 'md',
  1280: 'lg',
  1920: 'xl',
}

export const breakpointsWidth: Record<BreakpointsValues, BreakpointsWidth> = {
  xs: 320,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}
