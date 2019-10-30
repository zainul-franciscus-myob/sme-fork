import { Button, Modal, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  template,
  templateOptions,
  onCancel,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
}) => (
  <Modal title="Export PDF" onCancel={onCancel}>
    <Modal.Body>
      <Select
        label="Select form"
        name="template"
        value={template}
        onChange={handleSelectChange(onChangeExportPdfForm)}
      >
        {templateOptions.map(({ name, label }) => (
          <Select.Option key={name} value={name} label={label} />
        )) }
      </Select>
    </Modal.Body>
    <Modal.Footer>
      <Button
        type="secondary"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        onClick={onConfirmExportPdfButtonClick}
      >
        Export
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ExportPdfModal;
