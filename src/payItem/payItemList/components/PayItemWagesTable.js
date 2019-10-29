import {
  Button, HeaderSort, Icons, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableLoading, getIsWagesTableEmpty, getWagesOrder } from '../PayItemListSelectors';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../components/TableView/TableView';
import WagesTableBody from './PayItemWagesTableBody';

const PayItemWagesTable = ({
  order,
  listeners: { onSortWagesList, onCreatePayItemButtonClick },
  isTableLoading,
  isWagesTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort title="Pay item name" sortName="Name" activeSort={order} onSort={onSortWagesList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Pay basis" sortName="DisplayType" activeSort={order} onSort={onSortWagesList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="ATO reporting category" sortName="StpCategory" activeSort={order} onSort={onSortWagesList} />
      </Table.HeaderItem>
    </Table.Header>
  );

  const emptyViewActions = [
    <Button
      key={1}
      type="link"
      icon={<Icons.Add />}
      onClick={onCreatePayItemButtonClick}
    >
      Create a pay item
    </Button>,
  ];

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isWagesTableEmpty}
      emptyView={(
        <NoResultPageState
          title="You have no wage and salary pay items"
          description="This could be their normal earnings, allowances, overtime (penalty rates), or bonuses."
          actions={emptyViewActions}
        />)}
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
