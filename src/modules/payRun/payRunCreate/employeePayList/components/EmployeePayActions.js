import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubmitting } from '../../PayRunSelectors';

const EmployeePayActions = ({
  onNextButtonClick,
  onPreviousButtonClick,
  onSaveAndCloseButtonClick,
  isSubmitting,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="saveAndClose"
        testid="saveAndCloseButton"
        name="saveAndClose"
        type="secondary"
        disabled={isSubmitting}
        onClick={onSaveAndCloseButtonClick}
      >
        Save and close
      </Button>,
      <Button
        key="previous"
        name="previous"
        type="secondary"
        disabled={isSubmitting}
        onClick={onPreviousButtonClick}
      >
        Previous
      </Button>,
      <Button
        key="save"
        name="save"
        type="primary"
        disabled={isSubmitting}
        onClick={onNextButtonClick}
      >
        Next
      </Button>,
    ]}
  />
);

const mapStateToProps = (state) => ({
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(EmployeePayActions);
