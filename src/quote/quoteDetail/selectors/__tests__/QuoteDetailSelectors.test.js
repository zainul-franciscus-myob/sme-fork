import {
  getAccountModalContext,
  getIsAccountComboboxDisabled,
  getLoadQuoteDetailModalType,
  getUpdatedContactOptions,
} from '../QuoteDetailSelectors';
import ModalType from '../../ModalType';

describe('QuoteDetailSelectors', () => {
  describe('getLoadQuoteDetailModalType', () => {
    it.each([
      [ModalType.NONE, false, undefined, undefined, { hasEmailReplyDetails: true }],
      [ModalType.EMAIL_INVOICE, false, 'true', undefined, { hasEmailReplyDetails: true }],
      [ModalType.EMAIL_SETTINGS, false, 'true', undefined, { hasEmailReplyDetails: false }],
      [ModalType.EXPORT_PDF, false, undefined, 'true', { hasEmailReplyDetails: true }],
      [ModalType.NONE, true, undefined, undefined, { hasEmailReplyDetails: true }],
      [ModalType.NONE, true, 'true', undefined, { hasEmailReplyDetails: true }],
      [ModalType.NONE, true, 'true', undefined, { hasEmailReplyDetails: false }],
      [ModalType.NONE, true, undefined, 'true', { hasEmailReplyDetails: true }],
    ], ('should return modal type %s', (
      expected, isCreating, openSendEmail, openExportPdf, emailQuote,
    ) => {
      const customState = {
        invoiceId: isCreating ? 'new' : '1',
        openSendEmail,
        openExportPdf,
      };

      const actual = getLoadQuoteDetailModalType(customState, emailQuote);

      expect(actual).toEqual(expected);
    }));
  });

  describe('getIsAccountComboboxDisabled', () => {
    it('returns true when account is loading', () => {
      const loadingState = {
        isAccountLoading: true,
      };

      const actual = getIsAccountComboboxDisabled(loadingState);

      expect(actual).toEqual(true);
    });
    it('returns false when account is not loading', () => {
      const loadingState = {
        isAccountLoading: false,
      };

      const actual = getIsAccountComboboxDisabled(loadingState);

      expect(actual).toEqual(false);
    });
  });
  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const contextState = {
        region: 'Spain', businessId: 'manzana',
      };

      const actual = getAccountModalContext(contextState);

      expect(actual).toEqual({ region: 'Spain', businessId: 'manzana' });
    });
  });

  describe('getUpdatedCustomerOptions', () => {
    it('should contain newly added contact option', () => {
      const option1 = { value: '1', name: 'Option 1' };
      const option2 = {
        value: '2',
        name: 'Option 2',
      };
      const expected = [option2, option1];

      const actual = getUpdatedContactOptions({ contactOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });

    it('should contain updated contact option', () => {
      const option1 = { value: '1', name: 'Option 1' };
      const option2 = {
        value: '1',
        name: 'Option 1',
      };
      const expected = [option2];

      const actual = getUpdatedContactOptions({ contactOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });
  });
});
