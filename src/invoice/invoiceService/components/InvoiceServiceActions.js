import { Button, ButtonRow } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../invoiceServiceSelectors';


const InvoiceServiceActions = ({
  isCreating,
  isActionsDisabled,
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isActionsDisabled}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isActionsDisabled}>
        Save
      </Button>,
    ]}
    secondary={[
      !isCreating && (
        <Button key="delete" name="delete" type="secondary" onClick={onDeleteButtonClick} disabled={isActionsDisabled}>
          Delete
        </Button>
      ),
    ]}
  />
);

InvoiceServiceActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isActionsDisabled: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceServiceActions);
