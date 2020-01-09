import { Button, Input, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBusinessDetailsModalIsLoading } from '../stpErrorsSelectors';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';


const BusinessDetailsModal = ({
  onCancelClick,
  onSaveClick,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Modal
        title="Business details"
        onCancel={onCancelClick}
      >
        <Modal.Body>
          <LoadingPageState />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal
      title="Business details"
      onCancel={onCancelClick}
    >
      <Modal.Body>
        <Input label="Business Name" requiredLabel="This is required" />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancelClick}>Cancel</Button>
        <Button type="primary" onClick={onSaveClick}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isLoading: getBusinessDetailsModalIsLoading(state),
});

export default connect(mapStateToProps)(BusinessDetailsModal);
