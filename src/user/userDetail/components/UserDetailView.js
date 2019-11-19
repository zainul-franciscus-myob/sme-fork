import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlertMessage, getIsLoading, getModal } from '../userDetailSelectors';
import FormCard from '../../../components/FormCard/FormCard';
import PageView from '../../../components/PageView/PageView';
import UserDetailAccessGroup from './UserDetailAccessGroup';
import UserDetailButtons from './UserDetailButtons';
import UserDetailDetailsGroup from './UserDetailDetailsGroup';
import UserDetailHeader from './UserDetailHeader';
import UserDetailModal from './UserDetailModal';

const UserDetailView = ({
  modal,
  onCloseModal,
  onDeleteModal,
  onCancelButtonClick,
  onConfirmCancelButtonClick,
  onUserDetailsChange,
  onUserRolesChange,
  onSaveButtonClick,
  onDeleteButtonClick,
  isLoading,
  alertMessage,
  onDismissAlert,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const pageHead = <UserDetailHeader />;

  const actions = (
    <UserDetailButtons
      onCancelButtonClick={onCancelButtonClick}
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const view = (
    <FormTemplate pageHead={pageHead} alert={alertComponent} actions={actions}>
      { modal && (
        <UserDetailModal
          modalType={modal.type}
          onCloseModal={onCloseModal}
          onDeleteModal={onDeleteModal}
          onConfirmSave={onSaveButtonClick}
          onConfirmCancelButtonClick={onConfirmCancelButtonClick}
        />
      )}
      <FormCard>
        <UserDetailDetailsGroup
          onUserDetailsChange={onUserDetailsChange}
        />
        <UserDetailAccessGroup
          onUserDetailsChange={onUserDetailsChange}
          onUserRolesChange={onUserRolesChange}
        />
      </FormCard>
    </FormTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  modal: getModal(state),
  isLoading: getIsLoading(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(UserDetailView);
