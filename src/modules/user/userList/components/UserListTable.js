import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../userListSelectors';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import UserListTableBody from './UserListTableBody';

const UserListTable = ({
  isTableEmpty,
  isTableLoading,
  tableConfig,
  onResendInvitation,
  onCancelInvitation,
}) => (
  <StickyTableBody
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyMessage="There are no users."
  >
    <UserListTableBody
      tableConfig={tableConfig}
      onResendInvitation={onResendInvitation}
      onCancelInvitation={onCancelInvitation}
    />
  </StickyTableBody>
);

const mapStateToProps = (state) => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(UserListTable);
