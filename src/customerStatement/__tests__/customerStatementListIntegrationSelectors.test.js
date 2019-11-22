import { getExportPdfQueryParams, getQueryParams, getSendEmailContent } from '../selectors/customerStatementListIntegrationSelectors';
import StatementType from '../StatementType';

describe('customerStatementListIntegrationSelectors', () => {
  describe('getQueryParams', () => {
    it('should get the correct query params for a statement type of invoice', () => {
      const state = {
        filterOptions: {
          statementType: StatementType.INVOICE,
          statementDate: 'some-date',
          includeInvoices: true,
          selectedCustomerId: '123',
          showZeroAmount: false,
        },
      };

      const actual = getQueryParams(state);

      const expected = {
        statementType: StatementType.INVOICE,
        statementDate: 'some-date',
        includeInvoices: true,
        selectedCustomerId: '123',
        showZeroAmount: false,
      };

      expect(actual).toEqual(expected);
    });

    it('should get the correct query params for a statement type of activity', () => {
      const state = {
        filterOptions: {
          statementType: StatementType.ACTIVITY,
          fromDate: 'from-date',
          toDate: 'to-date',
          includeInvoices: true,
          selectedCustomerId: '123',
          showZeroAmount: false,
        },
      };

      const actual = getQueryParams(state);

      const expected = {
        statementType: StatementType.ACTIVITY,
        fromDate: 'from-date',
        toDate: 'to-date',
        includeInvoices: true,
        selectedCustomerId: '123',
        showZeroAmount: false,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getSendEmailContent', () => {
    it('should build the correct content shape for an invoice statement type', () => {
      const state = {
        appliedFilterOptions: {
          statementType: StatementType.INVOICE,
          statementDate: 'some-date',
          includeInvoices: true,
          showZeroAmount: false,
        },
        emailModalOptions: {
          fromEmail: 'from-email',
          subject: 'email-subject',
          message: 'email-message',
          selectedTemplateOption: 'default',
        },
        customerStatements: [
          {
            payerUid: 'some-payer-UID',
            email: 'asd@hotmail.com',
            isSelected: false,
          },
          {
            payerUid: 'some-payer-UID-2',
            email: 'blah@hotmail.com',
            isSelected: true,
          },
        ],
      };

      const actual = getSendEmailContent(state);

      const expected = {
        fromEmail: 'from-email',
        subject: 'email-subject',
        message: 'email-message',
        toEmail: [
          {
            payerUid: 'some-payer-UID-2',
            email: 'blah@hotmail.com',
          },
        ],
        templateOption: 'default',
        statementType: 'Invoice',
        statementDate: 'some-date',
        includeInvoices: true,
        showZeroAmount: false,
      };

      expect(actual).toEqual(expected);
    });

    it('should build the correct content shape for an activity statement type', () => {
      const state = {
        appliedFilterOptions: {
          statementType: StatementType.INVOICE,
          fromDate: 'some-date',
          toDate: 'some-date',
          includeInvoices: true,
          showZeroAmount: false,
        },
        emailModalOptions: {
          fromEmail: 'from-email',
          subject: 'email-subject',
          message: 'email-message',
          selectedTemplateOption: 'default',
        },
        customerStatements: [
          {
            payerUid: 'some-payer-UID',
            email: 'asd@hotmail.com',
            isSelected: true,
          },
          {
            payerUid: 'some-payer-UID-2',
            email: 'blah@hotmail.com',
            isSelected: true,
          },
        ],
      };

      const actual = getSendEmailContent(state);

      const expected = {
        fromEmail: 'from-email',
        subject: 'email-subject',
        message: 'email-message',
        toEmail: [
          {
            payerUid: 'some-payer-UID',
            email: 'asd@hotmail.com',
          },
          {
            payerUid: 'some-payer-UID-2',
            email: 'blah@hotmail.com',
          },
        ],
        templateOption: 'default',
        statementType: 'Invoice',
        fromDate: 'some-date',
        toDate: 'some-date',
        includeInvoices: true,
        showZeroAmount: false,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getExportPdfQueryParams', () => {
    it('should build an array of strings for customerUids for the query params', () => {
      const state = {
        appliedFilterOptions: {},
        customerStatements: [
          {
            payerUid: '1',
            isSelected: true,
          },
          {
            payerUid: '2',
            isSelected: true,
          },
          {
            payerUid: '3',
            isSelected: true,
          },
        ],
      };

      const templateOption = 'default-template';

      const actual = getExportPdfQueryParams(state, templateOption);

      const expected = {
        customerUids: '1&customerUids=2&customerUids=3',
        templateOption,
      };

      expect(actual).toEqual(expected);
    });
  });
});
