
// outsource dependencies
import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// local dependencies
import { EducationSystemEdit } from './edit';
import { EducationSystemsList } from './list';
import { EDUCATION_SYSTEMS_LIST, EDUCATION_SYSTEM_EDIT } from '../../../constants';


export const EducationSystems = memo(function EducationSystems () {

  return <Switch>
    <Route path={EDUCATION_SYSTEM_EDIT.ROUTE} component={EducationSystemEdit} />
    <Route path={EDUCATION_SYSTEMS_LIST.ROUTE} component={EducationSystemsList} />
    <Redirect to={{ pathname: EDUCATION_SYSTEMS_LIST.LINK() }} />
  </Switch>;
});
