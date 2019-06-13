import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableData, getTotalsAndAmounts } from '../invoiceServiceSelectors';
import InvoiceServiceTableRow from './InvoiceServiceTableRow';

const labels = ['Description', 'Allocate to', 'Tax type', 'Amount'];

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

const InvoiceServiceTable = ({
  tableData,
  totalsAndAmounts,
  onUpdateRow,
  onAddRow,
  onRowInputBlur,
  onRemoveRow,
}) => {
  const {
    subTotal,
    totalTax,
    totalAmount,
    amountPaid,
    amountDue,
  } = totalsAndAmounts;

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
        <LineItemTable.Totals title="Subtotal" amount={`$${subTotal}`} />
        <LineItemTable.Totals title="Tax" amount={`$${totalTax}`} />
        <LineItemTable.Totals totalAmount title="Total" amount={`$${totalAmount}`} />
        <LineItemTable.Totals />
        <LineItemTable.Totals title="Amount paid" amount={`$${amountPaid}`} />
        <LineItemTable.Totals title="Amount due" amount={`$${amountDue}`} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

InvoiceServiceTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  totalsAndAmounts: PropTypes.shape().isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  totalsAndAmounts: getTotalsAndAmounts(state),
});

export default connect(mapStateToProps)(InvoiceServiceTable);
