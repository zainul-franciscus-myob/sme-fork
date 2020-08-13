import { LOAD_DEDUCTION_PAY_ITEM_MODAL } from '../../../../EmployeeIntents';
import employeeDetailsReducer from '../../../employeeDetailReducer';

describe('deductionPayItemReducer', () => {
  describe('loadDeductionPayItemModal', () => {
    it('should load with original atoReportingCategory', () => {
      const expected = 'ETPTaxWithholding';

      const state = {
        deductionPayItemModal: {
          deductionPayItem: {
            payItemId: '',
          },
        },
      };
      const actual = employeeDetailsReducer(state, {
        intent: LOAD_DEDUCTION_PAY_ITEM_MODAL,
        response: {
          deductionPayItem: {
            payItemId: '1',
            atoReportingCategory: expected,
          },
        },
      });

      expect(
        actual.deductionPayItemModal.originalDeductionPayItem
          .atoReportingCategory
      ).toBe(expected);
    });
  });
});
