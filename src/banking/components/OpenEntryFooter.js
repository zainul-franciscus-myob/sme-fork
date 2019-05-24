import { Button, ButtonRow } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getIsOpenEntryCreating } from '../bankingSelectors';

const OpenEntryFooter = ({
  isCreating,
  children,
  onSave,
  onCancel,
  onUnmatch,
}) => (
  <ButtonRow
    primary={[
      children,
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

OpenEntryFooter.defaultProps = {
  children: null,
};

OpenEntryFooter.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUnmatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsOpenEntryCreating(state),
});

export default connect(mapStateToProps)(OpenEntryFooter);
