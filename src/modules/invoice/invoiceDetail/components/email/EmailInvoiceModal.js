import {
  AddIcon,
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  InfoIcon,
  Input,
  Modal,
  Separator,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasCCEmails,
  getHasEmailToAddress,
  getIsSendingEmail,
} from '../../selectors/emailSelectors';
import EmailInvoiceAttachmentsContent from './EmailInvoiceAttachmentsContent';
import EmailInvoiceModalSettings from './EmailInvoiceModalSettings';
import EmailItemListHorizontal from '../../../../../components/itemList/EmailItemListHorizontal';
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

const AddCcButton = ({ onClick }) => (
  <div>
    <Button type="link" icon={<AddIcon />} onClick={onClick}>
      Add CC email
    </Button>
  </div>
);

const emailToError = 'You need to enter an email address.';

const EmailInvoiceModal = ({
  alert,
  emailInvoiceDetail,
  templateOptions,
  isActionsDisabled,
  hasCCEmails,
  hasToEmailAddress,
  isSendingEmail,
  onCancel,
  onConfirm,
  onCustomiseTemplateLinkClick,
  onEmailInvoiceDetailChange,
  onManagePaymentOptionClick,
  onDismissAlert,
  onRemoveAttachment,
  onAddAttachments,
  onEmailDefaultsButtonClick,
  onPreviewPdfButtonClick,
}) => {
  const renderContent = (onKeyDown) => (
    <div className={styles.formWidth}>
      <EmailItemListHorizontal
        label="To"
        items={emailInvoiceDetail.emailToAddresses}
        requiredLabel="Required"
        errorMessage={!hasToEmailAddress && isSendingEmail && emailToError}
        onItemChange={handleItemChange(onEmailInvoiceDetailChange, 'toEmail')}
        onKeyDown={onKeyDown}
        accessory={
          !hasCCEmails && (
            <AddCcButton
              onClick={() =>
                onEmailInvoiceDetailChange({ key: 'ccToEmail', value: [''] })
              }
            />
          )
        }
      />
      {hasCCEmails && (
        <EmailItemListHorizontal
          label="CC"
          items={emailInvoiceDetail.ccEmailToAddresses}
          onItemChange={handleItemChange(
            onEmailInvoiceDetailChange,
            'ccToEmail'
          )}
          onKeyDown={onKeyDown}
        />
      )}
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
      <Input
        name="subject"
        label="Subject"
        value={emailInvoiceDetail.subject}
        onChange={handleInputChange(onEmailInvoiceDetailChange)}
        onKeyDown={onKeyDown}
        maxLength={255}
        containerClassName={styles.subject}
        labelAccessory={
          <div className={styles.tooltip}>
            <Button type="link" onClick={onEmailDefaultsButtonClick}>
              Subject and message defaults
            </Button>
            <Tooltip triggerContent={<InfoIcon />}>
              Save your default email subject and message, so you don’t need to
              write them every time
            </Tooltip>
          </div>
        }
      />
      <TextArea
        name="messageBody"
        label="Message"
        value={emailInvoiceDetail.messageBody}
        onChange={handleTextAreaChange(onEmailInvoiceDetailChange)}
        maxLength={4000}
        autoSize
      />
      <EmailInvoiceAttachmentsContent
        onRemoveAttachment={onRemoveAttachment}
        onAddAttachments={onAddAttachments}
      />
      <Separator />
      <EmailInvoiceModalSettings
        emailInvoiceDetail={emailInvoiceDetail}
        templateOptions={templateOptions}
        onEmailInvoiceDetailChange={onEmailInvoiceDetailChange}
        onCustomiseTemplateLinkClick={onCustomiseTemplateLinkClick}
        onManagePaymentOptionClick={onManagePaymentOptionClick}
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

const mapStateToProps = (state) => ({
  hasCCEmails: getHasCCEmails(state),
  hasToEmailAddress: getHasEmailToAddress(state),
  isSendingEmail: getIsSendingEmail(state),
});

export default connect(mapStateToProps)(EmailInvoiceModal);
