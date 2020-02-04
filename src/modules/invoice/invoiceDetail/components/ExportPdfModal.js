import { Button, Modal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExportPdfTemplate } from '../selectors/exportPdfSelectors';
import { getIsModalActionDisabled, getTemplateOptions } from '../selectors/invoiceDetailSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

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
  <Modal title="View PDF" onCancel={onCancel} canClose={!isActionDisabled}>
    <Modal.Body>
      <Select name="template" label="Template" value={template} onChange={handleSelectChange(onChange)}>
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
  templateOptions: getTemplateOptions(state),
  isActionDisabled: getIsModalActionDisabled(state),
});

export default connect(mapStateToProps)(ExportPdfModal);
