import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsActionDisabled,
  getIsLoading, getIsPaySuperEnabled,
} from '../../selectors/SuperFundModalSelectors';
import PageView from '../../../../../../components/PageView/PageView';
import SuperFundNoPaySuperView from './superFundNoPaySuper/SuperFundNoPaySuperView';
import SuperFundWithPaySuperView from './superFundWithPaySuper/SuperFundWithPaySuperView';

const SuperFundModal = ({
  isLoading,
  isActionDisabled,
  isPaySuperEnabled,
  alertMessage,
  superFundModalListeners,
}) => {
  const alertView = alertMessage && (
    <Alert type="danger" onDismiss={superFundModalListeners.onDismissAlert}>
      {alertMessage}
    </Alert>
  );
  const DetailView = isPaySuperEnabled ? SuperFundWithPaySuperView : SuperFundNoPaySuperView;

  const view = (
    <>
      { alertView }
      <DetailView superFundModalListeners={superFundModalListeners} />
    </>
  );

  const { onSave, onCancel } = superFundModalListeners;

  return (
    <Modal
      title="Create superannuation fund"
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
  alertMessage: getAlertMessage(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
  isPaySuperEnabled: getIsPaySuperEnabled(state),
});

export default connect(mapStateToProps)(SuperFundModal);
