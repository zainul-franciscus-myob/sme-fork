import {
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  Icons,
  Input,
  RadioButtonGroup,
  Select,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccounts,
  getAtoReportCategoryList,
  getDefaultAccountId,
  getIsCreating,
  getIsHourlyView,
  getIsJobKeeper,
  getOverrideAccount,
  getPayRateList,
  getWage,
} from '../wagePayItemSelector';
import HourlySection from './HourlySection';
import OverrideAccount from './OverrideAccount';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';

const DetailsView = ({
  wage,
  isHourlyView,
  atoReportCategoryList,
  onDetailsChange,
  onAmountInputBlur,
  onOverrideAccountChange,
  featureToggles,
  isJobKeeper,
  onJobKeeperChange,
  isCreating,
}) => (
  <FieldGroup label="Details">
    {featureToggles && featureToggles.isJobKeeperTabEnabled && (
      <CheckboxGroup
        label="JobKeeper top-up payment"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            testid="jobKeeperCheckbox"
            id="jobKeeper"
            name="jobKeeper"
            label="JobKeeper top-up payment"
            onChange={handleCheckboxChange(onJobKeeperChange)}
            disabled={!isCreating}
            checked={isJobKeeper}
          />
        )}
      />
    )}
    <Input
      label="Name"
      name="name"
      value={wage.name}
      onChange={handleInputChange(onDetailsChange)}
      maxLength={31}
      disabled={isJobKeeper}
    />
    <Select
      name="atoReportingCategory"
      label="ATO reporting category"
      value={wage.atoReportingCategory}
      disabled={isJobKeeper}
      onChange={handleSelectChange(onDetailsChange)}
      labelAccessory={
        <Tooltip triggerContent={<Icons.Info />}>
          Select the ATO reporting category if you&apos;re using Single Touch
          Payroll.
        </Tooltip>
      }
    >
      {atoReportCategoryList.map((category) => (
        <Select.Option
          key={category.value}
          value={category.value}
          label={category.name}
        />
      ))}
    </Select>
    <RadioButtonGroup
      label="Pay basis"
      name="payBasis"
      options={['Salary', 'Hourly']}
      onChange={handleRadioButtonChange('payBasis', onDetailsChange)}
      disabled={wage.isSystem || isJobKeeper}
      value={wage.payBasis}
    />
    {isHourlyView ? (
      <HourlySection
        onDetailsChange={onDetailsChange}
        onAmountInputBlur={onAmountInputBlur}
        onOverrideAccountChange={onOverrideAccountChange}
      />
    ) : (
      <OverrideAccount
        onDetailsChange={onDetailsChange}
        onOverrideAccountChange={onOverrideAccountChange}
      />
    )}
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  wage: getWage(state),
  accounts: getAccounts(state),
  payRateList: getPayRateList(state),
  atoReportCategoryList: getAtoReportCategoryList(state),
  defaultAccountId: getDefaultAccountId(state),
  overrideAccount: getOverrideAccount(state),
  isHourlyView: getIsHourlyView(state),
  isJobKeeper: getIsJobKeeper(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(DetailsView);
