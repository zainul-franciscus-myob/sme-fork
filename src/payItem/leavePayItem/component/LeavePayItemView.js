import {
  Alert, FormHorizontal, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsCreating, getIsLoading, getModalType, getShowExemptions, getTitle,
} from '../leavePayItemSelectors';
import LeavePayItemActions from './LeavePayItemActions';
import LeavePayItemDetail from './LeavePayItemDetail';
import LeavePayItemEmployees from './LeavePayItemEmployees';
import LeavePayItemExemptions from './LeavePayItemExemptions';
import LeavePayItemInfo from './LeavePayItemInfo';
import LeavePayItemLinkedWages from './LeavePayItemLinkedWages';
import LeavePayItemModal from './LeavePayItemModal';
import PageView from '../../../components/PageView/PageView';
import styles from './LeavePayItemView.module.css';

const LeavePayItemView = (props) => {
  const {
    alert,
    title,
    isCreating,
    isLoading,
    modalType,
    showExemptions,
    onDismissAlert,
    onConfirmCancel,
    onConfirmDelete,
    onCloseModal,
    onSaveButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
    onAddEmployee,
    onRemoveEmployee,
    onAddExemption,
    onRemoveExemption,
    onAddLinkedWage,
    onRemoveLinkedWage,
    onNameChange,
    onCalculationBasisChange,
    onCalculationBasisAmountChange,
  } = props;

  const pageHead = isCreating ? 'Create leave pay item' : title;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <LeavePayItemModal
      modalType={modalType}
      onCloseModal={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
    />
  );

  const view = (
    <StandardTemplate
      pageHead={pageHead}
      alert={alertComponent}
      sticky="none"
    >
      {modal}
      <div className={styles.leavePayItemContainer}>
        <FormHorizontal>
          <LeavePayItemDetail onNameChange={onNameChange} />
          <LeavePayItemInfo
            onCalculationBasisChange={onCalculationBasisChange}
            onCalculationBasisAmountChange={onCalculationBasisAmountChange}
          />
        </FormHorizontal>
      </div>
      <LeavePayItemLinkedWages
        onAddLinkedWage={onAddLinkedWage}
        onRemoveLinkedWage={onRemoveLinkedWage}
      />
      <LeavePayItemEmployees
        onAddEmployee={onAddEmployee}
        onRemoveEmployee={onRemoveEmployee}
      />
      {
        showExemptions && (
        <LeavePayItemExemptions
          onAddExemption={onAddExemption}
          onRemoveExemption={onRemoveExemption}
        />
        )
      }
      <div className={styles.actionsGroup}>
        <LeavePayItemActions
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      </div>
    </StandardTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  title: getTitle(state),
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  showExemptions: getShowExemptions(state),
});

export default connect(mapStateToProps)(LeavePayItemView);
