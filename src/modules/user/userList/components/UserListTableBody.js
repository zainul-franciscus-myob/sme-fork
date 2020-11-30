import { Badge, Button, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../userListSelectors';

const UserListTableBody = (props) => {
  const {
    tableConfig,
    entries,
    onResendInvitation,
    onCancelInvitation,
  } = props;

  const ActionButtons = ({ user }) => (
    <>
      <Button type="link" onClick={() => onResendInvitation(user)}>
        Resend invitation
      </Button>
      {' | '}
      <Button type="link" onClick={() => onCancelInvitation(user)}>
        Cancel invitation
      </Button>
    </>
  );

  const rows = entries.map((user) => (
    <Table.Row key={user.id}>
      <Table.RowItem {...tableConfig.name}>
        {user.id ? <a href={user.link}>{user.name}</a> : user.name}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.type}>{user.type}</Table.RowItem>
      <Table.RowItem {...tableConfig.email}>{user.email}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>
        {user.isActive ? (
          user.status
        ) : (
          <Badge color="light-grey">{user.status}</Badge>
        )}
      </Table.RowItem>
      <Table.RowItem {...tableConfig.action}>
        {user.myDotInvitationSatus === 'Pending' && (
          <ActionButtons user={user} />
        )}
      </Table.RowItem>
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
});

export default connect(mapStateToProps)(UserListTableBody);
