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
  getLoadingState,
  getShouldDisplayCustomTemplateList,
  getTemplateList,
} from '../purchaseSettingsSelector';
import PageView from '../../../components/PageView/PageView';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './PurchaseSettingsView.module.css';

const PurchaseSettingsView = ({
  onDefaultRemittanceAdviceEmailFieldChange,
  saveEmailSettings,
  loadingState,
  emailSettings,
  alert,
  onDismissAlert,
  templateList,
  shouldDisplayCustomTemplateList,
  exportPdf,
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
      <FormTemplate alert={alertComponent} pageHead="Purchases settings">
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
                      onDefaultRemittanceAdviceEmailFieldChange
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
                      onDefaultRemittanceAdviceEmailFieldChange
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
        {shouldDisplayCustomTemplateList ? (
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
        ) : (
          <Card>
            <FieldGroup label="Preview remittance advice">
              {
                'See what your remittance advice will look like to customers by downloading an example.'
              }
            </FieldGroup>
            <br />
            <Button type="link" onClick={exportPdf}>
              Download preview (PDF)
            </Button>
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
  shouldDisplayCustomTemplateList: getShouldDisplayCustomTemplateList(state),
});
export default connect(mapStateToProps)(PurchaseSettingsView);
