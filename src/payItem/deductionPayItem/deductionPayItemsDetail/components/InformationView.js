import { Combobox, FieldGroup, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInformationViewData } from '../DeductionPayItemSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './DeductionPayItemView.module.css';

const percentOfOptionsMetadata = [{ columnName: 'displayName', showData: true }];

const InformationView = ({
  calculationBasis,
  calculationPercentage,
  selectedCalculationPercentOfOption,
  calculationDollars,
  calculationPer,
  calculationBasisOptions,
  calculationPercentOfOptions,
  calculationDollarPerOptions,
  limit,
  limitPercentage,
  selectedLimitPercentOfOption,
  limitDollars,
  limitPer,
  limitOptions,
  limitPercentOfOptions,
  limitDollarPerOptions,
  onInformationChange,
  onInformationAmountBlur,
  isCalculationPercentage,
  isCalculationDollar,
  isLimitDollar,
  isLimitPercentage,
}) => (
  <FieldGroup label="Deduction information">
    <Select
      name="calculationBasis"
      label="Calculation basis"
      onChange={handleSelectChange(onInformationChange)}
      value={calculationBasis}
    >
      {
        calculationBasisOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))
      }
    </Select>
    {
      isCalculationPercentage && (
        <React.Fragment>
          <AmountInput
            name="calculationPercentage"
            label="Percentage %"
            decimalScale={5}
            numeralIntegerScale={3}
            value={calculationPercentage}
            onChange={handleAmountInputChange(onInformationChange)}
            onBlur={handleAmountInputChange(onInformationAmountBlur)}
          />
          <Combobox
            label="Percent of"
            items={calculationPercentOfOptions}
            metaData={percentOfOptionsMetadata}
            selected={selectedCalculationPercentOfOption}
            onChange={handleComboboxChange('calculationPercentOfId', onInformationChange)}
          />
        </React.Fragment>
      )
    }
    {
      isCalculationDollar && (
        <React.Fragment>
          <AmountInput
            name="calculationDollars"
            label="Dollars $"
            numeralIntegerScale={13}
            value={calculationDollars}
            onChange={handleAmountInputChange(onInformationChange)}
            onBlur={handleAmountInputChange(onInformationAmountBlur)}
          />
          <Select
            name="calculationPer"
            label="Per"
            value={calculationPer}
            onChange={handleSelectChange(onInformationChange)}
          >
            {
              calculationDollarPerOptions.map(({ name, value }) => (
                <Select.Option key={value} value={value} label={name} />
              ))
            }
          </Select>
        </React.Fragment>
      )
    }

    <div className={styles.limitSectionDivider} />

    <Select
      name="limit"
      label="Limit"
      onChange={handleSelectChange(onInformationChange)}
      value={limit}
    >
      {
        limitOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))
      }
    </Select>
    {
      isLimitPercentage && (
        <React.Fragment>
          <AmountInput
            name="limitPercentage"
            label="Percentage %"
            decimalScale={5}
            numeralIntegerScale={3}
            value={limitPercentage}
            onChange={handleAmountInputChange(onInformationChange)}
            onBlur={handleAmountInputChange(onInformationAmountBlur)}
          />
          <Combobox
            label="Percent of"
            items={limitPercentOfOptions}
            metaData={percentOfOptionsMetadata}
            selected={selectedLimitPercentOfOption}
            onChange={handleComboboxChange('limitPercentOfId', onInformationChange)}
          />
        </React.Fragment>
      )
    }
    {
      isLimitDollar && (
        <React.Fragment>
          <AmountInput
            name="limitDollars"
            label="Dollars $"
            numeralIntegerScale={13}
            value={limitDollars}
            onChange={handleAmountInputChange(onInformationChange)}
            onBlur={handleAmountInputChange(onInformationAmountBlur)}
          />
          <Select
            name="limitPer"
            label="Per"
            value={limitPer}
            onChange={handleSelectChange(onInformationChange)}
          >
            {
              limitDollarPerOptions.map(({ name, value }) => (
                <Select.Option key={value} value={value} label={name} />
              ))
            }
          </Select>
        </React.Fragment>
      )
    }
  </FieldGroup>
);

const mapStateToProps = state => getInformationViewData(state);

export default connect(mapStateToProps)(InformationView);
