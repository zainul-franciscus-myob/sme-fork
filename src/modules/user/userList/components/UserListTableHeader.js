import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../userListSelectors';

const UserListTableHeader = ({ order, onSort, tableConfig }) => (
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
      <Table.HeaderItem {...tableConfig.advisor}>
        <HeaderSort
          title={tableConfig.advisor.columnName}
          sortName="IsAdvisor"
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
          sortName="IsActive"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  </Table>
);

const mapStateToProps = (state) => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(UserListTableHeader);
