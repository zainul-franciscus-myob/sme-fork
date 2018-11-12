import { Input, LineItemTable } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

import Combobox from '../../components/Feelix/ComboBox/Combobox';

const AccountCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
  } = props;

  const metaData = [
    { columnName: 'displayId', columnWidth: '50px', showData: true },
    { columnName: 'displayName', columnWidth: '200px', showData: true },
    { columnName: 'accountType', columnWidth: '100px' },
  ];

  let selectedItem = {};
  if (typeof selectedIndex === 'number') {
    selectedItem = items[selectedIndex];
  }

  return (
    <Combobox
      metaData={metaData}
      items={items}
      selected={selectedItem}
      onChange={onChange}
    />
  );
};

AccountCombobox.defaultProps = {
  selectedIndex: null,
};

AccountCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

const TaxCodeCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
    disabled,
  } = props;

  const metaData = [
    { columnName: 'id', columnWidth: '50px' },
    { columnName: 'displayName', columnWidth: '200px', showData: true },
    { columnName: 'rate', columnWidth: '50px' },
  ];

  let selectedItem = {};
  if (typeof selectedIndex === 'number' && selectedIndex !== -1) {
    selectedItem = items[selectedIndex];
  }

  return (
    <Combobox
      metaData={metaData}
      items={items}
      onChange={onChange}
      selected={selectedItem}
      disabled={disabled}
    />
  );
};

TaxCodeCombobox.defaultProps = {
  items: [],
  selectedIndex: null,
  disabled: false,
};

TaxCodeCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default class GeneralJournalDetailTable extends React.Component {
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
      displayDebitAmount = '',
      isDebitDisabled,
      displayCreditAmount = '',
      isCreditDisabled,
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
          label="Debit Amount"
          hiddenLabel
          name="displayDebitAmount"
          value={displayDebitAmount}
          disabled={isDebitDisabled || isNewLineRow}
          onChange={onChange}
          onBlur={this.onRowInputBlur(index)}
        />
        <Input
          type="number"
          label="Credit Amount"
          hiddenLabel
          name="displayCreditAmount"
          value={displayCreditAmount}
          disabled={isCreditDisabled || isNewLineRow}
          onChange={onChange}
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
      'Account', 'Debit ($)', 'Credit ($)', 'Line Description', 'Tax code',
    ];

    const {
      lines,
      amountTotals,
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
          <LineItemTable.Totals title="Total debit" amount={amountTotals.totalDebit} />
          <LineItemTable.Totals title="Total credit" amount={amountTotals.totalCredit} />
          <LineItemTable.Totals title="Tax" amount={amountTotals.totalTax} />
          <LineItemTable.Totals totalAmount title="Out of balance" amount={amountTotals.totalOutOfBalance} />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}

GeneralJournalDetailTable.propTypes = {
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
