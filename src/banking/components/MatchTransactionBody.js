import PropTypes from 'prop-types';
import React from 'react';

import MatchTransactionOptions from './MatchTransactionOptions';
import MatchTransactionTable from './MatchTransactionTable';

const MatchTransactionBody = (props) => {
  const {
    onApplyMatchTransactionOptions,
    onUpdateMatchTransactionOptions,
    onSortMatchTransactions,
    onUpdateMatchTransactionSelection,
  } = props;

  return (
    <React.Fragment>
      <MatchTransactionOptions
        onApplyMatchTransactionOptions={onApplyMatchTransactionOptions}
        onUpdateMatchTransactionOptions={onUpdateMatchTransactionOptions}
      />
      <MatchTransactionTable
        onSortMatchTransactions={onSortMatchTransactions}
        onUpdateMatchTransactionSelection={onUpdateMatchTransactionSelection}
      />
    </React.Fragment>
  );
};

MatchTransactionBody.propTypes = {
  onApplyMatchTransactionOptions: PropTypes.func.isRequired,
  onUpdateMatchTransactionOptions: PropTypes.func.isRequired,
  onSortMatchTransactions: PropTypes.func.isRequired,
  onUpdateMatchTransactionSelection: PropTypes.func.isRequired,
};

export default MatchTransactionBody;
