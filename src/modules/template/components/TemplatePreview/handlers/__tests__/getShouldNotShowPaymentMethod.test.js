import getShouldNotShowPaymentMethod from '../getShouldNotShowPaymentMethod';

describe('getShouldNotShowPaymentMethod', () => {
  describe('NZ', () => {
    const region = 'nz';

    it('returns true if there is no bankDeposit or cheque in payments', () => {
      const actual = getShouldNotShowPaymentMethod({
        region,
      });

      expect(actual).toBeTruthy();
    });

    it('returns false if there is is bankDeposit and/or cheque in payments', () => {
      const actual = getShouldNotShowPaymentMethod({
        region,
        bankDeposit: 'yes',
      });

      expect(actual).toBeFalsy();
    });
  });

  describe('AU', () => {
    const region = 'au';

    it('returns true if there is no bankDeposit or cheque in payments && online payment has finished loading with not registered status', () => {
      const actual = getShouldNotShowPaymentMethod({
        region,
        isOnlinePaymentLoading: false,
        isAllowOnlinePayment: false,
      });

      expect(actual).toBeTruthy();
    });

    it('returns false if there is online payment has finished loading with registered status', () => {
      const actual = getShouldNotShowPaymentMethod({
        region,
        isOnlinePaymentLoading: false,
        isAllowOnlinePayment: true,
      });

      expect(actual).toBeFalsy();
    });

    it('returns false if there is bankDeposit and/or direct debit in payments', () => {
      const actual = getShouldNotShowPaymentMethod({
        region,
        isOnlinePaymentLoading: false,
        isAllowOnlinePayment: false,
        bankDeposit: 'something',
      });

      expect(actual).toBeFalsy();
    });
  });
});
