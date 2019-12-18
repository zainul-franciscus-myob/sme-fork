import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCurrentEmployeeEmail,
  getCurrentEmployeeName,
  getEmployeeCount,
  getErrored,
  getIsLoading,
  getIsOpen,
  getTotalEmployees,
} from '../EmailPaySlipModalSelectors';
import EmailSendingMessage from './EmailSendingMessage';

const EmailPaySlipModalView = ({
  isOpen,
  onClose,
  currentEmployeeCount,
  currentEmployeeName,
  currentEmployeeEmail,
  totalEmployees,
  isLoading,
  errors,
}) => {
  const modalSize = (errors.length > 0 && !isLoading) ? 'default' : 'small';
  const modal = (
    <Modal title="Emailing pay slips" canClose={false} size={modalSize}>
      <Modal.Body>
        <EmailSendingMessage
          isLoading={isLoading}
          name={currentEmployeeName}
          email={currentEmployeeEmail}
          count={currentEmployeeCount}
          total={totalEmployees}
          errors={errors}
        />
      </Modal.Body>
      {!isLoading && (
        <Modal.Footer>
          <Button type="primary" onClick={onClose}>Done</Button>
        </Modal.Footer>
      )}
    </Modal>
  );

  return isOpen ? modal : null;
};

const mapStateToProps = state => ({
  isOpen: getIsOpen(state),
  totalEmployees: getTotalEmployees(state),
  currentEmployeeCount: getEmployeeCount(state),
  currentEmployeeName: getCurrentEmployeeName(state),
  currentEmployeeEmail: getCurrentEmployeeEmail(state),
  isLoading: getIsLoading(state),
  errors: getErrored(state),
});

export default connect(mapStateToProps)(EmailPaySlipModalView);
