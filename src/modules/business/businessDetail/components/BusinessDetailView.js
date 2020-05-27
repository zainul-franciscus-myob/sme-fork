import {
  Alert, Button, ButtonRow, FormTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsSubmitting, getLoadingState, getModal, getPageTitle,
} from '../businessDetailSelectors';
import BusinessDetailsSection from './BusinessDetailsSection';
import ContactDetailsSection from './ContactDetailsSection';
import FinancialYearSection from './FinancialYearSection';
import FormCard from '../../../../components/FormCard/FormCard';
import LockDateSection from './LockDateSection';
import PageView from '../../../../components/PageView/PageView';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const BusinessDetailView = ({
  loadingState,
  onChange,
  onStartNewFinancialYear,
  onLockDateDetailChange,
  onSaveButtonClick,
  onConfirmSave,
  onConfirmCancel,
  onConfirmClose,
  onOpenFinancialYearModal,
  onCloseFinancialYearModal,
  alert,
  onDismissAlert,
  isSubmitting,
  pageTitle,
  modal,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const unsavedModal = modal && (
    <UnsavedModal
      onConfirmSave={onConfirmSave}
      onConfirmUnsave={onConfirmCancel}
      onCancel={onConfirmClose}
    />
  );

  const pageFooter = (
    <ButtonRow>
      <Button name="save" type="primary" onClick={onSaveButtonClick} disabled={isSubmitting}>Save</Button>
    </ButtonRow>
  );

  const view = (
    <FormTemplate pageHead={pageTitle} alert={alertComponent} actions={pageFooter}>
      {unsavedModal}
      <FormCard>
        <BusinessDetailsSection onChange={onChange} />
        <ContactDetailsSection onChange={onChange} />
        <FinancialYearSection
          onChange={onChange}
          onStartNewFinancialYear={onStartNewFinancialYear}
          onCloseFinancialYearModal={onCloseFinancialYearModal}
          onOpenFinancialYearModal={onOpenFinancialYearModal}
        />
        <LockDateSection onChange={onLockDateDetailChange} />
      </FormCard>
    </FormTemplate>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

BusinessDetailView.defaultProps = {
  alert: undefined,
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  isSubmitting: getIsSubmitting(state),
  modal: getModal(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(BusinessDetailView);
