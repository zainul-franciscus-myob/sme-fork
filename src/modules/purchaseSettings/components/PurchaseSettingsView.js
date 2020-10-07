import {
  Alert,
  Button,
  ButtonRow,
  Card,
  FieldGroup,
  FormHorizontal,
  FormTemplate,
  Input,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDefaultRemittanceAdviceEmailSettings,
  getLoadingState,
} from '../purchaseSettingsSelector';
import PageView from '../../../components/PageView/PageView';
import handleInputChange from '../../../components/handlers/handleInputChange';

const PurchaseSettingsView = ({
  onDefaultRemittanceEmailFieldChange,
  saveEmailSettings,
  loadingState,
  emailSettings,
  alert,
  onDismissAlert,
}) => {
  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <FormTemplate alert={alertComponent} pageHead="Remittance settings">
      <>
        <Card>
          <FormHorizontal layout="primary">
            <FieldGroup label="Default Remittance Advice email">
              <Input
                label="Subject"
                width="xl"
                value={emailSettings.remittanceAdviceEmailSubject}
                name="remittanceAdviceEmailSubject"
                maxLength={256}
                onChange={handleInputChange(
                  onDefaultRemittanceEmailFieldChange
                )}
              />
              <TextArea
                label="Message"
                width="xl"
                value={emailSettings.remittanceAdviceEmailBody}
                name="remittanceAdviceEmailBody"
                autoSize
                resize="vertical"
                maxLength={4000}
                onChange={handleInputChange(
                  onDefaultRemittanceEmailFieldChange
                )}
              />
            </FieldGroup>
          </FormHorizontal>
        </Card>
        <ButtonRow
          primary={[
            <Button key="SaveButton" onClick={saveEmailSettings}>
              Save
            </Button>,
          ]}
        />
      </>
    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  emailSettings: getDefaultRemittanceAdviceEmailSettings(state),
  alert: getAlert(state),
});
export default connect(mapStateToProps)(PurchaseSettingsView);
