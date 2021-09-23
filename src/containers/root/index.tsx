import { Redirect, Route, Switch } from 'react-router-dom';
import { RootLayoutContainer } from 'components/layouts/root';
import { Navigation } from 'containers/navigation';
import { Disks } from 'views/Disks';
import { Smartphones } from 'views/Smartphones';
import { Something } from 'views/Something';
import { Dynamic } from 'views/Dynamic';

export const Root = () => {
  return (
    <>
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
          <Route path="/dynamic">
            <Dynamic />
          </Route>
        </Switch>
      </RootLayoutContainer>
    </>
  );
};
