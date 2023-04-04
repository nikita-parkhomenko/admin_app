
// outsource dependencies
import _ from 'lodash';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// local dependencies
import { Avatar } from '../../../assets';
import { useToggleAside } from '../../hooks';
import { appRootCtrl } from '../../controller';
import { USERS_EDIT } from '../../../constants';
import { UserCogIcon, BarsIcon, SignOutIcon } from '../../../components';

export const UserMenu = memo(function UserMenu ({ className }) {
  const [expanded, toggleAside] = useToggleAside();
  const { user: self } = useControllerData(appRootCtrl);
  const { signOut } = useControllerActions(appRootCtrl);

  const selfId = _.get(self, 'id');
  const selfName = _.get(self, 'name', '...');
  const selfAvatar = _.get(self, 'coverImage.url');

  return <UncontrolledDropdown id="UserMenu" inNavbar className={cn('user-menu', className)}>
    <DropdownToggle tag="button" className="btn btn-none dropdown-toggle">
      <strong> { selfName } </strong>&nbsp;
      <Avatar alt={selfName} src={selfAvatar} />
    </DropdownToggle>
    <DropdownMenu className="animated flipInX" dark>
      <DropdownItem header className="d-flex align-items-center m-0">
        <Avatar alt={selfName} src={selfAvatar} />
        <strong className="h4 m-0"> { selfName } </strong>&nbsp;
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem onClick={toggleAside}>
        <div className="d-flex flex-row align-items-center">
          <BarsIcon size="2x" className="text-success me-3" />
          <div className="media-body">
            <p className="m-0"> Toggle menu </p>
            <p className="m-0 text-muted text-sm">{expanded ? 'Collapse' : 'Expand' }</p>
          </div>
        </div>
      </DropdownItem>
      <DropdownItem tag={Link} to={USERS_EDIT.LINK({ id: selfId })}>
        <div className="d-flex flex-row align-items-center">
          <UserCogIcon size="2x" className="text-primary me-2" />
          <div className="media-body">
            <p className="m-0"> Settings </p>
            <p className="m-0 text-muted text-sm"> My profile </p>
          </div>
        </div>
      </DropdownItem>
      <DropdownItem onClick={signOut}>
        <div className="d-flex flex-row align-items-center">
          <SignOutIcon size="2x" className="text-danger me-3" />
          <div className="media-body">
            <p className="m-0"> Sign out </p>
            <p className="m-0 text-muted text-sm"> Destroy current session </p>
          </div>
        </div>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>;
});
UserMenu.propTypes = {
  className: PropTypes.string
};
UserMenu.defaultProps = {
  className: null
};
