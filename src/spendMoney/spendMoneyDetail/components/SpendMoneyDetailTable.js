import { Input, LineItemTable } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import AccountCombobox from '../../../components/AccountCombobox';
import TaxCodeCombobox from '../../../components/TaxCodeCombobox';

export default class SpendMoneyDetailTable extends React.Component {
  onChange = (index, name, value) => {
    const { onUpdateRow } = this.props;
    onUpdateRow(index, name, value);
  }

  eventWrapper = (name, onChange) => (item) => {
    onChange({
      target: {
        name,
        value: item.id,
      },
    });
  }

  onMoveRow = () => {}

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
      newLineData,
      indexOfLastLine,
    } = this.props;

    const isNewLineRow = indexOfLastLine < index;

    const lineData = isNewLineRow ? newLineData : data;

    const {
      amount = '',
      description = '',
      selectedAccountIndex,
      taxCodes,
      accounts,
      selectedTaxCodeIndex,
    } = lineData;

    return (
      <LineItemTable.Row
        id={index}
        key={index}
        index={index}
        moveRow={this.onMoveRow}
      >
        <AccountCombobox
          items={accounts}
          selectedIndex={selectedAccountIndex}
          onChange={this.eventWrapper('accountId', onChange)}
        />
        <Input
          type="number"
          label="Amount"
          hiddenLabel
          name="amount"
          value={amount}
          disabled={isNewLineRow}
          onChange={onChange}
          step="0.01"
          onBlur={this.onRowInputBlur(index)}
        />
        <Input
          type="text"
          label="Description"
          hiddenLabel
          name="description"
          value={description}
          onChange={onChange}
          disabled={isNewLineRow}
        />
        <TaxCodeCombobox
          items={taxCodes}
          selectedIndex={selectedTaxCodeIndex}
          onChange={this.eventWrapper('taxCodeId', onChange)}
          disabled={isNewLineRow}
        />
      </LineItemTable.Row>
    );
  };

  render() {
    const labels = [
      'Account', 'Amount ($)', 'Line description', 'Tax code',
    ];

    const {
      lines,
      amountTotals: {
        netAmount,
        totalTax,
        totalAmount,
      },
      onRemoveRow,
    } = this.props;

    return (
      <LineItemTable
        onAddRow={this.onAddRow}
        onRowChange={this.onChange}
        labels={labels}
        renderRow={this.renderRow}
        data={lines}
        onRemoveRow={onRemoveRow}
      >
        <LineItemTable.Total>
          <LineItemTable.Totals title="Net amount" amount={netAmount} />
          <LineItemTable.Totals title="Tax" amount={totalTax} />
          <LineItemTable.Totals totalAmount title="Total amount" amount={totalAmount} />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}

SpendMoneyDetailTable.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  newLineData: PropTypes.shape({}).isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  amountTotals: PropTypes.shape({
    totalDebit: PropTypes.string,
    totalCredit: PropTypes.string,
    totalTax: PropTypes.string,
    totalOutOfBalance: PropTypes.string,
  }).isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
};
