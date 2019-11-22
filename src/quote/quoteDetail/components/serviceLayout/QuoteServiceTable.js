import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData, getTotals } from '../../selectors/QuoteDetailSelectors';
import QuoteServiceTableRow from './QuoteServiceTableRow';

const labels = ['Line description', 'Allocate to', 'Amount ($)', 'Tax code'];

const renderRow = (onRowInputBlurHandler, onAddAccount) => (index, data, onChange) => (
  <QuoteServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onAddAccount={onAddAccount}
    onRowInputBlur={onRowInputBlurHandler}
  />
);

const onRowChange = handler => (index, key, value) => handler({ index, key, value });

const onTableAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const onTableRemoveRow = handler => index => handler(index);

const QuoteServiceTable = ({
  tableData,
  totals,
  listeners: {
    onUpdateRow,
    onAddRow,
    onRemoveRow,
    onRowInputBlur,
    onAddAccountButtonClick,
  },
}) => {
  const {
    subTotal,
    totalTax,
    totalAmount,
  } = totals;

  return (
    <LineItemTable
      labels={labels}
      renderRow={renderRow(onRowInputBlur, onAddAccountButtonClick)}
      data={tableData}
      onAddRow={onTableAddRow(onAddRow)}
      onRowChange={onRowChange(onUpdateRow)}
      onRemoveRow={onTableRemoveRow(onRemoveRow)}
    >
      <LineItemTable.Total>
        <LineItemTable.Totals title="Net amount" amount={subTotal} />
        <LineItemTable.Totals title="Tax" amount={totalTax} />
        <LineItemTable.Totals totalAmount title="Total amount" amount={totalAmount} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(QuoteServiceTable);
