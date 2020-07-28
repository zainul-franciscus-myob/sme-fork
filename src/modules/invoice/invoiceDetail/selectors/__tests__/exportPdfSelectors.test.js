import {
  getIsExportingPDF,
  getShowExportPdfButton,
} from '../exportPdfSelectors';
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
      [InvoiceLayout.SERVICE, false, true],
      [InvoiceLayout.ITEM_AND_SERVICE, false, true],
      [InvoiceLayout.PROFESSIONAL, false, false],
      [InvoiceLayout.TIME_BILLING, false, false],
      [InvoiceLayout.MISCELLANEOUS, false, false],
      ['BOGUS_LAYOUT', false, false],
      [InvoiceLayout.SERVICE, true, false],
      [InvoiceLayout.ITEM_AND_SERVICE, true, false],
    ])(
      'when invoice has %s layout, return %s',
      (layout, foreignCurrency, expected) => {
        const actual = getShowExportPdfButton.resultFunc(
          layout,
          foreignCurrency
        );

        expect(actual).toEqual(expected);
      }
    );
  });
});
