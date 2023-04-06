
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Container } from 'reactstrap';

// local dependencies

export const EducationSystemEdit = memo(function EducationSystemEdit ({ className }) {
  return <Container fluid id="EducationSystemEdit" className={cn('education-system-edit', className)}>
    <h1> Edit </h1>
  </Container>;
});

EducationSystemEdit.propTypes = {
  className: PropTypes.string,
};
EducationSystemEdit.defaultProps = {
  className: '',
};
