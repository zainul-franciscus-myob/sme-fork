import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getEnableExemptions,
  getIsActionDisabled,
  getIsLeavePayItemModalCreating,
  getIsLoading,
  getModalTitle,
} from '../../selectors/LeavePayItemModalSelectors';
import LeavePayItemDetail from './LeavePayItemDetail';
import LeavePayItemEmployees from './LeavePayItemEmployees';
import LeavePayItemExemptions from './LeavePayItemExemptions';
import LeavePayItemInfo from './LeavePayItemInfo';
import LeavePayItemLinkedWages from './LeavePayItemLinkedWages';
import PageView from '../../../../../../components/PageView/PageView';

const LeavePayItemModal = (props) => {
  const {
    alert,
    title,
    isLoading,
    isActionDisabled,
    enableExemptions,
    onCancel,
    onSave,
    onDismissAlert,
    onAddEmployee,
    onRemoveEmployee,
    onAddExemption,
    onRemoveExemption,
    onAddLinkedWage,
    onRemoveLinkedWage,
    onNameChange,
    onCalculationBasisChange,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <>
      { alertComponent }
      <LeavePayItemDetail onNameChange={onNameChange} />
      <LeavePayItemInfo onCalculationBasisChange={onCalculationBasisChange} />
      <LeavePayItemLinkedWages
        onAddLinkedWage={onAddLinkedWage}
        onRemoveLinkedWage={onRemoveLinkedWage}
      />
      <LeavePayItemEmployees
        onAddEmployee={onAddEmployee}
        onRemoveEmployee={onRemoveEmployee}
      />
      <LeavePayItemExemptions
        onAddExemption={onAddExemption}
        onRemoveExemption={onRemoveExemption}
        enabled={enableExemptions}
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
        <PageView isLoading={isLoading} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>Cancel</Button>
        <Button type="primary" onClick={onSave} disabled={isActionDisabled}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  title: getModalTitle(state),
  isActionDisabled: getIsActionDisabled(state),
  isCreating: getIsLeavePayItemModalCreating(state),
  isLoading: getIsLoading(state),
  enableExemptions: getEnableExemptions(state),
});

export default connect(mapStateToProps)(LeavePayItemModal);
