import {
  Alert,
  FormTemplate,
  Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlertMessage, getIsLoading, getModalType, getPageHead,
} from '../userDetailSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import FormCard from '../../../components/FormCard/FormCard';
import UserDetailAccessGroup from './UserDetailAccessGroup';
import UserDetailButtons from './UserDetailButtons';
import UserDetailDetailsGroup from './UserDetailDetailsGroup';

const UserDetailView = ({
  pageHead,
  modalType,
  onCloseModal,
  onCancelModal,
  onDeleteModal,
  onCancelButtonClick,
  onUserDetailsChange,
  onUserRolesChange,
  onSaveButtonClick,
  onDeleteButtonClick,
  isLoading,
  alertMessage,
  onDismissAlert,
}) => {
  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
        title="Cancel"
        description="Are you sure you want to cancel?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete user"
        description="Are you sure you want to delete this user?"
      />
    );
  }

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const view = (
    <FormTemplate pageHead={pageHead} alert={alertComponent}>
      {modal}
      <FormCard>
        <UserDetailDetailsGroup
          onUserDetailsChange={onUserDetailsChange}
        />
        <UserDetailAccessGroup
          onUserDetailsChange={onUserDetailsChange}
          onUserRolesChange={onUserRolesChange}
        />
      </FormCard>
      <UserDetailButtons
        onCancelButtonClick={onCancelButtonClick}
        onSaveButtonClick={onSaveButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </FormTemplate>
  );

  return (
    isLoading ? <Spinner /> : view
  );
};

UserDetailView.propTypes = {
  pageHead: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onUserDetailsChange: PropTypes.func.isRequired,
  onUserRolesChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pageHead: getPageHead(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(UserDetailView);
