import {
  getBusinessId,
  getCurrentSubTab,
  getEmployeeFullName,
  getEmployeeId,
  getEmployeeListUrl,
  getEmployeePayload,
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
        contactDetail: {
          firstName: 'Bob',
          lastName: 'The Builder',
        },
      };

      const actual = getEmployeeFullName(state);
      expect(actual).toEqual('Bob The Builder');
    });
  });

  describe('getMainTab', () => {
    it('should return the main tab', () => {
      const state = {
        tabs: {
          main: 'a_tab',
        },
      };
      expect(getMainTab(state))
        .toEqual(state.tabs.main);
    });
  });

  describe('getCurrentSubTab', () => {
    it('should return the current sub tab', () => {
      const state = {
        tabs: {
          main: 'tab_a',
          subTabs: {
            tab_a: 'tab_a_1',
          },
        },
      };
      expect(getCurrentSubTab(state))
        .toEqual(state.tabs.subTabs.tab_a);
    });
    it('should return undefined if current main tab has no sub tab', () => {
      const state = {
        tabs: {
          main: 'tab_b',
          subTabs: {
            tab_a: 'tab_a_1',
          },
        },
      };
      expect(getCurrentSubTab(state))
        .toBeUndefined();
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

  describe('getEmployeePayload', () => {
    const contactDetail = {
      firstName: 'Bob',
      lastName: 'The Builder',
    };
    const payrollDetails = {
      employmentDetails: {
        employmentStatus: 'Casual',
        terminationDate: '2015-0-01T:00:00:00',
        startDate: '2010-0-01T:00:00:00',
        genderOptions: [{ name: 'Gender 1', value: 'Gender 1' }],
        dateOfBirth: '2000-01-01T00:00:00',
      },
      wage: {
        hourlyRate: '100',
      },
    };
    const state = {
      contactDetail,
      payrollDetails,
    };

    it('should contain the contactDetail', () => {
      expect(getEmployeePayload(state)).toMatchObject({ contactDetail });
    });

    it('should contain the payrollDetails', () => {
      expect(getEmployeePayload(state)).toMatchObject({ payrollDetails });
    });
  });
});
