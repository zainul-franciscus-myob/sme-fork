import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableData } from '../selectors/billSelectors';
import BillTableTotals from './BillTableTotals';

const handleAddRow = handler => e => handler(e);

const handleRowChange = handler => (index, key, value) => (
  handler({ index, key, value })
);

const handleRemoveRow = handler => index => handler({ index });

const BillItemTable = ({
  tableData,
  headerItems,
  labels,
  columnConfig,
  renderRow,
  onAddRow,
  onRowChange,
  onRemoveRow,
  onUpdateBillOption,
  onAmountPaidBlur,
}) => (
  <LineItemTable
    labels={labels}
    renderRow={renderRow}
    data={tableData}
    onAddRow={handleAddRow(onAddRow)}
    onRowChange={handleRowChange(onRowChange)}
    onRemoveRow={handleRemoveRow(onRemoveRow)}
    columnConfig={columnConfig}
    headerItems={headerItems}
  >
    <BillTableTotals
      onUpdateBillOption={onUpdateBillOption}
      onAmountPaidBlur={onAmountPaidBlur}
    />
  </LineItemTable>
);

const mapStateToProps = state => ({
  tableData: getTableData(state),
});

export default connect(mapStateToProps)(BillItemTable);
