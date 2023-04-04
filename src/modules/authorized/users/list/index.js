
// outsource dependencies
import _ from 'lodash';
import dayjs from 'dayjs';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button, Table, Alert, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

// local dependencies
import { usersListCtrl } from './controller';
import { humanize, } from '../../../../services';
import { USERS_EDIT, USERS_LIST } from '../../../../constants';
import { AlertError, Preloader, SearchInput, SortBy, PlusIcon, Pagination, EllipsisHIcon, EditIcon, TrashIcon, PageSize } from '../../../../components';


// configure
const dateFormat = 'MMM D, YYYY h:mm A';

export const UserList = memo(function UserList () {
  const [
    { initialized, disabled, errorMessage, list, search, state, size, sortF, sortD, page, totalPages },
    { initialize, updateCtrl, deleteItem, updateFilter }
  ] = useController(usersListCtrl);

  useEffect(() => { initialize({}); }, [initialize]);

  const prepared = useMemo(() => _.map(list, item => ({
    ...item,
    onDelete: () => deleteItem(item),
    state: humanize(_.get(item, 'state')),
    gender: humanize(_.get(item, 'gender')),
    createdDate: dayjs(_.get(item, 'createdDate')).format(dateFormat),
    name: `${_.get(item, 'firstName', '...')} ${_.get(item, 'lastName') || ''}`,
  })), [list, deleteItem]);

  const userState = useMemo(() => ({
    selected: humanize(_.find(Object.keys(USERS_LIST.USER_STATE_FILTER), key => USERS_LIST.USER_STATE_FILTER[key] === state) || '...'),
    list: _.map(Object.keys(USERS_LIST.USER_STATE_FILTER), key => ({
      id: key,
      name: humanize(key),
      disabled: USERS_LIST.USER_STATE_FILTER[key] === state,
      onClick: () => updateFilter({ page: 0, state: USERS_LIST.USER_STATE_FILTER[key] })
    })),
  }), [updateFilter, state]);

  // NOTE prepare actions
  const handleChangePage = useCallback(page => updateFilter({ page }), [updateFilter]);
  const handleChangeSize = useCallback(size => updateFilter({ size }), [updateFilter]);
  const handleChangeSearch = useCallback(search => updateCtrl({ search }), [updateCtrl]);
  const handleSort = useCallback(sort => updateFilter({ page: 0, ...sort }), [updateFilter]);
  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);
  const handleClear = useCallback(() => updateFilter({ page: 0, search: '' }), [updateFilter]);
  const handleApply = useCallback(() => updateFilter({ page: 0, search }), [updateFilter, search]);

  return <Container fluid id="UserList" className={cn('user-list', { 'no-events': disabled })}>
    <Row className="border-bottom mb-3">
      <Col tag="h2"> List of Users </Col>
    </Row>
    <Row>
      <Col active tag={AlertError} message={errorMessage} onClear={handleClearError} className="animated fadeIn" xs={{ size: 10, offset: 1 }} />
    </Row>
    <Row className="d-flex align-items-center border-bottom mb-3 pb-3">
      <Col xs="5">
        <SearchInput value={search} onApply={handleApply} onClear={handleClear} onChange={handleChangeSearch} />
      </Col>
      <Col xs="auto" className="d-flex flex-row flex-grow-1">
        <UncontrolledDropdown className="me-3">
          <DropdownToggle caret> { userState.selected } State </DropdownToggle>
          <DropdownMenu>
            { _.map(userState.list, ({ id, name, disabled, onClick }) => <DropdownItem key={id} disabled={disabled} onClick={onClick}>
              { name }
            </DropdownItem>) }
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
      <Col xs="auto" className="text-end">
        <Button to={USERS_EDIT.LINK({})} tag={Link} color="primary" className="rounded-pill text-white">
          <PlusIcon className="me-2" /> CREATE
        </Button>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col xs="12" className="container-scrollable-table">
        <Preloader active={!initialized}>
          <Table bordered striped>
            <thead><tr>
              <th>
                <SortBy field="firstName" sortF={sortF} sortD={sortD} onChange={handleSort}>
                  <strong className="text-primary"> User Name </strong>
                </SortBy>
              </th>
              <th>
                <SortBy field="email" sortF={sortF} sortD={sortD} onChange={handleSort}>
                  <strong className="text-primary"> Email </strong>
                </SortBy>
              </th>
              <th>
                <SortBy field="gender" sortF={sortF} sortD={sortD} onChange={handleSort}>
                  <strong className="text-primary"> Gender </strong>
                </SortBy>
              </th>
              <th>
                <SortBy field="createdDate" sortF={sortF} sortD={sortD} onChange={handleSort}>
                  <strong className="text-primary"> Created date </strong>
                </SortBy>
              </th>
              <th>
                <SortBy disabled field="state" sortF={sortF} sortD={sortD} onChange={handleSort}>
                  <strong className="text-primary"> Status </strong>
                </SortBy>
              </th>
              <th style={{ width: '1%' }}> </th>
            </tr></thead>
            <tbody>
              { _.size(prepared) < 1 ? <tr>
                <td colSpan="6">
                  <Alert color="chrome" className="empty-table-message"> No results found </Alert>
                </td>
              </tr> : _.map(prepared, ({ id, name, gender, createdDate, state, email, onDelete }) => <tr key={id}>
                <td className="text-truncate"> { name } </td>
                <td className="text-truncate"> { email } </td>
                <td className="text-nowrap"> { gender } </td>
                <td className="text-nowrap"> { createdDate } </td>
                <td className="text-nowrap"> { state } </td>
                <td className="va-middle p-0">
                  <UncontrolledDropdown>
                    <DropdownToggle color="none" size="lg">
                      <EllipsisHIcon />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag={Link} className="py-2" to={USERS_EDIT.LINK({ id })}>
                        <EditIcon size="lg" className="me-2 text-primary" /> Edit
                      </DropdownItem>
                      <DropdownItem onClick={onDelete} className="py-2">
                        <TrashIcon size="lg" className="me-2 text-danger" /> Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>) }
            </tbody>
          </Table>
        </Preloader>
      </Col>
    </Row>
    <Row>
      <Col xs="auto" className="text-center flex-grow-1">
        <Pagination value={page} totalPages={totalPages} className="d-inline-block" onChange={handleChangePage} />
      </Col>
      <Col xs="auto">
        <PageSize value={size} onChange={handleChangeSize} direction="up" />
      </Col>
    </Row>
  </Container>;
});
