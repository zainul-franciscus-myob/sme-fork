import { Combobox, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceDetailNotes,
  getIsPreConversion,
  getIsReadOnly,
} from '../selectors/invoiceDetailSelectors';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';
import styles from './InvoiceDetailView.module.css';

const onNoteChange = (handler) => ({ value }) => {
  handler({ key: 'note', value });
};

const InvoiceDetailNotes = ({
  isPreConversion,
  isReadOnly,
  note,
  commentOptions,
  onUpdateHeaderOptions,
}) =>
  isPreConversion ? (
    <div />
  ) : (
    <div className={styles.notes}>
      <Combobox
        className={styles.notesPreset}
        disabled={isReadOnly}
        hideLabel={false}
        items={commentOptions}
        label="Notes to customer"
        metaData={[{ columnName: 'value', showData: true }]}
        name="note"
        onChange={onNoteChange(onUpdateHeaderOptions)}
      />
      <TextArea
        className={styles.notesMessage}
        disabled={isReadOnly}
        hideLabel
        label="Notes to customer"
        maxLength={2000}
        name="note"
        onChange={handleTextAreaChange(onUpdateHeaderOptions)}
        resize="both"
        rows={3}
        value={note}
      />
    </div>
  );

const mapStateToProps = (state) => ({
  ...getInvoiceDetailNotes(state),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
});

export default connect(mapStateToProps)(InvoiceDetailNotes);
