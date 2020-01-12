import React from 'react';

import ModalType from '../../ModalType';
import PayrollYearWarningModal from './PayrollYearWarningModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const GeneralPayrollInformationModal = ({
  modal: { type = '', year },
  onDismissModal,
  onConfirmSave,
  onWarningConfirmSave,
  onConfirmCancelButtonClick,
}) => {
  if (type === ModalType.PAYROLL_YEAR_WARNING) {
    const startsYear = parseInt(year, 10) - 1;
    const endsYear = year;

    const description = `You are setting the payroll year to ${year}. This payroll
      year begins 1/7/${startsYear} and ends 30/6/${endsYear}.`;

    return (
      <PayrollYearWarningModal
        onConfirm={onWarningConfirmSave}
        onCancel={onDismissModal}
        title="Set the payroll year?"
        description={description}
      />
    );
  }
  return (
    <UnsavedModal
      onConfirmSave={onConfirmSave}
      onConfirmUnsave={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
    />
  );
};

export default GeneralPayrollInformationModal;
