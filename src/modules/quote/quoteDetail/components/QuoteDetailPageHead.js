import { Button, Icons, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsCreating,
  getIsReadOnlyLayout,
  getPageTitle,
  getTotalAmount,
} from '../selectors/QuoteDetailSelectors';

const QuoteDetailPageHead = ({
  isCreating,
  isActionsDisabled,
  isReadOnlyLayout,
  totalAmount,
  pageTitle,
  onConvertToInvoiceButtonClick,
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
      disabled={isActionsDisabled || isReadOnlyLayout}
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
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(QuoteDetailPageHead);
