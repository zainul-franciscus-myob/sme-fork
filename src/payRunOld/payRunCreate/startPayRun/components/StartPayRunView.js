import {
  DatePicker,
  FieldGroup,
  FormHorizontal,
  PageHead,
  Select,
  Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getRegularPayCycleOptions,
  getStartPayRun,
} from '../StartPayRunSelectors';
import {
  getStepNumber,
  getStepperSteps,
} from '../../PayRunSelectors';
import FormCard from '../../../../components/FormCard/FormCard';
import StartPayRunActions from './StartPayRunActions';
import handleDatePickerChange from '../../../../components/handlers/handleDatePickerChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './StartPayRunView.module.css';

const StartPayRunView = ({
  startPayRun: {
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
  },
  stepNumber,
  payRunSteps,
  regularPayCycleOptions,
  onPayPeriodChange,
  onNextButtonClick,
}) => (
  <div className={styles.startPayRun}>
    <PageHead title="Create pay run" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
    </div>
    <FormHorizontal>
      <FormCard>
        <FieldGroup label="Select pay run details">
          <Select
            name="paymentFrequency"
            label="Pay cycle"
            value={paymentFrequency}
            onChange={handleSelectChange(onPayPeriodChange)}
          >
            <Select.OptionGroup label="Regular pay cycles">
              {regularPayCycleOptions.map(({ name, value }) => (
                <Select.Option key={value} value={value} label={name} />
              ))}
            </Select.OptionGroup>
          </Select>
          <DatePicker label="Pay period start" name="payPeriodStart" value={payPeriodStart} onSelect={handleDatePickerChange(onPayPeriodChange, 'payPeriodStart')} />
          <DatePicker label="Pay period end" name="payPeriodEnd" value={payPeriodEnd} onSelect={handleDatePickerChange(onPayPeriodChange, 'payPeriodEnd')} />
          <DatePicker label="Date of payment" name="paymentDate" value={paymentDate} onSelect={handleDatePickerChange(onPayPeriodChange, 'paymentDate')} />
        </FieldGroup>
      </FormCard>
    </FormHorizontal>
    <StartPayRunActions
      onNextButtonClick={onNextButtonClick}
    />
  </div>
);

const mapStateToProps = state => ({
  startPayRun: getStartPayRun(state),
  regularPayCycleOptions: getRegularPayCycleOptions(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(StartPayRunView);
