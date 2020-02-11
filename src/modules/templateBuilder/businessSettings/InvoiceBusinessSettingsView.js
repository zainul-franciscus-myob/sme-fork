import {
  Alert, Button, ButtonRow, FormTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getIsSubmitting, getModal, getPageTitle,
} from '../../business/businessDetail/businessDetailSelectors';
import BusinessSettingsDetails from './InvoiceBusinessSettingsDetails';
import FormCard from '../../../components/FormCard/FormCard';
import PageView from '../../../components/PageView/PageView';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const BusinessSettingsView = ({
  alert,
  isLoading,
  isSubmitting,
  modal,
  onChange,
  onConfirmCancel,
  onConfirmClose,
  onConfirmSave,
  onDismissAlert,
  onSaveButtonClick,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const unsavedModal = modal && (
    <UnsavedModal
      onCancel={onConfirmClose}
      onConfirmSave={onConfirmSave}
      onConfirmUnsave={onConfirmCancel}
    />
  );

  const pageFooter = (
    <ButtonRow>
      <Button name="save" type="primary" onClick={onSaveButtonClick} disabled={isSubmitting}>Save</Button>
    </ButtonRow>
  );

  const view = (
    <FormTemplate
      actions={pageFooter}
      alert={alertComponent}
      pageHead="Build your invoice template"
      sticky="none"
    >
      {unsavedModal}
      <FormCard>
        <BusinessSettingsDetails onChange={onChange} />
      </FormCard>
    </FormTemplate>
  );
  return <PageView isLoading={isLoading} view={view} />;
};

BusinessSettingsView.defaultProps = { alert: undefined };

const mapStateToProps = state => ({
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isSubmitting: getIsSubmitting(state),
  modal: getModal(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(BusinessSettingsView);
