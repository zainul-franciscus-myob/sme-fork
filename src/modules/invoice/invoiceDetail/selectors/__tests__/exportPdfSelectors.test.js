import { getIsExportingPDF } from '../exportPdfSelectors';
import InvoiceDetailModalType from '../../types/InvoiceDetailModalType';

describe('exportPdfSelectors', () => {
  describe('getIsExportingPDF', () => {
    it('should return true when modal is submitting and modal type is pdf', () => {
      const state = {
        isModalSubmitting: true,
        modalType: InvoiceDetailModalType.EXPORT_PDF,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeTruthy();
    });

    it('should return false when modal is not submitting', () => {
      const state = {
        isModalSubmitting: false,
        modalType: InvoiceDetailModalType.EXPORT_PDF,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal type is not export pdf', () => {
      const state = {
        isModalSubmitting: true,
        modalType: InvoiceDetailModalType.EMAIL_INVOICE,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal is not open', () => {
      const state = {
        isModalSubmitting: false,
        modalType: InvoiceDetailModalType.NONE,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });
  });
});
