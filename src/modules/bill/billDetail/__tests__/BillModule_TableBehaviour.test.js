import {
  ADD_BILL_LINE,
  CALCULATE_LINE_AMOUNTS,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  REMOVE_BILL_LINE,
  RESET_TOTALS,
  START_BLOCKING,
  STOP_BLOCKING,
  UPDATE_BILL_LINE,
} from '../BillIntents';
import {
  mockCreateObjectUrl, setUp, setUpNewBillWithPrefilled, setUpWithRun,
} from './BillModule.test';
import loadItemAndServiceBillWithOneLineResponse from './fixtures/loadItemAndServiceBillWithOneLine';

describe('BillModule_TableBehaviour', () => {
  mockCreateObjectUrl();

  describe('updateBillLine', () => {
    it('updates key with value', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.updateBillLine({ index: 0, key: 'amount', value: '10' });

      expect(store.getActions()).toContainEqual(
        {
          intent: UPDATE_BILL_LINE,
          index: 0,
          key: 'amount',
          value: '10',
        },
      );
    });

    [
      {
        key: 'accountId',
        value: '1',
      },
      {
        key: 'taxCodeId',
        value: '2',
      },
    ].forEach((test) => {
      it(`calls the tax calculator after updating key with value if key is ${test.key}`, () => {
        const { module, store } = setUpWithRun();

        module.updateBillLine({
          index: 0,
          key: test.key,
          value: test.value,
        });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_LINE,
            index: 0,
            key: test.key,
            value: test.value,
          },
          {
            intent: GET_TAX_CALCULATIONS,
            isSwitchingTaxInclusive: false,
            taxCalculations: expect.any(Object),
          },
        ]);
      });
    });

    describe('when key is itemId', () => {
      it('loads item detail for line if line has not been prefilled', () => {
        const { module, store, integration } = setUpWithRun();

        module.updateBillLine({ index: 0, key: 'itemId', value: '1' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_LINE,
            index: 0,
            key: 'itemId',
            value: '1',
          },
          {
            intent: START_BLOCKING,
          },
          expect.objectContaining({
            intent: LOAD_ITEM_DETAIL_FOR_LINE,
            index: 0,
          }),
          {
            intent: GET_TAX_CALCULATIONS,
            isSwitchingTaxInclusive: false,
            taxCalculations: expect.any(Object),
          },
          {
            intent: STOP_BLOCKING,
          },
        ]);

        expect(integration.getRequests()).toEqual([
          expect.objectContaining({
            intent: LOAD_ITEM_DETAIL_FOR_LINE,
          }),
        ]);
      });

      it('does not load item detail for line if line has been prefilled', () => {
        const { module, store } = setUpNewBillWithPrefilled();

        module.updateBillLine({ index: 0, key: 'itemId', value: '1' });

        expect(store.getActions()).toEqual([
          {
            intent: UPDATE_BILL_LINE,
            index: 0,
            key: 'itemId',
            value: '1',
          },
        ]);
      });
    });
  });

  describe('addBillLine', () => {
    it('adds a new line and updates the line', () => {
      const { module, store } = setUpWithRun();

      module.addBillLine({ id: '2', description: 'hello' });

      expect(store.getActions()).toEqual([
        { intent: ADD_BILL_LINE },
        {
          intent: UPDATE_BILL_LINE,
          index: 2,
          key: 'description',
          value: 'hello',
        },
      ]);
    });
  });

  describe('removeBillLine', () => {
    it('removes the line from the table and calls the tax calculator if the table is not empty', () => {
      // This sets up a table with two existing lines
      const { module, store } = setUpWithRun();

      module.removeBillLine({ index: 1 });

      expect(store.getActions()).toEqual([
        {
          intent: REMOVE_BILL_LINE,
          index: 1,
        },
        {
          intent: GET_TAX_CALCULATIONS,
          isSwitchingTaxInclusive: false,
          taxCalculations: expect.any(Object),
        },
      ]);
    });

    it('removes the line from the table and resets the total if the table is empty', () => {
      // This sets up a table with two existing lines
      const { module, store, integration } = setUp();

      // set up bill to have one existing line
      integration.overrideMapping(
        LOAD_BILL,
        ({ onSuccess }) => onSuccess(loadItemAndServiceBillWithOneLineResponse),
      );
      module.run({ billId: '🍉', businessId: '🐷', region: 'au' });
      store.resetActions();
      integration.resetRequests();

      module.removeBillLine({ index: 0 });

      expect(store.getActions()).toEqual([
        {
          intent: REMOVE_BILL_LINE,
          index: 0,
        },
        {
          intent: RESET_TOTALS,
        },
      ]);
    });
  });

  describe('calculateBillLines', () => {
    it('only formats the display value for that key if line has not been edited', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.calculateBillLines({
        index: 0,
        key: 'amount',
        value: '10.50',
      });

      expect(store.getActions()).toEqual([
        {
          intent: FORMAT_BILL_LINE,
          index: 0,
          key: 'amount',
          value: '10.50',
        },
      ]);
    });

    it('formats the display value for that key and calculate line amounts and calls tax calculator if line has been edited', () => {
      const { module, store } = setUpWithRun();
      // This update action dirties the line
      module.updateBillLine({
        index: 0,
        key: 'amount',
        value: '10',
      });
      store.resetActions();

      module.calculateBillLines({
        index: 0,
        key: 'amount',
        value: '10.50',
      });

      expect(store.getActions()).toEqual([
        {
          intent: FORMAT_BILL_LINE,
          index: 0,
          key: 'amount',
          value: '10.50',
        },
        {
          intent: CALCULATE_LINE_AMOUNTS,
          key: 'amount',
          index: 0,
        },
        {
          intent: GET_TAX_CALCULATIONS,
          isSwitchingTaxInclusive: false,
          taxCalculations: expect.any(Object),
        },
      ]);
    });
  });

  describe('calculateAmountPaid', () => {
    it('only formats the amount paid if table is empty', () => {
      const { module, store } = setUpWithRun({ isCreating: true });
      module.calculateAmountPaid();

      expect(store.getActions()).toEqual([
        {
          intent: FORMAT_AMOUNT_PAID,
        },
      ]);
    });

    it('formats the amount paid and calls the tax calc. if table is not empty', () => {
      const { module, store } = setUpWithRun();
      module.calculateAmountPaid();

      expect(store.getActions()).toEqual([
        {
          intent: FORMAT_AMOUNT_PAID,
        },
        {
          intent: GET_TAX_CALCULATIONS,
          isSwitchingTaxInclusive: false,
          taxCalculations: expect.any(Object),
        },
      ]);
    });
  });
});
