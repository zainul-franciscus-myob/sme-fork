import GeneralJournalIntents from '../GeneralJournalIntents';
import generalJournalDetailReducer from '../generalJournalDetailReducer';

describe('general journal detail reducer', () => {
  const accounts = [{
    id: '123',
    reportingMethod: 'sale',
    displayName: 'My Sales Account 1',
    accountType: 'Sales',
    taxCodeId: '123',
    displayId: '1-123',
  }, {
    id: '456',
    reportingMethod: 'purchase',
    displayName: 'My Assets Account 1',
    accountType: 'Assets',
    taxCodeId: '124',
    displayId: '2-123',
  }];
  const taxCodes = [
    {
      id: '123', displayName: 'GST', description: 'Goods & Service Tax', displayRate: '10%',
    },
    {
      id: '124', displayName: 'FRE', description: 'GST Free', displayRate: '5%',
    },
  ];
  const newLine = {
    accountId: '',
    debitAmount: '',
    creditAmount: '',
    description: '',
    taxCodeId: '',
    taxAmount: '',
    accounts,
    taxCodes,
  };

  describe('Update existing general journal detail lines', () => {
    const state = {
      generalJournal: {
        id: '1',
        referenceId: 'JE0000002',
        date: '1533045600000',
        gstReportingMethod: 'purchase',
        isEndOfYearAdjustment: false,
        isTaxInclusive: false,
        description: 'Cry havoc',
        lines: [
          {
            id: '123',
            accountId: '123',
            debitAmount: '110.00',
            creditAmount: '',
            description: 'Cry havoc one',
            taxCodeId: '123',
            taxAmount: '11.00',
            accounts,
            taxCodes,
          }, {
            id: '124',
            accountId: '456',
            debitAmount: '',
            creditAmount: '110.00',
            description: 'Cry havoc second',
            taxCodeId: '123',
            taxAmount: '11.00',
            accounts,
            taxCodes,
          },
        ],
      },
      newLine,
      modalType: '',
      alertMessage: '',
      isLoading: false,
    };

    it('should update the existing general journal line when change account for line', () => {
      const action = {
        intent: GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_LINE,
        lineIndex: 1,
        lineKey: 'accountId',
        lineValue: '456',
      };
      const newState = generalJournalDetailReducer(state, action);
      expect(newState.generalJournal.gstReportingMethod).toEqual('purchase');
      expect(newState.generalJournal.lines[1]).toEqual({
        id: '124',
        accountId: '456',
        debitAmount: '',
        creditAmount: '110.00',
        description: 'Cry havoc second',
        taxCodeId: '124',
        taxAmount: '11',
        accounts,
        taxCodes,
      });
    });
  });

  describe('Add new line', () => {
    const state = {
      generalJournal: {
        id: '',
        referenceId: 'JE0000005',
        date: '1533045600000',
        gstReportingMethod: '',
        isEndOfYearAdjustment: false,
        isTaxInclusive: false,
        description: '',
        lines: [],
      },
      newLine,
      modalType: '',
      alertMessage: '',
      isLoading: false,
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
        debitAmount: '',
        creditAmount: '',
        description: '',
        taxCodeId: '124',
        taxAmount: '',
        accounts,
        taxCodes,
      }]);
    });
  });
});
