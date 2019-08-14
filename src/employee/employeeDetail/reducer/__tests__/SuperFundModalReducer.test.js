import {
  CREATE_SUPER_FUND,
  LOAD_ABN_DETAIL,
  SELECT_APRA_FUND,
  UPDATE_SELF_MANAGED_FUND_ABN,
  UPDATE_SUPER_FUND_DETAIL,
} from '../../../EmployeeIntents';
import {
  loadAbnDetail, saveSuperFundModal,
  selectAPRAFund,
  updateSelfManagedFundAbn,
  updateSuperFundDetail,
} from '../SuperFundModalReducer';

describe('superFundModalReducer', () => {
  describe('updateSuperFundDetail', () => {
    it('updates fields', () => {
      const state = {
        superFundModal: {
          superFund: {
            bankNumber: '123',
          },
        },
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'bankNumber',
        value: '456',
      };
      const expected = {
        superFundModal: {
          superFund: {
            bankNumber: '456',
          },
        },
      };

      const actual = updateSuperFundDetail(state, action);

      expect(actual).toEqual(expected);
    });

    it('updates phoneNumber when allowed characters typed', () => {
      const state = {
        superFundModal: {
          superFund: {
            phoneNumber: '123',
          },
        },
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'phoneNumber',
        value: '1234',
      };
      const expected = {
        superFundModal: {
          superFund: {
            phoneNumber: '1234',
          },
        },
      };

      const actual = updateSuperFundDetail(state, action);

      expect(actual).toEqual(expected);
    });

    it('does not update phoneNumber when special chars typed', () => {
      const state = {
        superFundModal: {
          superFund: {
            phoneNumber: '123',
          },
        },
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'phoneNumber',
        value: '123$',
      };
      const expected = {
        superFundModal: {
          superFund: {
            phoneNumber: '123',
          },
        },
      };

      const actual = updateSuperFundDetail(state, action);

      expect(actual).toEqual(expected);
    });

    it('should update fundType to default when isPaySuperFund is changed to false', () => {
      const state = {
        superFundModal: {
          superFund: {
            fundType: 'SelfManagedSuperFund',
            isPaySuperFund: true,
          },
        },
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'isPaySuperFund',
        value: false,
      };
      const expected = {
        superFundModal: {
          superFund: {
            fundType: 'APRASuperFund',
            isPaySuperFund: false,
          },
        },
      };

      const actual = updateSuperFundDetail(state, action);

      expect(actual).toEqual(expected);
    });

    it('should not update fundType to default when isPaySuperFund is changed to true', () => {
      const state = {
        superFundModal: {
          superFund: {
            fundType: 'SelfManagedSuperFund',
            isPaySuperFund: false,
          },
        },
      };
      const action = {
        intent: UPDATE_SUPER_FUND_DETAIL,
        key: 'isPaySuperFund',
        value: true,
      };
      const expected = {
        superFundModal: {
          superFund: {
            fundType: 'SelfManagedSuperFund',
            isPaySuperFund: true,
          },
        },
      };

      const actual = updateSuperFundDetail(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('updateSelfManagedFundAbn', () => {
    it('updates abn field', () => {
      const state = {
        superFundModal: {
          superFund: {
            superProductAbn: '123',
          },
          isAbnDirty: false,
        },
      };
      const action = {
        intent: UPDATE_SELF_MANAGED_FUND_ABN,
        key: 'superProductAbn',
        value: '456',
      };
      const expected = {
        superFundModal: {
          superFund: {
            superProductAbn: '456',
          },
          isAbnDirty: true,
        },
      };

      const actual = updateSelfManagedFundAbn(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('selectAPRAFund', () => {
    it('updates fund details', () => {
      const state = {
        superFundModal: {
          superFund: {
            name: '0',
            superProductAbn: '1',
            superFundIdentifier: '2',
            superProductId: '3',
            superProductName: '4',
          },
        },
      };
      const action = {
        intent: SELECT_APRA_FUND,
        superProduct: {
          name: '44',
          usi: '33',
          abn: '11',
          scfi: '22',
        },
      };
      const expected = {
        superFundModal: {
          superFund: {
            name: '44',
            superProductAbn: '11',
            superFundIdentifier: '22',
            superProductId: '33',
            superProductName: '44',
          },
        },
      };

      const actual = selectAPRAFund(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('loadAbnDetail', () => {
    it('load abn detail', () => {
      const state = {
        superFundModal: {
          superFund: {
            name: 'old',
            superProductName: 'old',
          },
          isAbnDirty: true,
        },
      };
      const action = {
        intent: LOAD_ABN_DETAIL,
        name: 'new',
      };
      const expected = {
        superFundModal: {
          superFund: {
            name: 'new',
            superProductName: 'new',
          },
          isAbnDirty: false,
        },
      };

      const actual = loadAbnDetail(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('saveSuperFundModal', () => {
    it('update super fund options, selected super fund and reset super fund modal', () => {
      const state = {
        payrollDetails: {
          superannuationDetails: {
            selectedSuperFundId: '1',
          },
        },
        superFundOptions: ['old'],
      };
      const action = {
        intent: CREATE_SUPER_FUND,
        superFundOptions: ['new'],
        selectedSuperFundId: '2',
      };
      const expected = {
        payrollDetails: {
          superannuationDetails: {
            selectedSuperFundId: '2',
          },
        },
        superFundOptions: ['new'],
      };

      const actual = saveSuperFundModal(state, action);

      expect(actual).toEqual(expected);
    });
  });
});
