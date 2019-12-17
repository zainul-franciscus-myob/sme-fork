import { Button, Modal, Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  template,
  templateOptions,
  isActionDisabled,
  onCancel,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
}) => (
  <Modal title="Export PDF" onCancel={onCancel} canClose={!isActionDisabled}>
    <Modal.Body>
      <Select
        label="Select form"
        name="template"
        value={template}
        onChange={handleSelectChange(onChangeExportPdfForm)}
      >
        {templateOptions.map(({ name }) => (
          <Select.Option key={name} value={name} label={name} />
        )) }
      </Select>
    </Modal.Body>
    <Modal.Footer>
      <Button
        type="secondary"
        onClick={onCancel}
        disabled={isActionDisabled}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        onClick={onConfirmExportPdfButtonClick}
        disabled={isActionDisabled}
      >
        Export
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ExportPdfModal;
