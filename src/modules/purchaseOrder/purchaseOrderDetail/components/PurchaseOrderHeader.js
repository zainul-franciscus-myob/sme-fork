import { TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsCreating,
  getPageTitle,
  getTotals,
} from '../selectors/purchaseOrderSelectors';
import TotalsHeaderItemFormattedCurrency from '../../../../components/TotalsHeader/TotalsHeaderItemFormattedCurrency';

const PurchaseOrderHeader = ({
  isCreating,
  pageTitle,
  totals: { totalAmount },
}) => {
  if (isCreating) {
    return <TotalsHeader title={pageTitle} totalItems={[]} />;
  }

  return (
    <TotalsHeader
      title={pageTitle}
      totalItems={[
        <TotalsHeaderItemFormattedCurrency
          key="totalAmount"
          label="Total amount"
          count={totalAmount}
        />,
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  pageTitle: getPageTitle(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(PurchaseOrderHeader);
