import { Button, ButtonRow } from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsOpenEntryCreating,
  getIsOpenEntryLoading,
  getShowCreateBankingRuleButton,
} from '../bankingSelectors';

const OpenEntryFooter = ({
  isCreating,
  isLoading,
  showCreateBankingRuleButton,
  children,
  onSave,
  onCancel,
  onUnmatch,
  onCreateRule,
}) => (
  <ButtonRow
    primary={[
      children,
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancel} disabled={isLoading}>
        Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSave} disabled={isLoading}>
        Save
      </Button>,
    ]}
    secondary={[
      (!isCreating
        && (
          <Button key="unmatch" name="unmatch" type="secondary" onClick={onUnmatch} disabled={isLoading}>
            Unmatch
          </Button>
        )),
      (showCreateBankingRuleButton
        && (
          <Button key="bankingRule" name="bankingRule" type="secondary" onClick={onCreateRule} disabled={isLoading}>
            Create rule
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
  isLoading: getIsOpenEntryLoading(state),
  showCreateBankingRuleButton: getShowCreateBankingRuleButton(state),
});

export default connect(mapStateToProps)(OpenEntryFooter);
