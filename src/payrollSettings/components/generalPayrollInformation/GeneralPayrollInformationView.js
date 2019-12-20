import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  FieldGroup,
  FormHorizontal,
  PageHead,
  ReadOnly,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getGeneralPayrollInformation, getIsLoading, getModal } from '../../selectors/payrollSettingsSelectors';
import AbnInput from '../../../components/autoFormatter/AbnInput/AbnInput';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import GeneralPayrollInformationModal from './GeneralPayrollInformationModal';
import PageView from '../../../components/PageView/PageView';
import YearInput from '../../../components/autoFormatter/YearInput/YearInput';
import handleInputChange from '../../../components/handlers/handleInputChange';
import style from './GeneralPayrollInformationView.module.css';

const isCurrentYearEditable = (currentYearIsProvided) => {
  if (currentYearIsProvided == null) {
    return true;
  }
  return false;
};

const GeneralPayrollInformationView = (props) => {
  const {
    currentYear,
    hoursInWorkWeek,
    withholdingPayerNumber,
    roundNetPay,
    taxTableRevisionDate,
    isCurrentYearProvided,
    isLoading,
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
      <PageView isLoading={isLoading} view={view} />
    </BaseTemplate>
  );
};

const mapStateToProps = state => ({
  ...getGeneralPayrollInformation(state),
  modal: getModal(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(GeneralPayrollInformationView);
