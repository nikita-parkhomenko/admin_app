
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useState, useCallback, useMemo } from 'react';

// local dependencies
import owl from './owl.svg';
import appLogo from './app-logo.svg';
import defImg from './def-image.svg';
import owlStars from './owl-stars.svg';
import defAvatar from './def-avatar.svg';
import mailLetter from './mail-letter.svg';
import owlQuestion from './owl-question.svg';
import keyPeopleLogo from './key-people-logo.png';

import { config } from '../../constants';
import { isS3RelativePath } from '../../services';

// eslint-disable-next-line max-len
export const DefImage = memo(function DefImage ({ src, defaultSrc, alt, defaultAlt, title, defaultTitle, defaultStyle, style, className, defaultClassName, ...attr }) {
  const validSrc = useMemo(() => {
    if (isS3RelativePath(src)) return `${config('CLOUD_AWS_BUCKET', '')}${src}`;
    return src;
  }, [src]);

  const [isError, setIsError] = useState(false);
  const handleOnError = useCallback(() => setIsError(true), []);

  return <img
    onError={handleOnError}
    alt={alt || defaultAlt}
    title={title || defaultTitle}
    className={cn(defaultClassName, className)}
    style={Object.assign({}, defaultStyle, style)}
    src={isError ? defaultSrc : (validSrc || defaultSrc)}
    {...attr}
  />;
});

DefImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  defaultSrc: PropTypes.string,
  defaultAlt: PropTypes.string,
  defaultTitle: PropTypes.string,
  defaultStyle: PropTypes.object,
  defaultClassName: PropTypes.string,
};
DefImage.defaultProps = {
  src: null,
  alt: null,
  title: null,
  style: {},
  className: null,
  defaultTitle: '',
  defaultStyle: {},
  defaultSrc: defImg,
  defaultAlt: 'image',
  defaultClassName: 'img-fluid',
};

export const Avatar = memo(function Avatar (props) {
  return <DefImage
    defaultAlt="User"
    defaultTitle="User"
    defaultSrc={defAvatar}
    defaultClassName="avatar img-fluid rounded-circle"
    {...props}
  />;
});

export const AppLogo = memo(function AppLogo (props) {
  return <DefImage
    defaultSrc={appLogo}
    defaultAlt="App Logo"
    defaultTitle="App Logo"
    defaultClassName="logo"
    { ...props }
  />;
});

export const MailLetterImage = memo(function MailLetterImage (props) {
  return <DefImage
    defaultAlt="Letter"
    defaultTitle="Letter"
    defaultSrc={mailLetter}
    {...props}
  />;
});


export const OwlImage = memo(function OwlImage (props) {
  return <DefImage
    defaultAlt="Owl"
    defaultTitle="Owl"
    defaultSrc={owl}
    {...props}
  />;
});

export const OwlQuestionImage = memo(function OwlQuestionImage (props) {
  return <DefImage
    defaultAlt="Owl with question"
    defaultTitle="Owl with question"
    defaultSrc={owlQuestion}
    {...props}
  />;
});

export const OwlStarsImage = memo(function OwlStarsImage (props) {
  return <DefImage
    defaultAlt="Owl with stars"
    defaultTitle="Owl with stars"
    defaultSrc={owlStars}
    {...props}
  />;
});

export const KeyPeopleLogo = memo(function KeyPeopleLogo (props) {
  return <DefImage
    defaultAlt="Historical figure"
    defaultTitle="Historical figure"
    defaultSrc={keyPeopleLogo}
    {...props}
  />;
});
