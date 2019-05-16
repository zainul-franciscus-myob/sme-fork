import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTotals } from '../bankingSelectors/splitAllocationSelectors';

const SplitAllocationTotals = (props) => {
  const {
    totals: {
      totalAllocated,
      totalUnallocated,
    },
  } = props;

  return (
    <LineItemTable.Total>
      <LineItemTable.Totals title="Total allocated" amount={totalAllocated} />
      <LineItemTable.Totals totalAmount title="Unallocated" amount={totalUnallocated} />
    </LineItemTable.Total>
  );
};

SplitAllocationTotals.propTypes = {
  totals: PropTypes.shape({
    totalAllocated: PropTypes.string,
    totalUnallocated: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  totals: getTotals(state),
});

export default connect(mapStateToProps)(SplitAllocationTotals);
