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

import './RemittanceAdviceModal.module.css';
import EmailItemList from '../../../../components/itemList/EmailItemList';
import EnterKeyFocusableWrapper from '../../../../components/EnterKeyFocusableWrapper/EnterKeyFocusableWrapper';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import handleTextAreaChange from '../../../../components/handlers/handleTextAreaChange';
import remittanceAdviceTypes from '../remittanceAdviceMethodTypes';

const handleItemChange = (handler, key) => (emails) => {
  handler({
    key,
    value: emails,
  });
};

const RemittanceAdviceModal = ({
  alertMessage,
  remittanceAdviceEmailDetails,
  isActionsDisabled,
  onCancel,
  onConfirm,
  onRemittanceAdviceEmailDetailsChange,
  remittanceAdviceType,
  onUpdateRemittanceAdviceType,
  onDismissAlert,
  templateOptions,
}) => {
  const emailView = (onKeyDown) => (
    <>
      <EmailItemList
        label="To"
        items={remittanceAdviceEmailDetails.toAddresses}
        requiredLabel="Required"
        onItemChange={handleItemChange(
          onRemittanceAdviceEmailDetailsChange,
          'toAddresses'
        )}
        onKeyDown={onKeyDown}
      />
      <EmailItemList
        label="CC"
        items={remittanceAdviceEmailDetails.ccToAddresses}
        onItemChange={handleItemChange(
          onRemittanceAdviceEmailDetailsChange,
          'ccToAddresses'
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
            checked={remittanceAdviceEmailDetails.isEmailMeACopy}
            onChange={handleCheckboxChange(
              onRemittanceAdviceEmailDetailsChange
            )}
          />
        )}
      />
      <hr />
      <Input
        name="subject"
        label="Subject"
        value={remittanceAdviceEmailDetails.subject}
        onChange={handleInputChange(onRemittanceAdviceEmailDetailsChange)}
        onKeyDown={onKeyDown}
        maxLength={255}
      />
      <TextArea
        name="messageBody"
        label="Message"
        value={remittanceAdviceEmailDetails.messageBody}
        onChange={handleTextAreaChange(onRemittanceAdviceEmailDetailsChange)}
        rows={10}
        maxLength={4000}
      />
    </>
  );

  const view = (onKeyDown) => (
    <div>
      {remittanceAdviceType === remittanceAdviceTypes.email &&
        emailView(onKeyDown)}
      <Select
        label="Template"
        name="templateName"
        value={remittanceAdviceEmailDetails.templateName}
        onChange={handleSelectChange(onRemittanceAdviceEmailDetailsChange)}
        requiredLabel="This is required"
      >
        {templateOptions.map(({ name, label }) => (
          <Select.Option value={name} label={label} key={name} />
        ))}
      </Select>
    </div>
  );

  return (
    <Modal
      title="Remittance Advice"
      onCancel={onCancel}
      canClose={!isActionsDisabled}
    >
      <Modal.Body>
        {alertMessage && (
          <Alert onDismiss={onDismissAlert} type="success">
            {alertMessage}
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
        <Button type="primary" onClick={onConfirm} disabled={isActionsDisabled}>
          Send remittance advice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemittanceAdviceModal;
