import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsExemptionEnabled,
  getIsLoading,
  getModalTitle,
} from '../../selectors/ExpensePayItemModalSelectors';
import AllocatedEmployeesSection from './AllocatedEmployeesSection';
import DetailsSection from './DetailsSection';
import EmployerExpenseInformationSection from './EmployerExpenseInformationSection';
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
  onAddAllocatedEmployee,
  onRemoveAllocatedEmployee,
  onAddExemptionPayItem,
  onRemoveExemptionPayItem,
  exemptionEnabled,
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
      />
      <AllocatedEmployeesSection
        onAddAllocatedEmployee={onAddAllocatedEmployee}
        onRemoveAllocatedEmployee={onRemoveAllocatedEmployee}
      />
      <ExemptionsSection
        onAddExemptionPayItem={onAddExemptionPayItem}
        onRemoveExemptionPayItem={onRemoveExemptionPayItem}
        enabled={exemptionEnabled}
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
  exemptionEnabled: getIsExemptionEnabled(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(ExpensePayItemModal);
