import {
  Alert, Button, ButtonRow, Icons, PageHead, StandardTemplate,
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

  const openMyMyob = () => {
    window.open('https://my.myob.com', '_blank', 'noopener noreferrer');
  };

  const pageHead = (
    <PageHead title="Users">
      <Button type="link" icon={<Icons.OpenExternalLink />} onClick={openMyMyob} iconRight>Manage user access via my.MYOB</Button>
      <ButtonRow>
        <Button type="secondary" onClick={onCreateUser(true)}>
          Create advisor
        </Button>
        <Button onClick={onCreateUser(false)}>Create user</Button>
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
