import { getSearchLink } from '../HelpSelectors';

describe('getSearchLink', () => {
  const state = {
    searchValue: 'Some text',
    region: 'au',
  };

  it('builds the search text and country as query params', () => {
    const actual = getSearchLink(state);
    const expected = 'https://www.myob.com/au/support/essentials/search?q=Some%20text&engineName=help&page=1&productFamily=MYOB%20Essentials&country=Australia';

    expect(actual).toEqual(expected);
  });

  it('builds the right query params for New Zealand', () => {
    const modifiedState = {
      ...state,
      region: 'nz',
    };
    const actual = getSearchLink(modifiedState);
    const expected = 'https://www.myob.com/au/support/essentials/search?q=Some%20text&engineName=help&page=1&productFamily=MYOB%20Essentials&country=New%20Zealand';

    expect(actual).toEqual(expected);
  });
});
