import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './app/store';
import { Root } from 'containers/root';

import 'styles/fonts.css';

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
