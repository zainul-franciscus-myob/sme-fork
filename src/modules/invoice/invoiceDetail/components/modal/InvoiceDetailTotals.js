import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailTotals } from '../../selectors/invoiceDetailSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';
import LineItemTableTotalsInput from '../../../../../components/LineItemTable/LineItemTableTotalsInput';

const onAmountInputChange = (handler) => (e) => handler(e.target.rawValue);

const InvoiceDetailTotals = ({
  subTotal,
  freightAmount,
  totalTax,
  totalAmount,
  amountPaid,
  amountDue,
  freightTaxCode,
  showFreight,
  isCreating,
  isPreConversion,
  onChange,
  taxLabel,
}) => {
  const amountPaidInputLine =
    isCreating && !isPreConversion ? (
      <LineItemTableTotalsInput
        name="amountPaid"
        label="Amount paid ($)"
        value={amountPaid}
        onChange={onAmountInputChange(onChange)}
      />
    ) : (
      <LineItemTableTotalsFormattedCurrency
        title="Amount paid"
        amount={amountPaid}
      />
    );

  return (
    <LineItemTable.Total>
      <LineItemTableTotalsFormattedCurrency
        title="Subtotal"
        amount={subTotal}
      />
      {showFreight && (
        <LineItemTableTotalsFormattedCurrency
          title="Freight"
          amount={freightAmount}
          note={freightTaxCode}
        />
      )}
      <LineItemTableTotalsFormattedCurrency
        title={taxLabel}
        amount={totalTax}
      />
      <LineItemTableTotalsFormattedCurrency
        title="Total"
        totalAmount
        amount={totalAmount}
      />
      {amountPaidInputLine}
      <LineItemTableTotalsFormattedCurrency
        title="Balance due"
        totalAmount
        amount={amountDue}
      />
    </LineItemTable.Total>
  );
};

const mapStateToProps = (state) => getInvoiceDetailTotals(state);

export default connect(mapStateToProps)(InvoiceDetailTotals);
