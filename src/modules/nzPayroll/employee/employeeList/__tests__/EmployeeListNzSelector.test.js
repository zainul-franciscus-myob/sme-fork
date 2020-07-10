import { getAlert } from '../../employeeDetail/EmployeeDetailNzSelectors';
import {
  getBusinessId,
  getEmployeeList,
  getLoadingState,
} from '../EmployeeListNzSelector';
import LoadingState from '../../../../../components/PageView/LoadingState';

describe('EmployeeListNzSelector', () => {
  describe('getBusinessId', () => {
    it('should return businnes id', () => {
      const businessId = 'id';
      const state = { businessId };

      const actual = getBusinessId(state);

      expect(actual).toEqual(businessId);
    });
  });

  describe('getLoadingState', () => {
    it('should return LoadingState value', () => {
      const state = { loadingState: LoadingState.LOADING_FAIL };

      const actual = getLoadingState(state);

      expect(actual).toEqual(LoadingState.LOADING_FAIL);
    });
  });

  describe('getEmployeeEntries', () => {
    it('should return employee entries', () => {
      const businessId = 12345;
      const region = 'nz';

      const employees = [
        {
          id: '123',
          name: 'Employee, One',
          link: `/#/${region}/${businessId}/employee/123`,
        },
        {
          id: '124',
          name: 'Employee, Two',
          link: `/#/${region}/${businessId}/employee/124`,
        },
      ];
      const state = {
        entries: employees,
        region,
        businessId,
      };

      const actual = getEmployeeList(state);

      expect(actual).toEqual(employees);
    });
  });

  describe('getAlert', () => {
    it('should return the alert from store', () => {
      const alert = { type: 'some-type', message: 'message' };
      const state = { userInterface: { alert } };

      const actual = getAlert(state);

      expect(actual).toEqual(alert);
    });

    it('should return undefined', () => {
      const state = { userInterface: { some: 'props' } };

      const actual = getAlert(state);

      expect(actual).toEqual(undefined);
    });
  });
});
