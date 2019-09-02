import {
  DatePicker, FieldGroup, FormHorizontal, PageHead, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getRegularPayCycleOptions,
  getStartPayRun,
} from '../StartPayRunSelectors';
import FormCard from '../../../components/FormCard/FormCard';
import PayRunActions from '../../components/PayRunActions';
import handleDatePickerChange from '../../../components/handlers/handleDatePickerChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './StartPayRunView.module.css';

const StartPayRunView = ({
  startPayRun: {
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
  },
  regularPayCycleOptions,
  onPayPeriodChange,
  onNextButtonClick,
}) => (
  <div className={styles.startPayRun}>
    <PageHead title="Create pay run" />
    <FormHorizontal>
      <FormCard>
        <FieldGroup label="Select pay period">
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
    <PayRunActions
      onNextButtonClick={onNextButtonClick}
    />
  </div>
);

const mapStateToProps = state => ({
  startPayRun: getStartPayRun(state),
  regularPayCycleOptions: getRegularPayCycleOptions(state),
});

export default connect(mapStateToProps)(StartPayRunView);
