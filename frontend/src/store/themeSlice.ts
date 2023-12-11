import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '.'

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`
  if (['light', 'dark'].includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)')
  if (userMedia.matches) return 'light'

  return 'dark'
}

const initialState = getTheme()

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => action.payload,
  },
})

export const selectTheme = (state: RootState) => state.theme
export const { setTheme } = themeSlice.actions

export const themeReducer = themeSlice.reducer
