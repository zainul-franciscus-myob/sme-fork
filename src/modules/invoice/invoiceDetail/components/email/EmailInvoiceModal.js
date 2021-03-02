import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  Separator,
  TextArea,
} from '@myob/myob-widgets';
import React from 'react';

import EmailInvoiceAttachmentsContent from './EmailInvoiceAttachmentsContent';
import EmailInvoiceModalSettings from './EmailInvoiceModalSettings';
import EmailItemList from '../../../../../components/itemList/EmailItemList';
import EnterKeyFocusableWrapper from '../../../../../components/EnterKeyFocusableWrapper/EnterKeyFocusableWrapper';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import handleTextAreaChange from '../../../../../components/handlers/handleTextAreaChange';
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
  templateOptions,
  isActionsDisabled,
  onCancel,
  onConfirm,
  onCustomiseTemplateLinkClick,
  onEmailInvoiceDetailChange,
  onDismissAlert,
  onRemoveAttachment,
  onAddAttachments,
  onPreviewPdfButtonClick,
}) => {
  const renderContent = (onKeyDown) => (
    <div className={styles.formWidth}>
      <EmailItemList
        label="To"
        items={emailInvoiceDetail.emailToAddresses}
        requiredLabel="Required"
        onItemChange={handleItemChange(onEmailInvoiceDetailChange, 'toEmail')}
        onKeyDown={onKeyDown}
      />
      <EmailItemList
        label="CC"
        items={emailInvoiceDetail.ccEmailToAddresses}
        onItemChange={handleItemChange(onEmailInvoiceDetailChange, 'ccToEmail')}
        onKeyDown={onKeyDown}
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
        onKeyDown={onKeyDown}
        maxLength={255}
      />
      <TextArea
        name="messageBody"
        label="Message"
        value={emailInvoiceDetail.messageBody}
        onChange={handleTextAreaChange(onEmailInvoiceDetailChange)}
        rows={10}
        maxLength={4000}
      />
      <EmailInvoiceAttachmentsContent
        onRemoveAttachment={onRemoveAttachment}
        onAddAttachments={onAddAttachments}
      />
      <Alert type="info">
        Total size of uploaded documents cannot exceed 25MB
      </Alert>
      <Separator />
      <EmailInvoiceModalSettings
        emailInvoiceDetail={emailInvoiceDetail}
        templateOptions={templateOptions}
        onEmailInvoiceDetailChange={onEmailInvoiceDetailChange}
        onCustomiseTemplateLinkClick={onCustomiseTemplateLinkClick}
        onPreviewPdfButtonClick={onPreviewPdfButtonClick}
      />
    </div>
  );

  return (
    <Modal
      title="Email invoice"
      onCancel={onCancel}
      canClose={!isActionsDisabled}
      underlayProps={{ id: 'emailInvoiceModal' }}
    >
      <Modal.Body>
        {alert && (
          <Alert type={alert.type} onDismiss={onDismissAlert}>
            {alert.message}
          </Alert>
        )}
        <EnterKeyFocusableWrapper renderContent={renderContent} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCancel}
          disabled={isActionsDisabled}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={onConfirm} disabled={isActionsDisabled}>
          Send invoice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailInvoiceModal;
