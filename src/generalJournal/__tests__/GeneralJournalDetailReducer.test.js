import GeneralJournalIntents from '../GeneralJournalIntents';
import generalJournalDetailReducer from '../generalJournalDetailReducer';

describe('general journal detail reducer', () => {
  const accounts = [{
    id: '123',
    reportingMethod: 'sale',
    taxCodeId: '123',
  }, {
    id: '456',
    reportingMethod: 'purchase',
    taxCodeId: '124',
  }];
  const taxCodes = [
    {
      id: '123', displayRate: '10%',
    },
    {
      id: '124', displayRate: '5%',
    },
  ];
  const newLine = {
    accountId: '',
    taxCodeId: '',
    accounts,
    taxCodes,
  };

  describe('UPDATE_GENERAL_JOURNAL_DETAIL_LINE', () => {
    const state = {
      generalJournal: {
        gstReportingMethod: 'sale',
        lines: [
          {
            accountId: '123',
            taxCodeId: '123',
            accounts,
            taxCodes,
          }, {
            accountId: '456',
            taxCodeId: '123',
            accounts,
            taxCodes,
          },
        ],
      },
    };

    it('should update gst reporting method when change account for first line', () => {
      const action = {
        intent: GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_LINE,
        lineIndex: 0,
        lineKey: 'accountId',
        lineValue: '456',
      };
      const newState = generalJournalDetailReducer(state, action);
      expect(newState.generalJournal.gstReportingMethod).toEqual('purchase');
      expect(newState.generalJournal.lines[0]).toEqual({
        accountId: '456',
        taxCodeId: '124',
        taxAmount: '0',
        accounts,
        taxCodes,
      });
    });

    it('should not update gst reporting method and update the existing general journal line when change account for second line', () => {
      const action = {
        intent: GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_LINE,
        lineIndex: 1,
        lineKey: 'accountId',
        lineValue: '456',
      };
      const newState = generalJournalDetailReducer(state, action);
      expect(newState.generalJournal.gstReportingMethod).toEqual('sale');
      expect(newState.generalJournal.lines[1]).toEqual({
        accountId: '456',
        taxCodeId: '124',
        taxAmount: '0',
        accounts,
        taxCodes,
      });
    });
  });

  describe('ADD_GENERAL_JOURNAL_DETAIL_LINE', () => {
    const state = {
      generalJournal: {
        gstReportingMethod: '',
        lines: [],
      },
      newLine,
    };
    it('should update the general journal line when add a new line', () => {
      const action = {
        intent: GeneralJournalIntents.ADD_GENERAL_JOURNAL_DETAIL_LINE,
        line: {
          accountId: '456',
        },
      };
      const newState = generalJournalDetailReducer(state, action);
      expect(newState.generalJournal.gstReportingMethod).toEqual('purchase');
      expect(newState.generalJournal.lines).toEqual([{
        accountId: '456',
        taxCodeId: '124',
        accounts,
        taxCodes,
      }]);
    });
  });
});
