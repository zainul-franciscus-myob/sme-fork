import {
  getCreateBillFromOrderUrl,
  getCreateNewPurchaseOrderUrl,
  getPurchaseOrderListUrl,
} from '../PurchaseOrderRedirectSelectors';

describe('PurchaseOrderRedirectSelector', () => {
  describe('getPurchaseOrderListUrl', () => {
    it('return list url with region and businessId', () => {
      const state = {
        region: 'AU',
        businessId: '1234',
      };
      const actual = getPurchaseOrderListUrl(state);
      expect(actual).toEqual('/#/AU/1234/purchaseOrder');
    });
  });

  describe('getCreateNewPurchaseOrderUrl', () => {
    it('return create url with region and businessId', () => {
      const state = {
        region: 'AU',
        businessId: '1234',
      };
      const actual = getCreateNewPurchaseOrderUrl(state);
      expect(actual).toEqual('/#/AU/1234/purchaseOrder/new');
    });
  });

  describe('getCreateBillFromOrderUrl', () => {
    it('return create bill url with orderId', () => {
      const state = {
        region: 'AU',
        businessId: '1234',
        purchaseOrderId: 5,
      };
      const actual = getCreateBillFromOrderUrl(state);
      expect(actual).toEqual('/#/AU/1234/bill/new?orderId=5');
    });
  });
});
