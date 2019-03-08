import {
  Dropdown, Icons, PageHead,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import React from 'react';

import style from './TransactionListPageHead.css';

const TransactionListPageHead = (props) => {
  const { onAddTransaction } = props;

  const items = [
    <Dropdown.Item key="spendMoney" label="Spend money" value="spendMoney" />,
    <Dropdown.Item key="receiveMoney" label="Receive money" value="receiveMoney" />,
    <Dropdown.Item key="transferMoney" label="Transfer money" value="transferMoney" />,
    <Dropdown.Item key="generalJournal" label="General journal" value="generalJournal" />,
  ];

  const toggle = (
    <Dropdown.Toggle>
      <span className={style.toggle}>
        Add transaction
      </span>
      <Icons.Caret />
    </Dropdown.Toggle>
  );

  return (
    <PageHead title="Transaction list">
      <Dropdown
        items={items}
        onSelect={onAddTransaction}
        toggle={toggle}
      />
    </PageHead>
  );
};

TransactionListPageHead.propTypes = {
  onAddTransaction: PropTypes.func.isRequired,
};

export default TransactionListPageHead;
