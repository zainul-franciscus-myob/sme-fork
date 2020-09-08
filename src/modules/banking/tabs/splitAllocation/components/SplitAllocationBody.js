import React from 'react';

import SplitAllocationOptions from './SplitAllocationOptions';
import SplitAllocationTable from './SplitAllocationTable';

const SplitAllocationBody = ({
  onUpdateSplitAllocationHeader,
  onAddSplitAllocationLine,
  onUpdateSplitAllocationLine,
  onDeleteSplitAllocationLine,
  onAddAccount,
  onAddJob,
  onBlur,
}) => (
  <React.Fragment>
    <SplitAllocationOptions
      onUpdateSplitAllocationHeader={onUpdateSplitAllocationHeader}
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
