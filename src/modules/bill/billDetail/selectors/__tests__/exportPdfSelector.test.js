import { getIsExportingPDF } from '../exportPdfSelectors';
import ModalType from '../../types/ModalType';


describe('exportPdfSelector', () => {
  describe('getIsExportingPDF', () => {
    it('should return true when modal is submitting and modal type is pdf', () => {
      const state = {
        isModalBlocking: true,
        modalType: ModalType.ExportPdf,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeTruthy();
    });

    it('should return false when modal is not submitting', () => {
      const state = {
        isModalBlocking: false,
        modalType: ModalType.ExportPdf,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal type is not export pdf', () => {
      const state = {
        isModalBlocking: true,
        modalType: ModalType.UnlinkDocument,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });

    it('should return false when modal is not open', () => {
      const state = {
        isModalBlocking: false,
        modalType: undefined,
      };
      const actual = getIsExportingPDF(state);

      expect(actual).toBeFalsy();
    });
  });
});
