import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getAreLinesCalculating, getIsCreating } from '../billItemSelectors';

const BillItemActions = ({
  isCreating,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  areButtonsDisabled,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="cancel"
        name="cancel"
        type="secondary"
        onClick={onCancelButtonClick}
        disabled={areButtonsDisabled}
      >
          Cancel
      </Button>,
      <Button
        key="save"
        name="save"
        type="primary"
        onClick={onSaveButtonClick}
        disabled={areButtonsDisabled}
      >
          Save
      </Button>,
    ]}
    secondary={[
      !isCreating && (
      <Button
        key="delete"
        name="delete"
        type="secondary"
        onClick={onDeleteButtonClick}
        disabled={areButtonsDisabled}
      >
          Delete
      </Button>
      ),
    ]}
  />
);

BillItemActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  areButtonsDisabled: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  areButtonsDisabled: getAreLinesCalculating(state),
});

export default connect(mapStateToProps)(BillItemActions);
