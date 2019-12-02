import {
  LOAD_EMPLOYEE_LIST_NEXT_PAGE,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
} from '../../EmployeeIntents';
import employeeListReducer from '../employeeListReducer';

describe('employeeListReducer', () => {
  describe('LOAD_EMPLOYEE_LIST_NEXT_PAGE', () => {
    it('does not add to list if id already exists in state entries', () => {
      const state = {
        entries: [
          {
            id: '1',
            name: 'Mayank',
          },
          {
            id: '2',
            name: 'Ryan',
          },
        ],
      };

      const action = {
        intent: LOAD_EMPLOYEE_LIST_NEXT_PAGE,
        entries: [
          {
            id: '2',
            name: 'Ryan',
          },
          {
            id: '3',
            name: 'Thi',
          },
        ],
      };

      const actual = employeeListReducer(state, action);

      expect(actual.entries).toEqual(
        [
          {
            id: '1',
            name: 'Mayank',
          },
          {
            id: '2',
            name: 'Ryan',
          },
          {
            id: '3',
            name: 'Thi',
          },
        ],
      );
    });

    it('sets hasNextPage to false when action.hasNextPage is false', () => {
      const action = {
        intent: LOAD_EMPLOYEE_LIST_NEXT_PAGE,
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      };

      const state = {
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = employeeListReducer(state, action);

      expect(actual).toEqual({
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      });
    });

    it('sets hasNextPage to true when action.hasNextPage is true', () => {
      const action = {
        intent: LOAD_EMPLOYEE_LIST_NEXT_PAGE,
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      };

      const state = {
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = employeeListReducer(state, action);

      expect(actual).toEqual({
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      });
    });
  });

  describe('START_LOADING_MORE', () => {
    it('sets isLoadingMore to true', () => {
      const action = {
        intent: START_LOADING_MORE,
      };

      const state = {
        isLoadingMore: false,
      };

      const actual = employeeListReducer(state, action);

      expect(actual.isLoadingMore).toEqual(true);
    });
  });

  describe('STOP_LOADING_MORE', () => {
    it('sets isLoading to false', () => {
      const action = {
        intent: STOP_LOADING_MORE,
      };

      const state = {
        isLoadingMore: true,
      };

      const actual = employeeListReducer(state, action);

      expect(actual.isLoadingMore).toEqual(false);
    });
  });

  describe('SORT_AND_FILTER_EMPLOYEE_LIST', () => {
    it('sets pagination.hasNextPage to true when action.hasNextPage is true', () => {
      const action = {
        intent: SORT_AND_FILTER_EMPLOYEE_LIST,
        pagination: {
          hasNextPage: true,
        },
      };
      const state = {
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = employeeListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(true);
    });

    it('sets pagination.hasNextPage to false when action.hasNextPage is false', () => {
      const action = {
        intent: SORT_AND_FILTER_EMPLOYEE_LIST,
        pagination: {
          hasNextPage: false,
        },
      };
      const state = {
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = employeeListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(false);
    });
  });
});
