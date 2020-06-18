import { Button, Icons, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsCreating,
  getIsReadOnly,
  getPageTitle,
  getTotals,
} from '../selectors/QuoteDetailSelectors';
import TotalsHeaderItemFormattedCurrency
  from '../../../../components/TotalsHeader/TotalsHeaderItemFormattedCurrency';

const QuoteDetailPageHead = ({
  isCreating,
  isActionsDisabled,
  isReadOnly,
  totals: {
    totalAmount,
  },
  pageTitle,
  onConvertToInvoiceButtonClick,
}) => {
  const totalItems = !isCreating && [
    <TotalsHeaderItemFormattedCurrency
      key="totalAmount"
      label="Total amount"
      count={totalAmount}
    />,
  ];

  const actions = !isCreating && [
    <Button
      key="convertToInvoice"
      type="link"
      icon={<Icons.ReopenedDocument />}
      disabled={isActionsDisabled || isReadOnly}
      onClick={onConvertToInvoiceButtonClick}
    >
      Convert to invoice
    </Button>,
  ];

  return <TotalsHeader title={pageTitle} totalItems={totalItems} actions={actions} />;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
  totals: getTotals(state),
  pageTitle: getPageTitle(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(QuoteDetailPageHead);
