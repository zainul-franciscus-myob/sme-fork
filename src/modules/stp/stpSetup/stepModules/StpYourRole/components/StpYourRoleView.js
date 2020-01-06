import {
  Alert, Button, ButtonRow, Card, Field, FormHorizontal, Input, PageHead, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAgentAbn, getAgentNumber, getErrorMessage, getRole, getShowContactDetails,
} from '../stpYourRoleSelectors';
import ContactDetails from './ContactDetails';
import Role from '../../../Role';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../../../components/handlers/handleRadioButtonChange';

const StpYourRoleView = ({
  role,
  agentAbn,
  agentNumber,
  onFieldChange,
  onSearchClick,
  onPreviousClick,
  onNextClick,
  showContactDetails,
  showAlert,
  errorMessage,
}) => {
  const someoneFromBusinessContent = (
    <p>
      You must complete these steps yourself. You can&apos;t get your agent to complete these
      steps on your behalf
    </p>
  );

  const agentContent = (
    <FormHorizontal layout="primary" testId="agentForm">
      <p>Enter your own ABN and RAN, and search for your contact details</p>
      <Input
        name="agentAbn"
        label="Agent ABN"
        value={agentAbn}
        onChange={handleInputChange(onFieldChange)}
      />
      <Input
        name="agentNumber"
        label="Registered agent number (RAN)"
        value={agentNumber}
        onChange={handleInputChange(onFieldChange)}
      />
      <Field
        label=""
        renderField={() => (
          <Button type="secondary" onClick={onSearchClick} testId="agentSearchButton">Search</Button>
        )}
      />
      {showContactDetails && (
        <ContactDetails onFieldChange={onFieldChange} showAlert={showAlert} />
      )}
    </FormHorizontal>
  );

  return (
    <div>
      <Card header={<Card.Header child={<PageHead title="What is your role?" />} />}>
        {errorMessage && (
          <Alert type="danger">{errorMessage}</Alert>
        )}
        <p>
          Each person who processes pays must complete these steps from their own MYOB account.
          You cannot complete these steps on behalf of someone else.
        </p>
        <p>
          Agents - you&apos;ll need to enter your own details here, signed into MYOB as yourself.
          You cannot complete this on behalf of your client.
        </p>
        <FormHorizontal layout="primary">
          <RadioButtonGroup
            label="Are you"
            name="role"
            options={[Role.SOMEONE_FROM_THE_BUSINESS, Role.TAX_AGENT, Role.BAS_AGENT]}
            onChange={handleRadioButtonChange('role', onFieldChange)}
            value={role}
          />
        </FormHorizontal>
        {role === Role.SOMEONE_FROM_THE_BUSINESS ? someoneFromBusinessContent : agentContent}
      </Card>
      <ButtonRow primary={[
        <Button type="secondary" onClick={onPreviousClick} key="previous" testId="previousButton">Previous</Button>,
        <Button type="primary" onClick={onNextClick} key="next" testId="nextButton">Next</Button>,
      ]}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  role: getRole(state),
  agentAbn: getAgentAbn(state),
  agentNumber: getAgentNumber(state),
  showContactDetails: getShowContactDetails(state),
  errorMessage: getErrorMessage(state),
});

export default connect(mapStateToProps)(StpYourRoleView);