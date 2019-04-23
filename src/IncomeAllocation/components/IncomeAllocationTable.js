import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getIndexOfLastLine, getTableData,
} from '../IncomeAllocationSelectors';
import IncomeAllocationRow from './IncomeAllocationRow';

class IncomeAllocationTable extends React.Component {
  onChange = (index, name, value) => {
    const { onUpdateRow } = this.props;
    onUpdateRow(index, name, value);
  }

  onAddRow = ({ id, ...partialLine }) => {
    const { onAddRow } = this.props;
    onAddRow(partialLine);
  }

  onRowInputBlur = index => () => {
    const { onRowInputBlur } = this.props;
    onRowInputBlur(index);
  }

  renderRow = (index, data, onChange) => {
    const {
      indexOfLastLine,
    } = this.props;

    const isNewLineRow = indexOfLastLine < index;

    return (
      <IncomeAllocationRow
        index={index}
        key={index}
        onChange={onChange}
        isNewLineRow={isNewLineRow}
        onRowInputBlur={this.onRowInputBlur}
      />
    );
  };

  render() {
    const labels = [
      'Header account', 'Retained earnings account', 'Current year earnings account', 'Equity (%)',
    ];

    const {
      tableData,
      onRemoveRow,
    } = this.props;

    return (
      <LineItemTable
        onAddRow={this.onAddRow}
        onRowChange={this.onChange}
        labels={labels}
        renderRow={this.renderRow}
        data={tableData}
        onRemoveRow={onRemoveRow}
      />
    );
  }
}

IncomeAllocationTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  indexOfLastLine: getIndexOfLastLine(state),
  tableData: getTableData(state),
});

export default connect(mapStateToProps)(IncomeAllocationTable);
