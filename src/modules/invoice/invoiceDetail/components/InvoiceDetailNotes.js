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
        name="note"
        label="Notes to customer"
        hideLabel={false}
        disabled={isReadOnly}
        metaData={[{ columnName: 'value', showData: true }]}
        items={commentOptions}
        onChange={onNoteChange(onUpdateHeaderOptions)}
      />
      <TextArea
        value={note}
        disabled={isReadOnly}
        resize="vertical"
        name="note"
        label="Notes to customer"
        hideLabel
        rows={3}
        onChange={handleTextAreaChange(onUpdateHeaderOptions)}
        maxLength={2000}
      />
    </div>
  );

const mapStateToProps = (state) => ({
  ...getInvoiceDetailNotes(state),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
});

export default connect(mapStateToProps)(InvoiceDetailNotes);
