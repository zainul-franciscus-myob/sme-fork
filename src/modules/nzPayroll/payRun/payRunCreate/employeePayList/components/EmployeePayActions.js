import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubmitting } from '../../PayRunSelectors';

const EmployeePayActions = ({
  onNextButtonClick,
  isSubmitting,
}) => (
  <ButtonRow
    primary={[
      <Button key="save" name="save" type="primary" disabled={isSubmitting} onClick={onNextButtonClick}>
          Next
      </Button>,
    ]}
  />
);

const mapStateToProps = state => ({
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(EmployeePayActions);
