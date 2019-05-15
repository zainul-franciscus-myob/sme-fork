import { getIsAllocated, getOpenEntryDefaultTabId } from '../index';
import { tabIds } from '../../tabItems';

describe('bankingSelector', () => {
  describe('getIsAllocated', () => {
    [
      ['singleAllocation', true],
      ['splitAllocation', true],
      ['matched', false],
      ['unmatched', false],
    ].forEach((args) => {
      const [type, expected] = args;

      it(`should return ${expected} when type is ${type}`, () => {
        const isAllocated = getIsAllocated({ type, journalId: '123' });

        expect(isAllocated).toEqual(expected);
      });
    });
  });

  describe('getBankTransactionLineDefaultTabId', () => {
    [
      ['singleAllocation', tabIds.allocate],
      ['splitAllocation', tabIds.allocate],
      ['matched', undefined],
      ['unmatched', tabIds.allocate],
    ].forEach((args) => {
      const [type, expected] = args;

      it(`should return ${expected} when type is ${type}`, () => {
        const tabId = getOpenEntryDefaultTabId({ type });

        expect(tabId).toEqual(expected);
      });
    });
  });
});
