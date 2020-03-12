import {
  Card, Checkbox, CheckboxGroup, DatePicker, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getCustomerOptions, getFilterOptions, getTemplateAdditionalOptions } from '../selectors/customerStatementListSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import FilterBar from '../../../components/Feelix/FilterBar/FilterBar';
import StatementType from '../StatementType';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleDateChange from '../../../components/handlers/handleDateChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './CustomerStatementFilterOptions.module.css';

const handleComboboxChange = (key, handler) => (item = {}) => {
  handler({
    key,
    value: item.value,
  });
};

const CustomerStatementFilterOptions = ({
  templateAdditionalOptions: {
    statementType,
    statementDate,
    fromDate,
    toDate,
    includeInvoices,
  },
  filterOptions: {
    selectedCustomerId,
    showZeroAmount,
  },
  customerOptions,
  onApplyFilters,
  onUpdateFilters,
  onUpdateTemplateAdditionalOptions,
}) => {
  const statementTypeSelect = (
    <Select
      name="statementType"
      label="Statement type"
      value={statementType}
      onChange={handleSelectChange(onUpdateTemplateAdditionalOptions)}
      className={styles.statementType}
    >
      <Select.Option value={StatementType.INVOICE} label="Invoice" />
      <Select.Option value={StatementType.ACTIVITY} label="Activity" />
    </Select>
  );

  const customerCombobox = (
    <div className={styles.customerCombobox}>
      <CustomerCombobox
        name="selectedCustomerId"
        items={customerOptions}
        label="Customer"
        selectedId={selectedCustomerId}
        onChange={handleComboboxChange('selectedCustomerId', onUpdateFilters)}
        hideLabel={false}
        hintText="All"
        allowClear
      />
    </div>
  );

  const balanceCheckbox = (
    <CheckboxGroup
      label="Balance"
      renderCheckbox={props => (
        <div>
          <Checkbox
            name="showZeroAmount"
            label="Show $0.00"
            checked={showZeroAmount}
            onChange={handleCheckboxChange(onUpdateFilters)}
            {...props}
          />
        </div>
      )}
    />
  );

  const invoiceFilterOptions = (
    <>
      <FilterBar onApply={onApplyFilters}>
        {statementTypeSelect}
        <DatePicker
          name="statementDate"
          label="Statement date"
          value={statementDate}
          onSelect={handleDateChange('statementDate', onUpdateTemplateAdditionalOptions)}
        />
        <CheckboxGroup
          label="Include invoices"
          hideLabel
          renderCheckbox={props => (
            <div>
              <Checkbox
                name="includeInvoices"
                label="Only include invoices up to statement date"
                checked={includeInvoices}
                onChange={handleCheckboxChange(onUpdateTemplateAdditionalOptions)}
                {...props}
              />
            </div>
          )}
        />
        {customerCombobox}
        {balanceCheckbox}
      </FilterBar>
    </>
  );

  const activityFilterOptions = (
    <>
      <FilterBar onApply={onApplyFilters}>
        {statementTypeSelect}
        <DatePicker
          name="fromDate"
          label="From date"
          value={fromDate}
          onSelect={handleDateChange('fromDate', onUpdateTemplateAdditionalOptions)}
        />
        <DatePicker
          name="toDate"
          label="To date"
          value={toDate}
          onSelect={handleDateChange('toDate', onUpdateTemplateAdditionalOptions)}
        />
        {customerCombobox}
        {balanceCheckbox}
      </FilterBar>
    </>
  );

  return (
    <Card>
      {statementType === StatementType.INVOICE ? invoiceFilterOptions : activityFilterOptions}
    </Card>
  );
};

const mapStatetoProps = state => ({
  templateAdditionalOptions: getTemplateAdditionalOptions(state),
  filterOptions: getFilterOptions(state),
  customerOptions: getCustomerOptions(state),
});

export default connect(mapStatetoProps)(CustomerStatementFilterOptions);
