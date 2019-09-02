import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsFirstStep } from '../PayRunSelectors';

const PayRunActions = ({
  isFirstStep,
  onNextButtonClick,
  onPreviousButtonClick,
}) => (
  <ButtonRow
    primary={[
      !isFirstStep && (
        <Button key="previous" name="previous" type="secondary" onClick={onPreviousButtonClick}>
            Previous
        </Button>
      ),
      <Button key="save" name="save" type="primary" onClick={onNextButtonClick}>
          Next
      </Button>,
    ]}

    secondary={[
      <Button key="cancel" name="cancel" type="secondary" onClick={() => {}}>
          Cancel
      </Button>,
    ]}
  />
);

const mapStateToProps = state => ({
  isFirstStep: getIsFirstStep(state),
});

export default connect(mapStateToProps)(PayRunActions);
