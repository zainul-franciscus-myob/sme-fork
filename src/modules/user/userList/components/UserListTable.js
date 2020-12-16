import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading } from '../userListSelectors';
import NoResultsPageState from '../../../../components/NoResultPageState/NoResultPageStateColour';
import StickyTableBody from '../../../../components/StickyTable/StickyTableBody';
import UserListTableBody from './UserListTableBody';

const UserListTable = ({
  isTableEmpty,
  isTableLoading,
  tableConfig,
  onResendInvitation,
  onCancelInvitation,
  onRemoveAccessClick,
}) => (
  <StickyTableBody
    isLoading={isTableLoading}
    isEmpty={isTableEmpty}
    emptyView={
      <NoResultsPageState
        title="No results found"
        description="Perhaps check spelling or remove the filters and try again"
      />
    }
  >
    <UserListTableBody
      tableConfig={tableConfig}
      onResendInvitation={onResendInvitation}
      onCancelInvitation={onCancelInvitation}
      onRemoveAccessClick={onRemoveAccessClick}
    />
  </StickyTableBody>
);

const mapStateToProps = (state) => ({
  isTableEmpty: getIsTableEmpty(state),
  isTableLoading: getIsTableLoading(state),
});

export default connect(mapStateToProps)(UserListTable);
