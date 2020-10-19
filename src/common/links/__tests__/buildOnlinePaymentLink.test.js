import buildOnlinePaymentLink from '../buildOnlinePaymentLink';

describe('buildOnlinePaymentLink', () => {
  const params = {
    url: 'https://e3e8.com',
    businessId: '2b4f04',
    serialNumber: '89274892',
    isTrial: true,
    isRegistered: false,
    location: 'settings',
  };

  it('return online payment link with a correct business id', () => {
    const actual = buildOnlinePaymentLink({
      ...params,
      businessId: '99999999',
    });

    expect(actual).toEqual(
      'https://e3e8.com?target=oip-settings&cdf=99999999&sn=89274892&source=SMEP&isTrial=true&medium=settings&isMerchant=false'
    );
  });

  it('return online payment link with a correct serial number', () => {
    const actual = buildOnlinePaymentLink({
      ...params,
      serialNumber: '99999999',
    });

    expect(actual).toEqual(
      'https://e3e8.com?target=oip-settings&cdf=2b4f04&sn=99999999&source=SMEP&isTrial=true&medium=settings&isMerchant=false'
    );
  });

  it('return online payment link with a correct source', () => {
    const actual = buildOnlinePaymentLink(params);

    expect(actual).toEqual(
      'https://e3e8.com?target=oip-settings&cdf=2b4f04&sn=89274892&source=SMEP&isTrial=true&medium=settings&isMerchant=false'
    );
  });

  it('return online payment link with a correct on trial status', () => {
    const actual = buildOnlinePaymentLink({ ...params, isTrial: false });

    expect(actual).toEqual(
      'https://e3e8.com?target=oip-settings&cdf=2b4f04&sn=89274892&source=SMEP&isTrial=false&medium=settings&isMerchant=false'
    );
  });

  it('return online payment link with a correct medium', () => {
    const actual = buildOnlinePaymentLink({
      ...params,
      location: 'sales settings',
    });

    expect(actual).toEqual(
      'https://e3e8.com?target=oip-settings&cdf=2b4f04&sn=89274892&source=SMEP&isTrial=true&medium=sales%20settings&isMerchant=false'
    );
  });

  it('return online payment link with a correct merchant status', () => {
    const actual = buildOnlinePaymentLink({ ...params, isRegistered: true });

    expect(actual).toEqual(
      'https://e3e8.com?target=oip-settings&cdf=2b4f04&sn=89274892&source=SMEP&isTrial=true&medium=settings&isMerchant=true'
    );
  });
});
