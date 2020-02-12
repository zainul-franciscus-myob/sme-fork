import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNote, getTableData } from '../selectors/billSelectors';
import BillTableTotals from './BillTableTotals';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './BillLineItemTable.module.css';

const handleAddRow = handler => e => handler(e);

const handleRowChange = handler => (index, key, value) => (
  handler({ index, key, value })
);

const handleRemoveRow = handler => index => handler({ index });

const BillItemTable = ({
  tableData,
  headerItems,
  labels,
  note,
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
    <div className={styles.notesAndTotals}>
      <div className={styles.notes}>
        <TextArea
          name="note"
          label="Notes to customer"
          resize="vertical"
          value={note}
          onChange={handleInputChange(onUpdateBillOption)}
        />
      </div>
      <BillTableTotals
        onUpdateBillOption={onUpdateBillOption}
        onAmountPaidBlur={onAmountPaidBlur}
      />
    </div>
  </LineItemTable>
);

const mapStateToProps = state => ({
  tableData: getTableData(state),
  note: getNote(state),
});

export default connect(mapStateToProps)(BillItemTable);
