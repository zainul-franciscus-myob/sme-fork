import {
  getCustomersSelected, getDefaultTemplateOption, getSelectedTemplateOption, getTemplateOptions,
} from '../selectors/customerStatementListSelectors';
import StatementType from '../StatementType';

describe('customerStatementListSelectors', () => {
  describe('getCustomersSelected', () => {
    it('should filter out customers that haven\'t been selected and get length', () => {
      const state = {
        customerStatements: [
          {
            isSelected: false,
          },
          {
            isSelected: true,
          },
        ],
      };

      const actual = getCustomersSelected(state);

      const expectedLength = 1;

      expect(actual).toEqual(expectedLength);
    });
  });

  describe('getTemplateOptions', () => {
    it('should return activity template options given a statement type of activity', () => {
      const activityTemplateOptions = [
        {
          name: 'blah',
          label: 'blah',
        },
      ];

      const state = {
        appliedFilterOptions: {
          statementType: StatementType.ACTIVITY,
        },
        activityTemplateOptions,
      };

      const actual = getTemplateOptions(state);

      const expected = activityTemplateOptions;

      expect(actual).toEqual(expected);
    });

    it('should return invoice template options given a statement type of invoice', () => {
      const invoiceTemplateOptions = [
        {
          name: 'blah',
          label: 'blah',
        },
      ];

      const state = {
        appliedFilterOptions: {
          statementType: StatementType.INVOICE,
        },
        invoiceTemplateOptions,
      };

      const actual = getTemplateOptions(state);

      const expected = invoiceTemplateOptions;

      expect(actual).toEqual(expected);
    });
  });

  describe('getDefaultTemplateOption', () => {
    it('should get the default invoice template option given a statement type of invoice', () => {
      const state = {
        appliedFilterOptions: {
          statementType: StatementType.INVOICE,
        },
        defaultInvoiceTemplateOption: 'default-template',
      };

      const actual = getDefaultTemplateOption(state);

      const expected = 'default-template';

      expect(actual).toEqual(expected);
    });

    it('should get the default invoice template option given a statement type of invoice', () => {
      const state = {
        appliedFilterOptions: {
          statementType: StatementType.ACTIVITY,
        },
        defaultInvoiceTemplateOption: 'default-template',
        defaultActivityTemplateOption: 'default-activity-template',
      };

      const actual = getDefaultTemplateOption(state);

      const expected = 'default-activity-template';

      expect(actual).toEqual(expected);
    });
  });

  describe('getSelectedTemplateOption', () => {
    it('should use the selectedTemplateOption if it exists', () => {
      const state = {
        appliedFilterOptions: {
          statementType: StatementType.INVOICE,
        },
        selectedTemplateOption: 'default-template',
      };

      const actual = getSelectedTemplateOption(state);

      const expected = 'default-template';

      expect(actual).toEqual(expected);
    });

    it('should use the defaultTemplateOption if no selectedTemplateOption exists', () => {
      const state = {
        appliedFilterOptions: {
          statementType: StatementType.INVOICE,
        },
        selectedTemplateOption: '',
        defaultInvoiceTemplateOption: 'default-invoice-template',
      };

      const actual = getSelectedTemplateOption(state);

      const expected = 'default-invoice-template';

      expect(actual).toEqual(expected);
    });
  });
});
