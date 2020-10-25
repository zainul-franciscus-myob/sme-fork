import getRecordPageVisitFields from '../getRecordPageVisitFields';

describe('getRecordPageVisitFields', () => {
  const data = {
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
    const actual = getRecordPageVisitFields(data);

    expect(actual).toEqual(expected);
  });

  it('returns an empty object for telemetry data if a business has not been selected', () => {
    const actual = getRecordPageVisitFields({
      businessId: undefined,
    });

    expect(actual).toEqual({});
  });

  it('returns SME as a user type when isAdvisor is false', () => {
    const actual = getRecordPageVisitFields({
      ...data,
      currentUser: {
        isAdvisor: false,
      },
    });

    expect(actual.userType).toEqual('SME');
  });
});
