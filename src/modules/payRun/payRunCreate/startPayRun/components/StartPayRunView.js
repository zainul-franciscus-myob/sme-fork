import {
  Card,
  FieldGroup,
  FormHorizontal,
  PageHead,
  Select,
  Stepper,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsBeforeStartOfFinancialYear,
  getIsTableLoading,
  getIsTimesheetUsed,
  getRegularPayCycleOptions,
  getShowStpValidationErrorModal,
  getStartPayRun,
  getTimesheets,
  isThereExistingPayRun,
} from '../StartPayRunSelectors';
import {
  getStepNumber,
  getStepperSteps,
} from '../../PayRunSelectors';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import ExistingPayRunModal from './ExistingPayRunModal';
import StartPayRunActions from './StartPayRunActions';
import StpValidationErrorModal from './StpValidationErrorModal';
import TimesheetsTable from './TimesheetsTable';
import handleDatePickerChange from '../../../../../components/handlers/handleDatePickerChange';
import handleSelectChange from '../../../../../components/handlers/handleSelectChange';
import styles from './StartPayRunView.module.css';

const StartPayRunView = ({
  startPayRun: {
    currentEditingPayRun: {
      paymentFrequency,
      paymentDate,
      payPeriodStart,
      payPeriodEnd,
    },
    showStpValidationErrorModal,
  },
  stepNumber,
  existingPayRun,
  payRunSteps,
  regularPayCycleOptions,
  onPayPeriodChange,
  onNextButtonClick,
  onExistingPayRunModalGoBackClick,
  onExistingPayRunModalCreateClick,
  onExistingPayRunModalEditClick,
  timesheets,
  selectItem,
  selectAll,
  isTableLoading,
  isTimesheetUsed,
  onStpValidationErrorModalCancel,
  onStpValidationErrorModalContinue,
  onStpValidationErrorModalUpdateDetails,
  isBeforeStartOfFinancialYear,
}) => (
  <div className={styles.startPayRun}>
    <PageHead title="Create pay run" testid="startPayRunViewPageHead" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
    </div>
    <Card>
      <FormHorizontal>
        <FieldGroup label="Select pay run details" testid="payCycleDropDown">
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
          <DatePicker
            label="Date of payment"
            name="paymentDate"
            value={paymentDate}
            onSelect={handleDatePickerChange(onPayPeriodChange, 'paymentDate')}
            displayWarning={isBeforeStartOfFinancialYear}
            warningMessage={'The date is set to a previous financial year'}
          />
        </FieldGroup>
        {isTimesheetUsed && (
        <TimesheetsTable
          isTableLoading={isTableLoading}
          testid="timesheetsTable"
          timesheets={timesheets}
          selectAll={selectAll}
          selectItem={selectItem}
        />
        )}
      </FormHorizontal>
    </Card>
    { existingPayRun && (
      <ExistingPayRunModal
        onGoBackButtonClick={onExistingPayRunModalGoBackClick}
        onEditExistingPayRunClick={onExistingPayRunModalEditClick}
        onCreatePayRunClick={onExistingPayRunModalCreateClick}
      />
    )}
    { showStpValidationErrorModal && (
    <StpValidationErrorModal
      onCancel={onStpValidationErrorModalCancel}
      onContinue={onStpValidationErrorModalContinue}
      onUpdateDetails={onStpValidationErrorModalUpdateDetails}
    />)}
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
  existingPayRun: isThereExistingPayRun(state),
  timesheets: getTimesheets(state),
  isTableLoading: getIsTableLoading(state),
  isTimesheetUsed: getIsTimesheetUsed(state),
  showStpValidationErrorModal: getShowStpValidationErrorModal(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(StartPayRunView);
