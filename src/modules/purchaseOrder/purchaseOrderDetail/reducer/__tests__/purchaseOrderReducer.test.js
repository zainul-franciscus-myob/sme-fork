import {
  ADD_PURCHASE_ORDER_LINE,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_PURCHASE_ORDER,
  RELOAD_PURCHASE_ORDER,
  REMOVE_PURCHASE_ORDER_LINE,
  UPDATE_LAYOUT,
  UPDATE_PURCHASE_ORDER_LINE,
  UPDATE_PURCHASE_ORDER_OPTION,
} from '../../PurchaseOrderIntents';
import PurchaseOrderLineType from '../../types/PurchaseOrderLineType';
import purchaseOrderDetail from '../fixtures/purchaseOrderDetail';
import purchaseOrderReducer from '../purchaseOrderReducer';

describe('purchaseOrderReducer', () => {
  describe('loadPurchaseOrder', () => {
    it('should set issueDate', () => {
      const state = { today: '2020-11-11' };
      const action = {
        intent: LOAD_PURCHASE_ORDER,
        response: purchaseOrderDetail,
      };
      const actual = purchaseOrderReducer(state, action);
      expect(actual.purchaseOrder.issueDate).toEqual('2020-11-11');
    });

    it('should set lines', () => {
      const state = {};
      const action = {
        intent: LOAD_PURCHASE_ORDER,
        response: purchaseOrderDetail,
      };
      const actual = purchaseOrderReducer(state, action);
      const expected = [
        {
          amount: '11',
          lineJobOptions: [
            { id: '1', isActive: true, jobName: 'Project 0', jobNumber: '100' },
          ],
          taxAmount: 1,
          taxExclusiveAmount: 10,
          type: 'service',
        },
      ];
      expect(actual.purchaseOrder.lines).toEqual(expected);
    });

    it('should set newLine', () => {
      const state = {};
      const action = {
        intent: LOAD_PURCHASE_ORDER,
        response: purchaseOrderDetail,
      };
      const actual = purchaseOrderReducer(state, action);
      const expected = {
        type: '',
        units: '',
        itemId: '',
        description: '',
        accountId: '',
        unitPrice: '',
        discount: '',
        jobId: '',
        taxCodeId: '',
        lineSubTypeId: '',
        lineJobOptions: [
          {
            id: '1',
            isActive: true,
            jobName: 'Project 0',
            jobNumber: '100',
          },
        ],
      };

      expect(actual.newLine).toEqual(expected);
    });

    it('should set template', () => {
      const state = {};
      const action = {
        intent: LOAD_PURCHASE_ORDER,
        response: purchaseOrderDetail,
      };
      const actual = purchaseOrderReducer(state, action);
      const expected = 'Plain template';
      expect(actual.template).toEqual(expected);
    });

    it('should set subscription', () => {
      const state = {};
      const action = {
        intent: LOAD_PURCHASE_ORDER,
        response: purchaseOrderDetail,
      };
      const actual = purchaseOrderReducer(state, action);
      const expected = {
        isUpgradeModalShowing: false,
        monthlyLimit: {
          limit: 5,
          used: 1,
          hasHitLimit: false,
          month: 'November 2020',
        },
      };

      expect(actual.subscription).toEqual(expected);
    });

    it('should set exportPdf', () => {
      const state = {};
      const action = {
        intent: LOAD_PURCHASE_ORDER,
        response: purchaseOrderDetail,
      };
      const actual = purchaseOrderReducer(state, action);
      const expected = {};

      expect(actual.exportPdf).toEqual(expected);
    });
  });

  describe('reloadPurchaseOrder', () => {
    it('should set context to state', () => {
      const state = {
        businessId: '123',
        region: 'au',
        purchaseOrderId: '1',
      };
      const action = {
        intent: RELOAD_PURCHASE_ORDER,
        response: purchaseOrderDetail,
      };
      const expected = { ...state };

      const actual = purchaseOrderReducer(state, action);
      expect(actual.businessId).toEqual(expected.businessId);
      expect(actual.region).toEqual(expected.region);
      expect(actual.purchaseOrderId).toEqual(expected.purchaseOrderId);
    });
  });

  describe('updatePurchaseOrderOption', () => {
    it('should set purchaseOrder', () => {
      const state = { prefillStatus: false, purchaseOrder: { lines: [] } };
      const action = {
        intent: UPDATE_PURCHASE_ORDER_OPTION,
        response: purchaseOrderDetail,
      };
      const expected = {
        isPageEdited: true,
        prefillStatus: false,
        purchaseOrder: {
          lines: [],
          undefined,
        },
      };

      const actual = purchaseOrderReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateLayout', () => {
    it('should set purchaseOrder', () => {
      const state = {
        purchaseOrder: {
          lines: [
            { type: PurchaseOrderLineType.SERVICE },
            { type: PurchaseOrderLineType.ITEM },
          ],
        },
      };
      const action = {
        intent: UPDATE_LAYOUT,
        value: PurchaseOrderLineType.SERVICE,
      };
      const expected = {
        layout: PurchaseOrderLineType.SERVICE,
        lines: [{ type: PurchaseOrderLineType.SERVICE, id: '' }],
      };

      const actual = purchaseOrderReducer(state, action);
      expect(actual.purchaseOrder).toEqual(expected);
    });
  });

  describe('addPurchaseOrderLine', () => {
    it('should set lines', () => {
      const state = {
        newLine: { type: '' },
        purchaseOrder: {
          lines: [
            { type: PurchaseOrderLineType.SERVICE },
            { type: PurchaseOrderLineType.ITEM },
          ],
        },
      };
      const action = {
        intent: ADD_PURCHASE_ORDER_LINE,
        value: PurchaseOrderLineType.SERVICE,
      };
      const expected = [
        { type: PurchaseOrderLineType.SERVICE },
        { type: PurchaseOrderLineType.ITEM },
        { type: '' },
      ];
      const actual = purchaseOrderReducer(state, action);
      expect(actual.purchaseOrder.lines).toEqual(expected);
    });
  });

  describe('updatePurchaseOrderLine', () => {
    it('should set lines', () => {
      const state = {
        accountOptions: [
          {
            id: '6',
            displayId: '1-1110',
            displayName: 'Lounge Account #6',
            accountType: 'Expense',
            taxCodeId: '1',
          },
        ],
        purchaseOrder: {
          lines: [
            {
              id: 'line-1',
              type: PurchaseOrderLineType.SERVICE,
              prefillStatus: true,
              taxCodeId: '1',
            },
          ],
        },
      };
      const action = {
        intent: UPDATE_PURCHASE_ORDER_LINE,
        key: 'accountId',
        value: '6',
        index: 0,
      };
      const expected = [
        {
          id: 'line-1',
          type: PurchaseOrderLineType.SERVICE,
          lineSubTypeId: '11',
          prefillStatus: true,
          taxCodeId: '1',
          accountId: '6',
        },
      ];

      const actual = purchaseOrderReducer(state, action);
      expect(actual.purchaseOrder.lines).toEqual(expected);
    });
  });

  describe('removePurchaseOrderLine', () => {
    it('should remove a specific line', () => {
      const state = {
        newLine: { type: '' },
        purchaseOrder: {
          lines: [
            { type: PurchaseOrderLineType.SERVICE },
            { type: PurchaseOrderLineType.ITEM },
          ],
        },
      };
      const action = {
        intent: REMOVE_PURCHASE_ORDER_LINE,
        index: 0,
      };
      const expected = [{ type: PurchaseOrderLineType.ITEM }];
      const actual = purchaseOrderReducer(state, action);
      expect(actual.purchaseOrder.lines).toEqual(expected);
    });
  });

  describe('loadItemDetailForLine', () => {
    it('should set lines', () => {
      const state = {
        purchaseOrder: {
          lines: [
            { type: PurchaseOrderLineType.SERVICE },
            { type: PurchaseOrderLineType.ITEM },
          ],
        },
      };
      const action = {
        intent: LOAD_ITEM_DETAIL_FOR_LINE,
        index: 1,
        updatedLine: { type: PurchaseOrderLineType.ITEM, id: '2' },
      };
      const expected = [
        { type: PurchaseOrderLineType.SERVICE },
        { type: PurchaseOrderLineType.ITEM, id: '2' },
      ];
      const actual = purchaseOrderReducer(state, action);
      expect(actual.purchaseOrder.lines).toEqual(expected);
    });
  });

  describe('setUpgradeModalShowing', () => {
    it('should set lines', () => {
      const state = {
        purchaseOrder: {
          lines: [
            { type: PurchaseOrderLineType.SERVICE },
            { type: PurchaseOrderLineType.ITEM },
          ],
        },
      };
      const action = {
        intent: LOAD_ITEM_DETAIL_FOR_LINE,
        index: 1,
        updatedLine: { type: PurchaseOrderLineType.ITEM, id: '2' },
      };
      const expected = [
        { type: PurchaseOrderLineType.SERVICE },
        { type: PurchaseOrderLineType.ITEM, id: '2' },
      ];
      const actual = purchaseOrderReducer(state, action);
      expect(actual.purchaseOrder.lines).toEqual(expected);
    });
  });
});
