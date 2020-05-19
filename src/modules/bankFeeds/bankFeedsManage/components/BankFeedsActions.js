import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionDisabled } from '../BankFeedsSelectors';

const LinkedAccountsActions = ({
  isActionDisabled,
  onSaveButtonClick,
}) => (
  <ButtonRow>
    <Button key="save" name="save" type="primary" onClick={onSaveButtonClick} disabled={isActionDisabled}>
      Save
    </Button>
  </ButtonRow>
);

const mapStateToProps = state => ({
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(LinkedAccountsActions);
