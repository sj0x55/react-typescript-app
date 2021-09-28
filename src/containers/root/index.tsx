import { FC, MouseEvent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';
import { mainTheme, invertedTheme } from 'styles/theme';
import { RootLayoutContainer } from 'components/layouts/root';
import { Navigation } from 'containers/navigation';
import { Disks } from 'views/Disks';
import { Smartphones } from 'views/Smartphones';
import { Something } from 'views/Something';
import { FlagContextProvider, useFlagContext } from 'containers/flag-context';

const RootBody = () => {
  const { flag, toggleFlag } = useFlagContext();
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFlag && toggleFlag();
  };

  return (
    <>
      <ThemeProvider theme={flag ? invertedTheme : mainTheme}>
        <GlobalStyle />
        <button onClick={handleOnClick}>
          {flag ? (
            <span aria-label="Normal mode" role="img">
              🌞 Switch to normal mode
            </span>
          ) : (
            <span aria-label="Invert mode" role="img">
              🌜 Switch to invert mode
            </span>
          )}
        </button>

        <Navigation />
        <RootLayoutContainer>
          <Switch>
            <Route exact path="/">
              <Redirect to="/disks" />
            </Route>
            <Route exact path="/disks">
              <Disks />
            </Route>
            <Route path="/smartphones">
              <Smartphones />
            </Route>
            <Route path="/other">
              <Something />
            </Route>
          </Switch>
        </RootLayoutContainer>
      </ThemeProvider>
    </>
  );
};

export const Root: FC = () => {
  return (
    <FlagContextProvider>
      <RootBody />
    </FlagContextProvider>
  );
};
