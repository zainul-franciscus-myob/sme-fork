import { Modal, RadioButton, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomerQuoteId,
  getCustomerQuotes,
  getShouldEnableConvertQuote,
} from '../../selectors/quickQuoteSelectors';
import Button from '../../../../../components/Button/Button';

const tableConfig = {
  date: {
    columnName: 'Date',
    width: '115px',
  },
  amount: {
    columnName: 'Amount ($)',
    align: 'right',
    width: '120px',
  },
  quoteNumber: {
    columnName: 'Quote Number',
    width: 'flex-1',
  },
  radio: {
    width: '40px',
  },
};

const QuickQuoteModal = ({
  customerQuotes,
  onCloseModal,
  onSelectCustomerQuote,
  customerQuoteId,
  onConvertCustomerQuote,
  shouldEnableConvertQuote,
}) => (
  <Modal title="Convert a quote" onCancel={onCloseModal}>
    <Modal.Body>
      <Table>
        <Table.Header>
          <Table.HeaderItem {...tableConfig.radio} />
          <Table.HeaderItem {...tableConfig.date}>
            {tableConfig.date.columnName}
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.quoteNumber}>
            {tableConfig.quoteNumber.columnName}
          </Table.HeaderItem>
          <Table.HeaderItem {...tableConfig.amount}>
            {tableConfig.amount.columnName}
          </Table.HeaderItem>
        </Table.Header>
        <Table.Body>
          {customerQuotes.map((customerQuote) => (
            <Table.Row key={customerQuote.id}>
              <Table.RowItem {...tableConfig.radio}>
                <RadioButton
                  checked={customerQuote.id === customerQuoteId}
                  value={customerQuote.id}
                  onChange={(e) => onSelectCustomerQuote(e.target.value)}
                />
              </Table.RowItem>
              <Table.RowItem {...tableConfig.date}>
                {customerQuote.dateOccurred}
              </Table.RowItem>
              <Table.RowItem {...tableConfig.quoteNumber}>
                <a
                  href={customerQuote.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {customerQuote.displayId}
                </a>
              </Table.RowItem>
              <Table.RowItem {...tableConfig.amount}>
                {customerQuote.amount}
              </Table.RowItem>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Modal.Body>
    <Modal.Footer>
      <button type="button" className="btn btn-default" onClick={onCloseModal}>
        Cancel
      </button>
      <Button
        type="primary"
        onClick={onConvertCustomerQuote}
        disabled={!shouldEnableConvertQuote}
      >
        Convert
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  customerQuotes: getCustomerQuotes(state),
  customerQuoteId: getCustomerQuoteId(state),
  shouldEnableConvertQuote: getShouldEnableConvertQuote(state),
});

export default connect(mapStateToProps)(QuickQuoteModal);
