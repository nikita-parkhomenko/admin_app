
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies
import { Header } from './header';
import { Sidebar } from './sidebar';

export const Layout = memo(function Layout ({ className, children }) {
  return <div id="Layout" className={cn('layout', className)}>
    <Sidebar />
    <div className="w-100 h-100 overflow-scroll">
      <Header />
      <main className="content">
        {children}
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
