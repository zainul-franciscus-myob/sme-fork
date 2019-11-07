import { Button, Modal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExportPdfTemplate, getExportPdfTemplateOptions } from '../selectors/exportPdfSelectors';
import { getIsModalActionDisabled } from '../selectors/invoiceDetailSelectors';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  template,
  templateOptions,
  isActionDisabled,
  listeners: {
    onCancel,
    onConfirm,
    onChange,
  },
}) => (
  <Modal title="Export PDF" onCancel={onCancel} canClose={!isActionDisabled}>
    <Modal.Body>
      <Select name="template" label="Select form" value={template} onChange={handleSelectChange(onChange)}>
        {templateOptions.map(({ name, label }) => (
          <Select.Option key={name} value={name} label={label} />
        )) }
      </Select>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isActionDisabled}>Cancel</Button>
      <Button type="primary" onClick={onConfirm} disabled={isActionDisabled}>Export</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  template: getExportPdfTemplate(state),
  templateOptions: getExportPdfTemplateOptions(state),
  isActionDisabled: getIsModalActionDisabled(state),
});

export default connect(mapStateToProps)(ExportPdfModal);
