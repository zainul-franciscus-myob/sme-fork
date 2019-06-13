import { Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankEntryByIndexSelector } from '../bankingSelectors';

const BankTransactionExpansionToggle = ({
  isOpen,
  disabled,
  getButtonProps,
}) => (
  <Button {...getButtonProps({
    disabled,
  })}
  >
    {isOpen ? <Icons.UpChevron /> : <Icons.DownChevron />}
  </Button>
);

const makeMapStateToProps = () => {
  const getBankEntryByIndex = getBankEntryByIndexSelector();
  return (state, ownProps) => ({
    disabled: getBankEntryByIndex(state, ownProps).isLineDisabled,
  });
};

export default connect(makeMapStateToProps)(BankTransactionExpansionToggle);
