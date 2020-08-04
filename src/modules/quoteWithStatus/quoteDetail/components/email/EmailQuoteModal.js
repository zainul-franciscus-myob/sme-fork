import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  Select,
  TextArea,
} from '@myob/myob-widgets';
import React from 'react';

import EmailItemList from '../../../../../components/itemList/EmailItemList';
import EmailQuoteAttachmentsContent from './EmailQuoteAttachmentsContent';
import EnterKeyFocusableWrapper from '../../../../../components/EnterKeyFocusableWrapper/EnterKeyFocusableWrapper';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import handleTextAreaChange from '../../../../../components/handlers/handleTextAreaChange';
import styles from './EmailQuoteModal.module.css';

const handleItemChange = (handler, key) => (emails) => {
  handler({
    key,
    value: emails,
  });
};

const EmailQuoteModal = ({
  alert,
  emailQuoteDetail,
  templateOptions,
  isActionDisabled,
  onCancel,
  onConfirm,
  onEmailQuoteDetailChange,
  onDismissAlert,
  onRemoveAttachment,
  onAddAttachments,
}) => {
  const renderContent = (onKeyDown) => (
    <div className={styles.formWidth}>
      <EmailItemList
        label="To"
        items={emailQuoteDetail.emailToAddresses}
        requiredLabel="Required"
        onItemChange={handleItemChange(onEmailQuoteDetailChange, 'toEmail')}
        onKeyDown={onKeyDown}
      />
      <EmailItemList
        label="CC"
        items={emailQuoteDetail.ccEmailToAddresses}
        onItemChange={handleItemChange(onEmailQuoteDetailChange, 'ccToEmail')}
        onKeyDown={onKeyDown}
      />
      <CheckboxGroup
        label=""
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            name="isEmailMeACopy"
            label="Email me a copy"
            checked={emailQuoteDetail.isEmailMeACopy}
            onChange={handleCheckboxChange(onEmailQuoteDetailChange)}
          />
        )}
      />
      <hr />
      <Input
        name="subject"
        label="Subject"
        value={emailQuoteDetail.subject}
        onChange={handleInputChange(onEmailQuoteDetailChange)}
        onKeyDown={onKeyDown}
        maxLength={255}
      />
      <TextArea
        name="messageBody"
        label="Message"
        value={emailQuoteDetail.messageBody}
        onChange={handleTextAreaChange(onEmailQuoteDetailChange)}
        rows={10}
        maxLength={4000}
      />
      <EmailQuoteAttachmentsContent
        onRemoveAttachment={onRemoveAttachment}
        onAddAttachments={onAddAttachments}
      />
      <Alert type="info">
        Total size of uploaded documents cannot exceed 25MB
      </Alert>
      <Select
        label="Template"
        name="templateName"
        value={emailQuoteDetail.templateName}
        onChange={handleSelectChange(onEmailQuoteDetailChange)}
        requiredLabel="This is required"
      >
        {templateOptions.map(({ name }) => (
          <Select.Option value={name} label={name} key={name} />
        ))}
      </Select>
    </div>
  );

  return (
    <Modal title="Email quote" onCancel={onCancel} canClose={!isActionDisabled}>
      <Modal.Body>
        {alert && (
          <Alert type={alert.type} onDismiss={onDismissAlert}>
            {alert.message}
          </Alert>
        )}
        <EnterKeyFocusableWrapper renderContent={renderContent} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>
          Cancel
        </Button>
        <Button type="primary" onClick={onConfirm} disabled={isActionDisabled}>
          Send quote
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailQuoteModal;
