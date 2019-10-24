import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData } from '../../selectors/serviceLayoutSelectors';
import InvoiceDetailTotals from '../InvoiceDetailTotals';
import InvoiceServiceTableRow from './InvoiceServiceTableRow';

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

const InvoiceServiceTable = ({
  tableData,
  listeners: {
    onUpdateRow,
    onAddRow,
    onRowInputBlur,
    onRemoveRow,
    onChangeAmountToPay,
  },
}) => (
  <LineItemTable
    labels={labels}
    renderRow={renderRow(onRowInputBlur)}
    data={tableData}
    onAddRow={onTableAddRow(onAddRow)}
    onRowChange={onRowChange(onUpdateRow)}
    onRemoveRow={onTableRemoveRow(onRemoveRow)}
  >
    <InvoiceDetailTotals onChange={onChangeAmountToPay} />
  </LineItemTable>
);

const mapStateToProps = state => ({
  tableData: getTableData(state),
});

export default connect(mapStateToProps)(InvoiceServiceTable);
