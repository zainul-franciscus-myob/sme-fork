import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsActionDisabled, getIsLoading, getModalTitle,
} from '../../selectors/DeductionPayItemModalSelectors';
import DeductionPayItemDetails from './DeductionPayItemDetails';
import DeductionPayItemEmployees from './DeductionPayItemEmployees';
import DeductionPayItemExemptions from './DeductionPayItemExemptions';
import DeductionPayItemInformation from './DeductionPayItemInformation';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';

const DeductionPayItemModal = ({
  title,
  isLoading,
  isActionDisabled,
  alert,
  onDismissAlert,
  onChange,
  onBlur,
  onAddItem,
  onRemoveItem,
  onSave,
  onCancel,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <>
      { alertComponent }
      <DeductionPayItemDetails onChange={onChange} />
      <DeductionPayItemInformation
        onChange={onChange}
        onBlur={onBlur}
      />
      <DeductionPayItemEmployees
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
      />
      <DeductionPayItemExemptions
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
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

export default connect(mapStateToProps)(DeductionPayItemModal);
