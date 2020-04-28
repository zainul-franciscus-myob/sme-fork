import {
  getHourlyRate, getPayCycleOptions, getSelectedPayBasis, getSelectedPayCycle,
} from '../EmploymentDetailsSelectors';

describe('EmploymentDetailsSelectors', () => {
  const state = {
    payrollDetails: {
      wage: {
        selectedPayBasis: 'Salary',
        hourlyRate: '48.0764',
        selectedPayCycle: 'Weekly',
      },
    },
    payCycleOptions: [
      { id: 'weekly', describe: 'Weekly' },
    ],
  };

  describe('Data', () => {
    describe.each([
      ['getHourlyRate', getHourlyRate, state.payrollDetails.wage.hourlyRate],
      ['getSelectedPayBasis', getSelectedPayBasis, state.payrollDetails.wage.selectedPayBasis],
      ['getSelectedPayCycle', getSelectedPayCycle, state.payrollDetails.wage.selectedPayCycle],
    ])('%s', (label, selector, expectedValue) => {
      it(`should select "${expectedValue}"`, () => {
        expect(selector(state)).toEqual(expectedValue);
      });
    });
  });


  describe('Options', () => {
    describe('getPayCycleOptions', () => {
      expect(getPayCycleOptions(state)).toEqual(state.payCycleOptions);
    });
  });
});
