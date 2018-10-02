import { Combobox, Input, LineItemTable } from '@myob/myob-widgets';
import React from 'react';

const AccountCombobox = () => {
  const boxData = [
    { name: 'Account name testing 1', value: '1234', type: 'regular' },
    { name: 'Account 1', value: '1235', type: 'Asset' },
  ];
  const boxMetaData = [
    { columnName: 'value', columnWidth: '50px' },
    { columnName: 'name', columnWidth: '200px' },
    { columnName: 'type', columnWidth: '100px' },
  ];

  return (
    <Combobox
      metaData={boxMetaData}
      items={boxData}
    />
  );
};

const TaxCodeCombobox = () => {
  const boxData = [
    { name: 'GST', value: '10%', fullName: 'General Service Tax' },
    { name: 'AFL', value: '5%', fullName: 'Australian Football League' },
    { name: 'NBA', value: '15%', fullName: 'National Basketball Association' },
  ];
  const boxMetaData = [
    { columnName: 'name', columnWidth: '50px' },
    { columnName: 'fullName', columnWidth: '200px' },
    { columnName: 'value', columnWidth: '50px' },
  ];

  return (
    <Combobox
      metaData={boxMetaData}
      items={boxData}
    />
  );
};

export default class GeneralJournalDetailTable extends React.Component {
  onStuff = () => { }

  renderRow = (index, data) => (
    <LineItemTable.Row
      id={data.id}
      key={data.id}
      index={index}
      moveRow={this.onStuff}
    >
      <AccountCombobox />
      <Input type="number" />
      <Input type="number" />
      <Input type="text" />
      <TaxCodeCombobox />
      <Input type="number" />
    </LineItemTable.Row>
  );

  render() {
    const labels = ['Account', 'Debit ($)', 'Credit ($)', 'Line Description', 'Tax code', 'Tax Amount ($)'];
    return (
      <LineItemTable
        data={[]}
        onAddRow={this.onStuff}
        onRemoveRow={this.onStuff}
        onRowChange={this.onStuff}
        labels={labels}
        renderRow={this.renderRow}
      >
        <LineItemTable.Total>
          <LineItemTable.Totals title="Net credit" amount="$34556.90" />
          <LineItemTable.Totals title="Net debit" amount="$34556.90" />
          <LineItemTable.Totals title="Tax" amount="$345.57" />
          <LineItemTable.Totals totalAmount title="Out of balance" amount="$0.00" />
        </LineItemTable.Total>
      </LineItemTable>
    );
  }
}
