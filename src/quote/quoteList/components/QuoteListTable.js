import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../quoteListSelector';
import QuoteListTableBody from './QuoteListTableBody';
import style from './QuoteListView.css';

const tableConfig = {
  referenceId: { width: '10.2rem', valign: 'top' },
  purchaseOrder: { width: '20rem', valign: 'top' },
  customer: { width: 'flex-1', valign: 'top' },
  displayDate: { width: '12.4rem', valign: 'top' },
  displayAmount: { width: '12.4rem', valign: 'top', align: 'right' },
};

const emptyView = (
  <div className={style.empty}>
    There are no quotes for the selected filter options.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const QuoteListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  order,
}) => {
  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (<QuoteListTableBody tableConfig={tableConfig} />);
  }

  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.referenceId}>
          <HeaderSort title="Number" sortName="DisplayId" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.purchaseOrder}>
          <HeaderSort title="Purchase order" sortName="CustomerPurchaseOrderIdentifier" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.customer}>
          <HeaderSort title="Customer" sortName="CustomerName" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.displayDate}>
          <HeaderSort title="Date issued" sortName="DateOccurred" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.displayAmount}>
          <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      </Table.Header>
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(QuoteListTable);
