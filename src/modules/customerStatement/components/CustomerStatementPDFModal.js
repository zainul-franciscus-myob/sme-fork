import {
  Alert,
  Button,
  Modal,
  Select,
  Separator,
  Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCustomersSelected,
  getIsDownloadingPDF,
  getTemplateOptions,
} from '../selectors/customerStatementListSelectors';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const CustomerStatementPDFModal = ({
  modal: { alertMessage, isModalSubmitting },
  templateOptions,
  customersSelected,
  onDismissModal,
  onDismissModalAlert,
  onUpdateTemplateOption,
  onDownloadPDF,
  isDownloadingPDF,
}) => (
  <Modal title="Download PDF" size="small" onCancel={onDismissModal}>
    <Modal.Body>
      {alertMessage && (
        <Alert type="danger" onDismiss={onDismissModalAlert}>
          {alertMessage}
        </Alert>
      )}
      {`You have selected ${customersSelected} customer statements.`}
      <Separator />
      <Select
        name="selectedTemplateOption"
        label="Template"
        onChange={handleSelectChange(onUpdateTemplateOption)}
      >
        {templateOptions.map(({ name }) => (
          <Select.Option value={name} label={name} />
        ))}
      </Select>
    </Modal.Body>
    <Modal.Footer>
      <Button
        type="secondary"
        onClick={onDismissModal}
        disabled={isModalSubmitting}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        onClick={onDownloadPDF}
        disabled={isModalSubmitting}
      >
        Download PDF
      </Button>
      {isDownloadingPDF && <Spinner size="small" />}
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  templateOptions: getTemplateOptions(state),
  customersSelected: getCustomersSelected(state),
  isDownloadingPDF: getIsDownloadingPDF(state),
});

export default connect(mapStateToProps)(CustomerStatementPDFModal);
