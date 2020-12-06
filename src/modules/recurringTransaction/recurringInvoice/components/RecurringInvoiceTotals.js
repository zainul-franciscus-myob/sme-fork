import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRecurringInvoiceTotals } from '../selectors/RecurringInvoiceSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';

const RecurringInvoiceTotals = ({
  subTotal,
  totalTax,
  totalAmount,
  taxLabel,
  showFreight,
  freightAmount,
  freightTaxCode,
}) => (
  <LineItemTable.Total>
    <LineItemTableTotalsFormattedCurrency title="Subtotal" amount={subTotal} />
    {showFreight && (
      <LineItemTableTotalsFormattedCurrency
        title="Freight"
        amount={freightAmount}
        note={freightTaxCode}
      />
    )}
    <LineItemTableTotalsFormattedCurrency title={taxLabel} amount={totalTax} />
    <LineItemTableTotalsFormattedCurrency
      title="Total"
      totalAmount
      amount={totalAmount}
    />
  </LineItemTable.Total>
);

const mapStateToProps = (state) => getRecurringInvoiceTotals(state);

export default connect(mapStateToProps)(RecurringInvoiceTotals);
