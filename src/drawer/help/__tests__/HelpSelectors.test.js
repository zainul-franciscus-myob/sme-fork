import { getSearchLink } from '../HelpSelectors';

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
