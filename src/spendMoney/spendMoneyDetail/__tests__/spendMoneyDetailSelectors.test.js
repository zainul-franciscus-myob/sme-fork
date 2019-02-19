import {
  getLineDataByIndexSelector,
  getSpendMoneyForCreatePayload,
  getSpendMoneyForUpdatePayload,
} from '../spendMoneyDetailSelectors';
import spendMoneyDetail from './fixtures/spendMoneyDetail';

describe('spendMoneySelectors', () => {
  it('getLineData', () => {
    const getlineDataByIndex = getLineDataByIndexSelector();
    const lineData = getlineDataByIndex(spendMoneyDetail, { index: 0 });
    const accounts = [
      {
        id: '123',
        displayName: 'My Sales Account 1',
        accountType: 'Sales',
        taxCodeId: '123',
        displayId: '1-123',
      },
      {
        id: '456',
        displayName: 'My Assets Account 1',
        accountType: 'Assets',
        taxCodeId: '124',
        displayId: '2-123',
      },
    ];
    const taxCodes = [
      {
        id: '123',
        displayName: 'GST',
        description: 'Goods & Service Tax',
        displayRate: '10%',
      },
      {
        id: '124',
        displayName: 'FRE',
        description: 'GST FREE',
        displayRate: '5%',
      },
    ];

    const expectedData = {
      accountId: '123',
      taxCodeId: '123',
      amount: '100',
      taxAmount: '',
      description: '',
      taxCodes,
      accounts,
      selectedAccountIndex: 0,
      selectedTaxCodeIndex: 0,
    };
    expect(lineData).toEqual(expectedData);
  });

  const spendMoneyPayloadInput = {
    spendMoney: {
      referenceId: 'foo',
      selectedPayFromAccountId: 'bar',
      selectedPayToContactId: 'contactId',
      payFromAccounts: [1, 2, 3, 4],
      payToContacts: [1, 2, 3, 4],
      date: '12-1-2017',
      description: 'txt',
      isReportable: 'true',
      isTaxInclusive: 'false',
      originalReferenceId: '1234',
      lines: [{ a: 'foo', accounts: [], taxCodes: [] }],
    },
  };

  describe('getSpendMoneyForUpdatePayload', () => {
    it('it removes extraneious fields from the payload', () => {
      const actual = getSpendMoneyForUpdatePayload(spendMoneyPayloadInput);
      expect(actual.payFromAccounts).toBeUndefined();
      expect(actual.payToAccounts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });

  describe('getSpendMoneyForCreatePayload', () => {
    it('it removes extraneious fields from the payload', () => {
      const actual = getSpendMoneyForCreatePayload(spendMoneyPayloadInput);
      expect(actual.payFromAccounts).toBeUndefined();
      expect(actual.payToAccounts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });
});
