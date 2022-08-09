import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: 'gray.50',
      }
    }
  },
  colors: {
    primary: {
      50: '#ffe2f6',
      100: '#ffb1db',
      200: '#ff7fc2',
      300: '#fe4da9',
      400: '#fd1b90',
      500: '#e40277',
      600: '#b2005c',
      700: '#800042',
      800: '#4f0028',
      900: '#1f000f',
    },
    secondary: {
      50: '#e3f0ff',
      100: '#b8d1fb',
      200: '#8bb2f3',
      300: '#5f93ee',
      400: '#3475e8',
      500: '#1d5bce',
      600: '#1447a1',
      700: '#0c3374',
      800: '#031e47',
      900: '#000a1c',
    },
  },
  
})
