import {
  Alert,
  BaseTemplate,
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
  getRemoveAccessModalBody,
  getRemovePracticeAccessModalBody,
  getShouldShowPractices,
  getShouldShowPracticesError,
} from '../userListSelectors';
import ExistingAdvisorList from './ExistingAdvisorList';
import ModalType from '../../ModalType';
import RemoveAccessModal from './RemoveAccessModal';
import UserListFilterOptions from './UserListFilterOptions';
import UserListPageView from './UserListPageView';
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
    onSortPracticeList,
    onMyMyobClick,
    onResendInvitation,
    onCancelInvitation,
    onRemoveAccessClick,
    onRemovePracticeAccessClick,
    onCloseModal,
    onRemoveAccessModal,
    onRemovePracticeAccessModal,
    onUpdateFilterOptions,
    setShowStatusFilterOptions,
    shouldShowPractices,
    shouldShowPracticesError,
    removeAccessModalBody,
    removePracticeAccessModalBody,
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

  const existingAdvisorsPageHead = (
    <PageHead title="Existing advisors"></PageHead>
  );

  const tableHeader = (
    <UserListTableHeader onSort={onSort} tableConfig={tableConfig} />
  );

  let modalComponent;
  if (modal.type === ModalType.REMOVE_ACCESS) {
    modalComponent = (
      <RemoveAccessModal
        onCancel={onCloseModal}
        onConfirm={onRemoveAccessModal}
        modalBody={removeAccessModalBody}
      />
    );
  }
  if (modal.type === ModalType.REMOVE_PRACTICE_ACCESS) {
    modalComponent = (
      <RemoveAccessModal
        onCancel={onCloseModal}
        onConfirm={onRemovePracticeAccessModal}
        modalBody={removePracticeAccessModalBody}
      />
    );
  }

  const userListView = (
    <>
      {shouldShowPracticesError && (
        <BaseTemplate>
          <Alert type="warning">
            Sorry, advisors with access to your file cannot currently be
            displayed, Try again later or contact our support team on&nbsp;
            <a href="tel:1300555123">1300 555 123</a>.
          </Alert>
        </BaseTemplate>
      )}
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
      {shouldShowPractices && (
        <StandardTemplate pageHead={existingAdvisorsPageHead}>
          <ExistingAdvisorList
            onSort={onSortPracticeList}
            onRemovePracticeAccessClick={onRemovePracticeAccessClick}
          />
        </StandardTemplate>
      )}
    </>
  );

  return <UserListPageView loadingState={loadingState} view={userListView} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  isCurrentUserOnlineAdmin: getIsCurrentUserOnlineAdmin(state),
  modal: getModal(state),
  shouldShowPractices: getShouldShowPractices(state),
  shouldShowPracticesError: getShouldShowPracticesError(state),
  removeAccessModalBody: getRemoveAccessModalBody(state),
  removePracticeAccessModalBody: getRemovePracticeAccessModalBody(state),
});

export default connect(mapStateToProps)(UserListView);
