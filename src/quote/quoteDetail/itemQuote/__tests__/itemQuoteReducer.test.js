import {
  ADD_TABLE_ROW,
  CHANGE_TABLE_ROW,
  FORMAT_LINE_AMOUNT_INPUTS,
  REMOVE_TABLE_ROW,
  UPDATE_ITEM_QUOTE_OPTION,
} from '../ItemQuoteIntents';
import { CHANGE_EXPORT_PDF_TEMPLATE } from '../../../QuoteIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import itemQuoteReducer from '../itemQuoteReducer';
import serviceQuoteReducer from '../../serviceQuote/serviceQuoteReducer';

describe('itemQuoteReducer', () => {
  describe('updateQuoteOption', () => {
    it('updates quote with given key and value', () => {
      const state = {
        quote: {
          id: '1',
        },
      };
      const action = { intent: UPDATE_ITEM_QUOTE_OPTION, key: 'id', value: '2' };

      const actual = itemQuoteReducer(state, action);

      const expected = {
        quote: {
          id: '2',
        },
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('addTableRow', () => {
    it('adds a new line', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
      };
      const action = {
        intent: ADD_TABLE_ROW,
        row: {
          id: 'notUsed',
          newData: 'newData',
        },
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines).toEqual([
        {
          defaultData: 'defaultData',
          newData: 'newData',
        },
      ]);
    });
  });

  describe('changeTableRow', () => {
    it('updates key at line at index with value', () => {
      const state = {
        quote: {
          lines: [
            {},
            {
              hello: 2,
            },
          ],
        },
      };

      const action = {
        intent: CHANGE_TABLE_ROW, index: 1, key: 'hello', value: 3,
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines[1].hello).toEqual(3);
    });

    it('updates both amount and displayAmount when key is amount', () => {
      const state = {
        quote: {
          lines: [
            {
              amount: '1',
              displayAmount: '1',
            },
          ],
        },
      };

      const action = {
        intent: CHANGE_TABLE_ROW, index: 0, key: 'amount', value: '3',
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines[0].amount).toEqual('3');
      expect(actual.quote.lines[0].displayAmount).toEqual('3');
    });

    it('updates both discount and displayDiscount when key is discount', () => {
      const state = {
        quote: {
          lines: [
            {
              discount: '1',
              displayDiscount: '1',
            },
          ],
        },
      };

      const action = {
        intent: CHANGE_TABLE_ROW, index: 0, key: 'discount', value: '3',
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines[0].discount).toEqual('3');
      expect(actual.quote.lines[0].displayDiscount).toEqual('3');
    });
  });

  describe('removeTableRow', () => {
    it('removes line at index', () => {
      const state = {
        quote: {
          lines: [
            1, 2,
          ],
        },
      };

      const action = {
        intent: REMOVE_TABLE_ROW,
        index: 1,
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines).toEqual([1]);
    });
  });

  describe('formatLineAmountInputs', () => {
    it('formats value at key at line at index', () => {
      const state = {
        quote: {
          lines: [
            {},
            { units: '-' },
          ],
        },
      };

      const action = {
        intent: FORMAT_LINE_AMOUNT_INPUTS,
        index: 1,
        key: 'units',
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines[1].units).toEqual('0');
    });
  });

  describe('CHANGE_EXPORT_PDF_FORM', () => {
    it('changes selected template', () => {
      const state = {
        exportPdf: {
          template: 'a',
        },
      };

      const action = { intent: CHANGE_EXPORT_PDF_TEMPLATE, template: 'b' };

      const actual = itemQuoteReducer(state, action);

      expect(actual).toEqual({ exportPdf: { template: 'b' } });
    });
  });

  describe('setInitialState', () => {
    describe('emailQuote', () => {
      const state = {
        emailQuote: {
          hasEmailReplyDetails: false,
          isEmailMeACopy: false,
          ccToEmail: [''],
          fromEmail: '',
          fromName: '',
          messageBody: '',
          subject: '',
          toEmail: [''],
          attachments: [],
          templateName: '',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          quoteId: '',
        },
        quote: {
          quoteNumber: '123',
        },
        emailQuote: {
          hasEmailReplyDetails: true,
          isEmailMeACopy: false,
          ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
          fromEmail: 'tom.xu@myob.com',
          fromName: 'Tom Xu',
          messageBody: "Let's make some hot chocolate!!",
          subject: 'Hot Chocolate is life',
          toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
          includeQuoteNumberInEmail: false,
          attachments: [],
          templateName: '',
        },
      };

      it('set emailQuote state without quote number', () => {
        const expected = {
          hasEmailReplyDetails: true,
          isEmailMeACopy: false,
          ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
          fromEmail: 'tom.xu@myob.com',
          fromName: 'Tom Xu',
          messageBody: "Let's make some hot chocolate!!",
          subject: 'Hot Chocolate is life',
          toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
          includeQuoteNumberInEmail: false,
          attachments: [],
          templateName: '',
        };

        const actual = serviceQuoteReducer(state, action);

        expect(actual.emailQuote).toEqual(expected);
      });

      it('set emailQuote state with quote number', () => {
        const updatedAction = {
          ...action,
          emailQuote: {
            ...action.emailQuote,
            includeQuoteNumberInEmail: true,
          },
        };

        const expected = {
          hasEmailReplyDetails: true,
          isEmailMeACopy: false,
          ccToEmail: ['t-pain@myob.com', 'hamzzz@myob.com'],
          fromEmail: 'tom.xu@myob.com',
          fromName: 'Tom Xu',
          messageBody: "Let's make some hot chocolate!!",
          subject: 'Quote 123; Hot Chocolate is life',
          toEmail: ['geoff.spires@myob.com', 'tom.xu@myob.com'],
          includeQuoteNumberInEmail: true,
          attachments: [],
          templateName: '',
        };

        const actual = serviceQuoteReducer(state, updatedAction);

        expect(actual.emailQuote).toEqual(expected);
      });
    });

    describe('alert and modalAlert', () => {
      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          quoteId: '1',
          openSendEmail: 'true',
        },
        message: {
          content: 'Well done',
        },
        quote: {
          quoteNumber: '123',
        },
      };

      it('set modal alert if email modal is open', () => {
        const expected = { type: 'success', message: 'Well done' };

        const actual = serviceQuoteReducer({}, action);

        expect(actual.modalAlert).toEqual(expected);
      });

      it('set page alert if email modal is not open', () => {
        const expected = { type: 'success', message: 'Well done' };

        const updatedAction = {
          ...action,
          context: {
            ...action.context,
            openSendEmail: 'false',
          },
        };

        const actual = serviceQuoteReducer({}, updatedAction);

        expect(actual.alert).toEqual(expected);
      });
    });
  });
});
