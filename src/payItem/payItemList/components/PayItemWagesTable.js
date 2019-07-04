import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableLoading, getIsWagesTableEmpty, getWagesOrder } from '../PayItemListSelectors';
import EmptyView from './EmptyView';
import TableSpinner from './TableSpinner';
import WagesTableBody from './PayItemWagesTableBody';

const PayItemWagesTable = ({
  order,
  listeners: { onSortWagesList },
  isTableLoading,
  isWagesTableEmpty,
}) => {
  let view;
  if (isTableLoading) {
    view = <TableSpinner />;
  } else if (isWagesTableEmpty) {
    view = <EmptyView payItem="wages and salaries" />;
  } else {
    view = <WagesTableBody />;
  }

  return (
    <Table>
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
      { view }
    </Table>
  );
};

const mapStateToProps = state => ({
  order: getWagesOrder(state),
  isTableLoading: getIsTableLoading(state),
  isWagesTableEmpty: getIsWagesTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemWagesTable);
