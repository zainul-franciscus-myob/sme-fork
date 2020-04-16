import { Combobox, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCommentOptions,
  getIsReadOnlyLayout,
  getNote,
  getTaxLabel,
  getTotals,
} from '../selectors/QuoteDetailSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './QuoteDetailFooter.module.css';

const handleNoteChange = handler => ({ value }) => {
  handler({
    key: 'note',
    value,
  });
};

const QuoteDetailFooter = ({
  totals: {
    subTotal,
    totalTax,
    totalAmount,
  },
  taxLabel,
  note,
  commentOptions,
  onUpdateNote,
  isReadOnlyLayout,
}) => (
  <div className={styles.footer}>
    <div className={styles.note}>
      <Combobox
        name="note"
        label="Message to customer"
        hideLabel={false}
        metaData={[
          { columnName: 'value', showData: true },
        ]}
        items={commentOptions}
        onChange={handleNoteChange(onUpdateNote)}
        disabled={isReadOnlyLayout}
      />
      <TextArea
        value={note}
        resize="vertical"
        name="note"
        label="Message to customer"
        hideLabel
        rows={3}
        onChange={handleInputChange(onUpdateNote)}
        disabled={isReadOnlyLayout}
      />
    </div>
    <LineItemTable.Total>
      <LineItemTable.Totals title="Subtotal" amount={subTotal} />
      <LineItemTable.Totals title={taxLabel} amount={totalTax} />
      <LineItemTable.Totals totalAmount title="Total" amount={totalAmount} />
    </LineItemTable.Total>
  </div>
);

const mapStateToProps = state => ({
  totals: getTotals(state),
  taxLabel: getTaxLabel(state),
  note: getNote(state),
  commentOptions: getCommentOptions(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(QuoteDetailFooter);
