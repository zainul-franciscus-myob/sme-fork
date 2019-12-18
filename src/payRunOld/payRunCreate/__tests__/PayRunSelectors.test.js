import {
  getEmployeeHeader, getPayOnDate, getStepNumber, getStepperSteps,
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
          paymentDate: '2019-10-26',
        },
      };

      expect(getPayOnDate(state)).toEqual('26/10/2019');
    });
  });

  describe('getEmployeeHeader', () => {
    it('should get and format the Pay Run dates', () => {
      const state = {
        startPayRun: {
          paymentFrequency: 'weekly',
          paymentDate: '2019-10-28',
          payPeriodStart: '2019-10-21',
          payPeriodEnd: '2019-10-27',
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
});
