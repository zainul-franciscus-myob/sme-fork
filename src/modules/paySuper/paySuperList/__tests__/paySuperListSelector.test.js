import {
  getBusinessId, getIsTableEmpty, getLoadingState, getPaySuperUrl, getSuperPayments,
} from '../paySuperListSelector';
import LoadingState from '../../../../components/PageView/LoadingState';

describe('paySuperListSelector', () => {
  describe('getLoadingState', () => {
    it('returns isLoading value', () => {
      const state = {
        loadingState: LoadingState.LOADING,
      };

      const actual = getLoadingState(state);

      expect(actual).toEqual(LoadingState.LOADING);
    });
  });

  describe('getBusinessId', () => {
    const businessId = 'BUSINESS';
    const state = {
      businessId,
    };

    const actual = getBusinessId(state);

    expect(actual).toEqual(businessId);
  });

  describe('getIsTableEmpty', () => {
    it('returns true when pay super is not registered', () => {
      const state = {
        isRegistered: false,
        superPayments: [1, 2, 3],
      };

      const isTableEmpty = getIsTableEmpty(state);

      expect(isTableEmpty).toBe(true);
    });
  });

  it('returns true when there are no super payments', () => {
    const state = {
      isRegistered: true,
      superPayments: [],
    };

    const isTableEmpty = getIsTableEmpty(state);

    expect(isTableEmpty).toBe(true);
  });

  it('returns false when pay super registered and there are super payments', () => {
    const state = {
      isRegistered: true,
      superPayments: [1, 2, 3],
    };

    const isTableEmpty = getIsTableEmpty(state);

    expect(isTableEmpty).toBe(false);
  });

  describe('getSuperPayments', () => {
    it('maps string payment status\' to paymentStatus objects', () => {
      const state = {
        superPayments: [
          { status: 'Created' },
        ],
      };

      const superPayments = getSuperPayments(state);

      expect(superPayments).toEqual([{
        status: {
          display: 'Pending authorisation',
          color: 'orange',
        },
      }]);
    });
  });

  describe('getPaySuperUrl', () => {
    it('returns the pay super URL', () => {
      const expectedPaySuperUrl = 'some-pay-super-url';
      const state = {
        paySuperUrl: expectedPaySuperUrl,
      };

      const paySuperUrl = getPaySuperUrl(state);

      expect(paySuperUrl).toEqual(expectedPaySuperUrl);
    });
  });
});
