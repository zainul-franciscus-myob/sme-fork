import { Checkbox, Label, Table } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import styles from './MatchTransactionTable.module.css';

const handleAmountChange = (index, handler) => (e) => {
  const { rawValue, name } = e.target;
  handler({ index, key: name, value: rawValue });
};

const handleSelectionChange = (index, handler) => (e) => {
  const { checked } = e.target;
  handler({ index, selected: checked });
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

const MatchTransactionTableRow = React.memo((props) => {
  const {
    index,
    tableConfig,
    onSelect,
    onUpdate,
    link,
    type,
    journalId,
    journalLineId,
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
    badgeText,
    badgeColor,
  } = props;

  const rowClass = selected ? styles.selected : '';

  return (
    <Table.Row key={`${journalId}${journalLineId}`} className={rowClass}>
      <Table.RowItem {...tableConfig.checkbox}>
        <Checkbox
          name={journalId}
          label="Match"
          hideLabel
          checked={selected}
          onChange={handleSelectionChange(index, onSelect)}
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.date}>{date}</Table.RowItem>
      <Table.RowItem {...tableConfig.referenceId}>
        {
          link
            ? <a href={link} target="_blank" rel="noopener noreferrer">{referenceId}</a> : referenceId
        }
      </Table.RowItem>
      <Table.RowItem {...tableConfig.description}>
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>{description}</div>
          { badgeText && <Label color={badgeColor && badgeColor} type="boxed" size="small">{badgeText}</Label>}
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
            onChange={handleAmountChange(index, onUpdate)}
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
          onChange={handleAmountChange(index, onUpdate)}
        />
      </Table.RowItem>
    </Table.Row>
  );
});

export default MatchTransactionTableRow;
