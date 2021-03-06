import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../CustomerReturnListSelectors';

const onLinkButtonClick = (handler, id) => () => {
  handler(id);
};

const CustomerReturnListTableBody = ({
  entries,
  tableConfig,
  onCreateRefundClick,
  onCreateApplyToSaleClick,
}) => {
  const rows = entries.map((entry) => (
    <Table.Row key={entry.id}>
      <Table.RowItem {...tableConfig.date}>{entry.date}</Table.RowItem>

      <Table.RowItem {...tableConfig.invoiceNumber}>
        <a href={entry.link}>{entry.invoiceNumber}</a>
      </Table.RowItem>

      <Table.RowItem {...tableConfig.customer}>{entry.customer}</Table.RowItem>

      <Table.RowItem {...tableConfig.customerPurchaseOrderNo}>
        {entry.customerPurchaseOrderNo}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.amount}>{entry.amount}</Table.RowItem>

      <Table.RowItem {...tableConfig.creditAmount}>
        {entry.creditAmount}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.payRefund}>
        <Button
          type="link"
          icon={<Icons.Dollar />}
          iconRight={false}
          onClick={onLinkButtonClick(onCreateRefundClick, entry.id)}
        >
          Refund
        </Button>
      </Table.RowItem>

      <Table.RowItem {...tableConfig.applyToSale}>
        <Button
          type="link"
          icon={<Icons.ReopenedDocument />}
          iconRight={false}
          onClick={onLinkButtonClick(onCreateApplyToSaleClick, entry.id)}
        >
          Apply
        </Button>
      </Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(CustomerReturnListTableBody);
