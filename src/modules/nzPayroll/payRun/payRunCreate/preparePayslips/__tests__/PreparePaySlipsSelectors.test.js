import getEmployeePayListForPaySlips from '../PreparePaySlipsSelectors';

describe('PreparePaySlipsSelectors', () => {
  describe('getEmployeePayListForPaySlips', () => {
    it('should return list of selected employees', () => {
      const state = {
        draftPayRun: {
          lines: [
            {
              id: 1,
              employeeId: '20',
              name: 'Mary Jones',
              takeHomePay: 700,
              isSelected: true,
            },
            {
              id: 2,
              employeeId: '21',
              name: 'Mary Jones',
              takeHomePay: 800,
              isSelected: false,
            },
            {
              id: 3,
              employeeId: '22',
              name: 'Mary Jones',
              takeHomePay: 900,
              isSelected: true,
            },
          ],
        },
      };

      const expected = [
        {
          transactionId: 1,
          employeeId: '20',
          name: 'Mary Jones',
          takeHomePay: 700,
        },
        {
          transactionId: 3,
          employeeId: '22',
          name: 'Mary Jones',
          takeHomePay: 900,
        },
      ];

      const actual = getEmployeePayListForPaySlips(state);

      expect(actual).toEqual(expected);
    });
  });
});
