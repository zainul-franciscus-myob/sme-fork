import { Button, Modal, Select, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getExportPdfTemplate,
  getExportPdfTemplateOptions,
  getIsExportingPDF,
} from '../selectors/exportPdfSelectors';
import { getIsModalBlocking } from '../selectors/purchaseOrderSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  template,
  templateOptions,
  isModalBlocking,
  isExportingPDF,
  listeners: { onCancel, onConfirm, onChange },
}) => (
  <Modal title="View PDF" onCancel={onCancel} canClose={!isModalBlocking}>
    <Modal.Body>
      <Select
        name="template"
        label="Template"
        value={template}
        onChange={handleSelectChange(onChange)}
      >
        {templateOptions.map(({ name, label }) => (
          <Select.Option key={name} value={name} label={label} />
        ))}
      </Select>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isModalBlocking}>
        Cancel
      </Button>
      <Button type="primary" onClick={onConfirm} disabled={isModalBlocking}>
        Export
      </Button>
      {isExportingPDF && <Spinner size="small" />}
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = (state) => ({
  template: getExportPdfTemplate(state),
  templateOptions: getExportPdfTemplateOptions(state),
  isModalBlocking: getIsModalBlocking(state),
  isExportingPDF: getIsExportingPDF(state),
});

export default connect(mapStateToProps)(ExportPdfModal);
