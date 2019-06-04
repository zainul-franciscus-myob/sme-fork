import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableData, getTotals } from '../billServiceSelectors';
import BillServiceTableRow from './BillServiceTableRow';

const labels = ['Description', 'Allocate to', 'Tax type', 'Amount'];

const onAmountInputFieldChange = handler => e => (
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  })
);

const renderRow = onRowInputBlurHandler => (index, data, onChange) => (
  <BillServiceTableRow
    index={index}
    key={index}
    onChange={onChange}
    onRowInputBlur={() => onRowInputBlurHandler(index)}
    onComboboxChange={onChange}
    onAmountInputFieldChange={onAmountInputFieldChange(onChange)}
  />
);

const onRowChange = handler => (index, key, value) => handler({ index, key, value });

const onTableAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const onTableRemoveRow = handler => index => handler(index);

const BillServiceTable = ({
  tableData,
  totals,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
}) => {
  const {
    subTotal,
    totalTax,
    totalAmount,
  } = totals;

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
        <LineItemTable.Totals totalAmount title="Total" amount={totalAmount} />
      </LineItemTable.Total>
    </LineItemTable>
  );
};

BillServiceTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  totals: PropTypes.shape().isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(BillServiceTable);
