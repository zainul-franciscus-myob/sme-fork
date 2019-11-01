import { getWistiaUriId } from '../RichText';

describe('getWistiaUriId', () => {
  it('returns the uri id from the wistia link', () => {
    const wistiaLink = 'https://wistia.somevideo.com/1234';
    const actual = getWistiaUriId(wistiaLink);
    const expected = '1234';

    expect(actual).toEqual(expected);
  });
});
