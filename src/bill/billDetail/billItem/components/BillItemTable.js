import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getBillLinesArray,
  getTotals,
} from '../billItemSelectors';
import BillItemTableRow from './BillItemTableRow';

const labels = ['Units', 'Item', 'Description', 'Unit Price ($)', 'Discount (%)', 'Tax Type', 'Amount ($)'];

const renderRow = onLineInputBlur => (index, data, onChange) => (
  <BillItemTableRow
    index={index}
    key={index}
    onChange={onChange}
    onLineInputBlur={onLineInputBlur}
  />
);

const BillItemTable = ({
  billLines,
  totals,
  onAddTableLine,
  onChangeTableRow,
  onRemoveTableRow,
  onLineInputBlur,
}) => (
  <LineItemTable
    labels={labels}
    renderRow={renderRow(onLineInputBlur)}
    data={billLines}
    onAddRow={onAddTableLine}
    onRowChange={onChangeTableRow}
    onRemoveRow={onRemoveTableRow}
  >
    <LineItemTable.Total>
      <LineItemTable.Totals title="Subtotal" amount={totals.subTotal} />
      <LineItemTable.Totals title="Tax" amount={totals.totalTax} />
      <LineItemTable.Totals totalAmount title="Total" amount={totals.totalAmount} />
    </LineItemTable.Total>
  </LineItemTable>
);

BillItemTable.propTypes = {
  billLines: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  totals: PropTypes.shape().isRequired,
  onAddTableLine: PropTypes.func.isRequired,
  onChangeTableRow: PropTypes.func.isRequired,
  onRemoveTableRow: PropTypes.func.isRequired,
  onLineInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  billLines: getBillLinesArray(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(BillItemTable);
