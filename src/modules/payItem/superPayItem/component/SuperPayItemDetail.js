import {
  FieldGroup, Icons, Input, Select, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPayItemDetail } from '../superPayItemSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';

const handleInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const handleAccountComboboxChange = (handler, key) => (item) => {
  handler({ key, value: item.id });
};

const SuperPayItemDetail = (props) => {
  const {
    name,
    contributionType,
    payableAccountId,
    expenseAccountId,
    atoReportingCategory,
    contributionTypes = [],
    expenseAccounts = [],
    payableAccounts = [],
    atoReportingCategories = [],
    showExpenseAccounts,
    isCreating,
    onSuperPayItemDetailsChange,
  } = props;

  return (
    <FieldGroup label="Details">
      <Input
        name="name"
        label="Name"
        value={name}
        onChange={handleInputChange(onSuperPayItemDetailsChange)}
        maxLength={31}
      />
      <Select
        name="contributionType"
        label="Contribution type"
        value={contributionType}
        onChange={handleInputChange(onSuperPayItemDetailsChange)}
        disabled={!isCreating}
        labelAccessory={(
          <Tooltip triggerContent={<Icons.Info />} placement="right">
            The contribution type cannot be changed once the superannuation pay item has been saved
          </Tooltip>
        )}
      >
        {contributionTypes.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>
      { showExpenseAccounts && (
        <AccountCombobox
          label="Linked expense account"
          hideLabel={false}
          items={expenseAccounts}
          selectedId={expenseAccountId}
          onChange={handleAccountComboboxChange(onSuperPayItemDetailsChange, 'expenseAccountId')}
        />
      )}
      <AccountCombobox
        label="Linked payable account"
        hideLabel={false}
        items={payableAccounts}
        selectedId={payableAccountId}
        onChange={handleAccountComboboxChange(onSuperPayItemDetailsChange, 'payableAccountId')}
      />
      <Select
        name="atoReportingCategory"
        label="ATO reporting category"
        value={atoReportingCategory}
        onChange={handleInputChange(onSuperPayItemDetailsChange)}
        labelAccessory={(
          <Tooltip triggerContent={<Icons.Info />} placement="right">
            Select the ATO reporting category if you&#39;re using Single Touch Payroll.
          </Tooltip>
        )}
      >
        {atoReportingCategories.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>
    </FieldGroup>
  );
};

const mapStateToProps = state => getSuperPayItemDetail(state);

export default connect(mapStateToProps)(SuperPayItemDetail);
