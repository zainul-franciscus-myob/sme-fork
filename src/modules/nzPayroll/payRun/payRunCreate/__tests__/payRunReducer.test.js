import {
  CLOSE_PREVIOUS_STEP_MODAL,
  CREATE_DRAFT_PAY_RUN_FAILED,
  CREATE_DRAFT_PAY_RUN_SUCCESS,
  NEXT_STEP,
  OPEN_PREVIOUS_STEP_MODAL,
  PREVIOUS_STEP,
  RESTART_PAY_RUN,
  SET_DRAFT_PAY_RUN_ID,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_TAKE_HOME_PAY,
} from '../PayRunIntents';
import { DRAFT_PAY_RUN, START_PAY_RUN } from '../payRunSteps';
import { RESET_STATE } from '../../../../../SystemIntents';
import AlertType from '../types/AlertType';
import LoadingState from '../../../../../components/PageView/LoadingState';
import payRunReducer from '../payRunReducer';

describe('NZ Payrun reducer', () => {
  describe('Default state', () => {
    it('is as expected', () => {
      const state = {};
      const action = {
        intent: RESET_STATE,
      };

      const actual = payRunReducer(state, action);
      expect(actual.step).toBe(START_PAY_RUN);
      expect(actual.loadingState).toBe(LoadingState.LOADING);
      expect(actual.draftPayRunId).toBe(-1);
    });
  });

  describe('Set state', () => {
    it('should change loading state to complete', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };
      const action = {
        intent: SET_LOADING_STATE,
        loadingState: LoadingState.LOADING_SUCCESS,
      };

      const actual = payRunReducer(state, action);
      expect(actual.loadingState).toBe(LoadingState.LOADING_SUCCESS);
    });
  });

  describe('Set total take home pay', () => {
    it('should change loading state to complete', () => {
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

      const action = {
        intent: SET_TOTAL_TAKE_HOME_PAY,
        totalTakeHomePay: '10000',
      };

      const expected = {
        paymentFrequency: 'weekly',
        paymentDate: 'Mon 28/10/2019',
        payPeriodStart: 'Mon 21/10/2019',
        payPeriodEnd: 'Sun 27/10/2019',
        totalTakeHomePay: '10000',
      };

      const actual = payRunReducer(state, action);

      expect(actual.totalTakeHomePay).toBe(expected.totalTakeHomePay);
    });
  });

  describe('Next step', () => {
    it('should return the next expected step', () => {
      const state = {
        step: START_PAY_RUN,
      };

      const action = {
        intent: NEXT_STEP,
      };

      const expected = {
        step: DRAFT_PAY_RUN,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Previous step', () => {
    it('should return the previous expected step', () => {
      const state = {
        step: DRAFT_PAY_RUN,
      };

      const action = {
        intent: PREVIOUS_STEP,
      };

      const expected = {
        step: START_PAY_RUN,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Open previous step modal', () => {
    it('should set previousStepModalIsOpen to true ', () => {
      const state = {
        previousStepModalIsOpen: false,
      };

      const action = {
        intent: OPEN_PREVIOUS_STEP_MODAL,
      };

      const expected = {
        previousStepModalIsOpen: true,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Close previous step modal', () => {
    it('should set previousStepModalIsOpen to false ', () => {
      const state = {
        previousStepModalIsOpen: true,
      };

      const action = {
        intent: CLOSE_PREVIOUS_STEP_MODAL,
      };

      const expected = {
        previousStepModalIsOpen: false,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Discard pay run from previous step modal', () => {
    it('should restart the pay run and maintain the context', () => {
      const state = {
        draftPayRunId: 7,
        businessId: 123,
        region: 'NZ',
      };

      const action = {
        intent: RESTART_PAY_RUN,
      };

      const expected = {
        businessId: 123,
        draftPayRun: {
          baseHourlyWagePayItemId: null,
          baseSalaryWagePayItemId: null,
          isPayLineDirty: false,
          lines: [],
          payPeriodEmployeeLimit: {},
        },
        draftPayRunId: -1,
        isSubmitting: false,
        loadingState: 'LOADING',
        previousStepModalIsOpen: false,
        region: 'NZ',
        startPayRun: {
          currentEditingPayRun: {
            payPeriodEnd: '',
            payPeriodStart: '',
            paymentDate: '',
            paymentFrequency: 'Weekly',
            regularPayCycleOptions: [],
          },
        },
        step: {
          index: 0,
          key: 'startPayRun',
          nextStepKey: 'draftPayRun',
        },
      };

      const actual = payRunReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('Set is submitting', () => {
    it('should set isSubmitting to input value', () => {
      const state = {
        isSubmitting: false,
      };

      const action = {
        intent: SET_SUBMITTING_STATE,
        isSubmitting: true,
      };

      const expected = {
        isSubmitting: true,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Set pay run id', () => {
    it('should set the draftPayRunId', () => {
      const state = {
        draftPayRunId: -1,
      };

      const action = {
        intent: SET_DRAFT_PAY_RUN_ID,
        createdDraftPayRun: {
          draftPayRunId: 1234,
        },
      };

      const expected = {
        draftPayRunId: 1234,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Create draft payrun succeeded', () => {
    it('should set the loading state to success and unset alert', () => {
      const state = {
        loadingState: LoadingState.LOADING,
        alert: 'hey',
      };

      const action = {
        intent: CREATE_DRAFT_PAY_RUN_SUCCESS,
      };

      const expected = {
        loadingState: LoadingState.LOADING_SUCCESS,
        alert: undefined,
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Create draft payrun failed', () => {
    it('should set the loading state to success and set the alert', () => {
      const state = {
        loadingState: LoadingState.LOADING,
        alert: undefined,
      };

      const action = {
        intent: CREATE_DRAFT_PAY_RUN_FAILED,
        message: 'Create draft payrun failed',
      };

      const expected = {
        loadingState: LoadingState.LOADING_SUCCESS,
        alert: { type: AlertType.ERROR, message: 'Create draft payrun failed' },
      };

      const actual = payRunReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
