import {
  Box,
  Button,
  Modal,
  Select,
  Spinner,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExportPdfTemplate,
  getIsExportingPDF,
} from '../../selectors/exportPdfSelectors';
import {
  getIsModalActionDisabled,
  getTemplateOptions,
} from '../../selectors/invoiceDetailSelectors';
import InvoiceDetailPaymentOptions from '../InvoiceDetailPaymentOptions';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  isActionDisabled,
  isExportingPDF,
  template,
  templateOptions,
  listeners: {
    onCancel,
    onChange,
    onConfirm,
    onCustomiseTemplate,
    onManagePaymentOptions,
  },
}) => (
  <Modal
    canClose={!isActionDisabled}
    onCancel={onCancel}
    title="View PDF"
    underlayProps={{ id: 'viewPDFModal' }}
  >
    <Modal.Body>
      <Box display="flex">
        <Box flex="auto">Invoice template</Box>

        <Box flex="auto" textAlign="right">
          <Button type="link" onClick={onCustomiseTemplate}>
            Customise template
          </Button>
          <Tooltip container={() => document.querySelector('#viewPDFModal')}>
            Change colours, add your logo, and more. You can also create
            multiple templates for different occasions.
          </Tooltip>
        </Box>
      </Box>

      <Select
        hideLabel
        label="Template"
        name="template"
        onChange={handleSelectChange(onChange)}
        value={template}
      >
        {templateOptions.map(({ name, label }) => (
          <Select.Option key={name} value={name} label={label} />
        ))}
      </Select>

      <Box display="flex">
        <Box flex="auto">Payment options</Box>

        <Box flex="auto" marginBottom="xs" textAlign="right">
          <Button type="link" onClick={onManagePaymentOptions}>
            Manage payment options
          </Button>
          <Tooltip container={() => document.querySelector('#viewPDFModal')}>
            Edit details and select the payment options you want to include on
            your sales invoice.
          </Tooltip>
        </Box>
      </Box>

      <InvoiceDetailPaymentOptions />
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={isActionDisabled} onClick={onCancel} type="secondary">
        Cancel
      </Button>
      <Button disabled={isActionDisabled} onClick={onConfirm} type="primary">
        Export
      </Button>

      {isExportingPDF && <Spinner size="small" />}
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  template: getExportPdfTemplate(state),
  templateOptions: getTemplateOptions(state),
  isActionDisabled: getIsModalActionDisabled(state),
  isExportingPDF: getIsExportingPDF(state),
});

export default connect(mapStateToProps)(ExportPdfModal);
