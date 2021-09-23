import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './app/store';
import { Root } from 'containers/root';
import { GlobalStyle } from 'styles/global';
import { mainTheme } from 'styles/theme';
import 'styles/fonts.css';

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={mainTheme}>
          <GlobalStyle />
          <Root />
        </ThemeProvider>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
