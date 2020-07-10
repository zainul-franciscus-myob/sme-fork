import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  FieldGroup,
  FormHorizontal,
  Input,
  PageHead,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFromName,
  getLoadingState,
  getMessage,
  getReplyToEmail,
  getSubject,
} from '../../selectors/paySlipEmailDefaultsSelectors';
import PageView from '../../../../components/PageView/PageView';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const PaySlipEmailDefaultsView = ({
  pageHead,
  alert,
  tabs,
  loadingState,
  message,
  subject,
  fromName,
  replyToEmail,
  listeners: { onPaySlipEmailDefaultsFieldChange, onPaySlipEmailDefaultsSave },
}) => {
  const view = (
    <>
      <Card>
        <FormHorizontal layout="primary">
          <FieldGroup label="Pay slip email defaults">
            <p>Customise the default email text sent with your pay slips.</p>
            <Input
              label="Subject"
              width="xl"
              value={subject}
              name="subject"
              onChange={handleInputChange(onPaySlipEmailDefaultsFieldChange)}
            />
            <TextArea
              label="Message"
              width="xl"
              value={message}
              name="message"
              onChange={handleInputChange(onPaySlipEmailDefaultsFieldChange)}
            />
          </FieldGroup>
        </FormHorizontal>
      </Card>
      <Card>
        <FormHorizontal layout="primary">
          <FieldGroup label="Email settings">
            <p>
              These email settings apply to all email sent on your behalf from
              MYOB. This includes invoices, quotes and pay slips (payroll).
            </p>
            <Input
              label="From name"
              width="xl"
              value={fromName}
              name="fromName"
              onChange={handleInputChange(onPaySlipEmailDefaultsFieldChange)}
            />
            <Input
              label="Reply-to email address"
              width="xl"
              value={replyToEmail}
              name="replyToEmail"
              onChange={handleInputChange(onPaySlipEmailDefaultsFieldChange)}
            />
          </FieldGroup>
        </FormHorizontal>
      </Card>
      <ButtonRow
        primary={[
          <Button
            testid="saveButton"
            key="SaveButton"
            onClick={onPaySlipEmailDefaultsSave}
          >
            Save
          </Button>,
        ]}
      />
    </>
  );

  return (
    <BaseTemplate>
      <PageHead title={pageHead} />
      {alert}
      {tabs}
      <PageView loadingState={loadingState} view={view} />
    </BaseTemplate>
  );
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  subject: getSubject(state),
  message: getMessage(state),
  fromName: getFromName(state),
  replyToEmail: getReplyToEmail(state),
});

export default connect(mapStateToProps)(PaySlipEmailDefaultsView);
