import {
  Alert, FormHorizontal, Spinner, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getModalType, getTitle,
} from '../wagePayItemSelector';
import DetailsView from './DetailsView';
import EmployeeAllocationView from './EmployeeAllocationView';
import ExemptionsView from './ExemptionsView';
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
    <StandardTemplate
      pageHead={title}
      alert={alertComponent}
      sticky="none"
    >
      {modal}
      <div className={styles.payItemView}>
        <FormHorizontal>
          <DetailsView
            onDetailsChange={onDetailsChange}
            onOverrideAccountChange={onOverrideAccountChange}
          />
        </FormHorizontal>
      </div>
      <hr />
      <EmployeeAllocationView
        onEmployeeSelected={onEmployeeSelected}
        onRemoveEmployee={onRemoveEmployee}
      />
      <ExemptionsView
        onExemptionSelected={onExemptionSelected}
        onRemoveExemption={onRemoveExemption}
      />
      <WagePayItemActions
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </StandardTemplate>
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
