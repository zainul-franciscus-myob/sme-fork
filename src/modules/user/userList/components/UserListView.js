import {
  Alert,
  Button,
  ButtonRow,
  Icons,
  PageHead,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsCurrentUserOnlineAdmin,
  getLoadingState,
  getModal,
} from '../userListSelectors';
import ModalType from '../../ModalType';
import PageView from '../../../../components/PageView/PageView';
import RemoveAccessModal from './RemoveAccessModal';
import UserListFilterOptions from './UserListFilterOptions';
import UserListTable from './UserListTable';
import UserListTableHeader from './UserListTableHeader';

export const tableConfig = {
  name: { width: '31.2rem', valign: 'top', columnName: 'Name' },
  email: { width: 'flex-1', valign: 'top', columnName: 'Email' },
  type: { width: '11rem', valign: 'top', columnName: 'User type' },
  status: { width: '21rem', valign: 'top', columnName: 'Status' },
  action: { width: '26.5rem', valign: 'top', columnName: 'Action' },
};

const UserListView = (props) => {
  const {
    alert,
    modal,
    loadingState,
    onCreateUser,
    onDismissAlert,
    onSort,
    onMyMyobClick,
    onResendInvitation,
    onCancelInvitation,
    onRemoveAccessClick,
    onCloseModal,
    onRemoveAccessModal,
    onUpdateFilterOptions,
    setShowStatusFilterOptions,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const filterBar = (
    <UserListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      setShowStatusFilterOptions={setShowStatusFilterOptions}
    />
  );

  const pageHead = (
    <PageHead title="Users">
      <Button
        type="link"
        icon={<Icons.OpenExternalLink />}
        onClick={onMyMyobClick}
        iconRight
      >
        Manage user access via my.MYOB
      </Button>
      <ButtonRow>
        <Button type="secondary" onClick={onCreateUser(true)}>
          Create advisor
        </Button>
        <Button onClick={onCreateUser(false)}>Create user</Button>
      </ButtonRow>
    </PageHead>
  );

  const tableHeader = (
    <UserListTableHeader onSort={onSort} tableConfig={tableConfig} />
  );

  let modalComponent;
  if (modal.type === ModalType.REMOVE_ACESS) {
    modalComponent = (
      <RemoveAccessModal
        onCancel={onCloseModal}
        onConfirm={onRemoveAccessModal}
      />
    );
  }

  const userListView = (
    <StandardTemplate
      pageHead={pageHead}
      alert={alertComponent}
      filterBar={filterBar}
      tableHeader={tableHeader}
    >
      {modalComponent}
      <UserListTable
        tableConfig={tableConfig}
        onResendInvitation={onResendInvitation}
        onCancelInvitation={onCancelInvitation}
        onRemoveAccessClick={onRemoveAccessClick}
      />
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={userListView} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  isCurrentUserOnlineAdmin: getIsCurrentUserOnlineAdmin(state),
  modal: getModal(state),
});

export default connect(mapStateToProps)(UserListView);
