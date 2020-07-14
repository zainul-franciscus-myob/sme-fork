import {
  getPreparePaySlips,
  getPrintPaySlipEmployees,
} from '../PreparePaySlipsSelectors';

describe('PreparePaySlipsSelectors', () => {
  const printPaySlipEmployees = [
    {
      transactionId: 2,
      employeeId: 297,
      name: 'Fin Adventureland',
      email: 'finlovesswords@fcbarcelona.com',
      takeHomePay: '61.77',
      hasPaySlipEmailSent: false,
      hasBankFile: true,
    },
    {
      transactionId: 4,
      employeeId: 299,
      name: 'Princess Bubblegum',
      email: 'pbubs@fcbarcelona.com',
      takeHomePay: '61.78',
      hasPaySlipEmailSent: false,
      hasBankFile: false,
    },
  ];

  const preparePaySlips = { printPaySlipEmployees };

  const state = { preparePaySlips };

  describe('getPrintPaySlipEmployees', () => {
    it('should list of employees with payslips to be printed', () => {
      const actual = getPrintPaySlipEmployees(state);
      const expected = printPaySlipEmployees;

      expect(actual).toEqual(expected);
    });
  });

  describe('getPreparePaySlips', () => {
    it('should prepare payslip information', () => {
      const actual = getPreparePaySlips(state);
      const expected = preparePaySlips;

      expect(actual).toEqual(expected);
    });
  });
});
