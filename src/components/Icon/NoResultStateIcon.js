import React from 'react';

import noResultStateImg from './asset/no-results-state.svg';

const NoResultStateIcon = ({ className, alt }) => (
  <img
    src={noResultStateImg}
    className={className}
    alt={alt || 'No transaction found.'}
  />
);

export default NoResultStateIcon;
