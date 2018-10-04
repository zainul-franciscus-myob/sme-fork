import { Combobox, Input, LineItemTable } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const AccountCombobox = (props) => {
  const {
    items,
    selectedIndex,
    onChange,
  } = props;

  const metaData = [
    { columnName: 'id', columnWidth: '50px' },
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
  if (typeof selectedIndex === 'number') {
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

  renderRow = (index, data, onChange) => {
    const {
      accounts,
      indexOfLastLine,
    } = this.props;

    const isNewLineRow = indexOfLastLine < index;

    const {
      debitDisplayAmount = '',
      isDebitDisabled,
      creditDisplayAmount = '',
      isCreditDisabled,
      description = '',
      displayTaxAmount = '',
      selectedAccountIndex,
      taxCodes,
      selectedTaxCodeIndex,
    } = data;


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
          name="debitDisplayAmount"
          value={debitDisplayAmount}
          disabled={isDebitDisabled || isNewLineRow}
          onChange={onChange}
        />
        <Input
          type="number"
          label="Credit Amount"
          hiddenLabel
          name="creditDisplayAmount"
          value={creditDisplayAmount}
          disabled={isCreditDisabled || isNewLineRow}
          onChange={onChange}
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
        <Input
          type="number"
          label="Tax Amount"
          hiddenLabel
          name="displayTaxAmount"
          value={displayTaxAmount}
          onChange={onChange}
          disabled={isNewLineRow}
        />
      </LineItemTable.Row>
    );
  };

  render() {
    const labels = [
      'Account', 'Debit ($)', 'Credit ($)', 'Line Description', 'Tax code', 'Tax Amount ($)',
    ];

    const {
      lines,
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
          <LineItemTable.Totals title="Total debit" amount="$34556.90" />
          <LineItemTable.Totals title="Total credit" amount="$34556.90" />
          <LineItemTable.Totals title="Tax" amount="$345.57" />
          <LineItemTable.Totals totalAmount title="Out of balance" amount="$0.00" />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}

GeneralJournalDetailTable.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  indexOfLastLine: PropTypes.number.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
};
