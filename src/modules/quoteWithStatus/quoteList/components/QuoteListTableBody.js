import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../quoteListSelectors';

const statusLabelColour = (status, isOpenAndExpired) => {
  switch (status) {
    case 'Open':
      return isOpenAndExpired ? 'orange' : 'light-grey';
    case 'Accepted':
      return 'green';
    case 'Declined':
      return 'red';
    case 'Invoiced':
      return 'light-grey';
    default:
      return 'default';
  }
};

/* eslint-disable react/no-array-index-key */

const QuoteListTableBody = (props) => {
  const { tableConfig, entries } = props;
  const rows = entries.map((entry, index) => (
    <Table.Row key={index}>
      <Table.RowItem {...tableConfig.displayDate}>
        {entry.displayDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        <a href={entry.link}>{entry.referenceId}</a>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.customer}>{entry.customer}</Table.RowItem>
      <Table.RowItem {...tableConfig.purchaseOrder}>
        {entry.purchaseOrder}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.displayAmount}>
        {entry.displayAmount}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.displayExpiryDate}>
        {entry.displayExpiryDate}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        <Label
          type="boxed"
          color={statusLabelColour(entry.status, entry.isOpenAndExpired)}
        >
          {entry.status}
        </Label>
      </Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
});

export default connect(mapStateToProps)(QuoteListTableBody);
