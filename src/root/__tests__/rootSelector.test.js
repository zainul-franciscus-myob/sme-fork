import { getTelemetryData } from '../rootSelectors';

describe('rootSelector', () => {
  describe('getTelemetryData', () => {
    const state = {
      region: 'au',
      businessId: 'businessId',
      businessRole: 'businessRole',
      industry: 'industry',
      subscription: {
        startDateTime: 'startDateTime',
        status: 'status',
        product: {
          id: 'productCatalogId',
        },
      },
      currentUser: {
        isAdvisor: true,
      },
    };

    it('retrieves telemetry data from Root store if a business has been selected', () => {
      const expected = {
        region: 'au',
        businessId: 'businessId',
        businessRole: 'businessRole',
        businessCreationDate: 'startDateTime',
        accountStatus: 'status',
        productCatalogId: 'productCatalogId',
        industry: 'industry',
        userType: 'advisor',
      };
      const actual = getTelemetryData(state);

      expect(actual).toEqual(expected);
    });

    it('returns an empty object for telemetry data if a business has not been selected', () => {
      const actual = getTelemetryData({
        businessId: undefined,
      });

      expect(actual).toEqual({});
    });

    it('returns SME as a user type when isAdvisor is false', () => {
      const actual = getTelemetryData({
        ...state,
        currentUser: {
          isAdvisor: false,
        },
      });

      expect(actual.userType).toEqual('SME');
    });
  });
});
