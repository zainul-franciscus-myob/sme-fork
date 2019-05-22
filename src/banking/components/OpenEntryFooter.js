import { Button, ButtonRow } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating } from '../bankingSelectors/matchTransactionSelectors';

const OpenEntryFooter = ({
  isCreating,
  onSave,
  onCancel,
  onUnmatch,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancel}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSave}>
        Save
      </Button>,
    ]}
    secondary={[
      (!isCreating
        && (
          <Button key="unmatch" name="unmatch" type="secondary" onClick={onUnmatch}>
            Unmatch
          </Button>
        )),
    ]}
  />
);

OpenEntryFooter.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUnmatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(OpenEntryFooter);
