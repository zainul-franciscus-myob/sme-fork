import {
  Button,
  ButtonRow,
  FieldGroup,
  FormHorizontal,
  ReadOnly,
  StandardTemplate,
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

const GeneralPayrollInformationView = (props) => {
  const {
    currentYear,
    hoursInWorkWeek,
    withholdingPayerNumber,
    roundNetPay,
    taxTableRevisionDate,
    isCurrentYearProvided,
    isLoading,
    pageHead,
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

  const subHeadChildren = (
    <>
      { tabs }
    </>
  );

  const view = (
    <>
      <div className={style.formWidth}>
        <FormHorizontal>
          <FieldGroup label="Payroll">
            {isCurrentYearProvided !== null ? (
              <ReadOnly
                label="Payroll year ends 30 June"
                name="taxTableRevisionDate"
              >
                {currentYear}
              </ReadOnly>
            ) : (
              <YearInput
                label="Payroll year ends 30 June"
                name="currentYear"
                value={currentYear}
                onChange={handleInputChange(onGeneralPayrollInformationChange)}
              />
            )}
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
      <ButtonRow>
        <Button onClick={onGeneralPayrollInformationSave}>Save</Button>
      </ButtonRow>
    </>
  );

  return (
    <StandardTemplate
      sticky="none"
      pageHead={pageHead}
      alert={alert}
      subHeadChildren={subHeadChildren}
    >
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
    </StandardTemplate>
  );
};

const mapStateToProps = state => ({
  ...getGeneralPayrollInformation(state),
  modal: getModal(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(GeneralPayrollInformationView);
