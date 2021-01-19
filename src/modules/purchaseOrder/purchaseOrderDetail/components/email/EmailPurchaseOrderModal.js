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
import { connect } from 'react-redux';
import React from 'react';

import { getEmailPurchaseOrderDetail } from '../../selectors/EmailSelectors';
import { getTemplateOptions } from '../../selectors/purchaseOrderSelectors';
import EmailItemList from '../../../../../components/itemList/EmailItemList';
import EmailPurchaseOrderAttachmentsContent from './EmailPurchaseOrderAttachments';
import EnterKeyFocusableWrapper from '../../../../../components/EnterKeyFocusableWrapper/EnterKeyFocusableWrapper';
import handleCheckboxChange from '../../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import handleTextAreaChange from '../../../../../components/handlers/handleTextAreaChange';
import styles from './EmailPurchaseOrderModal.module.css';

const handleItemChange = (handler, key) => (emails) => {
  handler({
    key,
    value: emails,
  });
};

const EmailPurchaseOrderModal = ({
  alert,
  emailPurchaseOrderDetail,
  templateOptions,
  isActionDisabled,
  onCancel,
  onConfirm,
  onEmailPurchaseOrderDetailChange,
  onDismissAlert,
  onRemoveAttachment,
  onAddAttachments,
}) => {
  const renderContent = (onKeyDown) => (
    <div className={styles.formWidth}>
      <EmailItemList
        label="To"
        items={emailPurchaseOrderDetail.emailToAddresses}
        requiredLabel="Required"
        onItemChange={handleItemChange(
          onEmailPurchaseOrderDetailChange,
          'toEmail'
        )}
        onKeyDown={onKeyDown}
      />
      <EmailItemList
        label="CC"
        items={emailPurchaseOrderDetail.ccEmailToAddresses}
        onItemChange={handleItemChange(
          onEmailPurchaseOrderDetailChange,
          'ccToEmail'
        )}
        onKeyDown={onKeyDown}
      />
      <CheckboxGroup
        label=""
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            name="isEmailMeACopy"
            label="Email me a copy"
            checked={emailPurchaseOrderDetail.isEmailMeACopy}
            onChange={handleCheckboxChange(onEmailPurchaseOrderDetailChange)}
          />
        )}
      />
      <hr />
      <Input
        name="subject"
        label="Subject"
        value={emailPurchaseOrderDetail.subject}
        onChange={handleInputChange(onEmailPurchaseOrderDetailChange)}
        onKeyDown={onKeyDown}
        maxLength={255}
      />
      <TextArea
        name="messageBody"
        label="Message"
        value={emailPurchaseOrderDetail.messageBody}
        onChange={handleTextAreaChange(onEmailPurchaseOrderDetailChange)}
        rows={10}
        maxLength={4000}
      />
      <EmailPurchaseOrderAttachmentsContent
        onRemoveAttachment={onRemoveAttachment}
        onAddAttachments={onAddAttachments}
      />
      <Alert type="info">
        Total size of uploaded documents cannot exceed 25MB
      </Alert>
      <Select
        label="Template"
        name="templateName"
        value={emailPurchaseOrderDetail.templateName}
        onChange={handleSelectChange(onEmailPurchaseOrderDetailChange)}
        requiredLabel="This is required"
      >
        {templateOptions.map(({ name }) => (
          <Select.Option value={name} label={name} key={name} />
        ))}
      </Select>
    </div>
  );

  return (
    <Modal
      title="Email purchase order"
      onCancel={onCancel}
      canClose={!isActionDisabled}
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
        <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>
          Cancel
        </Button>
        <Button type="primary" onClick={onConfirm} disabled={isActionDisabled}>
          Send purchase order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  emailPurchaseOrderDetail: getEmailPurchaseOrderDetail(state),
  templateOptions: getTemplateOptions(state),
});
export default connect(mapStateToProps)(EmailPurchaseOrderModal);
