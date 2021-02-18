import {
  ADD_BILL_LINE,
  CALCULATE_BILL_LINE_AMOUNTS,
  GET_TAX_CALCULATIONS,
  LOAD_RECURRING_BILL,
  REMOVE_BILL_LINE,
  UPDATE_BILL_LINE,
} from '../RecurringBillIntents';
import {
  mockCreateObjectUrl,
  setUp,
  setUpWithRun,
} from './RecurringBillModule.test';
import loadItemAndServiceRecurringBillWithOneLineResponse from './fixtures/loadItemAndServiceRecurringBillWithOneLine.json';

describe('RecurringBillModule_TableBehaviour', () => {
  mockCreateObjectUrl();

  describe('updateRecurringBillLine', () => {
    it('updates key with value', () => {
      const { module, store } = setUpWithRun({ isCreating: true });

      module.updateBillLine({ index: 0, key: 'amount', value: '10' });

      expect(store.getActions()).toContainEqual({
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'amount',
        value: '10',
      });
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
  });

  describe('addRecurringBillLine', () => {
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

  describe('removeRecurringBillLine', () => {
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
      integration.overrideMapping(LOAD_RECURRING_BILL, ({ onSuccess }) =>
        onSuccess(loadItemAndServiceRecurringBillWithOneLineResponse)
      );
      module.run({
        recurringTransactionId: '🍉',
        businessId: '🐷',
        region: 'au',
      });
      store.resetActions();
      integration.resetRequests();

      module.removeBillLine({ index: 0 });

      expect(store.getActions()).toEqual([
        {
          intent: REMOVE_BILL_LINE,
          index: 0,
        },
      ]);
    });
  });

  describe('calculateRecurringBillLines', () => {
    it('formats the display value for that key and calculate line amounts and calls tax calculator if line has been edited', () => {
      const { module, store } = setUpWithRun();
      // This update action dirties the line
      module.updateBillLine({
        index: 0,
        key: 'amount',
        value: '10',
      });
      store.resetActions();

      module.calculateRecurringBillLines({
        index: 0,
        key: 'amount',
        value: '10.50',
      });

      expect(store.getActions()).toEqual([
        {
          intent: CALCULATE_BILL_LINE_AMOUNTS,
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
});
