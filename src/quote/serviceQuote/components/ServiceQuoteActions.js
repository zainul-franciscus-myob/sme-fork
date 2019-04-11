import { Button } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../ServiceQuoteSelectors';

const ServiceQuoteActions = ({
  isCreating,
  isActionsDisabled,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
}) => (
  <React.Fragment>
    {!isCreating && (
      <Button name="delete" type="secondary" onClick={onDeleteButtonClick} disabled={isActionsDisabled}>
        Delete
      </Button>
    )}
    <Button name="cancel" type="secondary" onClick={onCancelButtonClick} disabled={isActionsDisabled}>
      Cancel
    </Button>
    <Button name="save" type="primary" onClick={onSaveButtonClick} disabled={isActionsDisabled}>
      Save
    </Button>
  </React.Fragment>
);

ServiceQuoteActions.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isActionsDisabled: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(ServiceQuoteActions);
