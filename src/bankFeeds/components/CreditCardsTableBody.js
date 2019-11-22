import { Button, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBankFeedsCreditCards, getIsActionDisabled } from '../BankFeedsSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import BankFeedTypes from '../BankFeedTypes';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';

const CreditCardsTableBody = ({
  isActionDisabled,
  tableConfig,
  entries,
  onCreditCardLinkedAccountChange,
  onDeleteBankFeedAccountClick,
}) => {
  const rows = entries.map(entry => (
    <Table.Row key={entry.id}>
      <Table.RowItem
        columnName={tableConfig.financialInstitution.columnName}
        {...tableConfig.financialInstitution.styles}
      >
        {entry.financialInstitution}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.cardName.columnName}
        {...tableConfig.cardName.styles}
      >
        {entry.cardName}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.cardNumber.columnName}
        {...tableConfig.cardNumber.styles}
      >
        {entry.cardNumber}
      </Table.RowItem>
      <Table.RowItem
        columnName={tableConfig.linkedAccount.columnName}
        {...tableConfig.linkedAccount.styles}
      >
        <AccountCombobox
          label="linked account"
          hideLabel
          items={entry.accountOptions}
          selectedId={entry.linkedAccountId}
          onChange={handleComboboxChange(entry.id, onCreditCardLinkedAccountChange)}
        />
      </Table.RowItem>
      <Table.RowItem
        textWrap="wrap"
        columnName={tableConfig.status.columnName}
        {...tableConfig.status.styles}
      >
        {entry.status}
      </Table.RowItem>
      <Table.RowItem
        cellRole="actions"
        {...tableConfig.removeButton.styles}
      >
        <Button
          type="clear"
          icon={<Icons.Remove />}
          aria-label="Remove credit card account"
          size="xs"
          onClick={() => onDeleteBankFeedAccountClick(BankFeedTypes.CREDIT_CARD, entry.id)}
          disabled={isActionDisabled}
        />
      </Table.RowItem>
    </Table.Row>
  ));

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getBankFeedsCreditCards(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(CreditCardsTableBody);
