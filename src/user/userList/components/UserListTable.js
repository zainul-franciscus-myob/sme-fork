import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../userListSelectors';
import StickyTableBody from '../../../components/StickyTable/StickyTableBody';
import UserListTableBody from './UserListTableBody';

const UserListTable = ({
  isTableEmpty,
  isTableLoading,
  tableConfig,
}) => (
  <StickyTableBody
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyMessage="There are no users."
  >
    <UserListTableBody tableConfig={tableConfig} />
  </StickyTableBody>
);

const mapStateToProps = state => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(UserListTable);
