import {
  Alert,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  Modal,
  RadioButton,
  RadioButtonGroup,
  Select,
  Separator,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAreEmailSettingsSet,
  getAreEmailsEnabled,
  getCanSendRemittanceAdvice,
  getRemittanceAdviceDetails,
  getRemittanceAdviceType,
  getTemplateOptions,
} from '../SupplierPaymentDetailSelectors';
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
  onCancel,
  onConfirm,
  onRemittanceAdviceDetailsChange,
  onUpdateRemittanceAdviceType,
  onDismissAlert,
  remittanceAdviceType,
  remittanceAdviceDetails,
  canSendRemittanceAdvice,
  templateOptions,
  areEmailSettingsSet,
  areEmailsEnabled,
}) => {
  const emailSettingsView = (onKeyDown) => (
    <>
      <FieldGroup label="Email Settings">
        <Alert type="info">
          We need you to fill out some information before we can send emails
          from MYOB. You can change these settings later from
          <span className={styles.bold}>
            &nbsp;Business Settings &gt; Preferences
          </span>
        </Alert>
        <Box display="flex">
          <Input
            containerClassName={styles.padRight}
            label="From name"
            name="fromName"
            value={remittanceAdviceDetails.fromName}
            onChange={handleInputChange(onRemittanceAdviceDetailsChange)}
            requiredLabel="The name that will display when your clients receive the remittance advice. This could be your business name or contact person"
            onKeyDown={onKeyDown}
          />
          <Input
            label="Reply-To email address"
            type="email"
            name="fromEmail"
            value={remittanceAdviceDetails.fromEmail}
            onChange={handleInputChange(onRemittanceAdviceDetailsChange)}
            requiredLabel="The email address used when your clients reply to an emailed remittance advice"
            maxLength={255}
            onKeyDown={onKeyDown}
          />
        </Box>
      </FieldGroup>
    </>
  );

  const emailView = (onKeyDown) => (
    <div className={styles.itemList}>
      {!areEmailSettingsSet && emailSettingsView(onKeyDown)}
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
        {!areEmailsEnabled && (
          <Alert type="danger">
            Your AccountRight file is not setup to send emails from MYOB. To
            send remittance advice by email, you&apos;ll need to go to
            <span className={styles.bold}>
              &nbsp;Preferences &gt; Emailing&nbsp;
            </span>
            in the AccountRight desktop app, and tick the box to &apos;Send
            emails using AccountRight&apos;
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
          renderRadios={({ id, value, ...props }) => {
            return Object.values(remittanceAdviceTypes).map((label) => (
              <RadioButton
                {...props}
                disabled={
                  !areEmailsEnabled && remittanceAdviceTypes.email === label
                }
                checked={value === label}
                key={label}
                value={label}
                label={label}
              />
            ));
          }}
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

const mapStateToProps = (state) => ({
  remittanceAdviceDetails: getRemittanceAdviceDetails(state),
  remittanceAdviceType: getRemittanceAdviceType(state),
  canSendRemittanceAdvice: getCanSendRemittanceAdvice(state),
  templateOptions: getTemplateOptions(state),
  areEmailSettingsSet: getAreEmailSettingsSet(state),
  areEmailsEnabled: getAreEmailsEnabled(state),
});

export default connect(mapStateToProps)(RemittanceAdviceModal);
