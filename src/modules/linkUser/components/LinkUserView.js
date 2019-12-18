import {
  Alert, Card, FormHorizontal, FormTemplate, Input, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getBusinessName,
  getIsLoading,
  getPassword,
  getUserEmail,
  getUserId,
} from '../LinkUserSelectors';
import LinkUserActions from './LinkUserActions';
import PageView from '../../../components/PageView/PageView';
import handleInputChange from '../../../components/handlers/handleInputChange';

const LinkUserView = ({
  isLoading,
  businessName,
  userEmail,
  userId,
  password,
  alertMessage,
  onUserInformationUpdate,
  onLinkUser,
  onCancel,
  onDismissAlert,
}) => {
  const alert = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const pageHead = (<PageHead title="Link a User ID to your MYOB account" />);

  const body = (
    <Card>
      <p>
        Which User ID do you want to sign in to
        {' '}
        <strong>{businessName}</strong>
        {' '}
        as?
      </p>
      <FormHorizontal layout="primary">
        <Input name="userId" label="User ID" maxLength={35} value={userId} onChange={handleInputChange(onUserInformationUpdate)} />
        <Input name="password" label="Password" type="password" value={password} onChange={handleInputChange(onUserInformationUpdate)} />
      </FormHorizontal>
      <Alert type="info">
        From now on, when you sign in to MYOB as
        {' '}
        <strong>{userEmail}</strong>
        {' '}
        and open
        {' '}
        <strong>{businessName}</strong>
        , you&apos;ll be signed in with this ID automatically.
      </Alert>
    </Card>
  );

  const view = (
    <FormTemplate pageHead={pageHead}>
      <React.Fragment>
        {alert}
        {body}
        <LinkUserActions onLinkUser={onLinkUser} onCancel={onCancel} />
      </React.Fragment>
    </FormTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  businessName: getBusinessName(state),
  userEmail: getUserEmail(state),
  alertMessage: getAlertMessage(state),
  userId: getUserId(state),
  password: getPassword(state),
});

export default connect(mapStateToProps)(LinkUserView);
