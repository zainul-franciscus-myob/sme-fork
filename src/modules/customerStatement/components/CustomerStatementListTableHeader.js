import { Checkbox, HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAllSelected,
  getIsSomeSelected,
  getOrder,
} from '../selectors/customerStatementListSelectors';

const CustomerStatementListTableHeader = ({
  order,
  tableConfig,
  isAllSelected,
  isSomeSelected,
  onToggleAllCustomerStatements,
  onSort,
}) => {
  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          name="bulkSelect"
          label="Bulk select"
          hideLabel
          onChange={onToggleAllCustomerStatements}
          checked={isAllSelected}
          indeterminate={!isAllSelected && isSomeSelected}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.name.columnName}
        {...tableConfig.name.styles}
      >
        <HeaderSort
          title={tableConfig.name.columnName}
          sortName="name"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.contactPerson.columnName}
        {...tableConfig.contactPerson.styles}
      >
        <HeaderSort
          title={tableConfig.contactPerson.columnName}
          sortName="contactPerson"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.phoneNumber.columnName}
        {...tableConfig.phoneNumber.styles}
      >
        {tableConfig.phoneNumber.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.email.columnName}
        {...tableConfig.email.styles}
      >
        {tableConfig.email.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.balance.columnName}
        {...tableConfig.balance.styles}
      >
        <HeaderSort
          title={tableConfig.balance.columnName}
          sortName="balance"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  );

  return header;
};

const mapStateToProps = (state) => ({
  order: getOrder(state),
  isAllSelected: getIsAllSelected(state),
  isSomeSelected: getIsSomeSelected(state),
});

export default connect(mapStateToProps)(CustomerStatementListTableHeader);
