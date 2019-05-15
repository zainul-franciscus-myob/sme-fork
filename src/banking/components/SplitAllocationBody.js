import PropTypes from 'prop-types';
import React from 'react';

import SplitAllocationActions from './SplitAllocationActions';
import SplitAllocationOptions from './SplitAllocationOptions';
import SplitAllocationTable from './SplitAllocationTable';

const SplitAllocationBody = ({
  onUpdateSplitAllocationHeader,
  onAddSplitAllocationLine,
  onUpdateSplitAllocationLine,
  onDeleteSplitAllocationLine,
  onSaveSplitAllocation,
  onCancelSplitAllocation,
  onUnallocateSplitAllocation,
}) => (
  <React.Fragment>
    <SplitAllocationOptions
      onUpdateSplitAllocationHeader={onUpdateSplitAllocationHeader}
    />
    <SplitAllocationTable
      onAddSplitAllocationLine={onAddSplitAllocationLine}
      onUpdateSplitAllocationLine={onUpdateSplitAllocationLine}
      onDeleteSplitAllocationLine={onDeleteSplitAllocationLine}
    />
    <SplitAllocationActions
      onSaveSplitAllocation={onSaveSplitAllocation}
      onCancelSplitAllocation={onCancelSplitAllocation}
      onUnallocateSplitAllocation={onUnallocateSplitAllocation}
    />
  </React.Fragment>
);

SplitAllocationBody.propTypes = {
  onUpdateSplitAllocationHeader: PropTypes.func.isRequired,
  onAddSplitAllocationLine: PropTypes.func.isRequired,
  onUpdateSplitAllocationLine: PropTypes.func.isRequired,
  onDeleteSplitAllocationLine: PropTypes.func.isRequired,
  onSaveSplitAllocation: PropTypes.func.isRequired,
  onCancelSplitAllocation: PropTypes.func.isRequired,
  onUnallocateSplitAllocation: PropTypes.func.isRequired,
};

export default SplitAllocationBody;
