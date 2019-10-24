import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getItemLayoutTable,
} from '../../selectors/itemLayoutSelectors';
import InvoiceDetailTotals from '../InvoiceDetailTotals';
import InvoiceItemTableRow from './InvoiceItemTableRow';

const columnLabels = ['Units', 'Item', 'Description', 'Unit price', 'Discount', 'Amount ($)', 'Tax code'];

const renderRow = onLineInputBlur => (index, data, onChange) => (
  <InvoiceItemTableRow
    index={index}
    key={index}
    onChange={onChange}
    onLineInputBlur={onLineInputBlur}
  />
);

const InvoiceItemTable = ({
  invoiceLines,
  listeners: {
    onAddTableLine,
    onChangeTableRow,
    onRemoveTableRow,
    onLineInputBlur,
    onChangeAmountToPay,
  },
}) => (
  <LineItemTable
    labels={columnLabels}
    renderRow={renderRow(onLineInputBlur)}
    data={invoiceLines}
    onAddRow={onAddTableLine}
    onRowChange={onChangeTableRow}
    onRemoveRow={onRemoveTableRow}
  >
    <InvoiceDetailTotals onChange={onChangeAmountToPay} />
  </LineItemTable>
);

const mapStateToProps = state => ({
  invoiceLines: getItemLayoutTable(state),
});

export default connect(mapStateToProps)(InvoiceItemTable);
