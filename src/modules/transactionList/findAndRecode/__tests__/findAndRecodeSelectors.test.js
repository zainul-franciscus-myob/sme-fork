import { businessEventTypes } from '../../../../common/types/BusinessEventTypeMap';
import {
  getActiveSort,
  getAreAllItemsSelected,
  getAreSomeItemsSelected,
  getIsRecodeFailure,
  getIsRecodeFinished,
  getIsRecodeLoading,
  getLoadMoreButtonStatus,
  getRecodeFailureMessage,
  getRecodeItemContent,
  getSelectedText,
  getTableEntries,
} from '../findAndRecodeSelectors';
import LoadMoreButtonStatuses from '../../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import RecodeStatus from '../types/RecodeStatus';

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
      recodeItems: [],
    };

    it('adds link the entry', () => {
      const actual = getTableEntries(state);

      expect(actual).toEqual([
        {
          id: '1',
          businessEventId: '100',
          businessEventType: businessEventTypes.generalJournal,
          link: `/#/🧙‍♀️/🤖/generalJournal/100`,
          recodeItem: undefined,
        },
      ]);
    });

    it('adds recodeItem to list if exsts', () => {
      const actual = getTableEntries({
        ...state,
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SELECTED,
          },
        ],
      });

      expect(actual).toEqual([
        {
          id: '1',
          businessEventId: '100',
          businessEventType: businessEventTypes.generalJournal,
          link: `/#/🧙‍♀️/🤖/generalJournal/100`,
          recodeItem: {
            id: '1',
            status: RecodeStatus.SELECTED,
          },
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

  describe('getRecodeItemContent', () => {
    it('builds item for recode', () => {
      const state = {
        entries: [
          {
            id: '1',
            businessEventType: 'CashReceipt',
            businessEventId: '100',
          },
          {
            id: '3',
            businessEventType: 'CashPayment',
            businessEventId: '300',
          },
        ],
        recodeOptions: {
          accountId: '999',
          taxCodeId: '666',
        },
      };

      const actual = getRecodeItemContent('1')(state);

      expect(actual).toEqual([
        {
          businessEventLineId: '1',
          businessEventType: 'CashReceipt',
          businessEventId: '100',
          accountId: '999',
          taxCodeId: '666',
        },
      ]);
    });
  });

  describe('getSelectedText', () => {
    it('nothing selected', () => {
      const state = {
        recodeItems: [],
      };

      const actual = getSelectedText(state);

      expect(actual).toEqual('');
    });

    it('1 selected', () => {
      const state = {
        recodeItems: [
          {
            id: '80',
            status: RecodeStatus.LOADING,
          },
        ],
      };

      const actual = getSelectedText(state);

      expect(actual).toEqual('1 item selected');
    });

    it('many selected', () => {
      const state = {
        recodeItems: [
          {
            id: '80',
            status: RecodeStatus.LOADING,
          },
          {
            id: '90',
            status: RecodeStatus.LOADING,
          },
          {
            id: '100',
            status: RecodeStatus.LOADING,
          },
        ],
      };

      const actual = getSelectedText(state);

      expect(actual).toEqual('3 items selected');
    });
  });

  describe('getAreAllItemsSelected', () => {
    it('returns true when all entries selected', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.LOADING,
          },
          {
            id: '2',
            status: RecodeStatus.LOADING,
          },
        ],
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
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.LOADING,
          },
        ],
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
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.LOADING,
          },
        ],
      };

      const actual = getAreSomeItemsSelected(state);

      expect(actual).toBeTruthy();
    });

    it('returns false when no entries selected', () => {
      const state = {
        recodeItems: [],
      };

      const actual = getAreSomeItemsSelected(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getIsRecodeLoading', () => {
    it('returns true when at least one item is loading', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.LOADING,
          },
          {
            id: '2',
            status: RecodeStatus.SUCCESS,
          },
        ],
      };

      const actual = getIsRecodeLoading(state);

      expect(actual).toBeTruthy();
    });

    it('returns false when no items are loading', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SUCCESS,
          },
          {
            id: '2',
            status: RecodeStatus.SUCCESS,
          },
        ],
      };

      const actual = getIsRecodeLoading(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getIsRecodeFinished', () => {
    it('returns false when at least one item is not success/failure', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.LOADING,
          },
          {
            id: '2',
            status: RecodeStatus.SUCCESS,
          },
        ],
      };

      const actual = getIsRecodeFinished(state);

      expect(actual).toBeFalsy();
    });

    it('returns true when all items are success/failure', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SUCCESS,
          },
          {
            id: '2',
            status: RecodeStatus.FAILURE,
          },
        ],
      };

      const actual = getIsRecodeFinished(state);

      expect(actual).toBeTruthy();
    });

    it('returns true when no items selected', () => {
      const state = {
        recodeItems: [],
      };

      const actual = getIsRecodeFinished(state);

      expect(actual).toBeTruthy();
    });
  });

  describe('getIsRecodeFailure', () => {
    it('returns true when finished and there are errors', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SUCCESS,
          },
          {
            id: '2',
            status: RecodeStatus.FAILURE,
          },
        ],
      };

      const actual = getIsRecodeFailure(state);

      expect(actual).toBeTruthy();
    });

    it('returns false when all items are success', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SUCCESS,
          },
          {
            id: '2',
            status: RecodeStatus.SUCCESS,
          },
        ],
      };

      const actual = getIsRecodeFailure(state);

      expect(actual).toBeFalsy();
    });

    it('returns false when not finished', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.LOADING,
          },
          {
            id: '2',
            status: RecodeStatus.FAILURE,
          },
        ],
      };

      const actual = getIsRecodeFailure(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getRecodeFailureMessage', () => {
    it('returns nothing when no failues', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SUCCESS,
          },
        ],
      };

      const actual = getRecodeFailureMessage(state);

      expect(actual).toEqual('');
    });

    it('returns singlular message when 1 failure', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.FAILURE,
          },
          {
            id: '2',
            status: RecodeStatus.SUCCESS,
          },
        ],
      };

      const actual = getRecodeFailureMessage(state);

      expect(actual).toEqual('1 replacement failed.');
    });

    it('returns plural message when many failure', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.FAILURE,
          },
          {
            id: '2',
            status: RecodeStatus.FAILURE,
          },
        ],
      };

      const actual = getRecodeFailureMessage(state);

      expect(actual).toEqual('2 replacements failed.');
    });
  });
});
