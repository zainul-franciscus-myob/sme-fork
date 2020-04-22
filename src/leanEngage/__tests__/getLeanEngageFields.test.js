import getLeanEngageFields from '../getLeanEngageFields';

describe('getLeanEngageFields', () => {
  const appId = 'appId';
  const userAuth = { userId: 'exists' };

  const businessDetails = {
    phoneNumber: '03 9555 4567',
    region: 'AU',
    organisationName: 'Clearwater Pty Ltd',
    abn: '80000000001',
    gstBranchNumber: '123',
    acn: '123123123',
    fax: '03 9555 7886',
    email: 'info@clearwater.com.au',
    address: '25 Spring Street\nBlackburn\nVIC, 3130',
    financialYear: '2019',
    lastMonthInFinancialYear: '6',
    openingBalanceDate: '2014-07-01T00:00:00',
    serialNumber: '612312344567',
    hasLockPeriod: true,
    lockDate: '2019-11-11',
  };

  const currentUser = {
    email: 'abc@gmail.com',
    userName: 'rivneg',
    isAdvisor: false,
  };

  const subscription = {
    businessId: '15eb4530-4e9d-49be-b7ae-324b4e252cae',
    type: 'paid',
    product: {
      id: '1',
      name: 'Stub Product',
      displayName: 'Stub Product',
      productLine: 'Stub Product',
    },
  };

  const input = {
    userAuth,
    appId,
    businessDetails,
    currentUser,
    subscription,
  };

  it('should start leanengage with user info', () => {
    const expected = {
      user_id: 'exists',
      name: 'rivneg',
      email: 'a*c@gmail.com',
      user_identity_id: 'exists',
      software_id: '612312344567',
      custom_data: {
        user_type: 'SME',
        region: 'AU',
        account_status: 'active',
        product_type: 'Stub Product_1',
      },
      company: {
        company_id: '15eb4530-4e9d-49be-b7ae-324b4e252cae',
        name: 'C*********P**L**',
      },
      app_id: 'appId',
    };

    const actual = getLeanEngageFields(input);

    expect(actual).toEqual(expected);
  });

  it('should not set the user\'s id if they have not logged in', () => {
    const actual = getLeanEngageFields({ ...input, userAuth: undefined });

    expect(actual.user_id).toBeUndefined();
  });

  it('should set user_type to partner if it is advisor', () => {
    const actual = getLeanEngageFields({
      ...input,
      currentUser: { ...currentUser, isAdvisor: true },
    });

    expect(actual.custom_data.user_type).toEqual('partner');
  });

  it('should set user_type to partner if it is advisor', () => {
    const actual = getLeanEngageFields({
      ...input,
      subscription: { ...subscription, type: 'free' },
    });

    expect(actual.custom_data.account_status).toEqual('trial');
  });

  it('should not set the product_type if no product info', () => {
    const actual = getLeanEngageFields({
      ...input,
      subscription: { ...subscription, product: undefined },
    });

    expect(actual.custom_data.product_type).toBeUndefined();
  });
});
