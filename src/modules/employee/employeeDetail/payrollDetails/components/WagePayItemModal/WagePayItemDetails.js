import {
  FieldGroup, Icons, Input, RadioButtonGroup, Select, Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAtoReportCategoryList,
  getIsHourlyView,
  getWage,
} from '../../selectors/WagePayItemModalSelectors';
import HourlySection from './WagePayItemHourlySection';
import OverrideAccount from './WagePayItemOverrideAccount';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleRadioButtonChange from '../../../../../../components/handlers/handleRadioButtonChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const WagePayItemDetails = ({
  wage,
  isHourlyView,
  atoReportCategoryList,
  onDetailsChange,
  onAmountInputBlur,
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

const mapStateToProps = state => ({
  wage: getWage(state),
  atoReportCategoryList: getAtoReportCategoryList(state),
  isHourlyView: getIsHourlyView(state),
});

export default connect(mapStateToProps)(WagePayItemDetails);
