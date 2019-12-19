import { connect } from 'react-redux';
import React from 'react';

import { getTabItems } from '../bankingSelectors';
import Tabs from '../../components/Tabs/Tabs';

const BankTransactionTabs = ({
  tabItems,
  selected,
  onSelected,
}) => (
  <Tabs
    items={tabItems}
    selected={selected}
    onSelected={onSelected}
  />
);

const mapStateToProps = state => ({
  tabItems: getTabItems(state),
});

export default connect(mapStateToProps)(BankTransactionTabs);
