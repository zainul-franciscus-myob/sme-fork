import {
  ADD_EMPLOYEE,
  ADD_EXEMPTION,
  REMOVE_EMPLOYEE,
  REMOVE_EXEMPTION,
} from '../WagePayItemIntents';
import wagePayItemReducer from '../wagePayItemReducer';

describe('wagePayItemReducer', () => {
  describe('addEmployeeToSelectedList', () => {
    it('should add the selected employee to the selectedEmployees list', () => {
      const state = {
        wage: {
          selectedEmployees: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
      };

      const action = {
        intent: ADD_EMPLOYEE,
        key: '',
        value: '1',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedEmployees: [
            {
              name: 'Calie Mory',
              id: '1',
            },
          ],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('removeEmployeeFromSelectedList', () => {
    it('should remove the selected employee from the selectedEmployees list', () => {
      const state = {
        wage: {
          selectedEmployees: [
            {
              name: 'Sylvia Belt',
              id: '2',
            },
          ],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
      };

      const action = {
        intent: REMOVE_EMPLOYEE,
        id: '2',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedEmployees: [],
        },
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Sylvia Belt',
            id: '2',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('addExemptionToSelectedList', () => {
    it('should add the selected exemption to the selectedExemptions list', () => {
      const state = {
        wage: {
          selectedExemptions: [],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
      };

      const action = {
        intent: ADD_EXEMPTION,
        key: '',
        value: '33',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('removeExemptionFromSelectedList', () => {
    it('should remove the selected exemption from the selectedExemptions list', () => {
      const state = {
        wage: {
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
      };

      const action = {
        intent: REMOVE_EXEMPTION,
        id: '33',
      };

      const actual = wagePayItemReducer(state, action);

      const expected = {
        wage: {
          selectedExemptions: [],
        },
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });
});
