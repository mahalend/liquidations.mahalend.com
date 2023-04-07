import {darkTheme, Theme} from "@rainbow-me/rainbowkit";
import theme from "../theme";

export const myCustomTheme: Theme = {
  blurs: {
    ...darkTheme().blurs,
  },
  colors: {
    ...darkTheme().colors,
    accentColor: theme.color.gradients['orange_gradient'],
  },
  fonts: {
    body: 'Inter',
  },
  radii: {
    actionButton: '6px',
    connectButton: '6px',
    menuButton: '6px',
    modal: '6px',
    modalMobile: '6px',
  },
  shadows: {
    ...darkTheme().shadows
  },
};
