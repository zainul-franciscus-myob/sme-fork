import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getIndexOfLastLine,
  getTableData,
} from '../bankingSelectors/splitAllocationSelectors';
import SplitAllocationRow from './SplitAllocationRow';
import SplitAllocationTotals from './SplitAllocationTotals';

const columnConfig = [
  {
    config: [
      {
        columnName: 'Account',
        styles: {},
      },
      {
        columnName: 'Amount ($)',
        styles: { width: '12rem', align: 'right' },
      },
      {
        columnName: 'Amount (%)',
        styles: { width: '12rem', align: 'right' },
      },
      {
        columnName: 'Description',
        styles: {},
      },
      {
        columnName: 'Tax code',
        styles: { width: '8rem' },
      },
    ],
  },
];

const labels = [
  'Account', 'Amount ($)', 'Amount (%)', 'Line description', 'Tax code',
];

const onRowChange = handler => (index, key, value) => handler(index, key, value);

const onAddRow = handler => ({ id, ...partialLine }) => handler(partialLine);

const renderRow = indexOfLastLine => (index, data, onChange) => {
  const isNewLineRow = indexOfLastLine < index;

  return (
    <SplitAllocationRow
      index={index}
      key={index}
      labels={labels}
      onChange={onChange}
      isNewLineRow={isNewLineRow}
    />
  );
};

const SplitAllocationTable = (props) => {
  const {
    tableData,
    indexOfLastLine,
    onAddSplitAllocationLine,
    onUpdateSplitAllocationLine,
    onDeleteSplitAllocationLine,
  } = props;

  return (
    <LineItemTable
      labels={labels}
      data={tableData}
      renderRow={renderRow(indexOfLastLine)}
      onAddRow={onAddRow(onAddSplitAllocationLine)}
      onRowChange={onRowChange(onUpdateSplitAllocationLine)}
      onRemoveRow={onDeleteSplitAllocationLine}
      columnConfig={columnConfig}
    >
      <SplitAllocationTotals />
    </LineItemTable>
  );
};

SplitAllocationTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  onAddSplitAllocationLine: PropTypes.func.isRequired,
  onUpdateSplitAllocationLine: PropTypes.func.isRequired,
  onDeleteSplitAllocationLine: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  indexOfLastLine: getIndexOfLastLine(state),
});

export default connect(mapStateToProps)(SplitAllocationTable);
