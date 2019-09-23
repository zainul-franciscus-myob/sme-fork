import {
  Alert, Button, Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsActionDisabled, getIsLoading, getModalTitle,
} from '../../selectors/SuperPayItemModalSelectors';
import PageView from '../../../../../components/PageView/PageView';
import SuperPayItemDetail from './SuperPayItemDetail';
import SuperPayItemEmployees from './SuperPayItemEmployees';
import SuperPayItemExemptions from './SuperPayItemExemptions';
import SuperPayItemInfo from './SuperPayItemSuperInfo';

const SuperPayItemModal = ({
  title,
  alert,
  isLoading,
  isActionDisabled,
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
      <SuperPayItemDetail onChange={onChange} />
      <SuperPayItemInfo onChange={onChange} onBlur={onBlur} />
      <SuperPayItemEmployees onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
      <SuperPayItemExemptions onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
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
  title: getModalTitle(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(SuperPayItemModal);
