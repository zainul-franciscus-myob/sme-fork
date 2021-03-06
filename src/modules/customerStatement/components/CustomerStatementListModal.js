import React from 'react';

import CustomerStatementEmailModal from './CustomerStatementEmailModal';
import CustomerStatementPDFModal from './CustomerStatementPDFModal';
import ModalType from '../ModalType';

const CustomerStatementListModal = ({
  modal,
  onDismissModal,
  onDismissModalAlert,
  onDownloadPDF,
  onUpdateTemplateOption,
  onSendEmail,
  onUpdateEmailOptions,
}) => {
  const { type = '' } = modal;
  if (type === ModalType.PDF) {
    return (
      <CustomerStatementPDFModal
        modal={modal}
        onUpdateTemplateOption={onUpdateTemplateOption}
        onDownloadPDF={onDownloadPDF}
        onDismissModal={onDismissModal}
        onDismissModalAlert={onDismissModalAlert}
      />
    );
  }
  return (
    <CustomerStatementEmailModal
      modal={modal}
      onUpdateEmailOptions={onUpdateEmailOptions}
      onSendEmail={onSendEmail}
      onDismissModal={onDismissModal}
      onDismissModalAlert={onDismissModalAlert}
    />
  );
};

export default CustomerStatementListModal;
