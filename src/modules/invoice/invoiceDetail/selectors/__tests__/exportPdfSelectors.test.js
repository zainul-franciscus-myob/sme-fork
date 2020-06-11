import { getIsExportingPDF, getShowExportPdfButton } from '../exportPdfSelectors';
import InvoiceDetailModalType from '../../types/InvoiceDetailModalType';
import InvoiceLayout from '../../types/InvoiceLayout';

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

  describe('getShowExportPdfButton', () => {
    it.each([
      [InvoiceLayout.SERVICE, true],
      [InvoiceLayout.ITEM_AND_SERVICE, true],
      [InvoiceLayout.PROFESSIONAL, false],
      [InvoiceLayout.TIME_BILLING, false],
      [InvoiceLayout.MISCELLANEOUS, false],
      ['BOGUS_LAYOUT', false],
    ])('when invoice has %s layout, return %s', (layout, expected) => {
      const actual = getShowExportPdfButton.resultFunc(layout);

      expect(actual).toEqual(expected);
    });
  });
});
