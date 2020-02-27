import { GET_TAX_CALCULATIONS } from '../../ReceiveMoneyIntents';
import { setUpWithPageEdited } from './ReceiveMoneyDetailModule.test';

describe('ReceiveMoneyDetailModule_TaxFlow', () => {
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
      name: 'update line with accountId',
      do: (module) => {
        module.updateReceiveMoneyLine(
          0,
          'accountId',
          '123',
        );
      },
    },
    {
      name: 'update line with taxCodeId',
      do: (module) => {
        module.updateReceiveMoneyLine(
          0,
          'taxCodeId',
          '4',
        );
      },
    },
    {
      name: 'add line',
      do: (module) => {
        module.addReceiveMoneyLine({ accountId: '4' });
      },
    },
    {
      name: 'delete line',
      do: (module) => {
        module.deleteReceiveMoneyLine(0);
      },
    },
    {
      name: 'on blur field',
      do: (module) => {
        module.formatAndCalculateTotals();
      },
    },
  ].forEach((test) => {
    it(test.name, () => {
      const { module, store } = setUpWithPageEdited();

      test.do(module);

      expect(store.getActions()).toContainEqual(
        {
          intent: GET_TAX_CALCULATIONS,
          lines: expect.any(Object),
          totals: expect.any(Object),
        },
      );
    });
  });
});
