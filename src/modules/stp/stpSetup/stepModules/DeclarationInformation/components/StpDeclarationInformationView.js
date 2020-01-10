import {
  Alert, Button, ButtonRow, Card, FormHorizontal, Input, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getBusinessContactInformationWasFound,
  getEmail,
  getFirstName,
  getIsLoading,
  getLastName,
  getPayerAbn,
  getPhone,
} from '../StpDeclarationInformationSelectors';
import LoadingPageState from '../../../../../../components/LoadingPageState/LoadingPageState';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';

const StpDeclarationInformationView = ({
  businessContactInformationWasFound,
  onPreviousClick,
  onNextClick,
  onFieldChange,
  payerAbn,
  firstName,
  lastName,
  phone,
  email,
  alert,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card>
        <LoadingPageState />
      </Card>
    );
  }

  return (
    <div>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      <Card header={<h2>Declaration Information</h2>}>
        <p>
          Enter the businesses&apos; ABN, your name and contact details. This information is saved
          to MYOB and used when you send payroll information to the ATO when processing pays.
        </p>
        {businessContactInformationWasFound && (
        <Alert type="info">
          Looks like we&apos;ve already got some information saved for this business. You can use
          this contact person, or add someone different for payroll reporting.
        </Alert>
        )}
        <FormHorizontal layout="primary">
          <Input
            testid="payerAbnInput"
            label="Payer ABN"
            width="sm"
            name="payerAbn"
            value={payerAbn}
            onChange={handleInputChange(onFieldChange)}
            labelAccessory={(
              <Tooltip>The ABN of the business making payments to employees</Tooltip>
            )}
          />
          <Input
            label="First Name"
            value={firstName}
            name="firstName"
            requiredLabel="This field is required"
            onChange={handleInputChange(onFieldChange)}
          />
          <Input
            label="Surname or family name"
            name="lastName"
            value={lastName}
            requiredLabel="This field is required"
            onChange={handleInputChange(onFieldChange)}
          />
          <Input
            label="Phone"
            value={phone}
            name="phone"
            requiredLabel="This field is required"
            onChange={handleInputChange(onFieldChange)}
          />
          <Input
            label="Email"
            value={email}
            name="email"
            requiredLabel="This field is required"
            onChange={handleInputChange(onFieldChange)}
          />
        </FormHorizontal>
      </Card>
      <ButtonRow
        primary={[
          <Button type="secondary" onClick={onPreviousClick} key="previous" testid="previousButton">Previous</Button>,
          <Button type="primary" onClick={onNextClick} key="next" testid="nextButton">Next</Button>,
        ]}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  businessContactInformationWasFound: getBusinessContactInformationWasFound(state),
  payerAbn: getPayerAbn(state),
  firstName: getFirstName(state),
  lastName: getLastName(state),
  phone: getPhone(state),
  email: getEmail(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(StpDeclarationInformationView);
