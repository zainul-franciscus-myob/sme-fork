import React from 'react';

import SplitAllocationOptions from './SplitAllocationOptions';
import SplitAllocationTable from './SplitAllocationTable';

const SplitAllocationBody = ({
  onUpdateSplitAllocationHeader,
  onAddSplitAllocationLine,
  onUpdateSplitAllocationLine,
  onDeleteSplitAllocationLine,
  onAddAccount,
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
    />
  </React.Fragment>
);

export default SplitAllocationBody;
