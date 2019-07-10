import {
  FieldGroup, Icons, Input, RadioButtonGroup, Select, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccounts,
  getAtoReportCategoryList,
  getDefaultAccountId,
  getIsHourlyView,
  getOverrideAccount,
  getPayRateList,
  getWage,
} from '../wagePayItemSelector';
import HourlySection from './HourlySection';
import OverrideAccount from './OverrideAccount';
import handleInputChange from '../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';

const DetailsView = ({
  wage,
  isHourlyView,
  atoReportCategoryList,
  onDetailsChange,
  onOverrideAccountChange,
}) => (
  <FieldGroup label="Details">
    <Input
      label="Name"
      name="name"
      value={wage.name}
      onChange={handleInputChange(onDetailsChange)}
      maxLength={31}
    />
    <Select
      name="atoReportingCategory"
      label="ATO reporting category"
      value={wage.atoReportingCategory}
      onChange={handleSelectChange(onDetailsChange)}
      labelAccessory={(
        <Tooltip triggerContent={<Icons.Info />}>
          Select the ATO reporting category if you&apos;re using Single Touch Payroll.
        </Tooltip>
      )}
    >
      {
        atoReportCategoryList.map(category => (
          <Select.Option key={category.value} value={category.value} label={category.name} />
        ))
      }
    </Select>
    <RadioButtonGroup
      label="Pay basis"
      name="payBasis"
      options={['Salary', 'Hourly']}
      onChange={handleRadioButtonChange('payBasis', onDetailsChange)}
      disabled={wage.isSystem}
      value={wage.payBasis}
    />
    { isHourlyView ? (
      <HourlySection
        onDetailsChange={onDetailsChange}
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

const mapStateToProps = state => ({
  wage: getWage(state),
  accounts: getAccounts(state),
  payRateList: getPayRateList(state),
  atoReportCategoryList: getAtoReportCategoryList(state),
  defaultAccountId: getDefaultAccountId(state),
  overrideAccount: getOverrideAccount(state),
  isHourlyView: getIsHourlyView(state),
});

export default connect(mapStateToProps)(DetailsView);
