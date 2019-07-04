import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDeductionsOrder, getIsDeductionsTableEmpty, getIsTableLoading } from '../PayItemListSelectors';
import DeductionsTableBody from './PayItemDeductionsTableBody';
import EmptyView from './EmptyView';
import TableSpinner from './TableSpinner';

const PayItemDeductionsTable = ({
  order,
  listeners: { onSortDeductionsList },
  isTableLoading,
  isDeductionsTableEmpty,
}) => {
  let view;
  if (isTableLoading) {
    view = <TableSpinner />;
  } else if (isDeductionsTableEmpty) {
    view = <EmptyView payItem="deductions" />;
  } else {
    view = <DeductionsTableBody />;
  }


  return (
    <Table>
      <Table.Header>
        <Table.HeaderItem>
          <HeaderSort title="Name" sortName="Name" activeSort={order} onSort={onSortDeductionsList} />
        </Table.HeaderItem>
        <Table.HeaderItem>
          <HeaderSort title="Type" sortName="Type" activeSort={order} onSort={onSortDeductionsList} />
        </Table.HeaderItem>
        <Table.HeaderItem>
          <HeaderSort title="ATO reporting category" sortName="AtoReportingCategory" activeSort={order} onSort={onSortDeductionsList} />
        </Table.HeaderItem>
      </Table.Header>
      { view }
    </Table>
  );
};

const mapStateToProps = state => ({
  order: getDeductionsOrder(state),
  isTableLoading: getIsTableLoading(state),
  isDeductionsTableEmpty: getIsDeductionsTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemDeductionsTable);
