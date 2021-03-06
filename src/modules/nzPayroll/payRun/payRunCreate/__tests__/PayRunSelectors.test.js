import {
  displayRecordPayRunIRFileModal,
  getBusinessId,
  getDashboardUrl,
  getDraftPayRunId,
  getEmployeeHeader,
  getIsBusinessOnboarded,
  getIsSubmitting,
  getIsUserOnboarded,
  getLoadingState,
  getPayOnDate,
  getPreviousStepModalIsOpen,
  getRegion,
  getStepIndex,
  getStepKey,
  getStepNumber,
  getStepperSteps,
} from '../PayRunSelectors';

describe('PayRunSelectors', () => {
  describe('getStepNumber', () => {
    it('returns the string digit for the step sequence', () => {
      const result = getStepNumber({ step: { index: 2 } });

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
        title: 'Pay run summary',
        type: 'incomplete',
      },
      {
        number: '5',
        title: 'Done!',
        type: 'incomplete',
      },
    ];

    it('returns the expected steps for first step', () => {
      const result = getStepperSteps({ step: { index: 0 } });

      expect(result).toEqual(allStepsIncomplete);
    });

    it('returns the expected steps for second step', () => {
      const result = getStepperSteps({ step: { index: 1 } });

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
          title: 'Pay run summary',
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
      const result = getStepperSteps({ step: { index: 4 } });

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
          title: 'Pay run summary',
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

    it('should get and format the Pay Run dates and include total take home pay', () => {
      const state = {
        totalTakeHomePay: '10000',
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
        totalTakeHomePay: '10000',
      };

      expect(getEmployeeHeader(state)).toEqual(expected);
    });
  });

  describe('getLoadingState', () => {
    it('should get loading state', () => {
      const expected = 'some state';

      const state = {
        loadingState: expected,
      };

      expect(getLoadingState(state)).toEqual(expected);
    });
  });

  describe('getBusinessId', () => {
    it('should get business id', () => {
      const expected = 'some business id';

      const state = {
        businessId: expected,
      };

      expect(getBusinessId(state)).toEqual(expected);
    });
  });

  describe('getStepKey', () => {
    it('should get step key', () => {
      const expected = 'some step key';

      const state = {
        step: {
          key: expected,
        },
      };

      expect(getStepKey(state)).toEqual(expected);
    });
  });

  describe('getStepIndex', () => {
    it('should get step index', () => {
      const expected = 2;

      const state = {
        step: {
          index: expected,
        },
      };

      expect(getStepIndex(state)).toEqual(expected);
    });
  });

  describe('getStepNumber', () => {
    it('should get step number one larger than index', () => {
      const index = 4;
      const expected = '5';

      const state = {
        step: {
          index,
        },
      };

      expect(getStepNumber(state)).toEqual(expected);
    });
  });

  describe('getRegion', () => {
    it('should get region', () => {
      const expected = 'some region';

      const state = {
        region: expected,
      };

      expect(getRegion(state)).toEqual(expected);
    });
  });

  describe('getIsSubmitting', () => {
    it('should get isSubmitting', () => {
      const expected = false;

      const state = {
        isSubmitting: false,
      };

      expect(getIsSubmitting(state)).toEqual(expected);
    });
  });

  describe('getDashboardUrl', () => {
    it('should get dashboard URL', () => {
      const expected = '/#/nz/123/dashboard';

      const state = {
        region: 'nz',
        businessId: '123',
      };

      expect(getDashboardUrl(state)).toEqual(expected);
    });
  });

  describe('getDraftPayRunId', () => {
    it('should get the pay run id', () => {
      const expected = '1234';

      const state = {
        draftPayRunId: expected,
      };

      expect(getDraftPayRunId(state)).toEqual(expected);
    });
  });

  describe('getPreviousStepModalIsOpen', () => {
    it('should get the previous step modal flag', () => {
      const expected = true;

      const state = {
        previousStepModalIsOpen: expected,
      };

      expect(getPreviousStepModalIsOpen(state)).toEqual(expected);
    });
  });

  describe('getIsBusinessOnboarded', () => {
    it('should get is business onboarded', () => {
      const expected = true;

      const state = {
        payDayOnboardedStatus: { isBusinessOnboarded: true },
      };

      expect(getIsBusinessOnboarded(state)).toEqual(expected);
    });
    it('should get is user onboarded based on valid user session', () => {
      const expected = true;

      const state = {
        payDayOnboardedStatus: {
          isUserOnboarded: true,
          isUserSessionValid: true,
        },
      };

      expect(getIsUserOnboarded(state)).toEqual(expected);
    });
    it('should get is user onboarded based on invalid user session', () => {
      const expected = false;

      const state = {
        payDayOnboardedStatus: {
          isUserOnboarded: true,
          isUserSessionValid: false,
        },
      };

      expect(getIsUserOnboarded(state)).toEqual(expected);
    });
  });

  describe('displayRecordPayRunIRFileModal', () => {
    it('should get display RecordPayRunIRFileModal if a business and user are onboarded', () => {
      const expected = true;

      const state = {
        payDayOnboardedStatus: {
          isBusinessOnboarded: true,
          isUserOnboarded: true,
          isUserSessionValid: true,
        },
        recordPayRunIRFileModal: true,
      };

      expect(displayRecordPayRunIRFileModal(state)).toEqual(expected);
    });

    it('should get display RecordPayRunIRFileModal if a business is onboarded but user is not', () => {
      const expected = true;

      const state = {
        payDayOnboardedStatus: {
          isBusinessOnboarded: true,
          isUserOnboarded: false,
          isUserSessionValid: false,
        },
        recordPayRunIRFileModal: true,
      };

      expect(displayRecordPayRunIRFileModal(state)).toEqual(expected);
    });

    it('should not display RecordPayRunIRFileModal', () => {
      const expected = false;

      const state = {
        payDayOnboardedStatus: {
          isBusinessOnboarded: true,
          isUserOnboarded: true,
          isUserSessionValid: true,
        },
        recordPayRunIRFileModal: false,
      };

      expect(displayRecordPayRunIRFileModal(state)).toEqual(expected);
    });

    it('should get not display RecordPayRunIRFileModal', () => {
      const expected = false;

      const state = {
        payDayOnboardedStatus: {
          isBusinessOnboarded: false,
          isUserOnboarded: false,
          isUserSessionValid: false,
        },
        recordPayRunIRFileModal: true,
      };

      expect(displayRecordPayRunIRFileModal(state)).toEqual(expected);
    });

    it('should get not display RecordPayRunIRFileModal', () => {
      const expected = false;

      const state = {
        payDayOnboardedStatus: {
          isBusinessOnboarded: false,
          isUserOnboarded: false,
          isUserSessionValid: false,
        },
        recordPayRunIRFileModal: false,
      };

      expect(displayRecordPayRunIRFileModal(state)).toEqual(expected);
    });
  });
});
