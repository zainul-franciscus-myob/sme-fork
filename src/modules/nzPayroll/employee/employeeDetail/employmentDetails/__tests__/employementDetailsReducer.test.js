import * as intents from '../../EmployeeDetailNzIntents';
import employementReducer from '../employementDetailsReducer';

describe('employementReducer', () => {
  describe('updateEmploymentDetails', () => {
    it('updateEmploymentDetails should update employmentDetails', () => {
      const reducer = employementReducer[intents.UPDATE_EMPLOYMENT_DETAIL];
      const state = {
        payrollDetails: { employmentDetails: { startDate: 'some-date' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { employmentDetails: { startDate: 'new-date' } },
      };

      const action = { key: 'startDate', value: 'new-date' };

      expect(reducer(state, action)).toMatchObject(expected);
    });
  });

  describe('updateTaxDetails', () => {
    it('should update tax details', () => {
      const reducer = employementReducer[intents.UPDATE_TAX_DETAIL];
      const state = {
        payrollDetails: { tax: { irdNumber: '000000' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { tax: { irdNumber: '111222' } },
      };

      const action = { key: 'irdNumber', value: '111222' };

      expect(reducer(state, action)).toMatchObject(expected);
    });

    it('should update irdNumber to 000000000 when {key = taxCode, value = ND}', () => {
      const reducer = employementReducer[intents.UPDATE_TAX_DETAIL];
      const state = {
        payrollDetails: { tax: { irdNumber: '123456', taxCode: 'M' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { tax: { irdNumber: '000000000', taxCode: 'ND' } },
      };

      const action = { key: 'taxCode', value: 'ND' };

      expect(reducer(state, action)).toEqual(expected);
    });

    it('should update irdNumber to "" when {key = taxCode, value !== ND} and existing irdNumber is 000000000', () => {
      const reducer = employementReducer[intents.UPDATE_TAX_DETAIL];
      const state = {
        payrollDetails: { tax: { irdNumber: '123456', taxCode: 'M' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { tax: { irdNumber: '000000000', taxCode: 'ND' } },
      };

      const action = { key: 'taxCode', value: 'ND' };

      expect(reducer(state, action)).toEqual(expected);
    });

    it('should add "0" to front when  {key = irdNumberOnBlur, value !== ND} and length of irdNumber is 8', () => {
      const reducer = employementReducer[intents.UPDATE_TAX_DETAIL];
      const state = {
        payrollDetails: { tax: { irdNumber: '12345678', taxCode: 'M' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { tax: { irdNumber: '012345678', taxCode: 'M' } },
      };

      const action = { key: 'irdNumberOnBlur', value: '12345678' };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('updateKiwiSaverDetails', () => {
    it('should update kiwiSaverDetails', () => {
      const reducer = employementReducer[intents.UPDATE_KIWISAVER_DETAIL];
      const state = {
        payrollDetails: { kiwiSaver: { kiwiSaverStatus: '5' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { kiwiSaver: { kiwiSaverStatus: '10' } },
      };

      const action = { key: 'kiwiSaverStatus', value: '10' };

      expect(reducer(state, action)).toMatchObject(expected);
    });

    it('should format employerContributionRate on onBlur', () => {
      const reducer = employementReducer[intents.UPDATE_KIWISAVER_DETAIL];
      const state = {
        payrollDetails: { kiwiSaver: { employerContributionRate: '5' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { kiwiSaver: { employerContributionRate: '5.00' } },
      };

      const action = { key: 'employerContributionRateOnBlur', value: '5' };

      expect(reducer(state, action)).toEqual(expected);
    });

    it('should not format employerContributionRate when it has two decimal places', () => {
      const reducer = employementReducer[intents.UPDATE_KIWISAVER_DETAIL];
      const state = {
        payrollDetails: { kiwiSaver: { employerContributionRate: '5' } },
      };
      const expected = {
        isPageEdited: true,
        payrollDetails: { kiwiSaver: { employerContributionRate: '6.00' } },
      };

      const action = { key: 'employerContributionRateOnBlur', value: '6.00' };

      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
