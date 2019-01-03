import { getLineDataByIndexSelector } from '../spendMoneyDetailSelectors';
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
});
