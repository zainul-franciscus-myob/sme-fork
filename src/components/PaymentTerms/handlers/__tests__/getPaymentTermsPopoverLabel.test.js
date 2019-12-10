import getPaymentTermsPopoverLabel from '../getPaymentTermsPopoverLabel';

describe('getPaymentTermsPopoverLabel', () => {
  it('Returns the text label when the term is Prepaid', () => {
    const actual = getPaymentTermsPopoverLabel({
      issueDate: '2019-02-04',
      expirationTerm: 'Prepaid',
      expirationDays: '25',
      expirationTermOptions: [
        {
          value: 'Prepaid',
          name: 'Prepaid',
        },
      ],
    });
    const expected = 'Prepaid';

    expect(actual).toBe(expected);
  });

  it('Returns the text label when the term is Cash on Delivery', () => {
    const actual = getPaymentTermsPopoverLabel({
      issueDate: '2019-02-04',
      expirationDays: '32',
      expirationTerm: 'CashOnDelivery',
      expirationTermOptions: [
        {
          value: 'CashOnDelivery',
          name: 'C.O.D.',
        },
      ],
    });
    const expected = 'C.O.D.';

    expect(actual).toBe(expected);
  });

  it('Returns the expiration date as the label when the term is not COD or Prepaid', () => {
    const actual = getPaymentTermsPopoverLabel({
      issueDate: '2019-04-30',
      expirationTerm: 'NumberOfDaysAfterEOM',
      expirationDays: '32',
    });
    const expected = '01/06/2019';

    expect(actual).toBe(expected);
  });
});
