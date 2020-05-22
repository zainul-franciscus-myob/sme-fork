import * as intents from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { tabIds } from '../tabItems';
import LoadingState from '../../../../../components/PageView/LoadingState';
import employeeDetailNzReducer from '../employeeDetailNzReducer';

const defaultState = {
  userInterface: {
    loadingState: LoadingState.LOADING,
    alert: undefined,
    isPageEdited: false,
    isSubmitting: false,
    mainTab: tabIds.contactDetails,
    subTabs: {
      [tabIds.payrollDetails]: tabIds.employmentDetails,
    },
  },
  contactDetail: {
    firstName: '',
    lastName: '',
    isInactive: false,
    employeeNumber: '',
    country: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    phoneNumbers: [],
    email: '',
    notes: '',
  },
};

describe('EmployeeDetailNzReducer', () => {
  describe('setInitialState', () => {
    it('should set initial state with context', () => {
      const context = { businessId: 'id', region: 'nz' };
      const action = { intent: SET_INITIAL_STATE, context };

      const result = employeeDetailNzReducer(undefined, action);

      expect(result).toEqual({ ...defaultState, ...context });
    });

    it('should set the initial mainTab and subTab from context', () => {
      const context = {
        businessId: 'id',
        region: 'nz',
        mainTab: 'mainTab',
        subTab: 'subTab',
      };
      const action = { intent: SET_INITIAL_STATE, context };

      const result = employeeDetailNzReducer(undefined, action);

      expect(result).toHaveProperty('userInterface.mainTab', context.mainTab);
      expect(result).toHaveProperty(`userInterface.subTabs.${context.mainTab}`, context.subTab);
    });
  });

  describe('resetState', () => {
    it('resets state to the default state', () => {
      const state = { firstName: 'Bob', businessId: 'id' };
      const action = { intent: RESET_STATE };

      const result = employeeDetailNzReducer(state, action);

      expect(result).toMatchObject(defaultState);
    });
  });

  describe('setLoadingState', () => {
    it('should set the loading state', () => {
      const state = { userInterface: { loadingState: LoadingState.LOADING } };
      const loadingState = LoadingState.LOADING_SUCCESS;
      const action = { intent: intents.SET_LOADING_STATE, loadingState };

      const result = employeeDetailNzReducer(state, action);

      expect(result).toEqual({ userInterface: { loadingState } });
    });
  });

  describe('loadEmployeeDetail', () => {
    it('should load the Employee Details', () => {
      const contactDetail = { firstName: 'Bob', lastName: 'The Builder' };
      const action = {
        intent: intents.LOAD_EMPLOYEE_DETAIL,
        payload: { contactDetail },
      };
      const userInterface = { loadingState: LoadingState.LOADING_SUCCESS };

      const result = employeeDetailNzReducer({}, action);

      expect(result).toEqual({ contactDetail, userInterface });
    });
  });

  describe('SET_MAIN_TAB', () => {
    it('should change the main tab to the specified tab', () => {
      const action = {
        intent: intents.SET_MAIN_TAB,
        mainTab: 'tab 1',
      };
      const result = employeeDetailNzReducer(defaultState, action);
      expect(result).toHaveProperty('userInterface.mainTab', action.mainTab);
    });
  });

  describe('SET_SUB_TAB', () => {
    it('should change the sub tab to the specified tab', () => {
      const action = {
        intent: intents.SET_SUB_TAB,
        mainTab: 'tab 1',
        subTab: 'tab 1 a',
      };

      const result = employeeDetailNzReducer(defaultState, action);
      expect(result).toHaveProperty(`userInterface.subTabs.${action.mainTab}`, action.subTab);
    });

    it('should not update state if mainTab is undefiend', () => {
      const action = {
        intent: intents.SET_SUB_TAB,
        subTab: 'tab 1 a',
      };

      const result = employeeDetailNzReducer(defaultState, action);
      expect(result).toEqual(defaultState);
    });

    it('should not update state if subTab is undefiend', () => {
      const action = {
        intent: intents.SET_SUB_TAB,
        mainTab: 'tab 1',
      };

      const result = employeeDetailNzReducer(defaultState, action);
      expect(result).toEqual(defaultState);
    });
  });

  describe('openModal', () => {
    it('should set modal in store', () => {
      const modal = { type: 'DELETE', url: 'url' };
      const action = { intent: intents.OPEN_MODAL, modal };
      const expectedState = { userInterface: { modal } };

      const actual = employeeDetailNzReducer({}, action);

      expect(actual).toEqual(expectedState);
    });
  });

  describe('closeModal', () => {
    it('should set modal to undefined in store', () => {
      const state = { userInterface: { modal: { type: 'DELETE' } } };
      const action = { intent: intents.CLOSE_MODAL };
      const expected = { userInterface: { modal: undefined } };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('setAlert', () => {
    it('should set the alert in store', () => {
      const state = { alert: undefined };
      const alert = { type: 'success', message: 'alert set' };
      const action = { intent: intents.SET_ALERT, alert };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual({ userInterface: { alert } });
    });
  });

  describe('dismissAlert', () => {
    it('should reset the alert in store', () => {
      const alert = { type: 'success', message: 'alert set' };
      const state = { userInterface: alert };
      const action = { intent: intents.DISMISS_ALERT };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toMatchObject({ userInterface: { alert: undefined } });
    });
  });

  describe('updateEmployeeDetail', () => {
    it('should update the employee detail, set alert and loading state to success', () => {
      const state = {
        userInterface: {
          loadingState: LoadingState.LOADING,
          alert: undefined,
        },
        contactDetail: { firstName: 'Old', lastName: 'state' },
        payrollDetails: { wage: { hourlyRate: '123.45' } },
      };
      const contactDetail = { firstName: 'new', lastName: 'state' };
      const payrollDetails = { wage: { hourlyRate: '543.21' } };
      const expectedState = {
        userInterface: {
          loadingState: LoadingState.LOADING_SUCCESS,
          alert: { type: 'success', message: 'Nice work' },
          isPageEdited: false,
          isSubmitting: false,
        },
        contactDetail,
        payrollDetails,
      };

      const action = {
        intent: intents.UPDATE_EMPLOYEE,
        message: 'Nice work',
        contactDetail,
        payrollDetails,
      };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expectedState);
    });
  });

  describe('setIsSubmitting', () => {
    it('should set isSubmitting in state', () => {
      const action = { intent: intents.SET_SUBMITTING_STATE, isSubmitting: true };

      const actual = employeeDetailNzReducer({}, action);

      expect(actual).toEqual({ userInterface: { isSubmitting: true } });
    });
  });

  describe('setSavingState', () => {
    it('should set submitting state, loading state and modal', () => {
      const state = {
        userInterface: {
          loadingState: LoadingState.LOADING_SUCCESS,
          isSubmitting: false,
          modal: { type: 'DELETE' },
        },
      };
      const expectedState = {
        userInterface: {
          loadingState: LoadingState.LOADING,
          isSubmitting: true,
          modal: undefined,
        },
      };
      const action = { intent: intents.SET_SAVING_STATE };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expectedState);
    });
  });

  describe('updateEmployeeFailed', () => {
    it('should set alert message, submitting state to false and loading state Success', () => {
      const state = {
        userInterface: {
          loadingState: LoadingState.LOADING,
          isSubmitting: true,
        },
      };
      const expectedState = {
        userInterface: {
          loadingState: LoadingState.LOADING_SUCCESS,
          alert: { type: 'danger', message: 'Failed' },
          isSubmitting: false,
        },

      };
      const action = { intent: intents.UPDATE_EMPLOYEE_FAILED, message: 'Failed' };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expectedState);
    });
  });
});
