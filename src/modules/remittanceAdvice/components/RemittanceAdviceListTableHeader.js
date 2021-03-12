import { Checkbox, HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAllSelected,
  getIsSomeSelected,
} from '../selectors/remittanceAdviceListSelectors';

const RemittanceAdviceListTableHeader = ({
  order,
  tableConfig,
  isAllSelected,
  isSomeSelected,
  onSelectAllRemittanceAdviceList,
  onSort,
}) => {
  return (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          name="bulkSelect"
          label="Bulk select"
          hideLabel
          onChange={onSelectAllRemittanceAdviceList}
          checked={isAllSelected}
          indeterminate={!isAllSelected && isSomeSelected}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.paymentDate.columnName}
        {...tableConfig.paymentDate.styles}
      >
        <HeaderSort
          title={tableConfig.paymentDate.columnName}
          sortName="paymentDate"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.referenceNumber.columnName}
        {...tableConfig.referenceNumber.styles}
      >
        <HeaderSort
          title={tableConfig.referenceNumber.columnName}
          sortName="referenceNumber"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.supplier.columnName}
        {...tableConfig.supplier.styles}
      >
        <HeaderSort
          title={tableConfig.supplier.columnName}
          sortName="supplier"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.emailAddress.columnName}
        {...tableConfig.emailAddress.styles}
      >
        <HeaderSort
          title={tableConfig.emailAddress.columnName}
          sortName="emailAddress"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem
        columnName={tableConfig.amountPaid.columnName}
        {...tableConfig.amountPaid.styles}
      >
        {tableConfig.amountPaid.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );
};

const mapStateToProps = (state) => ({
  isAllSelected: getIsAllSelected(state),
  isSomeSelected: getIsSomeSelected(state),
});

export default connect(mapStateToProps)(RemittanceAdviceListTableHeader);
