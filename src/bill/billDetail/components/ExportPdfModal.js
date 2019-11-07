import { Button, Modal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExportPdfTemplate, getExportPdfTemplateOptions } from '../selectors/exportPdfSelectors';
import { getIsModalBlocking } from '../selectors/billSelectors';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  template,
  templateOptions,
  isModalBlocking,
  listeners: {
    onCancel,
    onConfirm,
    onChange,
  },
}) => (
  <Modal title="Export PDF" onCancel={onCancel} canClose={!isModalBlocking}>
    <Modal.Body>
      <Select name="template" label="Select form" value={template} onChange={handleSelectChange(onChange)}>
        {templateOptions.map(({ name, label }) => (
          <Select.Option key={name} value={name} label={label} />
        )) }
      </Select>
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isModalBlocking}>Cancel</Button>
      <Button type="primary" onClick={onConfirm} disabled={isModalBlocking}>Export</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  template: getExportPdfTemplate(state),
  templateOptions: getExportPdfTemplateOptions(state),
  isModalBlocking: getIsModalBlocking(state),
});

export default connect(mapStateToProps)(ExportPdfModal);
