import {
  Alert, FormTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getModalType, getTitle,
} from '../DeductionPayItemSelectors';
import DeductionPayItemActions from './DeductionPayItemActions';
import DeductionPayItemModal from './DeductionPayItemModal';
import DetailsView from './DetailsView';
import EmployeeAllocationView from './EmployeeAllocationView';
import ExemptionsView from './ExemptionsView';
import FormCard from '../../../../components/FormCard/FormCard';
import InformationView from './InformationView';
import styles from './DeductionPayItemView.css';

const DeductionPayItemView = ({
  title,
  isLoading,
  modalType,
  onDetailsChange,
  onInformationChange,
  onInformationAmountChange,
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
  </Alert>);

  const view = (
    <FormTemplate
      className={styles.addSpace}
      pageHead={title}
      alert={alertComponent}
    >
      {
        modalType && (
        <DeductionPayItemModal
          modalType={modalType}
          onConfirmCancel={onConfirmCancel}
          onConfirmDelete={onConfirmDelete}
          onCloseModal={onCloseModal}
        />)
      }
      <FormCard>
        <DetailsView onDetailsChange={onDetailsChange} />
        <InformationView
          onInformationChange={onInformationChange}
          onInformationAmountChange={onInformationAmountChange}
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
        <DeductionPayItemActions
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

export default connect(mapStateToProps)(DeductionPayItemView);
