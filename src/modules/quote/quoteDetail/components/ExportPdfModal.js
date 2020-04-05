import {
  Button, Modal, Select, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsExportingPDF } from '../selectors/QuoteDetailSelectors';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const ExportPdfModal = ({
  template,
  templateOptions,
  isActionDisabled,
  isExportingPDF,
  onCancel,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
}) => (
  <Modal title="View PDF" onCancel={onCancel} canClose={!isActionDisabled}>
    <Modal.Body>
      <Select
        label="Template"
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
        View
      </Button>
      { isExportingPDF && <Spinner size="small" /> }
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  isExportingPDF: getIsExportingPDF(state),
});

export default connect(mapStateToProps)(ExportPdfModal);
