import {
  getModuleAction,
  getTelemetryData,
  getTelemetryFields,
} from '../rootSelectors';
import ModuleAction from '../../common/types/ModuleAction';
import RouteName from '../../router/RouteName';

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
        type: 'trial',
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
        accountType: 'trial',
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

  describe('getModuleAction', () => {
    describe('LOAD_BUSINESS', () => {
      it.each([
        [false, 'when business is not selected', '', '', 'routeName'],
        [true, 'when business is selected', 'new', '', 'routeName'],
        [true, 'when business has changed', 'new', 'old', 'routeName'],
        [false, 'when business has not changed', 'same', 'same', 'routeName'],
        [
          true,
          'when previous route is link user page',
          'same',
          'same',
          RouteName.LINK_USER,
        ],
        [false, 'when current route is error page', '', '', RouteName.ERROR],
      ])(
        'returns %s',
        (
          expected,
          _,
          currentBusinessId,
          previousBusinessId,
          previousRouteName
        ) => {
          const actual = getModuleAction({
            currentBusinessId,
            previousBusinessId,
            previousRouteName,
          });

          expect(actual[ModuleAction.LOAD_BUSINESS]).toEqual(expected);
        }
      );
    });
  });

  describe('get Telemetry User Event Data', () => {
    const state = {
      region: 'au',
      businessId: '12345',
      businessRole: 'businessRole',
      industry: 'industry',
      subscription: {
        product: {
          displayName: 'Stub Product',
          id: '1',
          name: 'Stub Product Name',
          productLine: 'Stub Product Line',
        },
      },
      currentUser: {
        isAdvisor: true,
      },
    };

    it('create telemetry user event data ', () => {
      const actual = getTelemetryFields(
        state,
        { userId: 'userId' },
        'some event',
        { label: 'some label', customProp: 'some property' }
      );

      const expected = {
        eventName: 'some event',
        userId: 'userId',
        eventProperties: {
          userId: 'userId',
          businessId: '12345',
          action: '',
          label: 'some label',
          url: 'http://localhost/',
          product: 'Stub Product Name',
          productFamily: 'SME',
          productLine: 'Stub Product Line',
          category: 'SME',
          timestamp: actual?.eventProperties?.timestamp,
          customProp: 'some property',
        },
      };

      expect(actual).toEqual(expected);
    });

    it('return empty object if no business Id', () => {
      const actual = getTelemetryFields({}, { userId: 'userId' });
      expect(actual).toEqual({});
    });
  });
});
