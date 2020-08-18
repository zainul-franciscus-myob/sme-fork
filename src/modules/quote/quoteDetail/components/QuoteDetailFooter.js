import { Combobox, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getQuoteDetailFooter } from '../selectors/QuoteDetailSelectors';
import LineItemTableTotalsFormattedCurrency from '../../../../components/LineItemTable/LineItemTableTotalsFormattedCurrency';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './QuoteDetailFooter.module.css';

const handleNoteChange = (handler) => ({ value }) => {
  handler({
    key: 'note',
    value,
  });
};

const QuoteDetailFooter = ({
  totals: { subTotal, totalTax, totalAmount },
  taxLabel,
  note,
  commentOptions,
  onUpdateNote,
  isReadOnly,
  showFreight,
  freightAmount,
  freightTaxCode,
}) => (
  <div className={styles.footer}>
    <div className={styles.note}>
      <Combobox
        className={styles.notesPreset}
        disabled={isReadOnly}
        hideLabel={false}
        items={commentOptions}
        label="Notes to customer"
        metaData={[{ columnName: 'value', showData: true }]}
        name="note"
        onChange={handleNoteChange(onUpdateNote)}
      />
      <TextArea
        className={styles.notesMessage}
        disabled={isReadOnly}
        hideLabel
        label="Notes to customer"
        maxLength={2000}
        name="note"
        onChange={handleInputChange(onUpdateNote)}
        resize="both"
        rows={3}
        value={note}
      />
    </div>
    <LineItemTable.Total>
      <LineItemTableTotalsFormattedCurrency
        title="Subtotal"
        amount={subTotal}
      />
      {showFreight && (
        <LineItemTableTotalsFormattedCurrency
          title="Freight"
          amount={freightAmount}
          note={freightTaxCode}
        />
      )}
      <LineItemTableTotalsFormattedCurrency
        title={taxLabel}
        amount={totalTax}
      />
      <LineItemTableTotalsFormattedCurrency
        title="Total"
        amount={totalAmount}
      />
    </LineItemTable.Total>
  </div>
);

const mapStateToProps = (state) => getQuoteDetailFooter(state);

export default connect(mapStateToProps)(QuoteDetailFooter);
