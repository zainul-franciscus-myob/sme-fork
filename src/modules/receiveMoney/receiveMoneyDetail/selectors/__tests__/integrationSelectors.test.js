import {
  LOAD_DUPLICATE_RECEIVE_MONEY,
  LOAD_NEW_RECEIVE_MONEY,
  LOAD_RECEIVE_MONEY_DETAIL,
} from '../../../ReceiveMoneyIntents';
import {
  getLoadReceiveMoneyIntent,
  getReceiveMoneyForCreatePayload,
  getReceiveMoneyForUpdatePayload,
  getUrlParams,
} from '../integrationSelectors';

describe('integrationSelectors', () => {
  describe('getLoadReceiveMoneyIntent', () => {
    it('should return LOAD_DUPLICATE_RECEIVE_MONEY', () => {
      const state = {
        receiveMoneyId: 'new',
        duplicateId: '1',
      };

      const intent = getLoadReceiveMoneyIntent(state);

      expect(intent).toEqual(LOAD_DUPLICATE_RECEIVE_MONEY);
    });

    it('should return LOAD_NEW_RECEIVE_MONEY', () => {
      const state = {
        receiveMoneyId: 'new',
      };

      const intent = getLoadReceiveMoneyIntent(state);

      expect(intent).toEqual(LOAD_NEW_RECEIVE_MONEY);
    });

    it('should return LOAD_RECEIVE_MONEY_DETAIL', () => {
      const state = {
        receiveMoneyId: '1',
      };

      const intent = getLoadReceiveMoneyIntent(state);

      expect(intent).toEqual(LOAD_RECEIVE_MONEY_DETAIL);
    });
  });

  describe('getUrlParams', () => {
    it('should add receiveMoneyId if updating receive money', () => {
      const state = {
        businessId: '123',
        receiveMoneyId: '1',
      };

      const urlParams = getUrlParams(state);

      expect(urlParams).toEqual({
        businessId: '123',
        receiveMoneyId: '1',
      });
    });

    it('should not add receiveMoneyId if creating receive money', () => {
      const state = {
        businessId: '123',
        receiveMoneyId: 'new',
      };

      const urlParams = getUrlParams(state);

      expect(urlParams).toEqual({
        businessId: '123',
      });
    });

    it('should add duplicateId if duplicating receive money', () => {
      const state = {
        businessId: '123',
        receiveMoneyId: 'new',
        duplicateId: '1',
      };

      const urlParams = getUrlParams(state);

      expect(urlParams).toEqual({
        businessId: '123',
        duplicateId: '1',
      });
    });
  });

  describe('create or update request payload', () => {
    const input = {
      receiveMoney: {
        referenceId: 'foo',
        selectedPayFromAccountId: 'bar',
        selectedPayToContactId: 'contactId',
        date: '12-1-2017',
        description: 'txt',
        isReportable: 'true',
        isTaxInclusive: 'false',
        originalReferenceId: '1234',
        lines: [{ a: 'foo' }],
      },
    };

    describe('getReceiveMoneyForUpdatePayload', () => {
      it('removes extraneous fields from the payload', () => {
        const actual = getReceiveMoneyForUpdatePayload(input);
        expect(actual.originalReferenceId).toBeUndefined();
      });
    });

    describe('getReceiveMoneyForCreatePayload', () => {
      it('removes extraneous fields from the payload', () => {
        const actual = getReceiveMoneyForCreatePayload(input);
        expect(actual.originalReferenceId).toBeUndefined();
      });
    });
  });
});
