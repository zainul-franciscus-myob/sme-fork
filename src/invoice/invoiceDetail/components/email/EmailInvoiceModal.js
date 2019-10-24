import {
  Alert, Button, Checkbox, CheckboxGroup, Input, Modal, TextArea,
} from '@myob/myob-widgets';
import React from 'react';

import EmailItemList from '../../../../components/itemList/EmailItemList';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';
import styles from './EmailInvoiceModal.module.css';

const handleItemChange = (handler, key) => (emails) => {
  handler({
    key,
    value: emails,
  });
};

const EmailInvoiceModal = ({
  alert,
  emailInvoiceDetail,
  onCancel,
  onConfirm,
  onEmailInvoiceDetailChange,
  onDismissAlert,
  isActionsDisabled,
}) => (
  <Modal
    title="Email invoice"
    onCancel={onCancel}
    canClose={false}
  >
    <Modal.Body>
      {alert && (
        <Alert type={alert.type} onDismiss={onDismissAlert}>
          {alert.message}
        </Alert>
      )}
      <div className={styles.formWidth}>
        <EmailItemList
          label="To"
          items={emailInvoiceDetail.emailToAddresses}
          onItemChange={handleItemChange(onEmailInvoiceDetailChange, 'toEmail')}
        />
        <EmailItemList
          label="CC"
          items={emailInvoiceDetail.ccEmailToAddresses}
          onItemChange={handleItemChange(onEmailInvoiceDetailChange, 'ccToEmail')}
        />
        <CheckboxGroup
          label=""
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isEmailMeACopy"
              label="Email me a copy"
              checked={emailInvoiceDetail.isEmailMeACopy}
              onChange={handleCheckboxChange(onEmailInvoiceDetailChange)}
            />
          )}
        />
        <hr />
        <Input
          name="subject"
          label="Subject"
          value={emailInvoiceDetail.subject}
          onChange={handleInputChange(onEmailInvoiceDetailChange)}
        />
        <TextArea
          name="messageBody"
          label="Message"
          value={emailInvoiceDetail.messageBody}
          onChange={handleTextAreaChange(onEmailInvoiceDetailChange)}
          rows={10}
        />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isActionsDisabled}>Cancel</Button>
      <Button type="primary" onClick={onConfirm} disabled={isActionsDisabled}>Send invoice</Button>
    </Modal.Footer>
  </Modal>
);

export default EmailInvoiceModal;
