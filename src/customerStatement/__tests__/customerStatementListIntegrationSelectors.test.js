import {
  getDownloadPdfQueryParams, getQueryParamsForList, getSendEmailContent,
} from '../selectors/customerStatementListIntegrationSelectors';
import StatementType from '../StatementType';

describe('customerStatementListIntegrationSelectors', () => {
  describe('getQueryParamsForList', () => {
    it('should get the correct query params', () => {
      const state = {
        filterOptions: {
          selectedCustomerId: '123',
          showZeroAmount: false,
        },
      };

      const actual = getQueryParamsForList(state);

      const expected = {
        selectedCustomerId: '123',
        showZeroAmount: false,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getSendEmailContent', () => {
    it('should build the correct content shape for an invoice statement type', () => {
      const state = {
        templateAdditionalOptions: {
          statementType: StatementType.INVOICE,
          statementDate: 'some-date',
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
      };

      expect(actual).toEqual(expected);
    });

    it('should build the correct content shape for an activity statement type', () => {
      const state = {
        templateAdditionalOptions: {
          statementType: StatementType.INVOICE,
          fromDate: 'some-date',
          toDate: 'some-date',
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
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getDownloadPdfQueryParams', () => {
    it('should build an array of objects for containing the query parameters', () => {
      const state = {
        templateAdditionalOptions: {
          statementType: 'Invoice',
          statementDate: 'some-date',
          includeInvoices: true,
        },
        sortOrder: 'asc',
        orderBy: 'name',
        customerStatements: [
          {
            payerUid: '1',
            isSelected: true,
          },
          {
            payerUid: '2',
            isSelected: false,
          },
          {
            payerUid: '3',
            isSelected: true,
          },
        ],
      };

      const templateOption = 'default-template';

      const actual = getDownloadPdfQueryParams(state, templateOption);

      const expected = {
        statementType: 'Invoice',
        statementDate: 'some-date',
        includeInvoices: true,
        sortOrder: 'asc',
        orderBy: 'name',
        templateOption,
        customerUids: ['1', '3'],
      };

      expect(actual).toEqual(expected);
    });
  });
});
