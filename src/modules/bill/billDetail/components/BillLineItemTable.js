import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getHasNoteBeenPrefilled,
  getNote,
  getTableData,
} from '../selectors/billSelectors';
import BillTableTotals from './BillTableTotals';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './BillLineItemTable.module.css';

const handleAddRow = (handler) => (e) => handler(e);

const handleRowChange = (handler) => (index, key, value) =>
  handler({ index, key, value });

const handleRemoveRow = (handler) => (index) => handler({ index });

const BillItemTable = ({
  tableData,
  headerItems,
  labels,
  note,
  notePrefilled,
  columnConfig,
  renderRow,
  onAddRow,
  onRowChange,
  onRemoveRow,
  onUpdateBillOption,
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
      <div
        className={classnames({
          [styles.notes]: true,
          [styles.prefill]: notePrefilled,
        })}
      >
        <TextArea
          name="note"
          label="Notes"
          resize="vertical"
          value={note}
          onChange={handleInputChange(onUpdateBillOption)}
          maxLength={2000}
        />
      </div>
      <BillTableTotals onUpdateBillOption={onUpdateBillOption} />
    </div>
  </LineItemTable>
);

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  note: getNote(state),
  notePrefilled: getHasNoteBeenPrefilled(state),
});

export default connect(mapStateToProps)(BillItemTable);
