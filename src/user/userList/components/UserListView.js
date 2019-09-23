import {
  Alert, Button, ButtonRow, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../userListSelectors';
import PageView from '../../../components/PageView/PageView';
import UserListTable from './UserListTable';
import style from './UserListView.module.css';

const UserListView = (props) => {
  const {
    alert,
    isLoading,
    onCreateUser,
    onDismissAlert,
    onSort,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = (
    <PageHead title="Users">
      <a href="https://my.myob.com" target="_blank" rel="noopener noreferrer">Manage online access</a>
      <ButtonRow>
        <Button type="secondary" onClick={onCreateUser(true)}>Invite advisor</Button>
        <Button onClick={onCreateUser(false)}>Invite user</Button>
      </ButtonRow>
    </PageHead>
  );

  const userListView = (
    <StandardTemplate pageHead={pageHead} alert={alertComponent} sticky="none">
      <div className={style.list}>
        <UserListTable
          onSort={onSort}
        />
      </div>
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={userListView} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(UserListView);
