import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableEntries } from '../CustomerReturnListSelectors';

const CustomerReturnListTableBody = ({
  entries,
  tableConfig,
}) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>

      <Table.RowItem {...tableConfig.date}>
        {entry.date}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.invoiceNumber}>
        {entry.invoiceNumber}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.customerPurchaseOrderNo}>
        {entry.customerPurchaseOrderNo}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.customer}>
        {entry.customer}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.amount}>
        {entry.amount}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.creditAmount}>
        {entry.creditAmount}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.payRefund}>
        {entry.payRefund}
      </Table.RowItem>

      <Table.RowItem {...tableConfig.applyToSale}>
        {entry.applyToSale}
      </Table.RowItem>

    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

CustomerReturnListTableBody.propTypes = {
  tableConfig: PropTypes.shape().isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(CustomerReturnListTableBody);
