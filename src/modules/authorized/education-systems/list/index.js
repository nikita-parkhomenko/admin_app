
// outsource dependencies
import _ from 'lodash';
import dayjs from 'dayjs';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button, Table, Alert, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

// local dependencies
import { educationSystemsListCtrl } from './controller';
import { EDUCATION_SYSTEM_EDIT, NEW_ID } from '../../../../constants';
import { useEditEducationSystemModal } from '../../layout/modals/edit-education-system';
import { AlertError, Preloader, SearchInput, SortBy, PlusIcon, Pagination, EllipsisHIcon, EditIcon, TrashIcon, PageSize } from '../../../../components';


// configure
const dateFormat = 'MMM D, YYYY h:mm A';

export const EducationSystemsList = memo(function EducationSystemsList () {
  const [
    { initialized, disabled, errorMessage, list, search, size, sortF, sortD, page, totalPages },
    { initialize, updateCtrl, deleteItem, updateFilter }
  ] = useController(educationSystemsListCtrl);

  useEffect(() => { initialize({}); }, [initialize]);
  const [initEducationSystemModal] = useEditEducationSystemModal();

  const prepared = useMemo(() => _.map(list, item => ({
    ...item,
    onDelete: () => deleteItem(item),
    createdDate: dayjs(_.get(item, 'createdDate')).format(dateFormat),
  })), [list, deleteItem]);

  // NOTE prepare actions
  const handleChangePage = useCallback(page => updateFilter({ page }), [updateFilter]);
  const handleChangeSize = useCallback(size => updateFilter({ size }), [updateFilter]);
  const handleChangeSearch = useCallback(search => updateCtrl({ search }), [updateCtrl]);
  const handleSort = useCallback(sort => updateFilter({ page: 0, ...sort }), [updateFilter]);
  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);
  const handleClear = useCallback(() => updateFilter({ page: 0, search: '' }), [updateFilter]);
  const handleApply = useCallback(() => updateFilter({ page: 0, search }), [updateFilter, search]);
  const handleOpenEducationModal = useCallback(() => initEducationSystemModal({ id: NEW_ID }), [initEducationSystemModal]);

  return <Container fluid id="EducationSystemsList" className={cn('education-systems-list', { 'no-events': disabled })}>
    <Row className="border-bottom mb-3">
      <Col tag="h2"> Education Systems </Col>
    </Row>
    <Row>
      <Col active tag={AlertError} message={errorMessage} onClear={handleClearError} className="animated fadeIn" xs={{ size: 10, offset: 1 }} />
    </Row>
    <Row className="d-flex justify-content-between align-items-center border-bottom mb-3 pb-3">
      <Col xs="5">
        <SearchInput value={search} onApply={handleApply} onClear={handleClear} onChange={handleChangeSearch} />
      </Col>
      <Col xs="auto" className="text-end">
        <Button onClick={handleOpenEducationModal} color="primary" className="rounded-pill text-white">
          <PlusIcon className="me-2" /> CREATE
        </Button>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col xs="12" className="container-scrollable-table">
        <Preloader active={!initialized}>
          <Table striped>
            <thead>
              <tr>
                <th>
                  <SortBy field="name" sortF={sortF} sortD={sortD} onChange={handleSort}>
                    <strong className="text-primary"> Name </strong>
                  </SortBy>
                </th>
                <th>
                  <SortBy field="language" sortF={sortF} sortD={sortD} onChange={handleSort}>
                    <strong className="text-primary"> Language </strong>
                  </SortBy>
                </th>
                <th>
                  <SortBy field="id" sortF={sortF} sortD={sortD} onChange={handleSort}>
                    <strong className="text-primary"> Id </strong>
                  </SortBy>
                </th>
                <th>
                  <SortBy field="createdDate" sortF={sortF} sortD={sortD} onChange={handleSort}>
                    <strong className="text-primary"> Created date </strong>
                  </SortBy>
                </th>
                <th style={{ width: '1%' }}> </th>
              </tr>
            </thead>
            <tbody>
              { _.size(prepared) < 1 ? <tr>
                <td colSpan="6">
                  <Alert color="chrome" className="empty-table-message"> No results found </Alert>
                </td>
              </tr> : _.map(prepared, ({ id, name, createdDate, language, onDelete }) => <tr key={id}>
                <td className="text-truncate"> { name } </td>
                <td className="text-truncate"> { language } </td>
                <td className="text-nowrap"> { id } </td>
                <td className="text-nowrap"> { createdDate } </td>
                <td className="va-middle p-0">
                  <UncontrolledDropdown>
                    <DropdownToggle color="none" size="lg">
                      <EllipsisHIcon />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag={Link} className="py-2" to={EDUCATION_SYSTEM_EDIT.LINK({ id })}>
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
