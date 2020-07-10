import { Combobox, FieldGroup, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInformation } from '../../selectors/DeductionPayItemModalSelectors';
import DollarInput from '../DollarInput';
import PercentInput from '../PercentInput';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const percentOfOptionsMetadata = [
  { columnName: 'displayName', showData: true },
];

const DeductionPayItemInformation = ({
  calculationBasis,
  calculationPercentage,
  selectedCalculationPercentOf,
  calculationDollars,
  calculationPer,
  calculationBasisOptions,
  calculationPercentOfOptions,
  calculationDollarPerOptions,
  limit,
  limitPercentage,
  selectedLimitPercentOf,
  limitDollars,
  limitPer,
  limitOptions,
  limitPercentOfOptions,
  limitDollarPerOptions,
  isCalculationPercentage,
  isCalculationDollar,
  isLimitDollar,
  isLimitPercentage,
  onChange,
}) => {
  const calculationPercentageView = isCalculationPercentage && (
    <>
      <PercentInput
        name="calculationPercentage"
        label="Percentage %"
        value={calculationPercentage}
        onChange={onChange}
      />
      <Combobox
        label="Percent of"
        items={calculationPercentOfOptions}
        metaData={percentOfOptionsMetadata}
        selected={selectedCalculationPercentOf}
        onChange={handleComboboxChange('calculationPercentOfId', onChange)}
      />
    </>
  );

  const calculationDollarView = isCalculationDollar && (
    <>
      <DollarInput
        name="calculationDollars"
        label="Dollars $"
        value={calculationDollars}
        onChange={onChange}
      />
      <Select
        name="calculationPer"
        label="Per"
        value={calculationPer}
        onChange={handleSelectChange(onChange)}
      >
        {calculationDollarPerOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
    </>
  );

  const limitPercentageView = isLimitPercentage && (
    <>
      <PercentInput
        name="limitPercentage"
        label="Percentage %"
        value={limitPercentage}
        onChange={onChange}
      />
      <Combobox
        label="Percent of"
        items={limitPercentOfOptions}
        metaData={percentOfOptionsMetadata}
        selected={selectedLimitPercentOf}
        onChange={handleComboboxChange('limitPercentOfId', onChange)}
      />
    </>
  );

  const limitDollarView = isLimitDollar && (
    <>
      <DollarInput
        name="limitDollars"
        label="Dollars $"
        value={limitDollars}
        onChange={onChange}
      />
      <Select
        name="limitPer"
        label="Per"
        value={limitPer}
        onChange={handleSelectChange(onChange)}
      >
        {limitDollarPerOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
    </>
  );

  return (
    <FieldGroup label="Deduction information">
      <Select
        name="calculationBasis"
        label="Calculation basis"
        onChange={handleSelectChange(onChange)}
        value={calculationBasis}
      >
        {calculationBasisOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      {calculationPercentageView}
      {calculationDollarView}
      <Select
        name="limit"
        label="Limit"
        onChange={handleSelectChange(onChange)}
        value={limit}
      >
        {limitOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      {limitPercentageView}
      {limitDollarView}
    </FieldGroup>
  );
};

const mapStateToProps = (state) => getInformation(state);

export default connect(mapStateToProps)(DeductionPayItemInformation);
