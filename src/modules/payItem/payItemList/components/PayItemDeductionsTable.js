import { Button, HeaderSort, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDeductionsOrder,
  getIsDeductionsTableEmpty,
  getIsTableLoading,
} from '../PayItemListSelectors';
import DeductionsTableBody from './PayItemDeductionsTableBody';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../../components/TableView/TableView';

const PayItemDeductionsTable = ({
  order,
  listeners: { onSortDeductionsList, onCreatePayItemButtonClick },
  isTableLoading,
  isDeductionsTableEmpty,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem>
        <HeaderSort
          title="Pay item name"
          sortName="Name"
          activeSort={order}
          onSort={onSortDeductionsList}
        />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort
          title="Calculation basis"
          sortName="DisplayType"
          activeSort={order}
          onSort={onSortDeductionsList}
        />
      </Table.HeaderItem>
      <Table.HeaderItem>
        <HeaderSort
          title="ATO reporting category"
          sortName="StpCategory"
          activeSort={order}
          onSort={onSortDeductionsList}
        />
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

  const emptyView = (
    <NoResultPageState
      title="You have no deductions"
      description="These are amounts you withhold from an employees' pays, and are then forwarded on to another organisation"
      actions={emptyViewActions}
    />
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isDeductionsTableEmpty}
      header={header}
      emptyView={emptyView}
    >
      <DeductionsTableBody />
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  order: getDeductionsOrder(state),
  isTableLoading: getIsTableLoading(state),
  isDeductionsTableEmpty: getIsDeductionsTableEmpty(state),
});

export default connect(mapStateToProps)(PayItemDeductionsTable);
