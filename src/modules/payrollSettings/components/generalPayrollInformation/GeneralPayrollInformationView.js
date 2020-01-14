import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  Checkbox,
  CheckboxGroup,
  FieldGroup,
  FormHorizontal,
  PageHead,
  ReadOnly,
  Select,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getGeneralPayrollInformation, getLoadingState, getModal } from '../../selectors/payrollSettingsSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import GeneralPayrollInformationModal from './GeneralPayrollInformationModal';
import PageView from '../../../../components/PageView/PageView';
import YearInput from '../../../../components/autoFormatter/YearInput/YearInput';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import style from './GeneralPayrollInformationView.module.css';

const isCurrentYearEditable = (currentYearIsProvided) => {
  if (currentYearIsProvided == null) {
    return true;
  }
  return false;
};

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const GeneralPayrollInformationView = (props) => {
  const {
    currentYear,
    hoursInWorkWeek,
    withholdingPayerNumber,
    roundNetPay,
    taxTableRevisionDate,
    isCurrentYearProvided,
    useTimesheets,
    useTimesheetsAction,
    useTimesheetsWeekStarts,
    loadingState,
    alert,
    tabs,
    listeners: {
      onGeneralPayrollInformationChange,
      onGeneralPayrollInformationSave,
      onConfirmSave,
      onWarningConfirmSave,
      onConfirmCancelButtonClick,
      onDismissModal,
    },
    modal,
  } = props;

  let currentYearField;
  if (isCurrentYearEditable(isCurrentYearProvided)) {
    currentYearField = (
      <YearInput
        label="Payroll year ends 30 June"
        name="currentYear"
        value={currentYear}
        onChange={handleInputChange(onGeneralPayrollInformationChange)}
        testid="currentYearField"
      />
    );
  } else {
    currentYearField = (
      <ReadOnly
        label="Payroll year ends 30 June"
        name="taxTableRevisionDate"
        testid="currentYearField"
      >
        {currentYear}
      </ReadOnly>
    );
  }

  const view = (
    <>
      <Card>
        <div className={style.formWidth}>
          <FormHorizontal>
            <FieldGroup label="Payroll">
              {currentYearField}
              <AmountInput
                label="Full-time employee weekly hours"
                name="hoursInWorkWeek"
                value={hoursInWorkWeek}
                onChange={handleInputChange(onGeneralPayrollInformationChange)}
                numeralIntegerScale={3}
              />
              <AbnInput
                label="Withholding payer number (WPN)"
                name="withholdingPayerNumber"
                value={withholdingPayerNumber}
                onChange={handleInputChange(onGeneralPayrollInformationChange)}
              />
              <AmountInput
                label="Cents to round net pay down to"
                name="roundNetPay"
                value={roundNetPay}
                onChange={handleInputChange(onGeneralPayrollInformationChange)}
                numeralIntegerScale={3}
                decimalScale={0}
                labelAccessory={(
                  <Tooltip>
                    {"We'll round the pay down to the nearest cent value you enter."}
                    {'Any difference will be added to the PAYG (tax contribution).'}
                  </Tooltip>
              )}
              />
              <ReadOnly label="Tax table revision date" name="taxTableRevisionDate">
                {taxTableRevisionDate}
              </ReadOnly>
            </FieldGroup>
            {false && (
            <FieldGroup label="Timesheets">
              <CheckboxGroup
                label="useTimesheets"
                hideLabel
                renderCheckbox={() => (
                  <Checkbox
                    name="useTimesheets"
                    label="Use timesheets to track employee hours"
                    value={useTimesheets}
                    onChange={handleCheckboxChange(onGeneralPayrollInformationChange)}
                    checked={useTimesheets}
                  />
                )}
              />
              <Select
                name="useTimesheetsAction"
                label="Use timesheets for"
                value={useTimesheetsAction}
                onChange={handleSelectChange(onGeneralPayrollInformationChange)}
                disabled={!useTimesheets}
                width="xl"
              >
                <Select.Option value="placeholder" label="" />
                <Select.Option value="Payroll" label="Payroll" />
              </Select>
              <Select
                name="useTimesheetsWeekStarts"
                label="Week starts on"
                value={useTimesheetsWeekStarts}
                onChange={handleSelectChange(onGeneralPayrollInformationChange)}
                disabled={!useTimesheets}
                width="xl"
              >
                {days.map(day => (
                  <Select.Option key={day} value={day} label={day} />
                ))}
              </Select>
            </FieldGroup>
            )}
          </FormHorizontal>
        </div>
      </Card>
      <ButtonRow
        primary={[
          <Button key="SaveButton" onClick={onGeneralPayrollInformationSave}>Save</Button>,
        ]}
      />
    </>
  );

  return (
    <BaseTemplate>
      <PageHead title="Payroll settings" />
      {alert}
      {tabs}
      {modal && (
        <GeneralPayrollInformationModal
          modal={modal}
          onDismissModal={onDismissModal}
          onConfirmSave={onConfirmSave}
          onWarningConfirmSave={onWarningConfirmSave}
          onConfirmCancelButtonClick={onConfirmCancelButtonClick}
        />
      )}
      <PageView loadingState={loadingState} view={view} />
    </BaseTemplate>
  );
};

const mapStateToProps = state => ({
  ...getGeneralPayrollInformation(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(GeneralPayrollInformationView);
