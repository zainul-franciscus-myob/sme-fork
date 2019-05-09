import {
  Alert,
  Spinner,
  StandardTemplate,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getMainTab,
  getModalType,
  getPageHeadTitle,
} from '../EmployeeDetailSelectors';
import { mainTabIds, mainTabItems } from '../tabItems';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import EmployeeDetailActions from './EmployeeDetailActions';
import EmployeeDetailContactDetails from './EmployeeDetailContactDetails';
import EmployeeDetailPaymentDetails from './EmployeeDetailPaymentDetails';
import EmployeeDetailPayrollDetails from './EmployeeDetailPayrollDetails';

const getModalDialogView = ({
  modalType, onCloseModal, onCancelModal, onDeleteModal,
}) => {
  switch (modalType) {
    case 'cancel':
      return (
        <CancelModal
          onCancel={onCloseModal}
          onConfirm={onCancelModal}
          title="Cancel employee alterations"
          description="Are you sure you want to cancel the alterations in this employee?"
        />
      );
    case 'delete':
      return (
        <DeleteModal
          onCancel={onCloseModal}
          onConfirm={onDeleteModal}
          title="Delete employee"
          description="Are you sure you want to delete this employee?"
        />
      );
    default:
      return undefined;
  }
};

const EmployeeDetailView = ({
  selectedTab,
  onMainTabSelected,
  onSubTabSelected,
  isLoading,
  onContactDetailsChange,
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  alert,
  onDismissAlert,
  modalType,
  onCloseModal,
  onCancelModal,
  onDeleteModal,
  pageHeadTitle,
}) => {
  const Content = {
    [mainTabIds.contactDetails]: EmployeeDetailContactDetails,
    [mainTabIds.paymentDetails]: EmployeeDetailPaymentDetails,
    [mainTabIds.payrollDetails]: EmployeeDetailPayrollDetails,
  }[selectedTab];

  const subHeadTabs = (
    <Tabs
      items={mainTabItems}
      selected={selectedTab}
      onSelected={onMainTabSelected}
    />
  );

  const actions = (
    <EmployeeDetailActions
      onCancelButtonClick={onCancelButtonClick}
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = getModalDialogView({
    modalType, onCloseModal, onCancelModal, onDeleteModal,
  });

  const contentProps = {
    onSubTabSelected,
    onContactDetailsChange,
  };

  const view = (
    <StandardTemplate
      alert={alertComponent}
      sticky="none"
      pageHead={pageHeadTitle}
      subHeadChildren={subHeadTabs}
    >
      { modal }

      <Content {...contentProps} />

      { actions }
    </StandardTemplate>
  );

  return isLoading ? <Spinner /> : view;
};

EmployeeDetailView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  selectedTab: PropTypes.string.isRequired,
  onMainTabSelected: PropTypes.func.isRequired,
  onSubTabSelected: PropTypes.func.isRequired,
  onContactDetailsChange: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  pageHeadTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  selectedTab: getMainTab(state),
  alert: getAlert(state),
  modalType: getModalType(state),
  pageHeadTitle: getPageHeadTitle(state),
});

export default connect(mapStateToProps)(EmployeeDetailView);
