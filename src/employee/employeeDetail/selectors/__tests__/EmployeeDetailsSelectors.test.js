import { getMainTab, getSubTab, getUseUnsavedModal } from '../EmployeeDetailSelectors';
import { mainTabIds, payrollDetailsSubTabIds } from '../../tabItems';

describe('employeeDetailSelectors', () => {
  describe('getMainTab', () => {
    it('returns main tab from state', () => {
      const mainTab = mainTabIds.contactDetails;
      const state = {
        mainTab,
      };
      const expected = mainTab;
      const actual = getMainTab(state);

      expect(actual).toBe(expected);
    });

    it('returns first main tab when the main tab in state is invalid', () => {
      const state = {
        mainTab: '',
      };
      const expected = Object.values(mainTabIds)[0];
      const actual = getMainTab(state);

      expect(actual).toBe(expected);
    });
  });

  describe('getSubTab', () => {
    it('returns sub tab from state', () => {
      const subTab = payrollDetailsSubTabIds.employmentDetails;
      const state = {
        mainTab: 'payrollDetails',
        subTab,
      };
      const expected = subTab;
      const actual = getSubTab(state);

      expect(actual).toBe(expected);
    });

    it('returns first sub tab when the sub tab in state is invalid', () => {
      const state = {
        mainTab: 'payrollDetails',
        subTab: 'something',
      };
      const expected = Object.values(payrollDetailsSubTabIds)[0];
      const actual = getSubTab(state);

      expect(actual).toBe(expected);
    });
  });

  describe('getUseUnsavedModal', () => {
    it('use unsaved modal for payroll deductions sub tab', () => {
      const state = {
        mainTab: mainTabIds.payrollDetails,
        subTab: payrollDetailsSubTabIds.deductions,
      };
      const actual = getUseUnsavedModal(state);

      expect(actual).toBe(true);
    });

    it('use unsaved modal for payroll taxes sub tab', () => {
      const state = {
        mainTab: mainTabIds.payrollDetails,
        subTab: payrollDetailsSubTabIds.taxes,
      };
      const actual = getUseUnsavedModal(state);

      expect(actual).toBe(true);
    });

    it('not use unsaved modal for none payroll main tab', () => {
      const state = {
        mainTab: mainTabIds.contactDetails,
      };
      const actual = getUseUnsavedModal(state);

      expect(actual).toBe(false);
    });

    it('not use unsaved modal for payroll other sub tab', () => {
      const state = {
        mainTab: mainTabIds.payrollDetails,
        subTab: 'blah',
      };
      const actual = getUseUnsavedModal(state);

      expect(actual).toBe(false);
    });
  });
});
