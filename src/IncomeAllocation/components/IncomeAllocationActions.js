import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getIsActionsDisabled } from '../IncomeAllocationSelectors';

const IncomeAllocationActions = ({
  isActionsDisabled,
  onSaveButtonClick,
}) => (
  <ButtonRow>
    <Button onClick={onSaveButtonClick} disabled={isActionsDisabled}>Save</Button>
  </ButtonRow>
);

IncomeAllocationActions.propTypes = {
  isActionsDisabled: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(IncomeAllocationActions);
