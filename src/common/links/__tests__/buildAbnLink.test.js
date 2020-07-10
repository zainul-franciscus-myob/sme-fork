import buildAbnLink from '../buildAbnLink';

describe('buildAbnLink', () => {
  it('return abn view page when abn is provided', () => {
    const abn = '13086760198';

    const actual = buildAbnLink(abn);

    expect(actual).toEqual(
      'https://abr.business.gov.au/ABN/View?id=13086760198'
    );
  });

  it('return abn home page when abn is not provided', () => {
    const abn = undefined;

    const actual = buildAbnLink(abn);

    expect(actual).toEqual('https://abr.business.gov.au/');
  });
});
