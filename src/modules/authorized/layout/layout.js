
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies
import { Header } from './app-header';
import { Sidebar } from './sidebar';

export const Layout = memo(function Layout ({ className, children }) {
  return <div id="Layout" className={cn('layout', className)}>
    <div className="d-flex vh-100">
      <Sidebar />
      <main id="content">
        <Header />
        <div className="hide-scroll-bar">
          { children }
        </div>
      </main>
    </div>
  </div>;
});
Layout.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string
};
Layout.defaultProps = {
  className: null
};
