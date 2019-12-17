import { Alert, Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsActionDisabled,
  getIsLoading,
  getIsOpen,
  getRegion,
} from '../accountModalSelectors';
import DetailView from './DetailView';
import PageView from '../../../../components/PageView/PageView';
import RegionToBankComponentMapping from '../RegionToBankComponentMapping';

const AccountModalView = ({
  isOpen,
  isLoading,
  isActionDisabled,
  alertMessage,
  onSaveButtonClick,
  onCloseModal,

  bankSectionComponent,

  onBankDetailsChange,
  onAccountChange,
  onAccountNumberChange,
  onAccountNumberBlur,
  onAccountTypeChange,
  onDismissAlert,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const accountCategoryContent = (
    <DetailView
      onBankDetailsChange={onBankDetailsChange}
      bankSectionComponent={bankSectionComponent}
      onAccountChange={onAccountChange}
      onAccountNumberChange={onAccountNumberChange}
      onAccountNumberBlur={onAccountNumberBlur}
      onAccountTypeChange={onAccountTypeChange}
    />
  );
  const view = (
    <>
      {alertComponent}
      {accountCategoryContent}
    </>
  );
  const modal = (
    <Modal
      title="Create account"
      onCancel={onCloseModal}
      canClose={!isActionDisabled}
    >
      <Modal.Body>
        <PageView isLoading={isLoading} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCloseModal}
          disabled={isActionDisabled}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onSaveButtonClick}
          disabled={isActionDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return isOpen && modal;
};

const mapStateToProps = state => ({
  bankSectionComponent: RegionToBankComponentMapping[getRegion(state)],
  isOpen: getIsOpen(state),
  isLoading: getIsLoading(state),
  isActionDisabled: getIsActionDisabled(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(AccountModalView);
