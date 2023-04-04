
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Sidebar as SidebarPro, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

// local dependencies
import { AppLogo } from '../../../assets';
import { UserCogIcon, PlusIcon } from '../../../components';
import * as ROUTE from '../../../constants/routes';

export const Sidebar = memo(function Sidebar ({ className }) {
  const { collapseSidebar, collapsed } = useProSidebar();

  return <SidebarPro breakPoint="lg" className={cn('sidebar', className)}>
    <div className={cn('d-flex align-items-center mx-3 pt-3 mb-5', {
      'justify-content-between': !collapsed,
      'justify-content-center': collapsed,
    })}>
      <div className={cn('d-flex align-items-center', { 'd-none': collapsed })}>
        <AppLogo className="me-2" />
        <h2 className="h3 mb-0 fw-bold"> Djema </h2>
      </div>
      <Button color="transparent" className="border-0 text-center d-none d-lg-block" onClick={() => collapseSidebar()}>
        {collapsed ? <PlusIcon /> : <PlusIcon />}
      </Button>
    </div>
    <Menu>
      <MenuItem className="mb-2" icon={<UserCogIcon />} component={<NavLink to={ROUTE.USERS_LIST.LINK()} />}>
        Users
      </MenuItem >
    </Menu>
  </SidebarPro>;
});

Sidebar.propTypes = {
  className: PropTypes.string,
};
Sidebar.defaultProps = {
  className: '',
};
