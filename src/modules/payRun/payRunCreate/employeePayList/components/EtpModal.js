import {
  Button, Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsEtpCodeCategorySelected } from '../EmployeePayListSelectors';
import EtpModalRadioGroup from './EtpModalRadioGroup';
import EtpModalSelect from './EtpModalSelect';

const EtpModal = ({
  isEtpCodeCategorySelected,
  onChangeEtpCodeCategory,
  onChangeEtpCode,
  onCloseEtpModal,
  onSaveEtp,
}) => (
  <Modal
    title="Employment termination payment (ETP) code"
    size="small"
    onCancel={onCloseEtpModal}
  >
    <Modal.Body>
      <p>Select the benefit type that best describes the payment</p>
      <EtpModalSelect onChangeEtpCodeCategory={onChangeEtpCodeCategory} />
      { isEtpCodeCategorySelected && <EtpModalRadioGroup onChangeEtpCode={onChangeEtpCode} /> }
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCloseEtpModal}>
          Cancel
      </Button>
      <Button type="primary" onClick={onSaveEtp}>
          Save
      </Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  isEtpCodeCategorySelected: getIsEtpCodeCategorySelected(state),
});

export default connect(mapStateToProps)(EtpModal);
