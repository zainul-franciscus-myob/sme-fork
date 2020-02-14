import { GET_TAX_CALCULATIONS } from '../../GeneralJournalIntents';
import { setupWithExisting } from './GeneralJournalDetailModule.test';

describe('GeneralJournalDetailModule', () => {
  [
    {
      name: 'update isTaxInclusive',
      do: (module) => {
        module.updateHeaderOptions({
          key: 'isTaxInclusive',
          value: true,
        });
      },
    },
    {
      name: 'update gstReportingMethod with `purchase`',
      do: (module) => {
        module.updateHeaderOptions({
          key: 'gstReportingMethod',
          value: 'purchase',
        });
      },
    },
    {
      name: 'update gstReportingMethod with `sale`',
      do: (module) => {
        module.updateHeaderOptions({
          key: 'gstReportingMethod',
          value: 'sale',
        });
      },
    },
    {
      name: 'update line with accountId',
      do: (module) => {
        module.updateGeneralJournalLine(
          0,
          'accountId',
          '4',
        );
      },
    },
    {
      name: 'update line with taxCodeId',
      do: (module) => {
        module.updateGeneralJournalLine(
          0,
          'taxCodeId',
          '1',
        );
      },
    },
    {
      name: 'add line',
      do: (module) => {
        module.addGeneralJournalLine({ accountId: '4' });
      },
    },
    {
      name: 'delete line',
      do: (module) => {
        module.deleteGeneralJournalLine(0);
      },
    },
    {
      name: 'on blur field',
      do: (module) => {
        module.formatAndCalculateTotals({ index: 0, key: 'amount' });
      },
    },
  ].forEach((test) => {
    it(test.name, () => {
      const { module, store } = setupWithExisting();

      test.do(module);

      expect(store.getActions()).toContainEqual(
        {
          intent: GET_TAX_CALCULATIONS,
          taxCalculations: expect.any(Object),
        },
      );
    });
  });
});
