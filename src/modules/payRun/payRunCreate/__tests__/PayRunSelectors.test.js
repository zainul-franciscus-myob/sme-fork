import {
  getEmployeeHeader,
  getPayOnDate,
  getSaveDraftContent,
  getStepNumber,
  getStepperSteps,
} from '../PayRunSelectors';

describe('PayRunSelectors', () => {
  describe('getStepNumber', () => {
    it('returns the string digit for the step sequence', () => {
      const result = getStepNumber({ step: 2 });

      expect(result).toEqual('3');
    });
  });

  describe('getStepperSteps', () => {
    const allStepsIncomplete = [
      {
        number: '1',
        title: 'Select pay period',
        type: 'incomplete',
      },
      {
        number: '2',
        title: 'Calculate pays',
        type: 'incomplete',
      },
      {
        number: '3',
        title: 'Record and report',
        type: 'incomplete',
      },
      {
        number: '4',
        title: 'Prepare pay slips',
        type: 'incomplete',
      },
      {
        number: '5',
        title: 'Done!',
        type: 'incomplete',
      },
    ];

    it('returns the expected steps for first step', () => {
      const result = getStepperSteps({ step: 0 });

      expect(result).toEqual(allStepsIncomplete);
    });

    it('returns the expected steps for second step', () => {
      const result = getStepperSteps({ step: 1 });

      const expectedResult = [
        {
          number: '1',
          title: 'Select pay period',
          type: 'complete',
        },
        {
          number: '2',
          title: 'Calculate pays',
          type: 'incomplete',
        },
        {
          number: '3',
          title: 'Record and report',
          type: 'incomplete',
        },
        {
          number: '4',
          title: 'Prepare pay slips',
          type: 'incomplete',
        },
        {
          number: '5',
          title: 'Done!',
          type: 'incomplete',
        },
      ];

      expect(result).toEqual(expectedResult);
    });

    it('returns the expected steps for 5th step', () => {
      const result = getStepperSteps({ step: 4 });

      const expectedResult = [
        {
          number: '1',
          title: 'Select pay period',
          type: 'complete',
        },
        {
          number: '2',
          title: 'Calculate pays',
          type: 'complete',
        },
        {
          number: '3',
          title: 'Record and report',
          type: 'complete',
        },
        {
          number: '4',
          title: 'Prepare pay slips',
          type: 'complete',
        },
        {
          number: '5',
          title: 'Done!',
          type: 'incomplete',
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPayOnDate', () => {
    it('should get and format the payment date', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            paymentDate: '2019-10-26',
          },
        },
      };

      expect(getPayOnDate(state)).toEqual('26/10/2019');
    });
  });

  describe('getEmployeeHeader', () => {
    it('should get and format the Pay Run dates', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: 'weekly',
            paymentDate: '2019-10-28',
            payPeriodStart: '2019-10-21',
            payPeriodEnd: '2019-10-27',
          },
        },
      };

      const expected = {
        paymentFrequency: 'weekly',
        paymentDate: 'Mon 28/10/2019',
        payPeriodStart: 'Mon 21/10/2019',
        payPeriodEnd: 'Sun 27/10/2019',
      };

      expect(getEmployeeHeader(state)).toEqual(expected);
    });
  });

  describe('getSaveDraftContent', () => {
    const state = {
      recordedPayments: {
        printPaySlipEmployees: [],
        emailPaySlipEmployees: [],
      },
      startPayRun: {
        currentEditingPayRun: {
          paymentFrequency: 'Weekly',
          paymentDate: '2019-12-30',
          payPeriodStart: '2019-12-15',
          payPeriodEnd: '2019-12-30',
          regularPayCycleOptions: [
            {
              value: 'Weekly',
              name: 'Weekly',
            },
          ],
        },
      },
      employeePayList: {
        stpRegistrationStatus: 'lostConnection',
        lines: [
          {
            employeeId: 21,
            payItems: [{ payItemId: '38' }, { payItemId: '39' }],
            isSelected: false,
          },
          {
            employeeId: 23,
            payItems: [{ payItemId: '39' }, { payItemId: '40' }],
            isSelected: true,
          },
          {
            employeeId: 25,
            payItems: [{ payItemId: '39' }, { payItemId: '40' }],
            isSelected: true,
          },
        ],
        originalLines: [
          {
            employeeId: 21,
            payItems: [{ payItemId: '38' }, { payItemId: '39' }],
            isSelected: false,
          },
          {
            employeeId: 23,
            payItems: [{ payItemId: '39' }, { payItemId: '40' }],
            isSelected: true,
          },
          {
            employeeId: 25,
            payItems: [{ payItemId: '39' }, { payItemId: '40' }],
            isSelected: true,
          },
        ],
      },
    };

    const saveDraftContent = getSaveDraftContent(state);

    it('sets the payment frequency and date from current pay run', () => {
      expect(saveDraftContent.paymentFrequency).toEqual(
        state.startPayRun.currentEditingPayRun.paymentFrequency
      );
      expect(saveDraftContent.paymentDate).toEqual(
        state.startPayRun.currentEditingPayRun.paymentDate
      );
    });

    it('sets the payPeriod start and end from current pay run', () => {
      expect(saveDraftContent.payPeriodStart).toEqual(
        state.startPayRun.currentEditingPayRun.payPeriodStart
      );
      expect(saveDraftContent.payPeriodEnd).toEqual(
        state.startPayRun.currentEditingPayRun.payPeriodEnd
      );
    });

    it('adds the selected employees to the selectedEmployeeIds', () => {
      expect(saveDraftContent.selectedEmployeeIds).toEqual([23, 25]);
    });

    it('includes all the employeePays lines', () => {
      expect(saveDraftContent.employeePays).toEqual(
        state.employeePayList.originalLines
      );
    });
  });
});
