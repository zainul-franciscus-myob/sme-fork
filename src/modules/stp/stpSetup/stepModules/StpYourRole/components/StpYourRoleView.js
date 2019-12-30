import {
  Button, ButtonRow, Card, Field, FormHorizontal, Input, PageHead, RadioButtonGroup,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAgentAbn, getAgentNumber, getRole } from '../stpYourRoleSelectors';
import ContactDetails from './ContactDetails';
import Role from '../Role';
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
}) => {
  const someoneFromBusinessContent = (
    <p>
      You must complete these steps yourself. You can&apos;t get your agent to complete these
      steps on your behalf
    </p>
  );

  const agentContent = (
    <>
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
          <Button type="secondary" onClick={onSearchClick}>Search</Button>
        )}
      />
      {showContactDetails && (
        <ContactDetails onFieldChange={onFieldChange} showAlert={showAlert} />
      )}
    </>
  );

  return (
    <div>
      <Card header={<Card.Header child={<PageHead title="What is your role?" />} />}>
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
          {role === Role.SOMEONE_FROM_THE_BUSINESS ? someoneFromBusinessContent : agentContent}
        </FormHorizontal>
      </Card>
      <ButtonRow primary={[
        <Button type="secondary" onClick={onPreviousClick}>Previous</Button>,
        <Button type="primary" onClick={onNextClick}>Next</Button>,
      ]}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  role: getRole(state),
  agentAbn: getAgentAbn(state),
  agentNumber: getAgentNumber(state),
});

export default connect(mapStateToProps)(StpYourRoleView);
