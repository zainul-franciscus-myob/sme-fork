import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountPaid, getIsCreating, getTableData, getTotalsAndAmounts,
} from '../invoiceServiceSelectors';
import InvoiceServiceTableRow from './InvoiceServiceTableRow';
import LineItemTableTotalsInput from '../../../../components/LineItemTable/LineItemTableTotalsInput';

const labels = ['Description', 'Account', 'Tax code', 'Amount ($)'];

const onRowChange = handler => (index, key, value) => handler({ index, key, value });

const onTableAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const onAmountInputFieldChange = handler => e => (
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  })
);

const renderRow = onRowInputBlurHandler => (index, data, onChange) => (
  <InvoiceServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onComboboxChange={onChange}
    onAmountInputFieldChange={onAmountInputFieldChange(onChange)}
    onRowInputBlur={() => onRowInputBlurHandler(index)}
  />
);

const onTableRemoveRow = handler => index => handler(index);

const onAmountInputChange = handler => e => handler(e.target.value);

const InvoiceServiceTable = ({
  tableData,
  totalsAndAmounts,
  onUpdateRow,
  onAddRow,
  onRowInputBlur,
  onRemoveRow,
  isCreating,
  createAmountToPay,
  onChangeAmountToPay,
}) => {
  const {
    subTotal,
    totalTax,
    totalAmount,
    amountPaid,
    amountDue,
  } = totalsAndAmounts;

  const amountPaidInputLine = () => (isCreating ? (
    <LineItemTableTotalsInput
      label="Amount paid"
      value={createAmountToPay}
      handler={onAmountInputChange(onChangeAmountToPay)}
    />
  ) : (
    <LineItemTable.Totals title="Amount paid" amount={amountPaid} />
  ));

  return (
    <LineItemTable
      labels={labels}
      renderRow={renderRow(onRowInputBlur)}
      data={tableData}
      onAddRow={onTableAddRow(onAddRow)}
      onRowChange={onRowChange(onUpdateRow)}
      onRemoveRow={onTableRemoveRow(onRemoveRow)}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Subtotal" amount={subTotal} />
        <LineItemTable.Totals title="Tax" amount={totalTax} />
        <LineItemTable.Totals title="Invoice total" amount={totalAmount} />
        {amountPaidInputLine()}
        <LineItemTable.Totals title="Balance due" amount={amountDue} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  totalsAndAmounts: getTotalsAndAmounts(state),
  isCreating: getIsCreating(state),
  createAmountToPay: getAmountPaid(state),
});

export default connect(mapStateToProps)(InvoiceServiceTable);
