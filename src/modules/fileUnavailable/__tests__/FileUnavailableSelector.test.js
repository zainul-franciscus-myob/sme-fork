import {
  getBusinessId,
  getDashboardURL,
  getIsOnlineOnly,
  getIsPolling,
  getReason,
  getRegion,
  getUpdateFileSuccess,
} from '../FileUnavailableSelectors';

describe('fileUnavailableSeletor', () => {
  describe('getBusinessId', () => {
    it('should get Business ID', () => {
      const state = {
        businessId: '1',
      };

      const expected = '1';
      const actual = getBusinessId(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getRegion', () => {
    it('should get Region', () => {
      const state = {
        region: 'Au',
      };

      const expected = 'Au';
      const actual = getRegion(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getIsOnlineOnly', () => {
    it('should get Region', () => {
      const state = {
        isOnlineOnly: true,
      };

      const expected = true;
      const actual = getIsOnlineOnly(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getReason', () => {
    it('should get Region', () => {
      const state = {
        reason: 'versionTooLow',
      };

      const expected = 'versionTooLow';
      const actual = getReason(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getUpdateFileSuccess', () => {
    it('should get Region', () => {
      const state = {
        updateFileSuccess: true,
      };

      const expected = true;
      const actual = getUpdateFileSuccess(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getIsPolling', () => {
    it('should get Region', () => {
      const state = {
        isPolling: true,
      };

      const expected = true;
      const actual = getIsPolling(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getDashboardURL', () => {
    it('should get Region', () => {
      const state = {
        businessId: '1',
        region: 'Au',
      };

      const expected = 'Au/1/dashboard';
      const actual = getDashboardURL(state);
      expect(actual).toEqual(expected);
    });
  });
});
