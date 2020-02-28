import {
  ADD_QUOTE_LINE,
  CHANGE_EXPORT_PDF_TEMPLATE,
  FORMAT_QUOTE_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_QUOTE_DETAIL,
  REMOVE_QUOTE_LINE,
  SET_ACCOUNT_LOADING_STATE,
  UPDATE_LAYOUT,
  UPDATE_QUOTE_LINE,
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
    it('merges new account payload into the account options', () => {
      const state = {
        quote: {
          lines: [],
        },
        accountOptions: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        id: '3',
      };

      const actual = quoteDetailReducer(state, action);

      const expected = [
        {
          id: '3',
        },
        {
          id: '1',
        },
        {
          id: '2',
        },
      ];

      expect(actual.accountOptions).toEqual(expected);
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

  describe('UPDATE_LAYOUT', () => {
    it('changes the type in the newLine if the layout changes', () => {
      const state = {
        quote: {
          layout: 'service',
          lines: [],
        },
      };

      const action = { intent: UPDATE_LAYOUT, key: 'layout', value: 'itemAndService' };

      const actual = quoteDetailReducer(state, action);

      expect(actual.newLine.type).toEqual('item');
    });

    it('changes the default template options in email quote and export pdf for service', () => {
      const state = {
        quote: {
          layout: 'service',
          lines: [],
        },
        itemTemplateOptions: {
          defaultTemplate: 'a',
        },
        serviceTemplateOptions: {
          defaultTemplate: 'b',
        },
        emailQuote: {
          templateName: 'b',
        },
        exportPdf: {
          template: 'b',
        },
      };

      const action = { intent: UPDATE_LAYOUT, key: 'layout', value: 'itemAndService' };

      const actual = quoteDetailReducer(state, action);

      expect(actual.emailQuote.templateName).toEqual('a');
      expect(actual.exportPdf.template).toEqual('a');
    });

    it('changes the default template options in email quote and export pdf for itemAndService', () => {
      const state = {
        quote: {
          layout: 'itemAndService',
          lines: [],
        },
        itemTemplateOptions: {
          defaultTemplate: 'a',
        },
        serviceTemplateOptions: {
          defaultTemplate: 'b',
        },
        emailQuote: {
          templateName: 'a',
        },
        exportPdf: {
          template: 'a',
        },
      };

      const action = { intent: UPDATE_LAYOUT, key: 'layout', value: 'service' };

      const actual = quoteDetailReducer(state, action);

      expect(actual.emailQuote.templateName).toEqual('b');
      expect(actual.exportPdf.template).toEqual('b');
    });

    it('changes remove all item lines and clears line ids if transitioning to a service layout', () => {
      const state = {
        quote: {
          layout: 'itemAndService',
          lines: [
            {
              type: 'item',
              id: '1',
            },
            {
              type: 'service',
              id: '2',
            },
          ],
        },
      };

      const action = { intent: UPDATE_LAYOUT, value: 'service' };

      const actual = quoteDetailReducer(state, action);

      const expected = [
        {
          type: 'service',
          id: '',
        },
      ];

      expect(actual.quote.lines).toEqual(expected);
    });
  });

  describe('ADD_QUOTE_LINE', () => {
    it('adds a new line and sets the type to be service if the itemId has not been changed', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
        accountOptions: [
          {
            id: '1',
          },
        ],
      };
      const action = {
        intent: ADD_QUOTE_LINE,
        line: {
          id: 'notUsed',
          allocatedAccountId: 'some-id',
        },
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].type).toEqual('service');
    });

    it('adds a new line and sets the default taxCodeId if allocatedAccountId has been changed', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
        accountOptions: [
          {
            id: '1',
            taxCodeId: '2',
          },
        ],
      };
      const action = {
        intent: ADD_QUOTE_LINE,
        line: {
          id: 'notUsed',
          allocatedAccountId: '1',
        },
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].taxCodeId).toEqual('2');
    });

    it('adds a new line and sets the type to be item if the itemId has been changed', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
      };
      const action = {
        intent: ADD_QUOTE_LINE,
        line: {
          id: 'notUsed',
          itemId: '1',
        },
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].type).toEqual('item');
    });

    it('set amount when displayAmount has been changed', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
      };
      const action = {
        intent: ADD_QUOTE_LINE,
        line: {
          id: 'notUsed',
          displayAmount: '1',
        },
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].displayAmount).toEqual('1');
      expect(actual.quote.lines[0].amount).toEqual('1');
    });

    it('set discount when displayDiscount has been changed', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
      };
      const action = {
        intent: ADD_QUOTE_LINE,
        line: {
          id: 'notUsed',
          displayDiscount: '1',
        },
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].displayDiscount).toEqual('1');
      expect(actual.quote.lines[0].discount).toEqual('1');
    });

    it('set description dirty when description has been changed', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
      };
      const action = {
        intent: ADD_QUOTE_LINE,
        line: {
          id: 'notUsed',
          description: '1',
        },
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].descriptionDirty).toBeTruthy();
    });
  });

  describe('UPDATE_QUOTE_LINE', () => {
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
        intent: UPDATE_QUOTE_LINE, index: 1, key: 'hello', value: 3,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[1].hello).toEqual(3);
    });

    it('updates both amount and displayAmount when key is displayAmount', () => {
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
        intent: UPDATE_QUOTE_LINE, index: 0, key: 'displayAmount', value: '3',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].amount).toEqual('3');
      expect(actual.quote.lines[0].displayAmount).toEqual('3');
    });

    it('updates both discount and displayDiscount when key is displayDiscount', () => {
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
        intent: UPDATE_QUOTE_LINE, index: 0, key: 'displayDiscount', value: '3',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].discount).toEqual('3');
      expect(actual.quote.lines[0].displayDiscount).toEqual('3');
    });

    it('updates both unitPrice and displayUnitPrice when key is displayUnitPrice', () => {
      const state = {
        quote: {
          lines: [
            {
              unitPrice: '1',
              displayUnitPrice: '1',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_QUOTE_LINE, index: 0, key: 'displayUnitPrice', value: '3',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].unitPrice).toEqual('3');
      expect(actual.quote.lines[0].displayUnitPrice).toEqual('3');
    });

    it('updates taxCodeId and allocatedAccountId when key is allocatedAccountId', () => {
      const state = {
        quote: {
          lines: [
            {},
          ],
        },
        accountOptions: [
          {
            id: '1',
            taxCodeId: '2',
          },
        ],
      };

      const action = {
        intent: UPDATE_QUOTE_LINE, index: 0, key: 'allocatedAccountId', value: '1',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].taxCodeId).toEqual('2');
      expect(actual.quote.lines[0].allocatedAccountId).toEqual('1');
    });

    it('updates type to item when key is itemId', () => {
      const state = {
        quote: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_QUOTE_LINE, index: 0, key: 'itemId', value: '1',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].itemId).toEqual('1');
      expect(actual.quote.lines[0].type).toEqual('item');
    });

    it('clears line ids if line type is changed', () => {
      const state = {
        quote: {
          lines: [
            {
              id: '1',
              type: 'service',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_QUOTE_LINE, index: 0, key: 'itemId', value: '1',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].id).toEqual('');
    });

    it('set description dirty when user enter description', () => {
      const state = {
        quote: {
          lines: [
            {
              description: '',
              descriptionDirty: false,
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_QUOTE_LINE, index: 0, key: 'description', value: 'blah',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].description).toEqual('blah');
      expect(actual.quote.lines[0].descriptionDirty).toEqual(true);
    });
  });

  describe('REMOVE_QUOTE_LINE', () => {
    it('removes line at index', () => {
      const state = {
        quote: {
          lines: [
            1, 2,
          ],
        },
      };

      const action = {
        intent: REMOVE_QUOTE_LINE,
        index: 1,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines).toEqual([1]);
    });
  });

  describe('FORMAT_QUOTE_LINE', () => {
    it('should reset the units of line back to 1 if the line is emptied', () => {
      const state = {
        quote: {
          lines: [
            {
              units: '',
            },
          ],
        },
      };

      const action = {
        intent: FORMAT_QUOTE_LINE,
        key: 'units',
        index: 0,
      };

      const actual = quoteDetailReducer(state, action);

      const expected = {
        units: '1',
      };

      expect(actual.quote.lines[0]).toEqual(expected);
    });

    it('should just return the state if the key isn\t unitPrice', () => {
      const state = {
        quote: {
          lines: [{}],
        },
        something: '',
      };

      const action = {
        intent: FORMAT_QUOTE_LINE,
        key: 'blah',
        index: 0,
      };

      const actual = quoteDetailReducer(state, action);

      const expected = {
        quote: {
          lines: [{}],
        },
        something: '',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('LOAD_ITEM_SELLING_DETAILS', () => {
    it('should populate line amounts when item is tax inclusive and quote is inclusive', () => {
      const state = {
        quote: {
          isTaxInclusive: true,
          lines: [{}],
        },
      };

      const action = {
        intent: LOAD_ITEM_SELLING_DETAILS,
        index: 0,
        itemSellingDetails: {
          sellingPrice: '10',
          taxAmount: '0.91',
          isTaxInclusive: true,
          unitOfMeasure: 'kg',
          description: 'item',
          sellTaxCodeId: '1',
          incomeAccountId: '2',
        },
      };

      const expected = {
        isPageEdited: true,
        quote: {
          isTaxInclusive: true,
          lines: [{
            allocatedAccountId: '2',
            amount: 10,
            description: 'item',
            discount: '0',
            displayAmount: '10.00',
            displayDiscount: '0.00',
            taxCodeId: '1',
            unitOfMeasure: 'kg',
            units: '1',
          }],
        },
      };

      const actual = quoteDetailReducer(state, action);
      expect(actual).toEqual(expected);
    });

    it('should populate line amounts when item is tax exclusive and quote is inclusive', () => {
      const state = {
        quote: {
          isTaxInclusive: true,
          lines: [{}],
        },
      };

      const action = {
        intent: LOAD_ITEM_SELLING_DETAILS,
        index: 0,
        itemSellingDetails: {
          sellingPrice: '10',
          taxAmount: '1',
          isTaxInclusive: false,
          unitOfMeasure: 'kg',
          description: 'item',
          sellTaxCodeId: '1',
          incomeAccountId: '2',
        },
      };

      const expected = {
        isPageEdited: true,
        quote: {
          isTaxInclusive: true,
          lines: [{
            allocatedAccountId: '2',
            amount: 11,
            description: 'item',
            discount: '0',
            displayAmount: '11.00',
            displayDiscount: '0.00',
            taxCodeId: '1',
            unitOfMeasure: 'kg',
            units: '1',
          }],
        },
      };

      const actual = quoteDetailReducer(state, action);
      expect(actual).toEqual(expected);
    });

    it('should populate line amounts when item is tax inclusive and quote is exclusive', () => {
      const state = {
        quote: {
          isTaxInclusive: false,
          lines: [{}],
        },
      };

      const action = {
        intent: LOAD_ITEM_SELLING_DETAILS,
        index: 0,
        itemSellingDetails: {
          sellingPrice: '10',
          taxAmount: '0.91',
          isTaxInclusive: true,
          unitOfMeasure: 'kg',
          description: 'item',
          sellTaxCodeId: '1',
          incomeAccountId: '2',
        },
      };

      const expected = {
        isPageEdited: true,
        quote: {
          isTaxInclusive: false,
          lines: [{
            allocatedAccountId: '2',
            amount: 9.09,
            description: 'item',
            discount: '0',
            displayAmount: '9.09',
            displayDiscount: '0.00',
            taxCodeId: '1',
            unitOfMeasure: 'kg',
            units: '1',
          }],
        },
      };

      const actual = quoteDetailReducer(state, action);
      expect(actual).toEqual(expected);
    });

    it('should populate line amounts when item is tax exclusive and quote is exclusive', () => {
      const state = {
        quote: {
          isTaxInclusive: false,
          lines: [{}],
        },
      };

      const action = {
        intent: LOAD_ITEM_SELLING_DETAILS,
        index: 0,
        itemSellingDetails: {
          sellingPrice: '10',
          taxAmount: '1',
          isTaxInclusive: false,
          unitOfMeasure: 'kg',
          description: 'item',
          sellTaxCodeId: '1',
          incomeAccountId: '2',
        },
      };

      const expected = {
        isPageEdited: true,
        quote: {
          isTaxInclusive: false,
          lines: [{
            allocatedAccountId: '2',
            amount: 10,
            description: 'item',
            discount: '0',
            displayAmount: '10.00',
            displayDiscount: '0.00',
            taxCodeId: '1',
            unitOfMeasure: 'kg',
            units: '1',
          }],
        },
      };

      const actual = quoteDetailReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });
});
