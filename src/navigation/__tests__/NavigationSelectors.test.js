import {
  getBusinessAbbreviation, getMenuLogoUrl, isLinkUserPage, noOpRouteNames,
} from '../NavigationSelectors';

describe('NavigationSelectors', () => {
  describe('isLinkUserPage', () => {
    it('should return true if the current route is the link user page', () => {
      const currentRouteName = 'linkUser/linkUser';
      const actual = isLinkUserPage({ currentRouteName });
      expect(actual).toEqual(true);
    });

    it('should return false if the current route is the spend money detail page', () => {
      const currentRouteName = 'spendMoney/spendMoneyDetail';
      const actual = isLinkUserPage({ currentRouteName });
      expect(actual).toEqual(false);
    });
  });

  describe('getMenuLogoUrl', () => {
    it('should return current url if current route name is no op', () => {
      const state = {
        currentRouteName: noOpRouteNames[0],
        routeParams: {
          businessId: 'businessId',
        },
      };
      const currentUrl = 'currentUrl';
      const actual = getMenuLogoUrl(state)(currentUrl);
      expect(actual).toEqual(currentUrl);
    });

    it('should return dashboardUrl if current route name is operational', () => {
      const businessId = 'businessId';
      const currentRouteName = 'bills';
      const state = {
        currentRouteName,
        routeParams: {
          businessId,
        },
      };
      const currentUrl = 'currentUrl';
      const actual = getMenuLogoUrl(state)(currentUrl);
      expect(actual).toEqual(`#/au/${businessId}/dashboard`);
    });
  });

  describe('getBusinessAbbreviation', () => {
    it.each([
      ['should return first letter of the first two words', 'Stark Industry', 'SI'],
      ['should ignore any sequential words after two words', 'Mind Your Own Business', 'MY'],
      ['should return a single letter if business name has only one word', 'Bob', 'B'],
      ['should ignore multiple empty space', 'Bob   Business', 'BB'],
      ['should treat symbol connecting to a word as part of the word', 'Bob\'s Business', 'BB'],
      ['should split into multiple word on capital letter', 'BobsBusiness', 'BB'],
      ['should treat the split word as normal word', 'BobsBusiness Saga', 'BB'],
      ['should ignore Pty', 'Bluebird Pty Ltd', 'B'],
      ['should ignore Ltd', 'Bluebird Ltd', 'B'],
      ['should treat symbol as any character', '#SymbolicBusinessName', '#S'],
      ['should allow lower case as the first letter', 'camelCaseBusinessName', 'CC'],
      ['should ignore empty space at the beginning of the name', ' empty space in front', 'ES'],
      ['should return empty string when name is empty', '', ''],
    ])('%s', (scenario, businessName, expected) => {
      const actual = getBusinessAbbreviation.resultFunc(businessName);

      expect(actual).toEqual(expected);
    });
  });
});
