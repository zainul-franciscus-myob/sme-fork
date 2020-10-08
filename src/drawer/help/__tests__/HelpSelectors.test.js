import {
  getIsHelpContentLoaded,
  getLoadHelpContentParams,
  getSearchLink,
} from '../HelpSelectors';

describe('HelpSelectors', () => {
  describe('getSearchLink', () => {
    const state = {
      searchValue: 'Some text',
      region: 'au',
    };

    it('builds the search text and country as query params', () => {
      const actual = getSearchLink(state);
      const expected =
        'https://www.myob.com/au/support/search-results?q=Some%20text&engineName=help&page=1&productFamily=MYOB&country=Australia';

      expect(actual).toEqual(expected);
    });

    it('builds the right query params for New Zealand', () => {
      const modifiedState = {
        ...state,
        region: 'nz',
      };
      const actual = getSearchLink(modifiedState);
      const expected =
        'https://www.myob.com/au/support/search-results?q=Some%20text&engineName=help&page=1&productFamily=MYOB&country=New%20Zealand';

      expect(actual).toEqual(expected);
    });
  });

  describe('getLoadHelpContentParams', () => {
    it('should set the help page route param to custom route', () => {
      const state = {
        defaultHelpPageRoute: '/defaultHelpPageRoute',
        customHelpPageRoute: '/customHelpPageRoute',
      };

      const actual = getLoadHelpContentParams(state);

      expect(actual.helpPageRoute).toEqual(state.customHelpPageRoute);
    });

    it('should set the help page route param to default route if a custom route is not provided', () => {
      const state = {
        defaultHelpPageRoute: '/defaultHelpPageRoute',
      };
      const actual = getLoadHelpContentParams(state);

      expect(actual.helpPageRoute).toEqual(state.defaultHelpPageRoute);
    });
  });

  describe('getIsHelpContentLoaded', () => {
    it('returns false if Help Content has not been loaded', () => {
      const state = {};

      const actual = getIsHelpContentLoaded(state);

      expect(actual).toBeFalsy();
    });

    it('returns false customHelpPageRoute is specified', () => {
      const state = {
        document: {
          fields: {
            pageId: '',
          },
        },
      };

      const actual = getIsHelpContentLoaded(state);

      expect(actual).toBeFalsy();
    });

    it('returns false if currently loaded Help Content does not match defaultHelpPageRoute, and customHelpPageRoute is not specified', () => {
      const state = {
        document: {
          fields: {
            pageId: '/bankTransactionsList/keyboardShortcuts',
          },
        },
        defaultHelpPageRoute: '/bankTransactionsList',
      };

      const actual = getIsHelpContentLoaded(state);

      expect(actual).toBeFalsy();
    });

    it('returns true if currently loaded Help Content matches defaultHelpPageRoute, and customHelpPageRoute is not specified', () => {
      const state = {
        document: {
          fields: {
            pageId: '/bankTransactionsList',
          },
        },
        defaultHelpPageRoute: '/bankTransactionsList',
      };

      const actual = getIsHelpContentLoaded(state);

      expect(actual).toBeTruthy();
    });
  });
});
