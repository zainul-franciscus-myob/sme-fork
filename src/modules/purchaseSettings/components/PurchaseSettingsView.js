import {
  Alert,
  Button,
  ButtonRow,
  Card,
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  FormTemplate,
  Input,
  Table,
  TextArea,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDefaultPurchasesEmailSettings,
  getLoadingState,
  getModalType,
  getShouldDisplayCustomTemplateList,
  getTemplateList,
} from '../purchaseSettingsSelector';
import CancelModal from '../../../components/modal/CancelModal';
import PageView from '../../../components/PageView/PageView';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import modalTypes from '../modalTypes';
import styles from './PurchaseSettingsView.module.css';

const PurchaseSettingsView = ({
  onUpdateEmailSettingsField,
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
      <Card>
        <FieldGroup label="Email settings">
          <p>
            These email settings apply to all email sent on your behalf from
            MYOB. This includes invoices, quotes, purchase orders, remittance
            advice and pay slips (payroll).
          </p>
          <Input
            name="fromName"
            label="From name"
            labelAccessory={
              <Tooltip>
                The name that will display when your clients receive an email
                from MYOB. This could be your business name or contact person.
              </Tooltip>
            }
            value={emailSettings.fromName}
            maxLength={255}
            onChange={handleInputChange(onUpdateEmailSettingsField)}
          />
          <Input
            name="fromEmail"
            label="Reply-to email address"
            labelAccessory={
              <Tooltip>
                The email address used when your clients reply to an email sent
                from MYOB.
              </Tooltip>
            }
            value={emailSettings.fromEmail}
            maxLength={255}
            onChange={handleInputChange(onUpdateEmailSettingsField)}
          />
        </FieldGroup>
      </Card>
      <Card>
        <FieldGroup label="Default purchase order email">
          <Input
            name="purchaseOrderEmailSubject"
            label="Subject"
            value={emailSettings.purchaseOrderEmailSubject}
            onChange={handleInputChange(onUpdateEmailSettingsField)}
          />
          <CheckboxGroup
            label="isPurchaseOrderNumberIncluded"
            hideLabel
            renderCheckbox={() => (
              <Checkbox
                name="isPurchaseOrderNumberIncluded"
                label="Include purchase order number in subject"
                checked={emailSettings.isPurchaseOrderNumberIncluded}
                onChange={handleCheckboxChange(onUpdateEmailSettingsField)}
              />
            )}
          />
          <TextArea
            name="purchaseOrderEmailBody"
            label="Message"
            autoSize
            resize="vertical"
            value={emailSettings.purchaseOrderEmailBody}
            onChange={handleInputChange(onUpdateEmailSettingsField)}
          />
        </FieldGroup>
      </Card>
      <div>
        <Card>
          <FieldGroup label="Default remittance advice email">
            <Input
              label="Subject"
              width="xl"
              value={emailSettings.remittanceAdviceEmailSubject}
              name="remittanceAdviceEmailSubject"
              maxLength={256}
              onChange={handleInputChange(onUpdateEmailSettingsField)}
            />
            <TextArea
              label="Message"
              width="xl"
              value={emailSettings.remittanceAdviceEmailBody}
              name="remittanceAdviceEmailBody"
              autoSize
              resize="vertical"
              maxLength={4000}
              onChange={handleInputChange(onUpdateEmailSettingsField)}
            />
          </FieldGroup>
        </Card>
      </div>
      <ButtonRow
        className={styles.buttonMargin}
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
            {'Preview the remittance advice PDF that gets sent to your payees.'}
          </FieldGroup>
          <br />
          <Button type="link" onClick={exportPdf}>
            Download preview (PDF)
          </Button>
        </Card>
      )}
    </FormTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  emailSettings: getDefaultPurchasesEmailSettings(state),
  alert: getAlert(state),
  templateList: getTemplateList(state),
  shouldDisplayCustomTemplateList: getShouldDisplayCustomTemplateList(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PurchaseSettingsView);
