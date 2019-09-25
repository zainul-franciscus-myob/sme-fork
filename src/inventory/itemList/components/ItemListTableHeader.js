import {
  HeaderSort, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getOrder, getShowHiddenColumns,
} from '../itemListSelectors';
import StickyTableHeader from '../../../components/StickyTable/StickyTableHeader';

const ItemListTableHeader = ({
  tableConfig,
  onSort,
  order,
  showHiddenColumns,
}) => (
  <StickyTableHeader>
    <Table.HeaderItem {...tableConfig.referenceId}>
      <HeaderSort title="Item ID" sortName="DisplayId" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.name}>
      <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.status}>
      {showHiddenColumns && <HeaderSort title="Status" sortName="IsActive" activeSort={order} onSort={onSort} />}
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.sellingPrice}>
      <HeaderSort title="Selling price($)" sortName="SellPrice" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.tax}>
      <HeaderSort title="Tax" sortName="IsSellPriceTaxInclusive" activeSort={order} onSort={onSort} />
    </Table.HeaderItem>
  </StickyTableHeader>
);

const mapStateToProps = state => ({
  order: getOrder(state),
  showHiddenColumns: getShowHiddenColumns(state),
});

export default connect(mapStateToProps)(ItemListTableHeader);
