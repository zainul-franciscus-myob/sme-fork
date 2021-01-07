import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  Field,
  FieldGroup,
  FormHorizontal,
  PageHead,
  ReadOnly,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getGeneralPayrollInformation,
  getLoadingState,
  getModal,
} from '../../selectors/payrollSettingsSelectors';
import AbnInput from '../../../../components/autoFormatter/AbnInput/AbnInput';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import GeneralPayrollInformationModal from './GeneralPayrollInformationModal';
import PageView from '../../../../components/PageView/PageView';
import SuperFundCombobox from '../../../../components/combobox/SuperFundCombobox';
import TimesheetsSettingsView from './TimesheetsSettingsView';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import style from './GeneralPayrollInformationView.module.css';

const GeneralPayrollInformationView = (props) => {
  const {
    hoursInWorkWeek,
    withholdingPayerNumber,
    roundNetPay,
    taxTableRevisionDate,
    defaultSuperFund,
    defaultSuperFundOptions,
    useTimesheets,
    useTimesheetsWeekStarts,
    loadingState,
    alert,
    tabs,
    listeners: {
      onGeneralPayrollInformationChange,
      onGeneralPayrollInformationSave,
      onUseTimesheetsChange,
      onConfirmSave,
      onWarningConfirmSave,
      onConfirmCancelButtonClick,
      onDismissModal,
      onCreateSuperFundClick,
    },
    modal,
  } = props;

  const defaultSuperFundMetaData = [
    {
      columnName: 'name',
      showData: true,
    },
  ];

  const view = (
    <>
      <Card>
        <div className={style.formWidth}>
          <FormHorizontal>
            <FieldGroup label="Details">
              <AmountInput
                label="Full-time employee weekly hours"
                requiredLabel="This field is required"
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
                labelAccessory={
                  <Tooltip>
                    {"Leave this empty if your business doesn't have a WPN."}
                  </Tooltip>
                }
              />
              <AmountInput
                label="Cents to round net pay down to"
                requiredLabel="This field is required"
                name="roundNetPay"
                value={roundNetPay}
                onChange={handleInputChange(onGeneralPayrollInformationChange)}
                numeralIntegerScale={3}
                numeralDecimalScaleMax={0}
                labelAccessory={
                  <Tooltip>
                    {
                      "We'll round the pay down to the nearest cent value you enter. "
                    }
                    {
                      'Any difference will be added to the PAYG (tax contribution).'
                    }
                  </Tooltip>
                }
              />
              <ReadOnly
                label="Tax table revision date"
                name="taxTableRevisionDate"
              >
                {taxTableRevisionDate}
              </ReadOnly>
              <SuperFundCombobox
                items={defaultSuperFundOptions}
                metaData={defaultSuperFundMetaData}
                name="defaultSuperFund"
                label="Default Superannuation fund"
                onChange={({ id }) =>
                  onGeneralPayrollInformationChange({
                    key: 'defaultSuperFund',
                    value: id,
                  })
                }
                allowClear
                selectedId={defaultSuperFund}
                width="xl"
              />
              <Field
                label="Sign up for Pay super"
                hideLabel
                renderField={() => (
                  <Button
                    type="link"
                    align="center"
                    iconRight
                    onClick={onCreateSuperFundClick}
                  >
                    Create superannuation fund
                  </Button>
                )}
              />
            </FieldGroup>
            {
              <TimesheetsSettingsView
                useTimesheets={useTimesheets}
                useTimesheetsWeekStarts={useTimesheetsWeekStarts}
                onGeneralPayrollInformationChange={
                  onGeneralPayrollInformationChange
                }
                onUseTimesheetsChange={onUseTimesheetsChange}
              />
            }
          </FormHorizontal>
        </div>
      </Card>
      <ButtonRow
        primary={[
          <Button key="SaveButton" onClick={onGeneralPayrollInformationSave}>
            Save
          </Button>,
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

const mapStateToProps = (state) => ({
  ...getGeneralPayrollInformation(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(GeneralPayrollInformationView);
