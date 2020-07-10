import {
  ADD_EMPLOYEE,
  ADD_EXEMPTION,
  LOAD_NEW_PAY_ITEM,
  REMOVE_EMPLOYEE,
  REMOVE_EXEMPTION,
} from '../../DeductionPayItemIntents';
import deductionPayItemReducer from '../deductionPayItemReducer';
import loadDeductionPayItem from './fixtures/loadDeductionPayItem';

describe('deductionPayItemReducer', () => {
  describe('loadPayItem', () => {
    let actual;

    beforeEach(() => {
      const state = {
        businessId: '1',
        details: {},
      };
      actual = deductionPayItemReducer(state, {
        intent: LOAD_NEW_PAY_ITEM,
        ...loadDeductionPayItem,
      });
    });

    it('should merge in the correct root level data', () => {
      const {
        details,
        information,
        employeeAllocations,
        exemptionAllocations,
        ...rootData
      } = actual;
      const expected = {
        businessId: '1',
        title: 'Union Fees',
      };
      expect(rootData).toEqual(expected);
    });

    it('should be able to group details related data into the state', () => {
      const { details } = actual;
      const expected = {
        name: 'Union Fees',
        atoReportingCategory: 'NotReportable',
        linkedPayableAccountId: '456',
        accounts: [
          {
            id: '134',
            displayName: 'Expense 1',
            accountType: 'Expense',
            displayId: '6-134',
          },
        ],
        atoReportCategoryList: [
          {
            name: 'ETP - Tax withholding',
            value: 'ETPTaxWithholding',
          },
        ],
      };
      expect(details).toEqual(expected);
    });

    it('should be able to group deduction information data into the state', () => {
      const { information } = actual;
      const expected = {
        calculationBasis: 'FixedDollar',
        calculationPercentage: '3.00',
        calculationPercentOfId: '33',
        calculationDollars: '56.00',
        calculationPer: 'Hour',
        limit: 'Percent',
        limitPercentage: '5.00',
        limitPercentOfId: '34',
        limitDollars: '100.10',
        limitPer: 'Quarter',
        calculationBasisOptions: [
          {
            name: 'User-entered amount per pay period',
            value: 'UserEntered',
          },
        ],
        calculationPercentOfOptions: [
          {
            id: '34',
            itemType: 'WagesGroup',
            displayName: 'Federal Wages',
          },
        ],
        calculationDollarPerOptions: [
          {
            name: 'Year',
            value: 'Year',
          },
        ],
        limitOptions: [
          {
            name: 'Equals dollars per pay period',
            value: 'FixedDollar',
          },
        ],
        limitPercentOfOptions: [
          {
            id: '34',
            itemType: 'WagesGroup',
            displayName: 'Federal Wages',
          },
        ],
        limitDollarPerOptions: [
          {
            name: 'Year',
            value: 'Year',
          },
        ],
      };
      expect(information).toEqual(expected);
    });

    it('should be able to group employee allocation data into the state', () => {
      const { employeeAllocations } = actual;
      const expected = {
        selectedEmployees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
        ],
        employees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
          {
            name: 'Helen Row',
            id: '3',
          },
        ],
      };

      expect(employeeAllocations).toEqual(expected);
    });

    it('should be able to group exemptions data into the state', () => {
      const { exemptionAllocations } = actual;
      const expected = {
        selectedExemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
        exemptions: [
          {
            name: 'PAYG Withholding',
            id: '34',
            itemType: 'Tax',
          },
        ],
      };

      expect(exemptionAllocations).toEqual(expected);
    });
  });

  describe('addEmployee', () => {
    it('should add the selected employee to the selectedEmployees list', () => {
      const state = {
        employeeAllocations: {
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
          selectedEmployees: [],
        },
      };

      const action = {
        intent: ADD_EMPLOYEE,
        key: '',
        value: '1',
      };

      const { employeeAllocations } = deductionPayItemReducer(state, action);

      const expected = {
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
        selectedEmployees: [
          {
            name: 'Calie Mory',
            id: '1',
          },
        ],
      };

      expect(employeeAllocations).toEqual(expected);
    });
  });

  describe('removeEmployee', () => {
    it('should remove the selected employee from the selectedEmployees list', () => {
      const state = {
        employeeAllocations: {
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
          selectedEmployees: [
            {
              name: 'Sylvia Belt',
              id: '2',
            },
          ],
        },
      };

      const action = {
        intent: REMOVE_EMPLOYEE,
        id: '2',
      };

      const { employeeAllocations } = deductionPayItemReducer(state, action);

      const expected = {
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
        selectedEmployees: [],
      };

      expect(employeeAllocations).toEqual(expected);
    });
  });

  describe('addExemption', () => {
    it('should add the selected exemption to the selectedExemptions list', () => {
      const state = {
        exemptionAllocations: {
          exemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
          selectedExemptions: [],
        },
      };

      const action = {
        intent: ADD_EXEMPTION,
        key: '',
        value: '33',
      };

      const { exemptionAllocations } = deductionPayItemReducer(state, action);

      const expected = {
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
        selectedExemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
      };

      expect(exemptionAllocations).toEqual(expected);
    });
  });

  describe('removeExemption', () => {
    it('should remove the selected exemption from the selectedExemptions list', () => {
      const state = {
        exemptionAllocations: {
          exemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
          selectedExemptions: [
            {
              name: 'Salary Sacrifice',
              id: '33',
              itemType: 'Wages',
            },
          ],
        },
      };

      const action = {
        intent: REMOVE_EXEMPTION,
        id: '33',
      };

      const { exemptionAllocations } = deductionPayItemReducer(state, action);

      const expected = {
        exemptions: [
          {
            name: 'Salary Sacrifice',
            id: '33',
            itemType: 'Wages',
          },
        ],
        selectedExemptions: [],
      };

      expect(exemptionAllocations).toEqual(expected);
    });
  });
});
