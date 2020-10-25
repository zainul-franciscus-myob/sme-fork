import getTrackUserEventFields from '../getTrackUserEventFields';

describe('getTrackUserEventFields', () => {
  const businessId = '12345';
  const subscription = {
    product: {
      displayName: 'Stub Product',
      id: '1',
      name: 'Stub Product Name',
      productLine: 'Stub Product Line',
    },
  };

  it('create telemetry user event data', () => {
    const actual = getTrackUserEventFields({
      businessId,
      subscription,
      user: { userId: 'userId' },
      customProperties: { label: 'some label', customProp: 'some property' },
    });

    const expected = {
      userId: 'userId',
      businessId: '12345',
      action: '',
      label: 'some label',
      url: 'http://localhost/',
      product: 'Stub Product Name',
      productFamily: 'SME',
      productLine: 'Stub Product Line',
      category: 'SME',
      timestamp: actual?.timestamp,
      customProp: 'some property',
    };

    expect(actual).toEqual(expected);
  });

  it('return empty object if no business Id', () => {
    const actual = getTrackUserEventFields({});
    expect(actual).toEqual({});
  });
});
