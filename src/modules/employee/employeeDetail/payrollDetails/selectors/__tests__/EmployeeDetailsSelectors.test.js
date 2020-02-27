import { getIsPaySlipEmailRequired } from '../EmploymentDetailsSelectors';
import { getMainTab, getSubTab } from '../../../EmployeeDetailSelectors';
import { mainTabIds, payrollDetailsSubTabIds } from '../../../tabItems';

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

  describe('getIsPaySlipEmailRequired', () => {
    it('returns true when paySlipDelivery is ToBeEmailed', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'ToBeEmailed',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(true);
    });

    it('returns true when paySlipDelivery is ToBePrintedAndEmailed', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'ToBePrintedAndEmailed',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(true);
    });

    it('returns false when paySlipDelivery is ToBePrinted', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'ToBePrinted',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(false);
    });

    it('returns false when paySlipDelivery is AlreadyPrintedOrSent', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'AlreadyPrintedOrSent',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(false);
    });
  });
});
