
// outsource dependencies
import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// local dependencies
import { UserEdit } from './edit';
import { UserList } from './list';
import { USERS_LIST, USERS_EDIT } from '../../../constants';

export const Users = memo(function Users () {

  return <Switch>
    <Route path={USERS_EDIT.ROUTE} component={UserEdit} />
    <Route path={USERS_LIST.ROUTE} component={UserList} />
    <Redirect to={{ pathname: USERS_LIST.LINK() }} />
  </Switch>;
});
