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
      <Table.RowItem columnName={tableConfig.financialInstitution.columnName}>
        {entry.financialInstitution}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.cardName.columnName}>
        {entry.cardName}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.cardNumber.columnName}>
        {entry.cardNumber}
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.linkedAccount.columnName} textWrap="wrap">
        <AccountCombobox
          label="linked account"
          hideLabel
          items={entry.accountOptions}
          selectedId={entry.linkedAccountId}
          onChange={handleComboboxChange(entry.id, onCreditCardLinkedAccountChange)}
        />
      </Table.RowItem>
      <Table.RowItem columnName={tableConfig.status.columnName}>
        {entry.status}
      </Table.RowItem>
      <Table.RowItem width="auto" cellRole="actions" valign="middle">
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
