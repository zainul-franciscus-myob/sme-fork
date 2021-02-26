import * as selectors from '../LinkedAccountsSelectors';
import linkedAccounts from '../mappings/data/loadLinkedAccounts';

describe('LinkedAccountsSelectors', () => {
  describe('getIsNzBusiness', () => {
    it('should return true when region is NZ', () => {
      const state = { region: 'nz' };

      const actual = selectors.getIsNzBusiness(state);

      expect(actual).toBe(true);
    });

    it('should return false when region is AU', () => {
      const state = { region: 'au' };

      const actual = selectors.getIsNzBusiness(state);

      expect(actual).toBe(false);
    });

    it('should return false when region is undefined', () => {
      const state = { some: 'prop' };

      const actual = selectors.getIsNzBusiness(state);

      expect(actual).toBe(false);
    });
  });

  it('getKiwiSaverExpenseAccount should return kiwiSaverExpenseAccount object', () => {
    const expected = { some: 'prop' };
    const state = {
      linkedAccounts: { kiwiSaverExpenseAccount: expected },
    };

    const actual = selectors.getKiwiSaverExpenseAccount(state);

    expect(actual).toBe(expected);
  });

  it('getEmployerDeductionsPayableAccount should return employerDeductionsPayableAccount object', () => {
    const expected = { some: 'prop' };
    const state = {
      linkedAccounts: { employerDeductionsPayableAccount: expected },
    };

    const actual = selectors.getEmployerDeductionsPayableAccount(state);

    expect(actual).toBe(expected);
  });

  it('getOtherDeductionsPayableAccount should return otherDeductionsPayableAccount object', () => {
    const expected = { some: 'prop' };
    const state = {
      linkedAccounts: { otherDeductionsPayableAccount: expected },
    };

    const actual = selectors.getOtherDeductionsPayableAccount(state);

    expect(actual).toBe(expected);
  });

  it('getSaveLinkedAccountsPayload should include NZ accounts', () => {
    const state = { linkedAccounts };

    const actual = selectors.getSaveLinkedAccountsPayload(state);

    expect(actual).toBeTruthy();
    expect(actual).toHaveProperty('kiwiSaverExpenseAccount');
    expect(actual).toHaveProperty('employerDeductionsPayableAccount');
    expect(actual).toHaveProperty('otherDeductionsPayableAccount');
  });
});
