import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDeductionsOrder, getIsDeductionsTableEmpty, getIsTableLoading } from '../PayItemListSelectors';
import DeductionsTableBody from './PayItemDeductionsTableBody';
import EmptyView from './EmptyView';
import TableView from '../../../components/TableView/TableView';

const PayItemDeductionsTable = ({
  order,
  listeners: { onSortDeductionsList },
  isTableLoading,
  isDeductionsTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort title="Pay item name" sortName="Name" activeSort={order} onSort={onSortDeductionsList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="Calculation basis" sortName="DisplayType" activeSort={order} onSort={onSortDeductionsList} />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort title="ATO reporting category" sortName="StpCategory" activeSort={order} onSort={onSortDeductionsList} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isDeductionsTableEmpty}
      header={header}
      emptyView={<EmptyView payItem="deductions" />}
    >
      <DeductionsTableBody />
    </TableView>
  );
};

const mapStateToProps = state => ({
  order: getDeductionsOrder(state),
  isTableLoading: getIsTableLoading(state),
  isDeductionsTableEmpty: getIsDeductionsTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemDeductionsTable);
