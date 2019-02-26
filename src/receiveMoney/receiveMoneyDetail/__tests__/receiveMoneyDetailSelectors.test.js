import {
  getCalculatedTotalsPayload,
  getReceiveMoneyForCreatePayload,
  getReceiveMoneyForUpdatePayload,
} from '../receiveMoneyDetailSelectors';

describe('receiveMoneySelectors', () => {
  const input = {
    receiveMoney: {
      referenceId: 'foo',
      selectedPayFromAccountId: 'bar',
      selectedPayToContactId: 'contactId',
      depositIntoAccounts: [1, 2, 3, 4],
      payFromContacts: [1, 2, 3, 4],
      date: '12-1-2017',
      description: 'txt',
      isReportable: 'true',
      isTaxInclusive: 'false',
      originalReferenceId: '1234',
      lines: [{ a: 'foo', accounts: [], taxCodes: [] }],
    },
  };

  describe('getReceiveMoneyForUpdatePayload', () => {
    it('removes extraneous fields from the payload', () => {
      const actual = getReceiveMoneyForUpdatePayload(input);
      expect(actual.despositIntoAccounts).toBeUndefined();
      expect(actual.payFromContacts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });

  describe('getReceiveMoneyForCreatePayload', () => {
    it('removes extraneous fields from the payload', () => {
      const actual = getReceiveMoneyForCreatePayload(input);
      expect(actual.despositIntoAccounts).toBeUndefined();
      expect(actual.payFromContacts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });

  describe('getCalculatedTotalsPayload', () => {
    it('removes extraneous fields from the payload', () => {
      const taxCalcInput = {
        receiveMoney: {
          isTaxInclusive: true,
          lines: [
            { accounts: [1, 2, 3], taxCodes: [5, 4, 3] },
            { accounts: [1, 2, 3], taxCodes: [5, 4, 3] },
          ],
        },
      };
      const actual = getCalculatedTotalsPayload(taxCalcInput);
      expect(actual.isTaxInclusive).not.toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
      expect(actual.lines[1].accounts).toBeUndefined();
      expect(actual.lines[1].taxCodes).toBeUndefined();
    });
  });
});
