import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';
import { mainTheme } from 'styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: {},
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
