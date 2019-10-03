import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAreActionButtonsDisabled } from '../LinkBillSelectors';

const LinkBillActions = ({
  onLinkButtonClick,
  onCancelButtonClick,
  areActionButtonsDisabled,
}) => (
  <ButtonRow
    primary={[
      <Button key="cancel" name="cancel" type="secondary" disabled={areActionButtonsDisabled} onClick={onCancelButtonClick}>
        Cancel
      </Button>,
      <Button key="link" name="link" type="primary" disabled={areActionButtonsDisabled} onClick={onLinkButtonClick}>
        Link
      </Button>,
    ]}
  />
);

const mapStateToProps = state => ({
  areActionButtonsDisabled: getAreActionButtonsDisabled(state),
});

export default connect(mapStateToProps)(LinkBillActions);
