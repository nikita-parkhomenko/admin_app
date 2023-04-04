
// outsource dependencies
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import { Users } from './users';
import { Layout } from './layout';
import { useSelf } from '../hooks';
import { NotFound } from '../../components';
import { ERROR_MESSAGE } from '../../services';
import * as ROUTES from '../../constants/routes';

export const Authorized = memo(function Authorized () {
  const user = useSelf();

  return !user
    ? <Redirect to={ROUTES.SIGN_IN.LINK({}, { error: ERROR_MESSAGE.FORBIDDEN })}/>
    : <Layout>
      <Switch>
        <Route path={ROUTES.USERS_LIST.ROUTE} component={Users} />
        {/*OTHERWISE*/}
        <Route path="" component={NotFound} />
        {/*<Redirect to={{ pathname: ROUTES.USERS_LIST.LINK() }} />*/}
      </Switch>
    </Layout>;
});
