import { Badge, Button, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCurrentOnlineUserType,
  getIsSubmitting,
  getShouldShowActionColumn,
  getTableEntries,
} from '../userListSelectors';

const UserListTableBody = (props) => {
  const {
    tableConfig,
    entries,
    isSubmitting,
    shouldShowActionColumn,
    onResendInvitation,
    onCancelInvitation,
    onRemoveAccessClick,
  } = props;

  const ResendOrCancelButtons = ({ userIndex }) => (
    <>
      <Button
        disabled={isSubmitting}
        type="link"
        onClick={() => onResendInvitation(userIndex)}
      >
        Resend invitation
      </Button>
      {' | '}
      <Button
        disabled={isSubmitting}
        type="link"
        onClick={() => onCancelInvitation(userIndex)}
      >
        Cancel invitation
      </Button>
    </>
  );

  const RemoveAccessButton = ({ userIndex }) => (
    <Button
      disabled={isSubmitting}
      type="link"
      onClick={() => onRemoveAccessClick(userIndex)}
    >
      Remove access
    </Button>
  );

  const rows = entries.map((user, userIndex) => (
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
      {shouldShowActionColumn && (
        <Table.RowItem {...tableConfig.action}>
          {user.resendOrCancelEnabled && (
            <ResendOrCancelButtons userIndex={userIndex} />
          )}
          {user.removeButtonEnabled && (
            <RemoveAccessButton userIndex={userIndex} />
          )}
        </Table.RowItem>
      )}
    </Table.Row>
  ));

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state, props) => ({
  entries: getTableEntries(state, props),
  isSubmitting: getIsSubmitting(state),
  shouldShowActionColumn: getShouldShowActionColumn(state),
  currentOnlineUserType: getCurrentOnlineUserType(state),
});

export default connect(mapStateToProps)(UserListTableBody);
