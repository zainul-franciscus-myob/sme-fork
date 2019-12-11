import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsSubmitting } from '../SupplierReturnPurchaseSelector';

const SupplierReturnPurchaseCreateActions = ({
  onSaveButtonClick,
  onCancelButtonClick,
  isSubmitting,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isSubmitting}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isSubmitting}>
        Record
      </Button>,
    ]}
  />
);

const mapStateToProps = state => ({
  isSubmitting: getIsSubmitting(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseCreateActions);
