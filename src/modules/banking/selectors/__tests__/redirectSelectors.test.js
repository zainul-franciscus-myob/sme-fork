import { ALL_BANK_ACCOUNTS } from '../../types/BankAccountEnums';
import { getBankReconciliationUrl } from '../redirectSelectors';

describe('redirectSelected', () => {
  it('should add bankAccount when its a single account', () => {
    const state = {
      businessId: '123',
      region: 'au',
      balances: {},
      filterOptions: {
        bankAccount: '1',
      },
    };

    const actual = getBankReconciliationUrl(state);

    expect(actual).toEqual(
      '/#/au/123/bankReconciliation?bankBalanceDate=&bankBalance=&bankAccount=1'
    );
  });

  it('should not add bankAccount when all bank accounts is toggled', () => {
    const state = {
      businessId: '123',
      region: 'au',
      balances: {},
      filterOptions: {
        bankAccount: ALL_BANK_ACCOUNTS,
      },
    };

    const actual = getBankReconciliationUrl(state);

    expect(actual).toEqual(
      '/#/au/123/bankReconciliation?bankBalanceDate=&bankBalance='
    );
  });
});
