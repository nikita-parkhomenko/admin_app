
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Nav, NavItem, Navbar } from 'reactstrap';

// local dependencies
import { UserMenu } from './user-menu';

export const Header = memo(function Header ({ className }) {

  return <Navbar id="Header" className={cn('header bg-black', className)}>
    <Nav className="flex-grow-1">
      <NavItem className="d-flex flex-grow-1">
        {/* actually it empty - fill free to implement more header features */}
      </NavItem>
      <NavItem className="flex-grow-0">
        <UserMenu />
      </NavItem>
    </Nav>
  </Navbar>;
});
Header.propTypes = {
  className: PropTypes.string
};
Header.defaultProps = {
  className: null
};
