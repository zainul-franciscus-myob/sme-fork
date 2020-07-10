import React from 'react';

import warningIcon from './asset/icon-warning.svg';

const WarningIcon = ({ className, alt }) => (
  <img src={warningIcon} className={className} alt={alt || 'Warning.'} />
);

export default WarningIcon;
