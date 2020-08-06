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
        name="note"
        label="Notes to customer"
        hideLabel={false}
        metaData={[{ columnName: 'value', showData: true }]}
        items={commentOptions}
        onChange={handleNoteChange(onUpdateNote)}
        disabled={isReadOnly}
      />
      <TextArea
        value={note}
        resize="both"
        name="note"
        label="Notes to customer"
        hideLabel
        rows={3}
        onChange={handleInputChange(onUpdateNote)}
        disabled={isReadOnly}
        maxLength={2000}
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
