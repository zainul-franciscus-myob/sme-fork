import { Button, ButtonRow } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating } from '../bankingSelectors/splitAllocationSelectors';

const SplitAllocationActions = ({
  isCreating,
  onSaveSplitAllocation,
  onCancelSplitAllocation,
  onUnallocateSplitAllocation,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelSplitAllocation}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveSplitAllocation}>
        Save
      </Button>,
    ]}
    secondary={[
      (!isCreating
      && (
        <Button key="unmatch" name="unmatch" type="secondary" onClick={onUnallocateSplitAllocation}>
          Unmatch
        </Button>
      )),
    ]}
  />
);

SplitAllocationActions.propTypes = {
  isCreating: PropTypes.func.isRequired,
  onSaveSplitAllocation: PropTypes.func.isRequired,
  onCancelSplitAllocation: PropTypes.func.isRequired,
  onUnallocateSplitAllocation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(SplitAllocationActions);
