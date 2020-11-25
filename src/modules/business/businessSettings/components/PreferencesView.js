import { Card, FieldGroup, Icons, Input, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState, getPreferences } from '../businessSettingsSelectors';
import PageView from '../../../../components/PageView/PageView';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const PreferencesView = ({
  preferences,
  loadingState,
  onUpdatePreferences,
}) => {
  const { fromName, fromEmail } = preferences;
  const view = (
    <Card>
      <FieldGroup label="Email settings">
        <p>
          These email settings apply to all email sent on your behalf from MYOB.
          This includes invoices, quotes, remittance advice and pay slips
          (payroll).
        </p>
        <Input
          name="fromName"
          label="From name"
          value={fromName}
          onChange={handleInputChange(onUpdatePreferences)}
          width="lg"
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />}>
              The name that will display when your clients receive an email from
              MYOB. This could be your business name or contact person.
            </Tooltip>
          }
        />
        <Input
          name="fromEmail"
          label="Reply-to email address"
          value={fromEmail}
          onChange={handleInputChange(onUpdatePreferences)}
          width="lg"
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />}>
              The email address used when your clients reply to an email sent
              from MYOB.
            </Tooltip>
          }
        />
      </FieldGroup>
    </Card>
  );
  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  preferences: getPreferences(state),
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(PreferencesView);
