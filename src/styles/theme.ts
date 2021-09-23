import baseStyled, { ThemedStyledInterface } from 'styled-components';

export interface MainTheme {
  fontSize: {
    [key: string]: string;
  };
  colors: {
    [key: string]: string;
  };
}

export const mainTheme: MainTheme = {
  colors: {
    white: '#FFFFFF',
    lightGrey: '#e5e8ee',
    grey: '#C0C7D6',
    darkGrey: '#737C8E',
    black: '#111111',
    success: '#8FCB81',
    error: '#FF8383',
    warning: '#E1D888',
    darkPurple: '#C0C7D6',
    lightPurple: '#ECEFF7',
  },
  fontSize: {
    xxl: '34px',
    xl: '24px',
    l: '17px',
    m: '12px',
    s: '11px',
  },
};

export type ThemeInterface = typeof mainTheme;
export const styled = baseStyled as ThemedStyledInterface<ThemeInterface>;
