import { Badge, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../userListSelectors';

const UserListTableBody = (props) => {
  const { tableConfig, entries } = props;

  const rows = entries.map(
    ({ id, link, name, type, email, status, isActive }) => (
      <Table.Row key={id}>
        <Table.RowItem {...tableConfig.name}>
          {id ? <a href={link}>{name}</a> : name}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.type}>{type}</Table.RowItem>
        <Table.RowItem {...tableConfig.email}>{email}</Table.RowItem>
        <Table.RowItem {...tableConfig.status}>
          {isActive ? status : <Badge color="light-grey">{status}</Badge>}
        </Table.RowItem>
      </Table.Row>
    )
  );

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
});

export default connect(mapStateToProps)(UserListTableBody);
