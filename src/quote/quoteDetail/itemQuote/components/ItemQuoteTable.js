import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEmptyQuoteLines, getTotals } from '../ItemQuoteSelectors';
import ItemQuoteTableRow from './ItemQuoteTableRow';

const renderRow = onTableRowAmountInputBlur => (index, data, onChange) => (
  <ItemQuoteTableRow
    index={index}
    key={index}
    onChange={onChange}
    onTableRowAmountInputBlur={onTableRowAmountInputBlur}
  />
);

const ItemQuoteTable = ({
  totals,
  emptyQuoteLines,
  onAddTableRow,
  onChangeTableRow,
  onRemoveTableRow,
  onTableRowAmountInputBlur,
}) => (
  <LineItemTable
    labels={['Item number', 'Item name', 'Units', 'Unit price ($)', 'Discount (%)', 'Amount ($)', 'Tax code']}
    data={emptyQuoteLines}
    renderRow={renderRow(onTableRowAmountInputBlur)}
    onAddRow={onAddTableRow}
    onRowChange={onChangeTableRow}
    onRemoveRow={onRemoveTableRow}
    onTableRowAmountInputBlur={onTableRowAmountInputBlur}
  >
    <LineItemTable.Total>
      <LineItemTable.Totals title="Net amount" amount={totals.subTotal} />
      <LineItemTable.Totals title="Tax" amount={totals.totalTax} />
      <LineItemTable.Totals totalAmount title="Total amount" amount={totals.totalAmount} />
    </LineItemTable.Total>
  </LineItemTable>
);

const mapStateToProps = state => ({
  emptyQuoteLines: getEmptyQuoteLines(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(ItemQuoteTable);
