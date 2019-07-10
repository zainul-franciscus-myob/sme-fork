import {
  Alert, FormTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getModalType, getTitle,
} from '../wagePayItemSelector';
import DetailsView from './DetailsView';
import EmployeeAllocationView from './EmployeeAllocationView';
import ExemptionsView from './ExemptionsView';
import FormCard from '../../../components/FormCard/FormCard';
import WagePayItemActions from './WagePayItemActions';
import WagePayItemModal from './WagePayItemModal';
import styles from './WagePayItemView.css';

const WagePayItemView = ({
  title,
  isLoading,
  modalType,
  onDetailsChange,
  onOverrideAccountChange,
  onEmployeeSelected,
  onExemptionSelected,
  onRemoveEmployee,
  onRemoveExemption,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConfirmCancel,
  onConfirmDelete,
  onCloseModal,
  onDismissAlert,
  alert,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <WagePayItemModal
      modalType={modalType}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
      onCloseModal={onCloseModal}
    />
  );

  const view = (
    <FormTemplate className={styles.addSpace} pageHead={title} alert={alertComponent}>
      {modal}
      <FormCard>
        <DetailsView
          onDetailsChange={onDetailsChange}
          onOverrideAccountChange={onOverrideAccountChange}
        />
        <EmployeeAllocationView
          onEmployeeSelected={onEmployeeSelected}
          onRemoveEmployee={onRemoveEmployee}
        />
        <ExemptionsView
          onExemptionSelected={onExemptionSelected}
          onRemoveExemption={onRemoveExemption}
        />
      </FormCard>
      <div className={styles.actionsGroup}>
        <WagePayItemActions
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      </div>
    </FormTemplate>
  );

  return (isLoading ? <Spinner /> : view);
};

const mapStateToProps = state => ({
  title: getTitle(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(WagePayItemView);
