import GeneralJournalIntents from '../GeneralJournalIntents';
import generalJournalDetail from './fixtures/generalJournalDetail';
import generalJournalDetailReducer from '../generalJournalDetailReducer';

const {
  generalJournal: {
    lines,
  },
  accounts,
} = generalJournalDetail;


const getState = () => ({
  generalJournal: {
    ...generalJournalDetail.generalJournal,
    lines: [lines[0], lines[1]],
  },
  accounts,
});

describe('generalJournalDetailReducer', () => {
  describe('UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS', () => {
    const intent = GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS;

    describe('isTaxInclusive', () => {
      const key = 'isTaxInclusive';

      it('should update debit from exclusive to inclusive correctly', () => {
        const state = {
          ...getState(),
        };

        const action = {
          intent,
          key,
          value: true,
        };

        const newState = {
          ...state,
          generalJournal: {
            ...state.generalJournal,
            isTaxInclusive: true,
            lines: [{
              ...state.generalJournal.lines[0],
              debitDisplayAmount: '121.00',
            },
            {
              ...state.generalJournal.lines[1],
              debitDisplayAmount: '110.11',
            }],
          },
        };

        expect(generalJournalDetailReducer(state, action)).toEqual(newState);
      });

      it('should update debit from exclusive to inclusive correctly', () => {
        const originalState = {
          ...getState(),
        };
        const state = {
          ...originalState,
          generalJournal: {
            ...originalState.generalJournal,
            isTaxInclusive: true,
            lines: [{
              ...originalState.generalJournal.lines[0],
              debitDisplayAmount: '121.00',
            },
            {
              ...originalState.generalJournal.lines[1],
              debitDisplayAmount: '110.11',
            }],
          },
        };

        const action = {
          intent,
          key,
          value: false,
        };

        const newState = {
          ...originalState,
        };


        expect(generalJournalDetailReducer(state, action)).toEqual(newState);
      });

      it('should update credit from exclusive to inclusive correctly', () => {
        const original = {
          ...getState(),
        };

        const state = {
          ...original,
          generalJournal: {
            ...original.generalJournal,
            lines: [{
              ...original.generalJournal.lines[0],
              debitDisplayAmount: '',
              creditDisplayAmount: '110.00',
            },
            {
              ...original.generalJournal.lines[1],
              debitDisplayAmount: '',
              creditDisplayAmount: '100.10',
            }],
          },
        };

        const action = {
          intent,
          key,
          value: true,
        };

        const newState = {
          ...state,
          generalJournal: {
            ...state.generalJournal,
            isTaxInclusive: true,
            lines: [{
              ...state.generalJournal.lines[0],
              creditDisplayAmount: '121.00',
            }, {
              ...state.generalJournal.lines[1],
              creditDisplayAmount: '110.11',
            }],
          },
        };


        expect(generalJournalDetailReducer(state, action)).toEqual(newState);
      });

      it('should update credit from inclusive to exclusive correctly', () => {
        const oritinalState = {
          ...getState(),
        };

        const state = {
          ...oritinalState,
          generalJournal: {
            ...oritinalState.generalJournal,
            isTaxInclusive: true,
            lines: [{
              ...oritinalState.generalJournal.lines[0],
              debitDisplayAmount: '',
              creditDisplayAmount: '121.00',
            },
            {
              ...oritinalState.generalJournal.lines[1],
              debitDisplayAmount: '',
              creditDisplayAmount: '110.11',
            }],
          },
        };

        const action = {
          intent,
          key,
          value: false,
        };

        const newState = {
          ...state,
          generalJournal: {
            ...state.generalJournal,
            isTaxInclusive: false,
            lines: [{
              ...state.generalJournal.lines[0],
              creditDisplayAmount: '110.00',
            }, {
              ...state.generalJournal.lines[1],
              creditDisplayAmount: '100.10',
            }],
          },
        };


        expect(generalJournalDetailReducer(state, action)).toEqual(newState);
      });
    });
  });
});
