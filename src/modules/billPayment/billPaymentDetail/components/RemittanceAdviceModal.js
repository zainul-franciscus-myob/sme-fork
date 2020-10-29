import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  RadioButtonGroup,
  Select,
  Separator,
  TextArea,
} from '@myob/myob-widgets';
import React from 'react';

import EmailItemList from '../../../../components/itemList/EmailItemList';
import EnterKeyFocusableWrapper from '../../../../components/EnterKeyFocusableWrapper/EnterKeyFocusableWrapper';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';
import remittanceAdviceTypes from '../remittanceAdviceTypes';
import styles from './RemittanceAdviceModal.module.css';

const handleItemChange = (handler, key) => (emails) => {
  handler({
    key,
    value: emails,
  });
};

const RemittanceAdviceModal = ({
  alertMessage,
  remittanceAdviceDetails,
  canSendRemittanceAdvice,
  onCancel,
  onConfirm,
  onRemittanceAdviceDetailsChange,
  remittanceAdviceType,
  onUpdateRemittanceAdviceType,
  onDismissAlert,
  templateOptions,
}) => {
  const emailView = (onKeyDown) => (
    <div className={styles.itemList}>
      <EmailItemList
        label="To"
        items={remittanceAdviceDetails.toAddresses}
        requiredLabel="Required"
        onItemChange={handleItemChange(
          onRemittanceAdviceDetailsChange,
          'toAddresses'
        )}
        onKeyDown={onKeyDown}
      />
      <EmailItemList
        label="CC"
        items={remittanceAdviceDetails.ccAddresses}
        onItemChange={handleItemChange(
          onRemittanceAdviceDetailsChange,
          'ccAddresses'
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
            checked={remittanceAdviceDetails.isEmailMeACopy}
            onChange={handleCheckboxChange(onRemittanceAdviceDetailsChange)}
          />
        )}
      />
      <hr />
      <Input
        name="subject"
        label="Subject"
        value={remittanceAdviceDetails.subject}
        onChange={handleInputChange(onRemittanceAdviceDetailsChange)}
        onKeyDown={onKeyDown}
        maxLength={255}
      />
      <TextArea
        name="messageBody"
        label="Message"
        value={remittanceAdviceDetails.messageBody}
        onChange={handleTextAreaChange(onRemittanceAdviceDetailsChange)}
        rows={10}
        maxLength={4000}
      />
    </div>
  );

  const view = (onKeyDown) => (
    <div>
      {remittanceAdviceType === remittanceAdviceTypes.email &&
        emailView(onKeyDown)}
      <Select
        label="Template"
        name="templateName"
        value={remittanceAdviceDetails.templateName}
        onChange={handleSelectChange(onRemittanceAdviceDetailsChange)}
      >
        {templateOptions.map(({ name, label }) => (
          <Select.Option value={name} label={label} key={name} />
        ))}
      </Select>
    </div>
  );

  return (
    <Modal title="Remittance advice" onCancel={onCancel}>
      <Modal.Body>
        {alertMessage.message && (
          <Alert onDismiss={onDismissAlert} type={alertMessage.type}>
            {alertMessage.message}
          </Alert>
        )}
        <RadioButtonGroup
          label="Email or Download"
          name="remittanceAdviceType"
          hideLabel
          value={remittanceAdviceType}
          onChange={handleRadioButtonChange(
            'remittanceAdviceType',
            onUpdateRemittanceAdviceType
          )}
          options={Object.values(remittanceAdviceTypes)}
        />
        <Separator />
        <EnterKeyFocusableWrapper renderContent={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onConfirm}
          disabled={!canSendRemittanceAdvice}
        >
          {remittanceAdviceType === remittanceAdviceTypes.email
            ? 'Send remittance advice'
            : 'Download'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemittanceAdviceModal;
