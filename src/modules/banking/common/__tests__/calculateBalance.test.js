import BankTransactionAccountTypes from '../../BankTransactionAccountTypes';
import calculateBalance from '../calculateBalances';

describe('calculateBalance', () => {
  it('should return the existing balances if any balance is undefined', () => {
    const balances = {
      bankBalance: undefined,
      myobBalance: undefined,
      unallocated: undefined,
    };

    const amount = 0;

    expect(calculateBalance({ balances, amount })).toEqual(balances);
  });

  describe('selected bank account is an asset account', () => {
    it('should increment unallocated (out of balance) with amount', () => {
      const balances = {
        bankBalance: 0,
        myobBalance: 0,
        unallocated: 0,
      };

      const bankAccounts = [
        { id: '1', accountType: BankTransactionAccountTypes.ASSET },
        { id: '2', accountType: BankTransactionAccountTypes.LIABILITY },
      ];
      const selectedBankAccountId = '1';
      const amount = 10;

      const actual = calculateBalance({
        balances,
        amount,
        bankAccounts,
        selectedBankAccountId,
      });

      expect(actual.unallocated).toEqual(10);
    });

    it('should decrement myobBalance (calculated balance) with amount', () => {
      const balances = {
        bankBalance: 0,
        myobBalance: 0,
        unallocated: 0,
      };

      const bankAccounts = [
        { id: '1', accountType: BankTransactionAccountTypes.ASSET },
        { id: '2', accountType: BankTransactionAccountTypes.LIABILITY },
      ];
      const selectedBankAccountId = '1';
      const amount = 10;

      const actual = calculateBalance({
        balances,
        amount,
        bankAccounts,
        selectedBankAccountId,
      });

      expect(actual.myobBalance).toEqual(-10);
    });
  });

  describe('selected bank account is a liability account', () => {
    it('should decrement unallocated (out of balance) with amount', () => {
      const balances = {
        bankBalance: 0,
        myobBalance: 0,
        unallocated: 0,
      };

      const bankAccounts = [
        { id: '1', accountType: BankTransactionAccountTypes.ASSET },
        { id: '2', accountType: BankTransactionAccountTypes.LIABILITY },
      ];
      const selectedBankAccountId = '2';
      const amount = 10;

      const actual = calculateBalance({
        balances,
        amount,
        bankAccounts,
        selectedBankAccountId,
      });

      expect(actual.unallocated).toEqual(-10);
    });

    it('should increment myobBalance (calculated balance) with amount', () => {
      const balances = {
        bankBalance: 0,
        myobBalance: 0,
        unallocated: 0,
      };

      const bankAccounts = [
        { id: '1', accountType: BankTransactionAccountTypes.ASSET },
        { id: '2', accountType: BankTransactionAccountTypes.LIABILITY },
      ];
      const selectedBankAccountId = '2';
      const amount = 10;

      const actual = calculateBalance({
        balances,
        amount,
        bankAccounts,
        selectedBankAccountId,
      });

      expect(actual.myobBalance).toEqual(10);
    });
  });

  it('should keep original date in balances', () => {
    const balances = {
      bankBalanceDate: '12/09/2020',
      bankBalance: 0,
      myobBalance: 0,
      unallocated: 0,
    };

    const bankAccounts = [];
    const selectedBankAccountId = '1';
    const amount = 10;

    const actual = calculateBalance({
      balances,
      amount,
      bankAccounts,
      selectedBankAccountId,
    });

    expect(actual.bankBalanceDate).toEqual('12/09/2020');
  });

  it("should default to asset bank account calculations if the bank account can't be found", () => {
    const balances = {
      bankBalance: 0,
      myobBalance: 0,
      unallocated: 0,
    };

    const bankAccounts = [];
    const selectedBankAccountId = '1';
    const amount = 10;

    const actual = calculateBalance({
      balances,
      amount,
      bankAccounts,
      selectedBankAccountId,
    });

    expect(actual.unallocated).toEqual(10);
    expect(actual.myobBalance).toEqual(-10);
  });
});
