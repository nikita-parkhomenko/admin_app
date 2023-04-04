
// outsource dependencies
import React, { memo, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useController } from 'redux-saga-controller';
import { Route, Switch, Router, Redirect } from 'react-router-dom';

// local dependencies
import { SignUp } from './sign-up';
import { SignIn } from './sign-in';
import { Authorized } from './authorized';
import { appRootCtrl } from './controller';
import { ResetPassword } from './reset-password';
import { ForgotPassword } from './forgot-password';
import { Preloader, Maintenance } from '../components';
import { ModalIndex } from './authorized/layout/modals';
import { EmailConfirmation } from './email-confirmation';
import { AUTHORIZED, SIGN_IN, SIGN_UP, CHANGE_PASSWORD, FORGOT_PASSWORD, EMAIL_CONFIRMATION, history } from '../constants';

export const App = memo(function App () {
  // NOTE subscribe app controller
  const [{ initialized, health }, { initialize }] = useController(appRootCtrl);

  // NOTE initialize business logic
  useEffect(() => { initialize({}); }, [initialize]);

  // NOTE select view based on application state
  if (!health) { return <Maintenance />; }
  if (!initialized) { return <Preloader active />; }

  return <>
    <Router history={history}>
      <Switch>
        <Route exact path={SIGN_IN.ROUTE} component={SignIn} />
        <Route exact path={SIGN_UP.ROUTE} component={SignUp} />
        <Route exact path={CHANGE_PASSWORD.ROUTE} component={ResetPassword} />
        <Route exact path={FORGOT_PASSWORD.ROUTE} component={ForgotPassword} />
        <Route exact path={EMAIL_CONFIRMATION.ROUTE} component={EmailConfirmation} />
        {/* NOTE closed to display at authorization */}
        <Route path={AUTHORIZED} component={Authorized} />
        {/* NOTE otherwise */}
        <Redirect to={{ pathname: SIGN_IN.LINK() }}/>
        {/*<Route path="" component={NotFound} />*/}
      </Switch>
    </Router>
    <ModalIndex />
    <ToastContainer
      draggable
      theme="light"
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss
      autoClose={2000}
      newestOnTop={false}
      position="top-right"
    />
  </>;
});
