import {
  getBusinessId,
  getIsTableEmpty,
  getLoadingState,
  getPaySuperUrl,
  getSuperPayments,
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
    const testCases = [
      {
        input: 'Created',
        expected: { display: 'Pending authorisation', color: 'orange' },
      },
      {
        input: 'PartiallyAuthorised',
        expected: { display: 'Partially Authorised', color: 'orange' },
      },
      {
        input: 'Authorised',
        expected: { display: 'Authorised', color: 'light-grey' },
      },
      {
        input: 'RequestFunds',
        expected: { display: 'Funds requested', color: 'light-grey' },
      },
      {
        input: 'FundsPaid',
        expected: { display: 'Processing payment', color: 'light-grey' },
      },
      {
        input: 'FundsUnavailable',
        expected: { display: 'Withdrawal failed', color: 'red' },
      },
      {
        input: 'FundsTransferError',
        expected: { display: 'Payment failed', color: 'red' },
      },
      {
        input: 'Completed',
        expected: { display: 'Completed', color: 'green' },
      },
      {
        input: 'PaymentDispersmentError',
        expected: { display: 'Reversal required', color: 'red' },
      },
      {
        input: 'ReversalCompleted',
        expected: { display: 'Reversal completed', color: 'green' },
      },
    ];

    testCases.forEach((test) => {
      it(`maps string payment status: ${test.input} to paymentStatus object: ${test.expected.display}, color: ${test.expected.color}`, () => {
        const state = {
          superPayments: [{ status: test.input }],
        };

        const superPayments = getSuperPayments(state);

        expect(superPayments).toEqual([
          {
            status: {
              ...test.expected,
            },
          },
        ]);
      });
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
