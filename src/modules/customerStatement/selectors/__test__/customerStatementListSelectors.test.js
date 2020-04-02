import { getIsDownloadingPDF } from '../customerStatementListSelectors';
import ModalType from '../../ModalType';

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
});
