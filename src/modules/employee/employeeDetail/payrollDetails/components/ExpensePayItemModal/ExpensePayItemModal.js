import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsLoading,
  getModalTitle,
} from '../../selectors/ExpensePayItemModalSelectors';
import AllocatedEmployeesSection from './AllocatedEmployeesSection';
import DetailsSection from './DetailsSection';
import EmployerExpenseInformationSection
  from './EmployerExpenseInformationSection';
import ExemptionsSection from './ExemptionsSection';
import LoadingPageState from '../../../../../../components/LoadingPageState/LoadingPageState';

const ExpensePayItemModal = ({
  title,
  isLoading,
  isActionDisabled,
  alert,
  onDismissAlert,
  onSave,
  onCancel,
  onChangeExpensePayItemInput,
  onBlurExpensePayItemAmountInput,
  onAddAllocatedEmployee,
  onRemoveAllocatedEmployee,
  onAddExemptionPayItem,
  onRemoveExemptionPayItem,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <>
      { alertComponent }
      <DetailsSection
        onChangeExpensePayItemInput={onChangeExpensePayItemInput}
      />
      <EmployerExpenseInformationSection
        onChangeExpensePayItemInput={onChangeExpensePayItemInput}
        onBlurExpensePayItemAmountInput={onBlurExpensePayItemAmountInput}
      />
      <AllocatedEmployeesSection
        onAddAllocatedEmployee={onAddAllocatedEmployee}
        onRemoveAllocatedEmployee={onRemoveAllocatedEmployee}
      />
      <ExemptionsSection
        onAddExemptionPayItem={onAddExemptionPayItem}
        onRemoveExemptionPayItem={onRemoveExemptionPayItem}
      />
    </>
  );

  return (
    <Modal
      title={title}
      onCancel={onCancel}
      canClose={!isActionDisabled}
    >
      <Modal.Body>
        { isLoading ? <LoadingPageState /> : view}
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>Cancel</Button>
        <Button type="primary" onClick={onSave} disabled={isActionDisabled}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  title: getModalTitle(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(ExpensePayItemModal);
