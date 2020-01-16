import {
  Alert, Button, ButtonRow, Icons, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsCurrentUserOnlineAdmin, getLoadingState } from '../userListSelectors';
import PageView from '../../../../components/PageView/PageView';
import UserListTable from './UserListTable';
import UserListTableHeader from './UserListTableHeader';

export const tableConfig = {
  name: { width: '31.2rem', valign: 'top', columnName: 'Name' },
  email: { width: 'flex-1', valign: 'top', columnName: 'Email' },
  advisor: { width: '11rem', valign: 'top', columnName: 'User type' },
  status: { width: '11rem', valign: 'top', columnName: 'Status' },
};

const UserListView = (props) => {
  const {
    alert,
    loadingState,
    isCurrentUserOnlineAdmin,
    onCreateUser,
    onDismissAlert,
    onSort,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const openMyMyob = () => {
    window.open('https://my.myob.com', '_blank', 'noopener noreferrer');
  };

  const pageHead = (
    <PageHead title="Users">
      { isCurrentUserOnlineAdmin && (
        <>
          <Button type="link" icon={<Icons.OpenExternalLink />} onClick={openMyMyob} iconRight>
            Manage user access via my.MYOB
          </Button>
          <ButtonRow>
            <Button type="secondary" onClick={onCreateUser(true)}>
              Create advisor
            </Button>
            <Button onClick={onCreateUser(false)}>Create user</Button>
          </ButtonRow>
        </>
      )}
    </PageHead>
  );

  const tableHeader = <UserListTableHeader onSort={onSort} tableConfig={tableConfig} />;

  const userListView = (
    <StandardTemplate pageHead={pageHead} alert={alertComponent} tableHeader={tableHeader}>
      <UserListTable tableConfig={tableConfig} />
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={userListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  loadingState: getLoadingState(state),
  isCurrentUserOnlineAdmin: getIsCurrentUserOnlineAdmin(state),
});

export default connect(mapStateToProps)(UserListView);
