import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionDisabled,
  getIsLoading,
  getModalTitle,
} from '../../selectors/WagePayItemModalSelectors';
import PageView from '../../../../../../components/PageView/PageView';
import WagePayItemDetails from './WagePayItemDetails';
import WagePayItemEmployeeAllocation from './WagePayItemEmployeeAllocation';
import WagePayItemExemptions from './WagePayItemExemptions';

const WagePayItemModal = ({
  title,
  isLoading,
  isActionDisabled,
  alert,
  onDismissAlert,
  onSave,
  onCancel,
  onDetailsChange,
  onOverrideAccountChange,
  onEmployeeSelected,
  onRemoveEmployee,
  onExemptionSelected,
  onRemoveExemption,
  featureToggles,
  onJobKeeperChange,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <>
      {alertComponent}
      <WagePayItemDetails
        onDetailsChange={onDetailsChange}
        onOverrideAccountChange={onOverrideAccountChange}
        featureToggles={featureToggles}
        onJobKeeperChange={onJobKeeperChange}
      />
      <WagePayItemEmployeeAllocation
        onEmployeeSelected={onEmployeeSelected}
        onRemoveEmployee={onRemoveEmployee}
      />
      <WagePayItemExemptions
        onExemptionSelected={onExemptionSelected}
        onRemoveExemption={onRemoveExemption}
      />
    </>
  );

  return (
    <Modal title={title} onCancel={onCancel} canClose={!isActionDisabled}>
      <Modal.Body>
        <PageView isLoading={isLoading} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>
          Cancel
        </Button>
        <Button type="primary" onClick={onSave} disabled={isActionDisabled}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  title: getModalTitle(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(WagePayItemModal);
