import { PropTypes } from 'prop-types';
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

BankTransactionTabs.propTypes = {
  tabItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tabItems: getTabItems(state),
});

export default connect(mapStateToProps)(BankTransactionTabs);
