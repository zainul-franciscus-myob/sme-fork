import {
  getBankingRuleModalContext,
  getLoadBankingRuleOptionByIdUrlParams,
  getLoadBankingRuleOptionsParams,
  getLoadBankingRuleOptionsUrlParams,
  getSearchBankingRuleParams,
} from '../BankingRuleComboboxSelectors';
import BankingRuleTypes from '../BankingRuleTypes';

describe('BankingRuleComboboxSelectors', () => {
  describe('getLoadBankingRuleOptionsUrlParams', () => {
    it('returns the businessId', () => {
      const state = { businessId: 'bizId' };
      const actual = getLoadBankingRuleOptionsUrlParams(state);
      expect(actual).toEqual({
        businessId: 'bizId',
      });
    });
  });

  describe('getLoadBankingRuleOptionsParams', () => {
    it('returns offset and bankingRuleType', () => {
      const state = {
        pagination: {
          offset: 5,
        },
        bankingRuleType: BankingRuleTypes.ReceiveMoney,
      };

      const actual = getLoadBankingRuleOptionsParams(state);
      expect(actual).toEqual({
        offset: 5,
        ruleType: 'ReceiveMoney',
      });
    });
  });

  describe('getLoadBankingRuleOptionByIdUrlParms', () => {
    it('returns the businessId and the banking rule id', () => {
      const state = { businessId: 'bizId' };
      const bankingRuleId = 'bankingRuleId';
      const actual = getLoadBankingRuleOptionByIdUrlParams(
        state,
        bankingRuleId
      );
      expect(actual).toEqual({
        businessId: 'bizId',
        bankingRuleId: 'bankingRuleId',
      });
    });
  });

  describe('getSearchBankingRuleParams', () => {
    const state = {
      pagination: {
        offset: 10,
      },
      bankingRuleType: BankingRuleTypes.SpendMoney,
    };

    it('always returns offset as 0', () => {
      const keywords = 'Romeo';
      const actual = getSearchBankingRuleParams(keywords, state);
      expect(actual.offset).toEqual(0);
    });

    it('returns keywords and bankingRuleType', () => {
      const keywords = 'Romeo';
      const actual = getSearchBankingRuleParams(keywords, state);
      expect(actual.keywords).toEqual('Romeo');
      expect(actual.ruleType).toEqual('SpendMoney');
    });
  });

  describe('getBankingRuleModalContext', () => {
    it('returns the businessId and region', () => {
      const state = {
        businessId: 'bizId',
        region: 'au',
      };

      const actual = getBankingRuleModalContext(state);
      expect(actual).toEqual({
        businessId: 'bizId',
        region: 'au',
      });
    });
  });
});
