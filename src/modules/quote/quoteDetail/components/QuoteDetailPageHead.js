import { Button, Icons, Label, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionsDisabled,
  getIsCreating,
  getIsOpenAndExpired,
  getIsReadOnly,
  getPageTitle,
  getStatus,
  getTotals,
} from '../selectors/QuoteDetailSelectors';
import TotalsHeaderItemFormattedCurrency from '../../../../components/TotalsHeader/TotalsHeaderItemFormattedCurrency';

const QuoteDetailPageHead = ({
  isCreating,
  isActionsDisabled,
  isOpenAndExpired,
  isReadOnly,
  status,
  totals: { totalAmount },
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

  const statusLabelColour = () => {
    switch (status) {
      case 'Open':
        return isOpenAndExpired ? 'orange' : 'light-grey';
      case 'Accepted':
        return 'green';
      case 'Declined':
        return 'red';
      case 'Invoiced':
        return 'light-grey';
      default:
        return 'default';
    }
  };

  return (
    <TotalsHeader
      title={pageTitle}
      totalItems={totalItems}
      actions={actions}
      tag={
        <div>
          <Label type="boxed" color={statusLabelColour()}>
            {status}
          </Label>
        </div>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  status: getStatus(state),
  isOpenAndExpired: getIsOpenAndExpired(state),
  isCreating: getIsCreating(state),
  isActionsDisabled: getIsActionsDisabled(state),
  totals: getTotals(state),
  pageTitle: getPageTitle(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(QuoteDetailPageHead);
