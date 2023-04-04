
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies

export const CircleProgress = memo(function CircleProgress ({ className, percentage, ...props }) {
  return <svg viewBox="0 0 36 36" className={cn('circle-progress', className)} {...props}>
    <path
      className="circle-bg"
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path
      className="circle"
      strokeDasharray={`${percentage}, 100`}
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="21" className="percentage"> {percentage}% </text>
  </svg>;
});

CircleProgress.propTypes = {
  className: PropTypes.string,
  percentage: PropTypes.number.isRequired,
};
CircleProgress.defaultProps = {
  className: '',
};
