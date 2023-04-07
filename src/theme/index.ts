import {
  black,
  dark,
  gradients,
  green,
  grey,
  light,
  pink,
  primary,
  purple,
  red,
  teal,
  transparent,
  transparentog,
  white,
  yellow
} from './colors'

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    dark,
    pink,
    purple,
    primary,
    red,
    green,
    secondary: {
      main: teal[200],
    },
    light,
    white,
    teal,
    transparent,
    transparentog,
    gradients,
    yellow
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
}

export default theme
