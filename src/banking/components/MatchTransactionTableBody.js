import { Checkbox, Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../bankingSelectors/matchTransactionSelectors';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import handleCheckboxChange from '../../components/handlers/handleCheckboxChange';
import styles from './MatchTransactionTable.module.css';

const handleAmountChange = (index, handler) => (e) => {
  const { rawValue, name } = e.target;
  handler({ index, key: name, value: rawValue });
};

const InfoMessage = ({
  overAmount,
  type,
}) => {
  const isCredit = type === 'Sale';
  const creditOrDebit = isCredit ? 'credit' : 'debit';
  const page = isCredit ? 'Customer returns' : 'Supplier returns';
  const invoiceOrBill = isCredit ? 'invoice' : 'debit';
  return (
    <>
      <div>
        This payment will create a &nbsp;
        <b>{overAmount}</b>
        &nbsp;
        {creditOrDebit}
        .
      </div>
      <br />
      <div>
        Go to
        <b>{` ${page} `}</b>
        {`to apply the ${creditOrDebit} to an open ${invoiceOrBill} or record a refund.`}
      </div>
    </>
  );
};

const MatchTransactionTableBody = (props) => {
  const {
    tableConfig,
    entries,
    onUpdateMatchTransactionSelection,
    onUpdateSelectedTransactionDetails,
  } = props;

  const rows = entries.map((entry, index) => {
    const {
      type,
      badge,
      journalId,
      date,
      referenceId,
      description,
      displayTotalAmount,
      selected,
      balanceOwed,
      discountAmount,
      allowCustomAmount,
      matchAmount,
      overAmount,
    } = entry;

    const rowClass = selected ? styles.selected : '';

    return (
      <Table.Row key={journalId} className={rowClass}>
        <Table.RowItem {...tableConfig.checkbox}>
          <Checkbox
            name={journalId}
            label="Match"
            hideLabel
            checked={selected}
            onChange={handleCheckboxChange(onUpdateMatchTransactionSelection)}
          />
        </Table.RowItem>
        <Table.RowItem {...tableConfig.date}>{date}</Table.RowItem>
        <Table.RowItem {...tableConfig.referenceId}>
          {
            entry.link
              ? <a href={entry.link} target="_blank" rel="noopener noreferrer">{referenceId}</a> : referenceId
          }
        </Table.RowItem>
        <Table.RowItem {...tableConfig.description}>
          <div className={styles.descriptionContainer}>
            <div className={styles.description}>{description}</div>
            { badge.text && <Label color={badge.color && badge.color} type="boxed" size="small">{badge.text}</Label>}
          </div>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>{displayTotalAmount}</Table.RowItem>
        <Table.RowItem {...tableConfig.discount}>
          {allowCustomAmount
            && (
              <AmountInput
                name="discountAmount"
                value={discountAmount}
                textAlign="right"
                onChange={handleAmountChange(index, onUpdateSelectedTransactionDetails)}
              />
            )}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amountDue}>{balanceOwed}</Table.RowItem>
        <Table.RowItem {...tableConfig.matchAmount}>
          <AmountInput
            name="matchAmount"
            value={matchAmount}
            textAlign="right"
            disabled={!allowCustomAmount}
            maxLength={13}
            infoBody={overAmount && <InfoMessage type={type} overAmount={overAmount} />}
            onChange={handleAmountChange(index, onUpdateSelectedTransactionDetails)}
          />
        </Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(MatchTransactionTableBody);
