import {
  BaseTemplate, ButtonRow, Card, FieldGroup, FormHorizontal, Input, PageHead, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import Button from '@myob/myob-widgets/lib/components/Button/Button';
import React from 'react';

import { getLoadingState, getMessage, getSubject } from '../../selectors/paySlipEmailDefaultsSelectors';
import PageView from '../../../../components/PageView/PageView';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const PaySlipEmailDefaultsView = ({
  pageHead,
  alert,
  tabs,
  loadingState,
  message,
  subject,
  listeners: {
    onPaySlipEmailDefaultsFieldChange,
    onPaySlipEmailDefaultsSave,
  },
}) => {
  const view = (
    <>
      <Card>
        <FormHorizontal layout="primary">
          <FieldGroup label="Pay slip email defaults">
            <p>
              Customise the default email text sent with your pay slips.
            </p>
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
      <ButtonRow
        primary={[
          <Button testid="saveButton" key="SaveButton" onClick={onPaySlipEmailDefaultsSave}>Save</Button>,
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
});

export default connect(mapStateToProps)(PaySlipEmailDefaultsView);
