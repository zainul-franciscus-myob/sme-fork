import {
  getNumberOfSelected,
  getPayRunId,
  getRecordPayContents,
} from '../RecordPayRunSelectors';

describe('RecordPayRunSelectors', () => {
  describe('getRecordPayContents', () => {
    it('should get the record pay contents', () => {
      const paymentDates = {
        paymentFrequency: 'Weekly',
        paymentDate: '2019-01-01',
        payPeriodStart: '2019-01-07',
        payPeriodEnd: '2019-01-08',
      };

      const lines = [
        {
          employeeId: '22',
          isSelected: true,
          payItems: [],
        },
      ];

      const state = {
        payRunId: '21e38491-f9ad-4a06-9da0-540ec07cf551',
        startPayRun: {
          currentEditingPayRun: {
            ...paymentDates,
          },
        },
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              isSelected: false,
              payItems: [],
            },
            {
              employeeId: '22',
              isSelected: true,
              payItems: [],
            },
          ],
        },
      };

      const actual = getRecordPayContents(state);

      expect(actual.payRunId).toEqual(state.payRunId);
      expect(actual.dateOccurred).toBeDefined();
      expect(actual.employeePayLines).toEqual(lines);
      expect(actual.paymentFrequency).toEqual(paymentDates.paymentFrequency);
      expect(actual.paymentDate).toEqual(paymentDates.paymentDate);
      expect(actual.payPeriodStart).toEqual(paymentDates.payPeriodStart);
      expect(actual.payPeriodEnd).toEqual(paymentDates.payPeriodEnd);
    });
  });

  describe('getNumberOfSelected', () => {
    it('should get the number of selected employees', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              isSelected: false,
            },
            {
              isSelected: true,
            },
            {
              isSelected: false,
            },
          ],
        },
      };

      expect(getNumberOfSelected(state)).toEqual(1);
    });
  });

  describe('getPayRunId', () => {
    it('should get the Pay Run Id from the state', () => {
      const state = {
        payRunId: 'some random id',
      };

      expect(getPayRunId(state)).toEqual(state.payRunId);
    });
  });
});
