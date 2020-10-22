import { getPayDirectOptions } from '../payDirectSelectors';

describe('payDirectSelectors', () => {
  describe('getPayDirectOptions', () => {
    describe('can apply surcharge', () => {
      const state = {
        subscription: {
          isTrial: false,
        },
        invoice: {
          isAllowOnlinePayment: true,
          canApplySurcharge: true,
        },
        payDirect: {
          isSurchargingAvailable: true,
          isSurchargingRegistered: true,
        },
      };
      const actual = getPayDirectOptions(state);

      it('returns surcharge is registered', () => {
        expect(actual.hasSetupSurcharging).toEqual(true);
      });

      it('returns invoice can apply surcharge', () => {
        expect(actual.canApplySurcharge).toEqual(true);
      });
    });

    describe('Can not apply surcharge', () => {
      const state = {
        subscription: {
          isTrial: false,
        },
        invoice: {
          isAllowOnlinePayment: true,
          canApplySurcharge: false,
        },
        payDirect: {
          isSurchargingAvailable: true,
          isSurchargingRegistered: false,
        },
      };
      const actual = getPayDirectOptions(state);

      it('returns surcharge is not registered', () => {
        expect(actual.hasSetupSurcharging).toEqual(false);
      });

      it('returns invoice is not surcharged', () => {
        expect(actual.canApplySurcharge).toEqual(false);
      });
    });
  });
});
