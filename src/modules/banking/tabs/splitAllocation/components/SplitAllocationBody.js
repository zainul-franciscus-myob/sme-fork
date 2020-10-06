import React from 'react';

import SplitAllocationOptions from './SplitAllocationOptions';
import SplitAllocationTable from './SplitAllocationTable';

const SplitAllocationBody = ({
  renderSplitAllocationContactCombobox,
  renderReceiveMoneyBankingRuleCombobox,
  renderSpendMoneyBankingRuleCombobox,
  onUpdateSplitAllocationHeader,
  onUpdateSplitAllocationContactCombobox,
  onAddSplitAllocationLine,
  onUpdateSplitAllocationLine,
  onDeleteSplitAllocationLine,
  onAddAccount,
  onAddJob,
  onBlur,
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
      onAddJob={onAddJob}
      onBlur={onBlur}
    />
  </React.Fragment>
);

export default SplitAllocationBody;
