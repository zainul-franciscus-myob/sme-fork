import { Button, Modal, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getExportPdfForms } from '../itemQuote/ItemQuoteSelectors';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  onCancel, onConfirmExportPdfButtonClick, onChangeExportPdfForm, forms,
}) => (
  <Modal title="Export PDF" onCancel={onCancel}>
    <Modal.Body>
      <Select
        label="Select form"
        onChange={handleSelectChange(onChangeExportPdfForm)}
      >
        {forms.map(form => (
          <Select.Option value={form.name} label={form.label} />
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

const mapStateToProps = state => ({
  forms: getExportPdfForms(state),
});

export default connect(mapStateToProps)(ExportPdfModal);
