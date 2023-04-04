
export const NEW_ID = 'new';

export const APP_TITLE = 'Djema';

export const IMG_DIR = {
  DEFAULT: 'DEFAULT',
  USER: 'USER',
};

export const ACCOUNT_TYPE = {
  STUDENT: 'STUDENT',
  MENTOR: 'MENTOR',
  PARENT: 'PARENT',
};

export const GENDER = {
  MALE: 'MALE',
  OTHER: 'OTHER',
  FEMALE: 'FEMALE',
};

export const USER_STATE = {
  INACTIVE: 'INACTIVE',               // user was deleted from the system
  CREATED: 'CREATED',                 // user created but does not finish sign up wizard
  PENDING: 'PENDING',                 // user was created pass sign up but does not confirm email
  ACTIVE: 'ACTIVE',                   // user was created pass sign up and confirm email
};

export const DIR = {
  LANDING: 'LANDING',       // public images for landing page
  DOCUMENT: 'DOCUMENT',     // wtf ???
  DEFAULT: 'DEFAULT',       // wtf ???
  USER: 'USER',             // user pics
};

// NOTE common rules for pics aspect ratio
export const ASPECT = {
  VIDEO: 16 / 9,
  USER_PROFILE: 1,
  SUBJECT: 18/9.8,
  DASHBOARD_IMAGES: 16/10.5,
};

export const CURRENCY = {
  USD: 'USD',               // US Dollar
  EUR: 'EUR',               // Euro
};

export const ACCEPTED_FILE_TYPES = {
  IMAGES: ['image/jpe', 'image/jpg', 'image/jpeg', 'image/png'],
  VIDEOS: ['video/*'],
};

export const CART_TYPE = {
  STREAM: 'STREAM',
  DONATION: 'DONATION',
};

export const NOTIFICATION_TYPE = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  UNREAD_NOTIFICATION_COUNTER: 'UNREAD_NOTIFICATION_COUNTER',
};

export const QUESTION_TYPE = {
  MULTIPLE: 'MULTIPLE',
  ONE_ANSWER: 'ONE_ANSWER',
};
