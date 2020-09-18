import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getQuoteHistoryTable } from '../../selectors/QuoteHistorySelectors';
import QuoteHistoryStatus from '../../types/QuoteHistoryStatus';
import QuoteHistoryStatusPretty from '../../types/QuoteHistoryStatusPretty';
import styles from './QuoteHistoryTable.module.css';

const icon = {
  [QuoteHistoryStatus.CREATED]: <Icons.Invoice />,
  [QuoteHistoryStatus.EMAILED]: <Icons.Mail />,
  [QuoteHistoryStatus.CREATED_INVOICE]: <Icons.Invoice />,
};

const QuoteHistoryTable = ({ quoteHistory, onReferenceNoClick }) => (
  <Table>
    <Table.Body>
      {quoteHistory &&
        quoteHistory.map((row) => (
          <Table.Row key={row.id}>
            <Table.RowItem
              width="25rem"
              title={QuoteHistoryStatusPretty[row.status]}
              className={classNames(styles.icons)}
            >
              {icon[row.status]}
              <span>{QuoteHistoryStatusPretty[row.status]}</span>
            </Table.RowItem>
            <Table.RowItem title={row.description} textWrap="wrap">
              {row.referenceNo && (
                <Button
                  type="link"
                  className={styles.refLink}
                  onClick={() => onReferenceNoClick(row.invoiceId)}
                >
                  {row.referenceNo}
                </Button>
              )}
              {row.description}
            </Table.RowItem>
            <Table.RowItem width="11rem" title={row.displayDate}>
              {row.displayDate}
            </Table.RowItem>
            <Table.RowItem width="9rem" align="right" title={row.displayTime}>
              {row.displayTime}
            </Table.RowItem>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);

const mapStateToProps = (state) => ({
  quoteHistory: getQuoteHistoryTable(state),
});

export default connect(mapStateToProps)(QuoteHistoryTable);
