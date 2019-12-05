import {
  HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getOrder, getShowHiddenColumns, getTitle,
} from '../itemListSelectors';

const ItemListTableHeader = ({
  tableConfig,
  onSort,
  order,
  showHiddenColumns,
  title,
}) => (
  <Table.Header>
    <Table.HeaderItem {...tableConfig.referenceId}>
      <HeaderSort title="Item ID" sortName="DisplayId" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.name}>
      <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    {
      showHiddenColumns
      && (
        <Table.HeaderItem {...tableConfig.status}>
          <HeaderSort title="Status" sortName="IsActive" activeSort={order} onSort={onSort} />
        </Table.HeaderItem>
      )
    }
    <Table.HeaderItem {...tableConfig.sellingPrice}>
      <HeaderSort title="Selling price($)" sortName="SellPrice" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.tax}>
      <HeaderSort title={title} sortName="IsSellPriceTaxInclusive" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
  </Table.Header>
);

const mapStateToProps = state => ({
  order: getOrder(state),
  showHiddenColumns: getShowHiddenColumns(state),
  title: getTitle(state),
});

export default connect(mapStateToProps)(ItemListTableHeader);
