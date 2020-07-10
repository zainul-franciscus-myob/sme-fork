import { Button, Input, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDescription,
  getIsCreating,
  getIsLoading,
  getTitle,
} from '../../selectors/employmentClassificationDetailSelectors';
import EmploymentClassificationDetailAlert from './EmploymentClassificationDetailAlert';
import PageView from '../../../../components/PageView/PageView';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const EmploymentClassificationDetailModal = ({
  title,
  description,
  alert,
  isLoading,
  isCreating,
  employmentClassificationDetailListeners,
}) => {
  const {
    onChangeEmploymentClassificationDetail,
    onCancelEmploymentClassificationDetailModal,
    onSaveEmploymentClassificationDetail,
    onDeleteEmploymentClassificationDetail,
    onDismissEmploymentClassificationDetailAlert,
  } = employmentClassificationDetailListeners;

  const alertView = alert && (
    <EmploymentClassificationDetailAlert
      onDismissEmploymentClassificationDetailAlert={
        onDismissEmploymentClassificationDetailAlert
      }
    />
  );

  const view = (
    <>
      <Modal.Body>
        {alertView}
        <Input
          name="description"
          label="Employment classification"
          value={description}
          onChange={handleInputChange(onChangeEmploymentClassificationDetail)}
        />
      </Modal.Body>
      <Modal.Footer>
        {!isCreating && (
          <Button
            type="secondary"
            onClick={onDeleteEmploymentClassificationDetail}
          >
            Delete
          </Button>
        )}
        <Button
          type="secondary"
          onClick={onCancelEmploymentClassificationDetailModal}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={onSaveEmploymentClassificationDetail}>
          Save
        </Button>
      </Modal.Footer>
    </>
  );

  return (
    <Modal
      title={title}
      size="small"
      onCancel={onCancelEmploymentClassificationDetailModal}
    >
      <PageView isLoading={isLoading} view={view} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  title: getTitle(state),
  description: getDescription(state),
  alert: getAlert(state),
  isLoading: getIsLoading(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(EmploymentClassificationDetailModal);
