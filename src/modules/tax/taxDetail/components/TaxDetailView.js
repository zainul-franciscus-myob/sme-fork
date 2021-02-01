import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getModal, getPageTitle } from '../taxDetailSelectors';
import { getLoadingState } from '../../../job/jobDetail/jobDetailSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import FormCard from '../../../../components/FormCard/FormCard';
import ModalType from '../ModalType';
import PageView from '../../../../components/PageView/PageView';
import TaxDetailActions from './TaxDetailActions';
import TaxDetailBody from './TaxDetailBody';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const TaxDetailView = ({
  alert,
  modal,
  loadingState,
  pageHeadTitle,
  onSaveButtonClick,
  onCancelButtonClick,
  onCloseModal,
  onCancelModal,
  onDismissAlert,
  onChangeTaxField,
  renderContactCombobox,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  let modalElement;
  if (modal.type === ModalType.CANCEL) {
    modalElement = (
      <CancelModal onCancel={onCloseModal} onConfirm={onCancelModal} />
    );
  } else if (modal.type === ModalType.UNSAVED) {
    modalElement = (
      <UnsavedModal
        onConfirmSave={onSaveButtonClick}
        onConfirmUnsave={onCancelModal}
        onCancel={onCloseModal}
      />
    );
  }

  const view = (
    <FormTemplate
      pageHead={pageHeadTitle}
      alert={alertComponent}
      sticky="none"
      actions={
        <TaxDetailActions
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
        />
      }
    >
      <FormCard>
        {modalElement}
        <TaxDetailBody
          renderContactCombobox={renderContactCombobox}
          onChangeTaxField={onChangeTaxField}
        />
      </FormCard>
    </FormTemplate>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
  pageHeadTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(TaxDetailView);
