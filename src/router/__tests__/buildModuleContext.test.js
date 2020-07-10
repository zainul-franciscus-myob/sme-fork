import buildModuleContext from '../buildModuleContext';

describe('buildModuleContext', () => {
  it('should decode params', () => {
    const url = 'https://localghost:👻';
    const route = {
      params: {
        redirectURL: encodeURIComponent(url),
        c: encodeURIComponent('abc'),
      },
    };
    const expected = { redirectURL: url, c: 'abc' };

    const actual = buildModuleContext(route);
    expect(actual).toStrictEqual(expected);
  });

  it('should not crash param is malformed', () => {
    const malformedParam = '%E0%A4%A';
    const route = { params: { redirectURL: malformedParam } };
    const expected = { redirectURL: malformedParam };

    const actual = buildModuleContext(route);
    expect(actual).toStrictEqual(expected);
  });
});
