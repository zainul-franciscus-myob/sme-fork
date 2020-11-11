import * as intents from '../../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { tabIds } from '../tabItems';
import LoadingState from '../../../../../components/PageView/LoadingState';
import employeeDetailNzReducer from '../employeeDetailNzReducer';

const defaultState = {
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  alert: undefined,
  isSubmitting: false,
  tabs: {
    main: tabIds.contactDetails,
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
  payrollDetails: {
    employmentDetails: {
      dateOfBirth: '',
      gender: 'NotSet',
      startDate: '',
      terminationDate: '',
      employmentBasis: '',
      employmentCategory: '',
      employmentStatus: '',
      paySlipDelivery: '',
      paySlipEmail: '',
    },
  },
};

describe('EmployeeDetailNzReducer', () => {
  describe('setInitialState', () => {
    it('should set initial state with context', () => {
      const context = {
        businessId: 'id',
        region: 'nz',
      };
      const action = {
        intent: SET_INITIAL_STATE,
        context,
      };

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
      const action = {
        intent: SET_INITIAL_STATE,
        context,
      };

      const result = employeeDetailNzReducer(undefined, action);

      expect(result).toHaveProperty('tabs.main', context.mainTab);
      expect(result).toHaveProperty(
        `tabs.subTabs.${context.mainTab}`,
        context.subTab
      );
    });
  });

  describe('resetState', () => {
    it('resets state to the default state', () => {
      const state = {
        firstName: 'Bob',
        businessId: 'id',
      };
      const action = {
        intent: RESET_STATE,
      };

      const result = employeeDetailNzReducer(state, action);

      expect(result).toEqual(defaultState);
    });
  });

  describe('loadEmployeeDetail', () => {
    it('should load the Employee Details', () => {
      const contactDetail = {
        firstName: 'Bob',
        lastName: 'The Builder',
        isInactive: true,
        employeeNumber: '00012',
        country: 'New Zealand',
        address: '2/34 Park Avenue',
        suburb: 'Auckland',
        state: '',
        postcode: '7400',
        email: 'e@email.com',
        phoneNumbers: ['03 93883848', '03 94839483', '03 94839482'],
        notes: '',
      };

      const payrollDetails = {
        employmentDetails: {
          dateOfBirth: '06/02/1987',
          gender: 'Male',
          startDate: '10/10/2018',
          terminationDate: '10/10/2020',
        },
      };

      const action = {
        intent: intents.LOAD_EMPLOYEE_DETAIL,
        payload: { contactDetail, payrollDetails },
      };

      const state = {
        contactDetail: {},
        payrollDetails: {
          employmentDetails: {},
        },
      };

      const result = employeeDetailNzReducer(state, action);

      expect(result).toEqual({
        contactDetail,
        payrollDetails,
        loadingState: LoadingState.LOADING_SUCCESS,
      });
    });
  });

  describe('loadEmployeeDetailFailed', () => {
    it('should change the loadingState to LOADING_FAIL', () => {
      const action = {
        intent: intents.LOAD_EMPLOYEE_DETAIL_FAILED,
      };
      const result = employeeDetailNzReducer(defaultState, action);
      expect(result).toHaveProperty('loadingState', LoadingState.LOADING_FAIL);
    });
  });

  describe('SET_MAIN_TAB', () => {
    it('should change the main tab to the specified tab', () => {
      const action = {
        intent: intents.SET_MAIN_TAB,
        mainTab: 'tab 1',
      };
      const result = employeeDetailNzReducer(defaultState, action);
      expect(result).toHaveProperty('tabs.main', action.mainTab);
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
      expect(result).toHaveProperty(
        `tabs.subTabs.${action.mainTab}`,
        action.subTab
      );
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

  describe('updateContactDetails', () => {
    it('should update firstName field detail and set isPageEdited to true', () => {
      const state = {
        contactDetail: {
          firstName: 'test',
        },
      };
      const action = {
        intent: intents.UPDATE_CONTACT_DETAIL,
        key: 'firstName',
        value: 'name',
      };
      const expected = {
        isPageEdited: true,
        contactDetail: {
          firstName: 'name',
        },
      };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should update country and set isPageEdited to true', () => {
      const state = {
        contactDetail: {
          country: 'Australia',
        },
      };
      const action = {
        intent: intents.UPDATE_CONTACT_DETAIL,
        key: 'country',
        value: 'New Zealand',
      };
      const expected = {
        isPageEdited: true,
        contactDetail: {
          country: 'New Zealand',
        },
      };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('openModal', () => {
    it('should set modal in store', () => {
      const modal = { type: 'DELETE', url: 'url' };
      const action = { intent: intents.OPEN_DELETE_MODAL, modal };
      const expectedState = { modal };

      const actual = employeeDetailNzReducer({}, action);

      expect(actual).toEqual(expectedState);
    });
  });

  describe('closeModal', () => {
    it('should set modal to undefined in store', () => {
      const state = { modal: { type: 'DELETE' } };
      const action = { intent: intents.CLOSE_MODAL };
      const expected = { modal: undefined };

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

      expect(actual).toEqual({ alert });
    });
  });

  describe('dismissAlert', () => {
    it('should reset the alert in store', () => {
      const alert = { type: 'success', message: 'alert set' };
      const state = { alert };
      const action = { intent: intents.DISMISS_ALERT };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual({ alert: undefined });
    });
  });

  describe('updateEmployeeDetail', () => {
    it('should update the employee detail, set alert and loading state to success', () => {
      const state = {
        loadingState: LoadingState.LOADING,
        alert: undefined,
        contactDetail: {
          firstName: 'Old',
          lastName: 'Old',
          isInactive: true,
          employeeNumber: '1',
          country: 'New Zealand',
          address: '2/34 Park Avenue',
          suburb: 'Auckland',
          state: '',
          postcode: '7400',
          email: 'e@email.com',
          phoneNumbers: ['03 93883848', '03 94839483', '03 94839482'],
          notes: '',
        },
        payrollDetails: {
          wage: {
            hourlyRate: '123.45',
          },
        },
      };

      const contactDetail = {
        firstName: 'Bob',
        lastName: 'The Builder',
        isInactive: true,
        employeeNumber: '00012',
        country: 'New Zealand',
        address: '2/34 Park Avenue',
        suburb: 'Auckland',
        state: 'new',
        postcode: '7400',
        email: 'e@email.com',
        phoneNumbers: ['03 93883848', '03 94839483', '03 94839482'],
        notes: '',
      };

      const payrollDetails = {
        employmentDetails: {
          dateOfBirth: '06/02/1987',
          gender: 'Male',
          startDate: '10/10/2018',
          terminationDate: '10/10/2020',
        },
        wage: {
          hourlyRate: '543.21',
        },
      };

      const action = {
        intent: intents.UPDATE_EMPLOYEE,
        message: 'Nice work',
        contactDetail,
        payrollDetails,
      };

      const expectedState = {
        alert: {
          type: 'success',
          message: 'Nice work',
        },
        contactDetail,
        payrollDetails,
        loadingState: LoadingState.LOADING_SUCCESS,
        isPageEdited: false,
        isSubmitting: false,
      };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expectedState);
    });
  });

  describe('deletingEmployee', () => {
    it('should set isSubmitting in state', () => {
      const action = {
        intent: intents.DELETING_EMPLOYEE,
        isSubmitting: true,
      };

      const actual = employeeDetailNzReducer({}, action);

      expect(actual).toEqual({ isSubmitting: true });
    });
  });

  describe('deleteEmployeeFailed', () => {
    it('should set isSubmitting, and modal alert in state', () => {
      const action = {
        intent: intents.DELETE_EMPLOYEE_FAILED,
        message: 'Failed',
      };

      const actual = employeeDetailNzReducer({}, action);

      expect(actual).toEqual({
        isSubmitting: false,
        alert: {
          type: 'danger',
          message: 'Failed',
        },
      });
    });
  });

  describe('updatingEmployeeDetails', () => {
    it('should set submitting state, loading state and modal', () => {
      const state = {
        loadingState: LoadingState.LOADING_SUCCESS,
        isSubmitting: false,
        modal: { type: 'DELETE' },
      };
      const action = { intent: intents.UPDATING_EMPLOYEE };
      const expectedState = {
        loadingState: LoadingState.LOADING,
        isSubmitting: true,
        modal: undefined,
      };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expectedState);
    });
  });

  describe('updateEmployeeFailed', () => {
    it('should set alert message, submitting state to false and loading state Success', () => {
      const state = {
        loadingState: LoadingState.LOADING,
        isSubmitting: true,
      };
      const action = {
        intent: intents.UPDATE_EMPLOYEE_FAILED,
        message: 'Failed',
      };

      const expectedState = {
        loadingState: LoadingState.LOADING_SUCCESS,
        isSubmitting: false,
        alert: {
          type: 'danger',
          message: 'Failed',
        },
      };

      const actual = employeeDetailNzReducer(state, action);

      expect(actual).toEqual(expectedState);
    });
  });
});
