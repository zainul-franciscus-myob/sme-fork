import { isLinkUserPage } from '../NavigationSelectors';

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
});
