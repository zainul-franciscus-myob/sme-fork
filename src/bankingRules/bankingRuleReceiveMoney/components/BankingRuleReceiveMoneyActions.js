import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating } from '../bankingRuleReceiveMoneySelectors';

const BankingRuleReceiveMoneyActions = ({
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  isCreating,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={onCancelButtonClick}>
          Cancel
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onSaveButtonClick}>
              Save
      </Button>,
    ]}
    secondary={[
      (
        !isCreating
          && (
            <Button key="delete" name="delete" type="secondary" onClick={onDeleteButtonClick}>
              Delete
            </Button>
          )
      ),
    ]}
  />
);

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(BankingRuleReceiveMoneyActions);
