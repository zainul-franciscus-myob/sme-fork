import React from 'react';

import emptyStateImg from './transaction-empty-state.svg';

const TransactionEmptyStateIcon = ({ className, alt }) => (
  <img
    src={emptyStateImg}
    className={className}
    alt={alt || 'No transaction found.'}
  />
);

export default TransactionEmptyStateIcon;
