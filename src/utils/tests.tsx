import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import testRenderer, { TestRendererOptions } from 'react-test-renderer';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { mainTheme } from 'styles/theme';
import appSliceReducer from 'app/slice';

type RenderOptions = {
  store?: EnhancedStore<{ app: AppState }>;
  [key: string]: unknown;
};

const getWrapper = (
  store: EnhancedStore<{ app: AppState }> = configureStore({
    reducer: {
      app: appSliceReducer,
    },
  }),
): FC => {
  const wrapper: FC = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>
    </Provider>
  );

  return wrapper;
};

const customRender = (ui: ReactElement, opts?: RenderOptions) => {
  return render(ui, { wrapper: getWrapper((opts || {}).store), ...opts });
};

const customCreate = (ui: ReactElement, opts?: TestRendererOptions) => {
  const Wrapper = getWrapper();

  return testRenderer.create(<Wrapper>{ui}</Wrapper>, opts);
};

export * from '@testing-library/react';
export { customCreate as create };
export { customRender as render };
