import { connect } from 'react-redux';
import React from 'react';

import {
  getBankingRuleOptions,
  getIsBankingRuleLoading,
  getLoadBankingRuleOptionsStatus,
} from '../BankingRuleComboboxSelectors';
import AutoCompleteCombobox from '../../../../components/AutoComplete/AutoCompleteCombobox';
import AutoCompleteComboboxTypes from '../../../../components/AutoComplete/AutoCompleteComboboxTypes';

const metaData = [
  {
    columnName: 'name',
    columnWidth: '20rem',
    showData: true,
    showPagination: true,
  },
];

const BankingRuleComboboxView = ({
  bankingRuleOptions,
  isLoading,
  loadBankingRuleOptionsStatus,
  addNewBankingRuleLabel,
  onLoadMore,
  onSearch,
  onAddNew,
  ...otherProps
}) => {
  const addNewBankingRule = onAddNew
    ? { label: 'Create rule', onAddNew }
    : undefined;

  return (
    <>
      <AutoCompleteCombobox
        type={AutoCompleteComboboxTypes.STAND_ALONE}
        metaData={metaData}
        items={bankingRuleOptions}
        disabled={isLoading}
        allowClear
        loadMoreButtonStatus={loadBankingRuleOptionsStatus}
        onLoadMoreItems={onLoadMore}
        addNewBankingRule={addNewBankingRule}
        onSearch={onSearch}
        {...otherProps}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  bankingRuleOptions: getBankingRuleOptions(state),
  isLoading: getIsBankingRuleLoading(state),
  loadBankingRuleOptionsStatus: getLoadBankingRuleOptionsStatus(state),
});

export default connect(mapStateToProps)(BankingRuleComboboxView);
