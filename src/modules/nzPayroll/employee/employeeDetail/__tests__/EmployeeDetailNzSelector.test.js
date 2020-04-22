import {
  getBusinessId,
  getEmployeeFullName,
  getEmployeeId,
  getLoadingState,
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
        contactDetail: {
          firstName: 'Bob',
          lastName: 'The Builder',
        },
      };

      const actual = getEmployeeFullName(state);
      expect(actual).toEqual('Bob The Builder');
    });
  });
});