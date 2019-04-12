import {
  Alert, Button, ButtonRow, PageHead, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading } from '../userListSelectors';
import UserListTable from './UserListTable';
import style from './UserListView.css';

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
    <PageHead title="Online users">
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

  const view = isLoading ? (<Spinner />) : userListView;

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(UserListView);
