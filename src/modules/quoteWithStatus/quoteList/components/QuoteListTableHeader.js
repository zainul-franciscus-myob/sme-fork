import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../quoteListSelectors';
import { getResponsiveConfig } from './getResponsiveConfig';

const QuoteListTableHeader = (props) => {
  const { onSort, order, tableConfig } = props;

  return (
    <Table responsiveWidths={getResponsiveConfig(tableConfig)}>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.displayDate}>
          <HeaderSort
            title="Date"
            sortName="DateOccurred"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.referenceId}>
          <HeaderSort
            title="Quote number"
            sortName="DisplayId"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.customer}>
          <HeaderSort
            title="Customer"
            sortName="CustomerName"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.purchaseOrder}>
          <HeaderSort
            title="Customer PO number"
            sortName="CustomerPurchaseOrderIdentifier"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.displayAmount}>
          <HeaderSort
            title="Amount ($)"
            sortName="Amount"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.emailStatus}>
          <HeaderSort
            title="Sent"
            sortName="EmailStatus"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.displayExpiryDate}>
          <HeaderSort
            title="Expiry date"
            sortName="ExpiryDate"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.status}>
          <HeaderSort
            title="Status"
            sortName="Status"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
      </Table.Header>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(QuoteListTableHeader);
