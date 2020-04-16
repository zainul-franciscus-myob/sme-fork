import { Combobox, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailNotes, getIsReadOnlyLayout } from '../selectors/invoiceDetailSelectors';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';
import styles from './InvoiceDetailView.module.css';

const onNoteChange = handler => ({ value }) => {
  handler({ key: 'note', value });
};

const InvoiceDetailNotes = ({
  isReadOnlyLayout,
  note,
  commentOptions,
  onUpdateHeaderOptions,
}) => (
  <div className={styles.notes}>
    <Combobox
      name="note"
      label="Notes to customer"
      hideLabel={false}
      disabled={isReadOnlyLayout}
      metaData={[
        { columnName: 'value', showData: true },
      ]}
      items={commentOptions}
      onChange={onNoteChange(onUpdateHeaderOptions)}
    />
    <TextArea
      value={note}
      disabled={isReadOnlyLayout}
      resize="vertical"
      name="note"
      label="Notes to customer"
      hideLabel
      rows={3}
      onChange={handleTextAreaChange(onUpdateHeaderOptions)}
      maxLength={255}
    />
  </div>
);

const mapStateToProps = state => ({
  ...getInvoiceDetailNotes(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(InvoiceDetailNotes);
