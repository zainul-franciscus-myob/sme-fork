import { Icons, Popover } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTabItems } from '../selectors';
import TabsWithIcon from './TabsWithIcon';
import styles from './BankTransactionTabs.module.css';

const TypeInfoPopOver = () => {
  const body = (
    <Popover.Body
      child={
        <div className={styles.typeInfoPopover}>
          <p>
            <strong>Match transaction</strong>
            {' - Find and select existing matching transactions.'}
          </p>
          <p>
            <strong>Allocate</strong>
            {
              ' - Create a new Spend money transaction for withdrawals or Receive money transaction for deposits.'
            }
          </p>
          <p>
            <strong>Transfer Money</strong>
            {' - Transfer from or to another bank account.'}
          </p>
        </div>
      }
    />
  );

  return (
    <div>
      <Popover body={body} closeOnOuterAction className={styles.popover}>
        <Icons.Info className={styles.icon} />
      </Popover>
    </div>
  );
};

const BankTransactionTabs = ({ tabItems, selected, onSelected }) => {
  return (
    <TabsWithIcon
      icon={<TypeInfoPopOver />}
      items={tabItems}
      selected={selected}
      onSelected={onSelected}
    />
  );
};

const mapStateToProps = (state) => ({
  tabItems: getTabItems(state),
});

export default connect(mapStateToProps)(BankTransactionTabs);
