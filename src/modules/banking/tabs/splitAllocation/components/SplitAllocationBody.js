import React from 'react';

import SplitAllocationOptions from './SplitAllocationOptions';
import SplitAllocationTable from './SplitAllocationTable';

const SplitAllocationBody = ({
  renderContactCombobox,
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
      renderContactCombobox={renderContactCombobox}
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
