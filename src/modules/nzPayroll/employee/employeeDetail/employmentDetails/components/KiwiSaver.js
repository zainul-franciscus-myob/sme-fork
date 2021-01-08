import { FieldGroup, InfoIcon, Select, Tooltip } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import handleInputChange from '../../../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';
import style from './KiwiSaver.module.css';

const KiwiSaver = ({
  kiwiSaverDetails = {},
  kiwiSaverOptions,
  onKiwiSaverDetailsChange,
  handleOnBlurWithKey,
}) => (
  <FieldGroup label="KiwiSaver" className={style.kiwiSaverFormGroup}>
    <Select
      name="kiwiSaverStatus"
      label="KiwiSaver status"
      width="sm"
      onChange={handleSelectChange(onKiwiSaverDetailsChange)}
      value={kiwiSaverDetails.kiwiSaverStatus}
    >
      {kiwiSaverOptions.kiwiSaverStatusOptions.map(({ label, value }) => (
        <Select.Option key={value} value={value} label={label} />
      ))}
    </Select>

    <Select
      name="employeeContributionRate"
      label="Employee contribution rate (%)"
      width="sm"
      onChange={handleSelectChange(onKiwiSaverDetailsChange)}
      value={kiwiSaverDetails.employeeContributionRate}
    >
      {kiwiSaverOptions.employeeContributionRateOptions.map(
        ({ label, value }) => (
          <Select.Option key={label} value={value} label={label} />
        )
      )}
    </Select>

    <AmountInput
      name="employerContributionRate"
      label="Employer contribution rate (%)"
      width="sm"
      onChange={handleInputChange(onKiwiSaverDetailsChange)}
      onBlur={handleOnBlurWithKey(
        'employerContributionRateOnBlur',
        onKiwiSaverDetailsChange
      )}
      numeralDecimalScaleMax={2}
      numeralIntegerScale={3}
      numeralPositiveOnly
      textAlign="left"
      value={kiwiSaverDetails.employerContributionRate}
    />

    <Select
      name="employerSuperannuationContributionTax"
      label="Employer superannuation contribution tax rate"
      width="xl"
      requiredLabel="Employer superannuation contribution tax rate is required"
      onChange={handleSelectChange(onKiwiSaverDetailsChange)}
      value={kiwiSaverDetails.employerSuperannuationContributionTax}
      labelAccessory={
        <Tooltip triggerContent={<InfoIcon />}>
          Employer superannuation contribution tax rate
        </Tooltip>
      }
    >
      {kiwiSaverOptions.esctRateOptions.map(({ label, value }) => (
        <Select.Option key={value} value={value} label={label} />
      ))}
    </Select>
  </FieldGroup>
);

export default React.memo(KiwiSaver);
