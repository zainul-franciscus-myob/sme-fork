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
  getModalType,
  getShouldDisplayCustomTemplateList,
  getTemplateList,
} from '../purchaseSettingsSelector';
import CancelModal from '../../../components/modal/CancelModal';
import PageView from '../../../components/PageView/PageView';
import handleInputChange from '../../../components/handlers/handleInputChange';
import modalTypes from '../modalTypes';
import styles from './PurchaseSettingsView.module.css';

const PurchaseSettingsView = ({
  onDefaultRemittanceAdviceEmailFieldChange,
  saveEmailSettings,
  loadingState,
  emailSettings,
  onUnsavedModalConfirm,
  onUnsavedModalCancel,
  modalType,
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
    <FormTemplate alert={alertComponent} pageHead="Purchases settings">
      {modalType === modalTypes.UNSAVED && (
        <CancelModal
          onConfirm={onUnsavedModalConfirm}
          onCancel={onUnsavedModalCancel}
        />
      )}
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
        {shouldDisplayCustomTemplateList ? (
          <Card>
            <FieldGroup label="MYOB AccountRight desktop templates">
              {
                "You can still use templates created in the desktop version of AccountRight. To edit these templates, you'll need to open them in the desktop version of AccountRight."
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
                'Preview the remittance advice PDF that gets sent to your payees.'
              }
            </FieldGroup>
            <br />
            <Button type="link" onClick={exportPdf}>
              Download preview (PDF)
            </Button>
          </Card>
        )}
      </div>
    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  emailSettings: getDefaultRemittanceAdviceEmailSettings(state),
  alert: getAlert(state),
  templateList: getTemplateList(state),
  shouldDisplayCustomTemplateList: getShouldDisplayCustomTemplateList(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PurchaseSettingsView);
