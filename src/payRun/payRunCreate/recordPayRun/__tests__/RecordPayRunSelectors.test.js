import { getRecordPayContents } from '../RecordPayRunSelectors';

describe('RecordPayRunSelectors', () => {
  it('getRecordPayContents', () => {
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
      },
    ];

    const state = {
      startPayRun: {
        ...paymentDates,
      },
      employeePayList: {
        lines: [
          {
            employeeId: '21',
            isSelected: false,
          },
          {
            employeeId: '22',
            isSelected: true,
          },
        ],
      },
    };

    const actual = getRecordPayContents(state);

    expect(actual.paymentFrequency).toEqual(paymentDates.paymentFrequency);
    expect(actual.paymentDate).toEqual(paymentDates.paymentDate);
    expect(actual.payPeriodStart).toEqual(paymentDates.payPeriodStart);
    expect(actual.payPeriodEnd).toEqual(paymentDates.payPeriodEnd);
    expect(actual.employeePayLines).toEqual(lines);
  });
});