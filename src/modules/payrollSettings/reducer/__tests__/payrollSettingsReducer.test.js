import { CHANGE_GENERAL_PAYROLL_INFORMATION } from '../../PayrollSettingsIntents';
import payrollSettingsReducer from '../payrollSettingsReducer';

describe('payrollSettingsReducer', () => {
  describe('changeGeneralPayrollInformation', () => {
    it('changes value for given key', () => {
      const state = {
        generalPayrollInformation: {
          currentYear: '',
          hoursInWorkWeek: '',
          withholdingPayerNumber: '',
          roundNetPay: '',
          taxTableRevisionDate: '',
        },
      };

      const action = {
        intent: CHANGE_GENERAL_PAYROLL_INFORMATION,
        key: 'hoursInWorkWeek',
        value: 2,
      };

      const actual = payrollSettingsReducer(state, action);

      expect(actual.generalPayrollInformation.hoursInWorkWeek).toEqual(2);
    });
  });
});
