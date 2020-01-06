import { Button, Icons, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsCreating,
  getPageTitle,
  getTotalAmount,
} from '../selectors/QuoteDetailSelectors';

const QuoteDetailPageHead = ({
  isCreating, isActionsDisabled, totalAmount, pageTitle, onConvertToInvoiceButtonClick,
}) => {
  const totalItems = !isCreating && [
    <TotalsHeader.TotalItem
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
      disabled={isActionsDisabled}
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
  totalAmount: getTotalAmount(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(QuoteDetailPageHead);
