import {
  Alert, Button, Input, Modal, Select, Separator, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomersSelected, getEmailMessage, getEmailSubject, getTemplateOptions,
} from '../selectors/customerStatementListSelectors';
import handleInputChange from '../../components/handlers/handleInputChange';
import handleSelectChange from '../../components/handlers/handleSelectChange';

const CustomerStatementPDFModal = ({
  modal: { alertMessage, isModalSubmitting },
  emailSubject,
  emailMessage,
  templateOptions,
  customersSelected,
  onUpdateEmailOptions,
  onSendEmail,
  onDismissModal,
  onDismissModalAlert,
}) => (
  <Modal
    title="Email statements"
    size="small"
    onCancel={onDismissModal}
  >
    <Modal.Body>
      {alertMessage && (
        <Alert type="danger" onDismiss={onDismissModalAlert}>{alertMessage}</Alert>
      )}
      {`You have selected ${customersSelected} customer statements.`}
      <Separator />
      <Input
        label="Subject"
        name="subject"
        onChange={handleInputChange(onUpdateEmailOptions)}
        value={emailSubject}
      />
      <TextArea
        label="Message"
        name="message"
        onChange={handleInputChange(onUpdateEmailOptions)}
        autoSize
        value={emailMessage}
      />
      <Separator />
      <Select name="selectedTemplateOption" label="Template" onChange={handleSelectChange(onUpdateEmailOptions)}>
        {templateOptions.map(({ name }) => (
          <Select.Option value={name} label={name} />
        ))}
      </Select>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onDismissModal} disabled={isModalSubmitting}>Cancel</Button>
      <Button type="primary" onClick={onSendEmail} disabled={isModalSubmitting}>Send statements</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  templateOptions: getTemplateOptions(state),
  customersSelected: getCustomersSelected(state),
  emailSubject: getEmailSubject(state),
  emailMessage: getEmailMessage(state),
});

export default connect(mapStateToProps)(CustomerStatementPDFModal);
