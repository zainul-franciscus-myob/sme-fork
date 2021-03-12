import {
  Card,
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Input,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsFeatureAvailable, getTabData } from '../purchaseSettingsSelector';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const PurchaseSettingsEmailDetails = (props) => {
  const {
    emailSettings,
    onUpdateEmailSettingsField,
    isFeatureAvailable,
  } = props;

  const emailSignature = (
    <Card>
      <FieldGroup label="Email settings">
        <p>
          These email settings apply to all email sent on your behalf from MYOB.
          This includes invoices, quotes, purchase orders, remittance advice and
          pay slips (payroll).
        </p>
        <Input
          name="fromName"
          label="From name"
          labelAccessory={
            <Tooltip>
              The name that will display when your clients receive an email from
              MYOB. This could be your business name or contact person.
            </Tooltip>
          }
          value={emailSettings.fromName}
          maxLength={255}
          onChange={handleInputChange(onUpdateEmailSettingsField)}
        />
        <Input
          name="fromEmail"
          label="Reply-to email address"
          labelAccessory={
            <Tooltip>
              The email address used when your clients reply to an email sent
              from MYOB.
            </Tooltip>
          }
          value={emailSettings.fromEmail}
          maxLength={255}
          onChange={handleInputChange(onUpdateEmailSettingsField)}
        />
      </FieldGroup>
    </Card>
  );

  const purchaseOrderEmail = (
    <Card>
      <FieldGroup label="Default purchase order email">
        <Input
          name="purchaseOrderEmailSubject"
          label="Subject"
          value={emailSettings.purchaseOrderEmailSubject}
          onChange={handleInputChange(onUpdateEmailSettingsField)}
        />
        <CheckboxGroup
          label="isPurchaseOrderNumberIncluded"
          hideLabel
          renderCheckbox={() => (
            <Checkbox
              name="isPurchaseOrderNumberIncluded"
              label="Include purchase order number in subject"
              checked={emailSettings.isPurchaseOrderNumberIncluded}
              onChange={handleCheckboxChange(onUpdateEmailSettingsField)}
            />
          )}
        />
        <TextArea
          name="purchaseOrderEmailBody"
          label="Message"
          autoSize
          resize="vertical"
          value={emailSettings.purchaseOrderEmailBody}
          onChange={handleInputChange(onUpdateEmailSettingsField)}
        />
      </FieldGroup>
    </Card>
  );

  const remittanceAdviceEmail = (
    <Card>
      <FieldGroup label="Default remittance advice email">
        <Input
          label="Subject"
          value={emailSettings.remittanceAdviceEmailSubject}
          name="remittanceAdviceEmailSubject"
          maxLength={256}
          onChange={handleInputChange(onUpdateEmailSettingsField)}
        />
        <TextArea
          label="Message"
          value={emailSettings.remittanceAdviceEmailBody}
          name="remittanceAdviceEmailBody"
          autoSize
          resize="vertical"
          maxLength={4000}
          onChange={handleInputChange(onUpdateEmailSettingsField)}
        />
      </FieldGroup>
    </Card>
  );

  return (
    <React.Fragment>
      {emailSignature}
      {isFeatureAvailable && purchaseOrderEmail}
      {remittanceAdviceEmail}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  emailSettings: getTabData(state),
  isFeatureAvailable: getIsFeatureAvailable(state),
});

export default connect(mapStateToProps)(PurchaseSettingsEmailDetails);
