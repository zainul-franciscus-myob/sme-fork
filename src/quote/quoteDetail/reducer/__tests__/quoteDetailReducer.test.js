import {
  CHANGE_EXPORT_PDF_TEMPLATE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_QUOTE_DETAIL,
  SET_ACCOUNT_LOADING_STATE,
} from '../../../QuoteIntents';
import quoteDetailReducer from '../quoteDetailReducer';

describe('quoteDetailReducer', () => {
  describe('LOAD_QUOTE_DETAIL', () => {
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
        intent: LOAD_QUOTE_DETAIL,
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

        const actual = quoteDetailReducer(state, action);

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

        const actual = quoteDetailReducer(state, updatedAction);

        expect(actual.emailQuote).toEqual(expected);
      });
    });

    describe('alert and modalAlert', () => {
      const action = {
        intent: LOAD_QUOTE_DETAIL,
        message: {
          content: 'Well done',
        },
        quote: {
          quoteNumber: '123',
        },
      };

      it('set modal alert if email modal is open', () => {
        const expected = { type: 'success', message: 'Well done' };

        const actual = quoteDetailReducer({ quoteId: '1', openSendEmail: 'true' }, action);

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

        const actual = quoteDetailReducer({}, updatedAction);

        expect(actual.alert).toEqual(expected);
      });
    });
  });

  describe('SET_ACCOUNT_LOADING_STATE', () => {
    it('sets state to true', () => {
      const state = {
        isAccountLoading: false,
      };

      const action = {
        intent: SET_ACCOUNT_LOADING_STATE,
        isAccountLoading: true,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual).toEqual({
        isAccountLoading: true,
      });
    });

    it('sets state to false', () => {
      const state = {
        isAccountLoading: true,
      };

      const action = {
        intent: SET_ACCOUNT_LOADING_STATE,
        isAccountLoading: false,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual).toEqual({
        isAccountLoading: false,
      });
    });
  });

  describe('LOAD_ACCOUNT_AFTER_CREATE', () => {
    it('merges new account payload into state newLine', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          accountOptions: [{ thisIsAnAccount: true }],
        },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.newLine).toEqual({
        accountOptions: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
      });
    });

    it('merges new account payload into state all lines', () => {
      const state = {
        quote: {
          lines: [
            { accountOptions: [{ thisIsAnAccount: true }] },
            { accountOptions: [{ thisIsAnAccount: true }] },
          ],
        },
        newLine: { accountOptions: [] },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = quoteDetailReducer(state, action);
      expect(actual.quote).toEqual({
        lines: [
          {
            accountOptions: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
          },
          {
            accountOptions: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
          },
        ],
      });
    });

    it('sets page state to edited', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          accountOptions: [{ thisIsAnAccount: true }],
        },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
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

      const actual = quoteDetailReducer(state, action);

      expect(actual).toEqual({ exportPdf: { template: 'b' } });
    });
  });
});
