import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsActionsDisabled } from '../taxCombineSelectors';

const TaxCombineActions = ({
  isActionsDisabled,
  onCombineButtonClick,
  onCancelButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="cancel"
        name="cancel"
        type="secondary"
        onClick={onCancelButtonClick}
        disabled={isActionsDisabled}
      >
        Cancel
      </Button>,
      <Button
        key="combine"
        name="combine"
        type="primary"
        onClick={onCombineButtonClick}
        disabled={isActionsDisabled}
      >
        Combine
      </Button>,
    ]}
  />
);

const mapStateToProps = (state) => ({
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(TaxCombineActions);
