import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder, getShouldShowActionColumn } from '../userListSelectors';

const UserListTableHeader = ({
  order,
  onSort,
  tableConfig,
  shouldShowActionColumn,
}) => (
  <Table>
    <Table.Header>
      <Table.HeaderItem {...tableConfig.name}>
        <HeaderSort
          title={tableConfig.name.columnName}
          sortName="UserName"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.type}>
        <HeaderSort
          title={tableConfig.type.columnName}
          sortName="Type"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.email}>
        <HeaderSort
          title={tableConfig.email.columnName}
          sortName="Email"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.status}>
        <HeaderSort
          title={tableConfig.status.columnName}
          sortName="Status"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      {shouldShowActionColumn && (
        <Table.HeaderItem {...tableConfig.action}>
          <HeaderSort
            title={tableConfig.action.columnName}
            sortName="Action"
            activeSort={order}
            onSort={onSort}
          />
        </Table.HeaderItem>
      )}
    </Table.Header>
  </Table>
);

const mapStateToProps = (state) => ({
  order: getOrder(state),
  shouldShowActionColumn: getShouldShowActionColumn(state),
});

export default connect(mapStateToProps)(UserListTableHeader);
