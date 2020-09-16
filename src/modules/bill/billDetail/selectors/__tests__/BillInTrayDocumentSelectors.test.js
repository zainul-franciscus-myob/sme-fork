import {
  getShouldLinkInTrayDocument,
  getShouldShowInTrayDocument,
} from '../BillInTrayDocumentSelectors';
import BillLayout from '../../types/BillLayout';

describe('BillInTrayDocumentSelectors', () => {
  describe('getShouldLinkInTrayDocument', () => {
    it('should not link if is preconversion', () => {
      const state = {
        isPreConversion: true,
      };

      const actual = getShouldLinkInTrayDocument(state);
      expect(actual).toEqual(false);
    });

    it('should link if is creating new and prefill has occurred', () => {
      const state = {
        isPreConversion: false,
        billId: 'new',
        inTrayDocumentId: '123',
      };

      const actual = getShouldLinkInTrayDocument(state);
      expect(actual).toEqual(true);
    });
  });

  describe('getShouldShowInTrayDocument', () => {
    it('should not show if is preconversion', () => {
      const state = {
        isPreConversion: true,
        bill: {
          layout: BillLayout.ITEM_AND_SERVICE,
          lines: [],
        },
      };

      const actual = getShouldShowInTrayDocument(state);
      expect(actual).toEqual(false);
    });

    it('should not show if it is read only and has no in tray document', () => {
      const state = {
        isPreConversion: false,
        bill: {
          layout: BillLayout.PROFESSIONAL,
          lines: [],
        },
      };

      const actual = getShouldShowInTrayDocument(state);
      expect(actual).toEqual(false);
    });

    it('should show if it is read only and has in tray document', () => {
      const state = {
        isPreConversion: false,
        bill: {
          layout: BillLayout.PROFESSIONAL,
          lines: [],
        },
        inTrayDocumentId: '123',
      };

      const actual = getShouldShowInTrayDocument(state);
      expect(actual).toEqual(true);
    });
  });
});
