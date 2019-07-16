import { HeaderSort, Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../itemListSelectors';
import ItemListTableBody from './ItemListTableBody';
import style from './ItemListView.module.css';

const tableConfig = {
  referenceId: { width: '20rem', valign: 'top' },
  name: { width: 'flex-1', valign: 'top' },
  sellingPrice: { width: '20rem', valign: 'top', align: 'right' },
  tax: { width: '20rem', valign: 'top' },
};

const emptyView = (
  <div className={style.empty}>
    There are no items.
  </div>
);

const spinnerView = (
  <div className={style.spinner}>
    <Spinner size="medium" />
  </div>
);

const ItemListTable = ({
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
    view = (
      <ItemListTableBody
        tableConfig={tableConfig}
      />
    );
  }

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort title="Reference" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.name}>
        <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.sellingPrice}>
        <HeaderSort title="Selling price" sortName="SellPrice" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.tax}>
        <HeaderSort title="Tax" sortName="IsSellPriceTaxInclusive" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <Table>
      {header}
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(ItemListTable);
