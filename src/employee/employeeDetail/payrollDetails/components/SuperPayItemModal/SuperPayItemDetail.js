import {
  FieldGroup, Icons, Input, Select, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSuperPayItemDetail } from '../../selectors/SuperPayItemModalSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const SuperPayItemDetail = (props) => {
  const {
    name,
    contributionType,
    payableAccountId,
    expenseAccountId,
    atoReportingCategory,
    contributionTypeOptions = [],
    expenseAccountOptions = [],
    payableAccountOptions = [],
    atoReportingCategoryOptions = [],
    showExpenseAccounts,
    isCreating,
    onChange,
  } = props;

  return (
    <FieldGroup label="Details">
      <Input
        name="name"
        label="Name"
        value={name}
        onChange={handleInputChange(onChange)}
        maxLength={31}
      />
      <Select
        name="contributionType"
        label="Contribution type"
        value={contributionType}
        onChange={handleInputChange(onChange)}
        disabled={!isCreating}
        labelAccessory={(
          <Tooltip triggerContent={<Icons.Info />} placement="right">
            The contribution type cannot be changed once the superannuation pay item has been saved
          </Tooltip>
        )}
      >
        {contributionTypeOptions.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>
      { showExpenseAccounts && (
        <AccountCombobox
          label="Linked expense account"
          hideLabel={false}
          items={expenseAccountOptions}
          selectedId={expenseAccountId}
          onChange={handleComboboxChange('expenseAccountId', onChange)}
        />
      )}
      <AccountCombobox
        label="Linked payable account"
        hideLabel={false}
        items={payableAccountOptions}
        selectedId={payableAccountId}
        onChange={handleComboboxChange('payableAccountId', onChange)}
      />
      <Select
        name="atoReportingCategory"
        label="ATO reporting category"
        value={atoReportingCategory}
        onChange={handleInputChange(onChange)}
        labelAccessory={(
          <Tooltip triggerContent={<Icons.Info />} placement="right">
            Select the ATO reporting category if you&#39;re using Single Touch Payroll.
          </Tooltip>
        )}
      >
        {atoReportingCategoryOptions.map(({ name: label, value }) => (
          <Select.Option key={value} value={value} label={label} />
        ))}
      </Select>
    </FieldGroup>
  );
};

const mapStateToProps = state => getSuperPayItemDetail(state);

export default connect(mapStateToProps)(SuperPayItemDetail);
