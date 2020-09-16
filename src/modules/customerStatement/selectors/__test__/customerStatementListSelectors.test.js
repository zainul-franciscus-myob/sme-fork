import { getIsDownloadingPDF } from '../customerStatementListSelectors';
import { getSendEmailContent } from '../customerStatementListIntegrationSelectors';
import ModalType from '../../ModalType';
import StatementType from '../../StatementType';

describe('customerStatementListSelectors', () => {
  describe('getIsDownloadingPDF', () => {
    it('should return true when modal is submitting and modal type is pdf', () => {
      const state = {
        modal: {
          type: ModalType.PDF,
          isModalSubmitting: true,
        },
      };
      const actual = getIsDownloadingPDF(state);

      expect(actual).toBeTruthy();
    });

    it('should return false when modal is not submitting', () => {
      const state = {
        modal: {
          type: ModalType.PDF,
          isModalSubmitting: false,
        },
      };
      const actual = getIsDownloadingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal type is not export pdf', () => {
      const state = {
        modal: {
          type: ModalType.EMAIL,
          isModalSubmitting: true,
        },
      };
      const actual = getIsDownloadingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal is not open', () => {
      const state = {
        modal: {
          type: ModalType.NONE,
          isModalSubmitting: false,
        },
      };
      const actual = getIsDownloadingPDF(state);

      expect(actual).toBeFalsy();
    });
  });

  describe('getSendEmailContent', () => {
    describe('toEmail', () => {
      const state = {
        customerStatements: [],
        emailModalOptions: {},
        templateAdditionalOptions: { statementType: StatementType.INVOICE },
      };

      it('build toEmail from selected statement', () => {
        const actual = getSendEmailContent({
          ...state,
          customerStatements: [
            { payerUid: '1', email: 'a@domain.com' },
            { payerUid: '2', email: 'b@domain.com', isSelected: true },
            { payerUid: '3', email: 'c@domain.com', isSelected: true },
            { payerUid: '4', isSelected: true },
            { payerUid: '5', email: 'd@domain.com' },
            {
              payerUid: '6',
              email: 'e@domain.com;f@domain.com; g@domain.com',
              isSelected: true,
            },
            {
              payerUid: '7',
              email: 'h@domain.com; ; i@domain.com',
              isSelected: true,
            },
          ],
        });

        expect(actual.toEmail).toEqual([
          { payerUid: '2', email: 'b@domain.com' },
          { payerUid: '3', email: 'c@domain.com' },
          { payerUid: '4', email: '' },
          { payerUid: '6', email: 'e@domain.com' },
          { payerUid: '6', email: 'f@domain.com' },
          { payerUid: '6', email: 'g@domain.com' },
          { payerUid: '7', email: 'h@domain.com' },
          { payerUid: '7', email: 'i@domain.com' },
        ]);
      });
    });
  });
});
