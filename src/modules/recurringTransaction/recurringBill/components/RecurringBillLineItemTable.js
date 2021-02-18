import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDisabled,
  getNote,
  getTableData,
} from '../selectors/RecurringBillSelectors';
import RecurringBillTableTotals from './RecurringBillTableTotals';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './RecurringBillLineItemTable.module.css';

const handleAddRow = (handler) => (e) => handler(e);

const handleRowChange = (handler) => (index, key, value) =>
  handler({ index, key, value });

const handleRemoveRow = (handler) => (index) => handler({ index });

const RecurringBillItemTable = ({
  tableData,
  headerItems,
  labels,
  note,
  isDisabled,
  columnConfig,
  renderRow,
  onAddRow,
  onRowChange,
  onRemoveRow,
  onUpdateBillHeaderOption,
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
          label="Notes"
          resize="both"
          value={note}
          onChange={handleInputChange(onUpdateBillHeaderOption)}
          maxLength={2000}
          disabled={isDisabled}
        />
      </div>
      <RecurringBillTableTotals />
    </div>
  </LineItemTable>
);

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  note: getNote(state),
  isDisabled: getIsDisabled(state),
});

export default connect(mapStateToProps)(RecurringBillItemTable);
