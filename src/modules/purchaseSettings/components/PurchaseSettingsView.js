import {
  Alert,
  Button,
  ButtonRow,
  Card,
  FieldGroup,
  FormHorizontal,
  FormTemplate,
  Input,
  Table,
  TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDefaultRemittanceAdviceEmailSettings,
  getDisplayTemplateList,
  getLoadingState,
  getTemplateList,
} from '../purchaseSettingsSelector';
import PageView from '../../../components/PageView/PageView';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './PurchaseSettingsView.module.css';

const PurchaseSettingsView = ({
  onDefaultRemittanceEmailFieldChange,
  saveEmailSettings,
  loadingState,
  emailSettings,
  alert,
  onDismissAlert,
  templateList,
  displayTemplateList,
}) => {
  const alertComponent = alert.type && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const templateRows = templateList.map((template) => (
    <Table.Row>
      <Table.RowItem>{template.name}</Table.RowItem>
    </Table.Row>
  ));

  const view = (
    <>
      <FormTemplate alert={alertComponent} pageHead="Remittance settings">
        <>
          <div className={styles.templateContainer}>
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
          </div>
        </>
        {displayTemplateList && (
          <Card>
            <FieldGroup label="MYOB AccountRight desktop templates">
              {
                "You can access all the same templates as you can in the AccountRight desktop version, but you won't be able to edit them. If something's changed, you'll need to edit in AccountRight."
              }
            </FieldGroup>
            <Table>
              <Table.Header>
                <Table.HeaderItem>Name</Table.HeaderItem>
              </Table.Header>
              {templateRows}
            </Table>
          </Card>
        )}
      </FormTemplate>
    </>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  emailSettings: getDefaultRemittanceAdviceEmailSettings(state),
  alert: getAlert(state),
  templateList: getTemplateList(state),
  displayTemplateList: getDisplayTemplateList(state),
});
export default connect(mapStateToProps)(PurchaseSettingsView);
