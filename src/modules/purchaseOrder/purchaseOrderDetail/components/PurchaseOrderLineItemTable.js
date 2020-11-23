import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getHasNoteBeenPrefilled,
  getNote,
  getTableData,
} from '../selectors/purchaseOrderSelectors';
import PurchaseOrderTableTotals from './PurchaseOrderTableTotals';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './PurchaseOrderLineItemTable.module.css';

const handleAddRow = (handler) => (e) => handler(e);

const handleRowChange = (handler) => (index, key, value) =>
  handler({ index, key, value });

const handleRemoveRow = (handler) => (index) => handler({ index });

const PurchaseOrderItemTable = ({
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
  onUpdatePurchaseOrderOption,
}) => {
  const notes = (
    <div
      className={classnames({
        [styles.notes]: true,
        [styles.prefill]: notePrefilled,
      })}
    >
      <TextArea
        name="note"
        label="Notes"
        resize="both"
        value={note}
        onChange={handleInputChange(onUpdatePurchaseOrderOption)}
        maxLength={2000}
      />
    </div>
  );

  return (
    <div>
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
          {notes}
          <PurchaseOrderTableTotals
            onUpdatePurchaseOrderOption={onUpdatePurchaseOrderOption}
          />
        </div>
      </LineItemTable>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  note: getNote(state),
  notePrefilled: getHasNoteBeenPrefilled(state),
});

export default connect(mapStateToProps)(PurchaseOrderItemTable);
