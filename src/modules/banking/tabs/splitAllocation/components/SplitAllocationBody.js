import React from 'react';

import SplitAllocationOptions from './SplitAllocationOptions';
import SplitAllocationTable from './SplitAllocationTable';

const SplitAllocationBody = ({
  renderSplitAllocationContactCombobox,
  renderSplitAllocationJobCombobox,
  renderReceiveMoneyBankingRuleCombobox,
  renderSpendMoneyBankingRuleCombobox,
  onUpdateSplitAllocationHeader,
  onUpdateSplitAllocationContactCombobox,
  onAddSplitAllocationLine,
  onUpdateSplitAllocationLine,
  onDeleteSplitAllocationLine,
  onAddAccount,
  onBlur,
  onViewedAccountToolTip,
}) => (
  <React.Fragment>
    <SplitAllocationOptions
      renderSplitAllocationContactCombobox={
        renderSplitAllocationContactCombobox
      }
      renderReceiveMoneyBankingRuleCombobox={
        renderReceiveMoneyBankingRuleCombobox
      }
      renderSpendMoneyBankingRuleCombobox={renderSpendMoneyBankingRuleCombobox}
      onUpdateSplitAllocationHeader={onUpdateSplitAllocationHeader}
      onUpdateSplitAllocationContactCombobox={
        onUpdateSplitAllocationContactCombobox
      }
    />
    <SplitAllocationTable
      onAddSplitAllocationLine={onAddSplitAllocationLine}
      onUpdateSplitAllocationLine={onUpdateSplitAllocationLine}
      onDeleteSplitAllocationLine={onDeleteSplitAllocationLine}
      onAddAccount={onAddAccount}
      onBlur={onBlur}
      onViewedAccountToolTip={onViewedAccountToolTip}
      renderJobCombobox={renderSplitAllocationJobCombobox}
    />
  </React.Fragment>
);

export default SplitAllocationBody;
