import { PropTypes } from 'prop-types';
import { RadioButton, Table, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTableEntries } from '../bankingSelectors/matchTransactionSelectors';

const onRadioButtonChange = handler => (e) => {
  const { value } = e.target;

  handler(value);
};

const MatchTransactionTableBody = (props) => {
  const {
    tableConfig,
    entries,
    onUpdateMatchTransactionSelection,
  } = props;

  const rows = entries.map((entry) => {
    const {
      journalLineId,
      date,
      referenceId,
      description,
      amount,
      disabled,
      selected,
    } = entry;

    const radioButton = (
      <RadioButton
        name="selectedJournalLineId"
        label="Match"
        hideLabel
        value={journalLineId}
        checked={selected}
        disabled={disabled}
        onChange={onRadioButtonChange(onUpdateMatchTransactionSelection)}
      />
    );

    const radioButtonContainer = disabled ? (
      <Tooltip triggerContent={radioButton}>
        You can only select a transaction with the same amount as the bank transaction
      </Tooltip>
    ) : radioButton;

    return (
      <Table.Row key={journalLineId}>
        <Table.RowItem {...tableConfig.radioButton}>
          {radioButtonContainer}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.date}>{date}</Table.RowItem>
        <Table.RowItem {...tableConfig.referenceId}>
          <a href={entry.link} target="_blank" rel="noopener noreferrer">{referenceId}</a>
        </Table.RowItem>
        <Table.RowItem {...tableConfig.description}>{description}</Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>{amount}</Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

MatchTransactionTableBody.propTypes = {
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUpdateMatchTransactionSelection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(MatchTransactionTableBody);
