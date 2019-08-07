import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableLoading, getIsWagesTableEmpty, getWagesOrder } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import TableView from '../../../components/TableView/TableView';
import WagesTableBody from './PayItemWagesTableBody';

const PayItemWagesTable = ({
  order,
  listeners: { onSortWagesList },
  isTableLoading,
  isWagesTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSortWagesList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Type" sortName="DisplayType" activeSort={order} onSort={onSortWagesList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="ATO reporting category" sortName="StpCategory" activeSort={order} onSort={onSortWagesList} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isWagesTableEmpty}
      emptyView={<EmptyView payItem="wages and salaries" />}
    >
      <WagesTableBody />
    </TableView>
  );
};

const mapStateToProps = state => ({
  order: getWagesOrder(state),
  isTableLoading: getIsTableLoading(state),
  isWagesTableEmpty: getIsWagesTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemWagesTable);
