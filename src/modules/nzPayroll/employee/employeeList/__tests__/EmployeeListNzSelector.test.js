import { getBusinessId, getEmployeeList, getLoadingState } from '../EmployeeListNzSelector';
import LoadingState from '../../../../../components/PageView/LoadingState';

describe('EmployeeListNzSelector', () => {
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
    it('should return LoadingState value', () => {
      const state = {
        loadingState: LoadingState.LOADING_FAIL,
      };

      const actual = getLoadingState(state);
      expect(actual).toEqual(LoadingState.LOADING_FAIL);
    });
  });

  describe('getEmployeeEntries', () => {
    it('should return employee entries', () => {
      const employees = [
        {
          id: '123',
          name: 'Employee, One',
        },
        {
          id: '123',
          name: 'Employee, Two',
        }];
      const state = {
        entries: employees,
      };

      const actual = getEmployeeList(state);
      expect(actual).toEqual(employees);
    });
  });
});
