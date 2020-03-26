import {
  Button, HeaderSort, Icons, PageState, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsDefaultFilter, getIsTableEmpty, getIsTableLoading, getOrder,
} from '../quoteListSelectors';
import Icon from '../../../../components/Icon/Icon';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import QuoteListTableBody from './QuoteListTableBody';
import TableView from '../../../../components/TableView/TableView';

const tableConfig = {
  referenceId: { width: '14.0rem', valign: 'top' },
  purchaseOrder: { width: '20rem', valign: 'top' },
  customer: { width: 'flex-1', valign: 'top' },
  displayDate: { width: '11.0rem', valign: 'top' },
  displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
  displayExpiryDate: { width: '12.4rem', valign: 'top' },
};

const QuoteListTable = ({
  isTableEmpty,
  isTableLoading,
  isDefaultFilter,
  onSort,
  order,
  onAddQuote,
}) => {
  const emptyTableView = isDefaultFilter ? (
    <NoResultPageState
      title="Provide your customers with a quote"
      description="If they accept, you can turn this quote into an invoice in one click."
      actions={[
        <Button
          key={1}
          onClick={onAddQuote}
          type="link"
          icon={<Icons.Add />}
        >
          Create quote
        </Button>,
      ]}
    />
  ) : (
    <PageState
      title="No quotes found"
      description="Perhaps check the dates or remove the filters and try again."
      image={(<Icon.NoResultState alt="No quotes found" />)}
    />
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.displayDate}>
        <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort title="Quote number" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.customer}>
        <HeaderSort title="Customer" sortName="CustomerName" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.purchaseOrder}>
        <HeaderSort title="Customer PO number" sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayAmount}>
        <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.displayExpiryDate}>
        <HeaderSort title="Expiry date" sortName="ExpiryDate" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyTableView}
    >
      <QuoteListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  isDefaultFilter: getIsDefaultFilter(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(QuoteListTable);
