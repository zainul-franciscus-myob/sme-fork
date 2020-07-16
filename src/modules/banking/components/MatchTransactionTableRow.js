import { Checkbox, Label, Table, Tooltip } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import styles from './MatchTransactionTable.module.css';

const handleAmountChange = (index, handler) => (e) => {
  const { rawValue, name } = e.target;
  handler({ index, key: name, value: rawValue });
};

const handleSelectionChange = (index, handler) => (e) => {
  const { checked } = e.target;
  handler({ index, selected: checked });
};

const InfoMessage = ({ overAmount, type }) => {
  const isCredit = type === 'Sale';
  const creditOrDebit = isCredit ? 'credit' : 'debit';
  const page = isCredit ? 'Customer returns' : 'Supplier returns';
  const invoiceOrBill = isCredit ? 'invoice' : 'bill';
  return (
    <>
      <div>
        This payment will create a&nbsp;
        <b>{overAmount}</b>
        &nbsp;
        {creditOrDebit}.
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

  const entryLink = link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {referenceId}
    </a>
  ) : (
    <Tooltip placement="bottom" triggerContent={referenceId}>
      This transaction type can only be viewed and edited from your desktop
      AccountRight software
    </Tooltip>
  );

  const SlimTableRowItem = ({ className, ...rest }) => (
    <Table.RowItem {...rest} className={classNames(styles.row, className)} />
  );

  return (
    <Table.Row key={`${journalId}${journalLineId}`} className={rowClass}>
      <SlimTableRowItem {...tableConfig.checkbox}>
        <Checkbox
          name={journalId}
          label="Match"
          hideLabel
          checked={selected}
          onChange={handleSelectionChange(index, onSelect)}
        />
      </SlimTableRowItem>
      <SlimTableRowItem {...tableConfig.date}>{date}</SlimTableRowItem>
      <SlimTableRowItem {...tableConfig.referenceId}>
        {entryLink}
      </SlimTableRowItem>
      <SlimTableRowItem
        {...tableConfig.description}
        className={styles.descriptionContainer}
      >
        <div className={styles.description}>{description}</div>
        {badgeText && (
          <Label color={badgeColor && badgeColor} type="boxed" size="small">
            {badgeText}
          </Label>
        )}
      </SlimTableRowItem>
      <SlimTableRowItem {...tableConfig.amount}>
        {displayTotalAmount}
      </SlimTableRowItem>
      <SlimTableRowItem {...tableConfig.discount}>
        {allowCustomAmount && (
          <AmountInput
            hideLabel
            name="discountAmount"
            value={discountAmount}
            textAlign="right"
            onChange={handleAmountChange(index, onUpdate)}
            onBlur={handleAmountChange(index, onUpdate)}
            numeralDecimalScaleMin={2}
            numeralDecimalScaleMax={2}
          />
        )}
      </SlimTableRowItem>
      <SlimTableRowItem {...tableConfig.amountDue}>
        {balanceOwed}
      </SlimTableRowItem>
      <SlimTableRowItem {...tableConfig.matchAmount}>
        <AmountInput
          hideLabel
          name="matchAmount"
          value={matchAmount}
          textAlign="right"
          disabled={!allowCustomAmount}
          maxLength={13}
          infoBody={
            overAmount && <InfoMessage type={type} overAmount={overAmount} />
          }
          onChange={handleAmountChange(index, onUpdate)}
          onBlur={handleAmountChange(index, onUpdate)}
          numeralDecimalScaleMin={2}
          numeralDecimalScaleMax={2}
        />
      </SlimTableRowItem>
    </Table.Row>
  );
});

export default MatchTransactionTableRow;
