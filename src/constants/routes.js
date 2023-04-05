
// outsource dependencies

// local dependencies
import { history } from './history';
import { Route } from '../services';
import { NEW_ID, USER_STATE } from './variables';


// NOTE Allow [Route].PUSH/REPLACE
Route.setHistory(history);
const defineRoute = (...args) => Route.create(...args);
// NOTE simplify formatting parameters of routs
const ANNOTATION = {
  // NOTE popular params
  ID: opt => ({ name: 'id', defaults: NEW_ID, ...opt }),
  TOKEN: opt => ({ name: 'token', defaults: 'invalid-token', ...opt }),
  // NOTE popular query
  SEARCH: opt => ({ short: 'se', name: 'search', defaults: '', ...opt }),
  PAGE: opt => ({ short: 'p', name: 'page', archive: Number, extract: Number, defaults: 0, ...opt }),
  SIZE: opt => ({ short: 's', name: 'size', archive: Number, extract: Number, defaults: 10, ...opt }),
  SORT_D: opt => ({ short: 'sd', name: 'sortD', archive: Number, extract: Boolean, defaults: false, ...opt }),
  SORT_F: opt => ({ short: 'sf', name: 'sortF', defaults: 'name', isValid: v => ['name'].indexOf(v) > -1, ...opt }),
};


// PUBLIC PAGES
export const SIGN_IN = defineRoute('/', { query: [
  { name: 'error', defaults: null }
] });
export const SIGN_UP = defineRoute('/sign-up');
export const FORGOT_PASSWORD = defineRoute('/forgot-password');
export const CHANGE_PASSWORD = defineRoute('/change-password/:token', {
  params: [ANNOTATION.TOKEN({})]
});
export const EMAIL_CONFIRMATION = defineRoute('/email-confirmation/:token', {
  params: [ANNOTATION.TOKEN({})]
});

// PROTECTED/PRIVATE PAGES
export const AUTHORIZED = '/authorized';

export const WELCOME_SCREEN = defineRoute(`${AUTHORIZED}/welcome`);

const USER_STATE_FILTER = Object.assign({}, USER_STATE, { ALL: '' });
export const USERS_LIST = defineRoute(`${AUTHORIZED}/users`, {
  query: [
    ANNOTATION.PAGE(),
    ANNOTATION.SIZE(),
    ANNOTATION.SEARCH(),
    ANNOTATION.SORT_D(),
    // TODO define list of available sort fields
    ANNOTATION.SORT_F({ defaults: 'createdDate', isValid: v => ['firstName', 'email', 'gender', 'createdDate', 'status'].indexOf(v) > -1 }),
    { short: 'usf', name: 'state', sValid: v => Object.values(USER_STATE_FILTER).includes(v), defaults: USER_STATE_FILTER.ALL },
  ],
});
USERS_LIST.USER_STATE_FILTER = USER_STATE_FILTER;

export const USERS_EDIT = defineRoute(`${USERS_LIST.ROUTE}/edit/:id`, {
  params: [ANNOTATION.ID()],
});

export const EDUCATION_SYSTEMS_LIST = defineRoute(`${AUTHORIZED}/education-systems`, {
  query: [
    ANNOTATION.PAGE(),
    ANNOTATION.SIZE(),
    ANNOTATION.SEARCH(),
    ANNOTATION.SORT_D(),
    // TODO define list of available sort fields
    ANNOTATION.SORT_F({ defaults: 'createdDate', isValid: v => ['name', 'language', 'id', 'createdDate'].indexOf(v) > -1 }),
  ],
});

export const EDUCATION_SYSTEM_EDIT = defineRoute(`${EDUCATION_SYSTEMS_LIST.ROUTE}/edit/:id`, {
  params: [ANNOTATION.ID()],
});
