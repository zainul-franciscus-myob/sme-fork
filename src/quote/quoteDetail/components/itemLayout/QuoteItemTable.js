import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData, getTotals } from '../../selectors/QuoteDetailSelectors';
import QuoteItemTableRow from './QuoteItemTableRow';

const renderRow = (onTableRowAmountInputBlur, onAddItemButtonClick) => (index, data, onChange) => (
  <QuoteItemTableRow
    index={index}
    key={index}
    onChange={onChange}
    onTableRowAmountInputBlur={onTableRowAmountInputBlur}
    onAddItemButtonClick={onAddItemButtonClick}
  />
);

const QuoteItemTable = ({
  totals,
  emptyQuoteLines,
  listeners: {
    onAddRow,
    onRemoveRow,
    onUpdateRow,
    onRowInputBlur,
    onAddItemButtonClick,
  },
}) => (
  <LineItemTable
    labels={['Item number', 'Item name', 'Units', 'Unit price ($)', 'Discount (%)', 'Amount ($)', 'Tax code']}
    data={emptyQuoteLines}
    renderRow={renderRow(onRowInputBlur, onAddItemButtonClick)}
    onAddRow={onAddRow}
    onRowChange={onUpdateRow}
    onRemoveRow={onRemoveRow}
    onTableRowAmountInputBlur={onRowInputBlur}
  >
    <LineItemTable.Total>
      <LineItemTable.Totals title="Net amount" amount={totals.subTotal} />
      <LineItemTable.Totals title="Tax" amount={totals.totalTax} />
      <LineItemTable.Totals totalAmount title="Total amount" amount={totals.totalAmount} />
    </LineItemTable.Total>
  </LineItemTable>
);

const mapStateToProps = state => ({
  emptyQuoteLines: getTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(QuoteItemTable);
