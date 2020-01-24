import { RadioButtonGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getEtpCode, getEtpCodeCategory } from '../EmployeePayListSelectors';
import EtpCode from '../types/EtpCode';
import EtpCodeCategory from '../types/EtpCodeCategory';
import EtpModalRadioButton from './EtpModalRadioButton';

const EtpModalRadioGroup = ({ etpCode, etpCodeCategory, onChangeEtpCode }) => (
  <RadioButtonGroup
    label="Benefit code"
    name="etpCode"
    onChange={onChangeEtpCode}
    value={etpCode}
    renderRadios={({ id, value, ...props }) => ({
      [EtpCodeCategory.LIFE]: [
        {
          code: EtpCode.R,
          label: 'Payment due to early retirement screen, genuine redundancy, invalidity, or compensationf or personal injury, unfair dismissal, harassment, discrimination',
        },
        {
          code: EtpCode.O,
          label: 'Other ETP not described by R, for example, golden handshake, gratuity, payment in lieu of notice, payment for unused sick leave, payment for unused rostered days off',
        },
      ].map(({ code, label }) => (
        <EtpModalRadioButton
          key={code}
          code={code}
          checked={value === code}
          label={label}
          feelixProps={props}
        />
      )),
      [EtpCodeCategory.MULTIPLE]: [
        {
          code: EtpCode.S,
          label: "Use when you've made a code R payment to the employee in a previous income year for the same termination",
        },
        {
          code: EtpCode.P,
          label: "Use when you've made a code O payment to the employee in a previous income year for the same termination",
        },
      ].map(({ code, label }) => (
        <EtpModalRadioButton
          key={code}
          code={code}
          checked={value === code}
          label={label}
          feelixProps={props}
        />
      )),
      [EtpCodeCategory.DEATH]: [
        {
          code: EtpCode.D,
          label: 'Payment to dependant of deceased',
        },
        {
          code: EtpCode.B,
          label: 'Payment to non-dependant of deceased and you made a termination payment to the non-dependent in a previous income year for the same termination',
        },
        {
          code: EtpCode.N,
          label: 'Payment to non-dependant of deceased',
        },
        {
          code: EtpCode.T,
          label: 'Payment to a trustee of deceased estate',
        },
      ].map(({ code, label }) => (
        <EtpModalRadioButton
          key={code}
          code={code}
          checked={value === code}
          label={label}
          feelixProps={props}
        />
      )),
    }[etpCodeCategory])}
  />
);

const mapStateToProps = state => ({
  etpCodeCategory: getEtpCodeCategory(state),
  etpCode: getEtpCode(state),
});

export default connect(mapStateToProps)(EtpModalRadioGroup);
