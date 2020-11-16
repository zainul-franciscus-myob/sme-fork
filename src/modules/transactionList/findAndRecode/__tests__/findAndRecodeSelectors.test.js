import { businessEventTypes } from '../../../../common/types/BusinessEventTypeMap';
import {
  getActiveSort,
  getAreAllItemsSelected,
  getAreSomeItemsSelected,
  getLoadMoreButtonStatus,
  getRecodeContent,
  getSelectedText,
  getTableEntries,
} from '../findAndRecodeSelectors';
import LoadMoreButtonStatuses from '../../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';

describe('findAndRecodeSelectors', () => {
  describe('getLoadMoreButtonState', () => {
    it(`is ${LoadMoreButtonStatuses.LOADING} when isNextPageLoading`, () => {
      const state = {
        isNextPageLoading: true,
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.LOADING);
    });

    it(`is ${LoadMoreButtonStatuses.SHOWN} when hasNextPage`, () => {
      const state = {
        isNextPageLoading: false,
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.SHOWN);
    });

    it(`is ${LoadMoreButtonStatuses.HIDDEN} when not hasNextPage`, () => {
      const state = {
        isNextPageLoading: false,
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });
  });

  describe('getTableEntries', () => {
    const state = {
      businessId: '🤖',
      region: '🧙‍♀️',
      entries: [
        {
          id: '1',
          businessEventId: '100',
          businessEventType: businessEventTypes.generalJournal,
        },
      ],
      selectedItems: [],
    };

    it('adds link the entry', () => {
      const actual = getTableEntries(state);

      expect(actual).toEqual([
        {
          id: '1',
          businessEventId: '100',
          businessEventType: businessEventTypes.generalJournal,
          link: `/#/🧙‍♀️/🤖/generalJournal/100`,
          isSelected: false,
        },
      ]);
    });

    it('isSelected is true when is one of selected items', () => {
      const actual = getTableEntries({
        ...state,
        selectedItems: ['1'],
      });

      expect(actual).toEqual([
        {
          id: '1',
          businessEventId: '100',
          businessEventType: businessEventTypes.generalJournal,
          link: `/#/🧙‍♀️/🤖/generalJournal/100`,
          isSelected: true,
        },
      ]);
    });
  });

  describe('getActiveSort', () => {
    it('maps descending to true', () => {
      const state = {
        orderBy: 'Description',
        sortOrder: 'desc',
      };

      const actual = getActiveSort(state);

      expect(actual).toEqual({
        column: 'Description',
        descending: true,
      });
    });

    it('maps ascending to false', () => {
      const state = {
        orderBy: 'Description',
        sortOrder: 'asc',
      };

      const actual = getActiveSort(state);

      expect(actual).toEqual({
        column: 'Description',
        descending: false,
      });
    });
  });

  describe('getRecodeContent', () => {
    it('builds selected items for recode', () => {
      const state = {
        entries: [
          {
            id: '1',
            businessEventType: 'CashReceipt',
            businessEventId: '100',
          },
          {
            id: '2',
          },
          {
            id: '3',
            businessEventType: 'CashPayment',
            businessEventId: '300',
          },
        ],
        selectedItems: ['1', '3'],
        recodeOptions: {
          accountId: '999',
        },
      };

      const actual = getRecodeContent(state);

      expect(actual).toEqual([
        {
          businessEventLineId: '1',
          businessEventType: 'CashReceipt',
          businessEventId: '100',
          accountId: '999',
        },
        {
          businessEventLineId: '3',
          businessEventType: 'CashPayment',
          businessEventId: '300',
          accountId: '999',
        },
      ]);
    });
  });

  describe('getSelectedText', () => {
    it('nothing selected', () => {
      const state = {
        selectedItems: [],
      };

      const actual = getSelectedText(state);

      expect(actual).toEqual('');
    });

    it('1 selected', () => {
      const state = {
        selectedItems: ['80'],
      };

      const actual = getSelectedText(state);

      expect(actual).toEqual('1 item selected');
    });

    it('many selected', () => {
      const state = {
        selectedItems: ['80', '90', '100'],
      };

      const actual = getSelectedText(state);

      expect(actual).toEqual('3 items selected');
    });
  });

  describe('getAreAllItemsSelected', () => {
    it('returns true when all entries selected', () => {
      const state = {
        selectedItems: ['1', '2'],
        entries: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      };

      const actual = getAreAllItemsSelected(state);

      expect(actual).toBeTruthy();
    });

    it('returns false when some entries selected', () => {
      const state = {
        selectedItems: ['1'],
        entries: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      };

      const actual = getAreAllItemsSelected(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getAreSomeItemsSelected', () => {
    it('returns true when some entries selected', () => {
      const state = {
        selectedItems: ['1'],
      };

      const actual = getAreSomeItemsSelected(state);

      expect(actual).toBeTruthy();
    });

    it('returns false when no entries selected', () => {
      const state = {
        selectedItems: [],
      };

      const actual = getAreSomeItemsSelected(state);

      expect(actual).toBeFalsy();
    });
  });
});
