import {
  getActiveStepNumber,
  getAlert,
  getBusinessDetailsUrl,
  getBusinessId,
  getCreateNzEmployeeUrl,
  getCreateNzPayRunUrl,
  getCurrentStep,
  getIrdNumber,
  getLoadingState,
  getOnSuccessCallbackUrl,
  getPaydayFilingUrl,
  getStepperSteps,
  isIrdAuthorisationComplete,
} from '../OnboardingSelectors';
import LoadingState from '../../../../../components/PageView/LoadingState';
import OnboardingSteps from '../OnboardingSteps';

describe('OnboardingSelectors', () => {
  describe('getCurrentStep', () => {
    it('should return current step', () => {
      const currentStep = OnboardingSteps.AUTHORISE_MYOB;
      const state = {
        currentStep,
      };

      const actual = getCurrentStep(state);
      expect(actual).toEqual(currentStep);
    });
  });

  describe('getIrdNumber', () => {
    it('should return ird number', () => {
      const irdNumber = '123123123';
      const state = {
        irdNumber,
      };

      const actual = getIrdNumber(state);
      expect(actual).toEqual(irdNumber);
    });
  });

  describe('getActiveStepNumber', () => {
    it('should return active step number', () => {
      const currentStep = OnboardingSteps.DONE;
      const state = {
        currentStep,
      };

      const actual = getActiveStepNumber(state);
      // "Done is the 3rd Step"
      expect(actual).toEqual('3');
    });
  });

  describe('getStepperSteps', () => {
    it('should return steps with correct type attribute', () => {
      const currentStep = OnboardingSteps.AUTHORISE_MYOB;
      const state = {
        currentStep,
      };

      const expected = [
        {
          id: OnboardingSteps.OVERVIEW,
          number: '1',
          title: 'Overview',
          type: 'complete',
        },
        {
          id: OnboardingSteps.AUTHORISE_MYOB,
          number: '2',
          title: 'Authorise MYOB',
          type: 'incomplete',
        },
        {
          id: OnboardingSteps.DONE,
          number: '3',
          title: 'Done!',
          type: 'incomplete',
        },
      ];

      const actual = getStepperSteps(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getBusinessDetailsUrl', () => {
    it('should return formatted url for business details', () => {
      const businessId = '123';
      const state = {
        businessId,
      };

      const expected = '/#/nz/123?selectedTab=businessDetails';

      const actual = getBusinessDetailsUrl(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getBusinessId', () => {
    it('should return business id', () => {
      const businessId = '123';
      const state = {
        businessId,
      };

      const expected = businessId;

      const actual = getBusinessId(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getLoadingState', () => {
    it('should return loading state', () => {
      const loadingState = LoadingState.LOADING;
      const state = {
        loadingState,
      };

      const expected = loadingState;

      const actual = getLoadingState(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('isIrdAuthorisationComplete', () => {
    [
      { authorisation: 'complete#12345667', expected: true },
      { authorisation: 'invalid call back', expected: false },
      { authorisation: 'invalid call back#', expected: false },
      { authorisation: 'complete#', expected: false },
      { authorisation: '', expected: false },
    ].forEach(({ authorisation, expected }) => {
      it(`returns ${expected} with ${
        expected ? 'valid' : 'invalid'
      } authorisation callback of '${authorisation}'`, () => {
        const state = {
          authorisation,
        };
        const actual = isIrdAuthorisationComplete(state);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getOnboardUserQueryString', () => {
    it('should return encoded callback url', () => {
      const successUrl = btoa(
        window.location.origin.concat(
          '/#/nz/123/paydayFiling/onboarding?authorisation=complete'
        )
      );

      const businessId = '123';
      const state = {
        businessId,
      };

      const expected = successUrl;

      const actual = getOnSuccessCallbackUrl(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getPaydayFilingUrl', () => {
    it('should return relative url for payday filing', () => {
      const businessId = '123';
      const state = {
        businessId,
      };

      const expected = `/#/nz/${businessId}/paydayFiling`;

      const actual = getPaydayFilingUrl(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getAlert', () => {
    it('should return alert', () => {
      const alert = { message: 'test', type: 'danger' };
      const state = {
        alert,
      };

      const expected = alert;

      const actual = getAlert(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getCreateNzEmployeeUrl', () => {
    it('should return  create nz employee url', () => {
      const businessId = 42;
      const state = {
        businessId,
      };
      const expected = `/#/nz/${businessId}/employee/new`;

      const actual = getCreateNzEmployeeUrl(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getCreateNzPayRunUrl', () => {
    it('should return  create nz pay run url', () => {
      const businessId = 42;
      const state = {
        businessId,
      };
      const expected = `/#/nz/${businessId}/payRun/new`;

      const actual = getCreateNzPayRunUrl(state);
      expect(actual).toEqual(expected);
    });
  });
});
