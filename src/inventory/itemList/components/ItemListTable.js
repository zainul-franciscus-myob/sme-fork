import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty, getIsTableLoading, getOrder,
} from '../itemListSelectors';
import ItemListTableBody from './ItemListTableBody';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  referenceId: { width: '20rem', valign: 'top' },
  name: { width: 'flex-1', valign: 'top' },
  sellingPrice: { width: '20rem', valign: 'top', align: 'right' },
  tax: { width: '20rem', valign: 'top' },
};

const ItemListTable = ({
  isTableEmpty,
  isTableLoading,
  onSort,
  order,
}) => {
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
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      header={header}
    >
      {header}
      <ItemListTableBody
        tableConfig={tableConfig}
      />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(ItemListTable);
