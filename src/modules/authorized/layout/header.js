
// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { memo, useCallback } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { useControllerActions } from 'redux-saga-controller';
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// local dependencies
import { useSelf } from '../../hooks';
import { Avatar } from '../../../assets';
import { appRootCtrl } from '../../controller';
import { UserCogIcon, UserIcon, ArrowRightIcon, SignOutIcon, BarsIcon } from '../../../components';

export const Header = memo(function Header ({ className }) {
  const { signOut } = useControllerActions(appRootCtrl);
  const { toggleSidebar } = useProSidebar();

  const self = useSelf();
  const email = _.get(self, 'email');
  const imageUrl = _.get(self, 'imageUrl');
  const firstName = _.get(self, 'firstName');
  const lastName = _.get(self, 'lastName');

  // prepare actions
  const handleComingSoon = useCallback(() => toast.warn('Coming soon!'), []);

  return <header id="Header">
    <div className="d-flex justify-content-between justify-content-lg-end w-100 px-3 pt-3">
      <Button
        color="none"
        onClick={() => toggleSidebar()}
        className="d-lg-none px-0 me-2 me-sm-3 border-0 d-flex align-items-center"
      >
        <BarsIcon size="lg" />
      </Button>
      <UncontrolledDropdown>
        <DropdownToggle caret color="transparent" className="header-btn shadow-sm d-flex align-items-center">
          <p className="mb-0 me-2 text-muted"> {firstName} {lastName} </p>
          <UserIcon className="me-2" />
        </DropdownToggle>
        <DropdownMenu className="border-0 shadow-sm">
          <DropdownItem header className="d-flex align-items-center py-3">
            <Avatar src={imageUrl} className="avatar-img me-3" />
            <div>
              <p className="mb-0"> {firstName} {lastName} </p>
              <small className="text-muted"> {email} </small>
            </div>
          </DropdownItem>
          <DropdownItem onClick={handleComingSoon} className="py-3 border-top d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <UserCogIcon className="me-2" />
              <span> Profile Settings </span>
            </div>
            <ArrowRightIcon />
          </DropdownItem>
          <DropdownItem onClick={signOut} className="py-3 border-top d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <SignOutIcon className="me-2" />
              <span> Log out </span>
            </div>
            <ArrowRightIcon />
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  </header>;
});

Header.propTypes = {
  className: PropTypes.string,
};
Header.defaultProps = {
  className: '',
};
