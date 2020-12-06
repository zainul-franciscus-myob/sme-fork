import { Combobox, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getRecurringInvoiceNotes } from '../selectors/RecurringInvoiceSelectors';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';
import styles from './RecurringInvoiceView.module.css';

const onNoteChange = (handler) => ({ value }) => {
  handler({ key: 'note', value });
};

const RecurringInvoiceNotes = ({
  note,
  commentOptions,
  isSubmitting,
  isReadOnly,
  onUpdateHeaderOptions,
}) => (
  <div className={styles.notes}>
    <Combobox
      className={styles.notesPreset}
      disabled={isSubmitting || isReadOnly}
      hideLabel={false}
      items={commentOptions}
      label="Notes to customer"
      metaData={[{ columnName: 'value', showData: true }]}
      name="note"
      onChange={onNoteChange(onUpdateHeaderOptions)}
    />
    <TextArea
      className={styles.notesMessage}
      disabled={isSubmitting || isReadOnly}
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

const mapStateToProps = (state) => getRecurringInvoiceNotes(state);

export default connect(mapStateToProps)(RecurringInvoiceNotes);
