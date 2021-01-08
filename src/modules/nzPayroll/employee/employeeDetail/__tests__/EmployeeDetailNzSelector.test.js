import {
  getBusinessId,
  getEmployeeFullName,
  getEmployeeId,
  getEmployeeListUrl,
  getEmployeePayload,
  getIsCreating,
  getIsSubmitting,
  getLoadingState,
  getMainTab,
  getModal,
} from '../EmployeeDetailNzSelectors';
import LoadingState from '../../../../../components/PageView/LoadingState';

describe('EmployeeDetailNzSelectors', () => {
  describe('getBusinessId', () => {
    it('should return businnes id', () => {
      const businessId = 'id';
      const state = {
        businessId,
      };

      const actual = getBusinessId(state);
      expect(actual).toEqual(businessId);
    });
  });

  describe('getLoadingState', () => {
    it('should return loading state', () => {
      const loadingState = LoadingState.LOADING_SUCCESS;
      const state = {
        loadingState,
      };

      const actual = getLoadingState(state);
      expect(actual).toEqual(loadingState);
    });
  });

  describe('getEmployeeId', () => {
    it('should return employee Id', () => {
      const employeeId = 1234;
      const state = {
        employeeId,
      };

      const actual = getEmployeeId(state);
      expect(actual).toEqual(employeeId);
    });
  });

  describe('getEmployeeFullName', () => {
    it('should return employee name as the firstName lastName', () => {
      const state = {
        personalDetail: {
          firstName: 'Bob',
          lastName: 'The Builder',
        },
      };

      const actual = getEmployeeFullName(state);

      expect(actual).toEqual('Bob The Builder');
    });

    it('returns Create employee as the full name when creating new employee', () => {
      const state = { employeeId: 'new' };

      const actual = getEmployeeFullName(state);

      expect(actual).toEqual('Create employee');
    });
  });

  describe('getMainTab', () => {
    it('should return the main tab', () => {
      const state = {
        tabs: {
          main: 'a_tab',
        },
      };
      expect(getMainTab(state)).toEqual(state.tabs.main);
    });
  });

  describe('getEmployeeListUrl', () => {
    it('should build Employee List Url', () => {
      const state = { businessId: 'id', region: 'nz' };

      const actual = getEmployeeListUrl(state);

      expect(actual).toEqual('/#/nz/id/employee');
    });
  });

  it('should return modal from state', () => {
    const modal = { type: 'some-type' };
    const state = { modal };

    const actual = getModal(state);

    expect(actual).toEqual(modal);
  });

  describe('getIsSubmitting', () => {
    it('should return submitting state', () => {
      const state = { isSubmitting: true };

      const actual = getIsSubmitting(state);

      expect(actual).toEqual(true);
    });
  });

  describe('getIsCreating', () => {
    it('should return true when employeeId is new', () => {
      const state = { employeeId: 'new' };

      const actual = getIsCreating(state);

      expect(actual).toEqual(true);
    });
    it('should return false when employeeId is not new', () => {
      const state = { employeeId: 'id' };

      const actual = getIsCreating(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getEmployeePayload', () => {
    const personalDetail = {
      firstName: 'Bob',
      lastName: 'The Builder',
    };
    const payrollDetails = {
      wage: {
        hourlyRate: '100',
      },
    };
    const state = {
      personalDetail,
      payrollDetails,
    };

    it('should contain the personalDetail', () => {
      expect(getEmployeePayload(state)).toMatchObject({ personalDetail });
    });

    it('should contain the payrollDetails', () => {
      expect(getEmployeePayload(state)).toMatchObject({ payrollDetails });
    });
  });
});
