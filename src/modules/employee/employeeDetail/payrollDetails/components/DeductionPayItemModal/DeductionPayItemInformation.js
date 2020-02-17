import { Combobox, FieldGroup, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInformation } from '../../selectors/DeductionPayItemModalSelectors';
import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const percentOfOptionsMetadata = [{ columnName: 'displayName', showData: true }];

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
  onBlur,
}) => {
  const calculationPercentageView = isCalculationPercentage && (
    <>
      <AmountInput
        name="calculationPercentage"
        label="Percentage %"
        numeralDecimalScaleMax={5}
        numeralIntegerScale={3}
        value={calculationPercentage}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputChange(onBlur)}
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
      <AmountInput
        name="calculationDollars"
        label="Dollars $"
        numeralIntegerScale={13}
        value={calculationDollars}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputChange(onBlur)}
      />
      <Select
        name="calculationPer"
        label="Per"
        value={calculationPer}
        onChange={handleSelectChange(onChange)}
      >
        {
          calculationDollarPerOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value} label={name} />
          ))
        }
      </Select>
    </>
  );

  const limitPercentageView = isLimitPercentage && (
    <>
      <AmountInput
        name="limitPercentage"
        label="Percentage %"
        numeralDecimalScaleMax={5}
        numeralIntegerScale={3}
        value={limitPercentage}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputChange(onBlur)}
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
      <AmountInput
        name="limitDollars"
        label="Dollars $"
        numeralIntegerScale={13}
        value={limitDollars}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputChange(onBlur)}
      />
      <Select
        name="limitPer"
        label="Per"
        value={limitPer}
        onChange={handleSelectChange(onChange)}
      >
        {
          limitDollarPerOptions.map(({ name, value }) => (
            <Select.Option key={value} value={value} label={name} />
          ))
        }
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
        {
        calculationBasisOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))
      }
      </Select>
      { calculationPercentageView }
      { calculationDollarView }
      <Select
        name="limit"
        label="Limit"
        onChange={handleSelectChange(onChange)}
        value={limit}
      >
        {
        limitOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))
      }
      </Select>
      { limitPercentageView }
      { limitDollarView }
    </FieldGroup>
  );
};

const mapStateToProps = state => getInformation(state);

export default connect(mapStateToProps)(DeductionPayItemInformation);
