import {
  getAreMultipleUsersOnboarded,
  getIsBusinessOnboarded,
  getIsRemoveAuthorisationModalOpen,
  getOnSuccessCallbackUrl,
  getPaydayFilingUrl,
  getUrlParams,
  getUserStatusMessage,
  isIrdAuthorisationComplete,
  isUserAuthorised,
} from '../PaydayFilingSelectors';

describe('PaydayFilingSelectors', () => {
  describe('getURLParams', () => {
    it('should get the Url params', () => {
      const state = {
        tab: 'finalisation',
      };

      const result = getUrlParams(state);

      expect(result).toEqual({ tab: 'finalisation' });
    });
  });
  describe('getIsBusinessOnboarded', () => {
    it('should get the business onboarded status', () => {
      const businessOnboardedStatus = { isBusinessOnboarded: true };
      const state = {
        isBusinessOnboarded: businessOnboardedStatus,
      };

      const actual = getIsBusinessOnboarded(state);

      expect(actual).toEqual(businessOnboardedStatus);
    });
  });

  describe('getAreMultipleUsersOnboarded', () => {
    it('should get the multiple business users onboarded status', () => {
      const multipleUsersOnboardedStatus = { areMultipleUsersOnboarded: true };
      const state = {
        areMultipleUsersOnboarded: multipleUsersOnboardedStatus,
      };

      const actual = getAreMultipleUsersOnboarded(state);

      expect(actual).toEqual(multipleUsersOnboardedStatus);
    });
  });

  describe('isUserAuthorised', () => {
    describe('when user is onboarded and has valid session', () => {
      it('should return true', () => {
        const state = {
          userSession: {
            userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
            onboarded: true,
            validEhSession: true,
          },
        };

        const result = isUserAuthorised(state);

        expect(result).toEqual(true);
      });
    });

    describe('when user is not onboarded and has valid session', () => {
      it('should return false', () => {
        const state = {
          userSession: {
            userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
            onboarded: false,
            validEhSession: true,
          },
        };

        const result = isUserAuthorised(state);

        expect(result).toEqual(false);
      });
    });

    describe('when user is onboarded but has invalid session', () => {
      it('should return false', () => {
        const state = {
          userSession: {
            userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
            onboarded: true,
            validEhSession: false,
          },
        };

        const result = isUserAuthorised(state);

        expect(result).toEqual(false);
      });
    });

    describe('when user is not onboarded and has invalid session', () => {
      it('should return false', () => {
        const state = {
          userSession: {
            userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
            onboarded: false,
            validEhSession: false,
          },
        };

        const result = isUserAuthorised(state);

        expect(result).toEqual(false);
      });
    });
  });

  describe('getUserStatusMessage', () => {
    describe('when user is authorised in Payday', () => {
      it('should return authorised status message', () => {
        const state = {
          userSession: {
            userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
            onboarded: true,
            validEhSession: true,
          },
        };

        const result = getUserStatusMessage(state);

        expect(result).toEqual('You have authorised MYOB');
      });
    });

    describe('when user is not authorised in Payday', () => {
      it('should return unauthorised status message', () => {
        const state = {
          userSession: {
            userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
            onboarded: true,
            validEhSession: false,
          },
        };

        const result = getUserStatusMessage(state);

        expect(result).toEqual('You have not authorised MYOB');
      });
    });
  });

  describe('getRemoveAuthorisationModalIsOpen', () => {
    it('should get the remove authorisation modal state', () => {
      const expected = true;

      const state = {
        removeAuthorisationModalIsOpen: expected,
      };

      expect(getIsRemoveAuthorisationModalOpen(state)).toEqual(expected);
    });
  });

  describe('isIrdAuthorisationComplete', () => {
    [
      { authorisation: 'complete#12345667', expected: true },
      { authorisation: 'invalid call back', expected: false },
      { authorisation: 'invalid call back#', expected: false },
      { authorisation: 'complete#', expected: false },
      { authorisation: '', expected: false },
    ].forEach(({ authorisation, expected }) => {
      it(`returns ${expected} with ${
        expected ? 'valid' : 'invalid'
      } authorisation callback of '${authorisation}'`, () => {
        const state = {
          authorisation,
        };
        const actual = isIrdAuthorisationComplete(state);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getOnboardUserQueryString', () => {
    it('should return encoded callback url', () => {
      const successUrl = btoa(
        window.location.origin.concat(
          '/#/nz/123/paydayFiling?authorisation=complete'
        )
      );

      const businessId = '123';
      const state = {
        businessId,
      };

      const expected = successUrl;

      const actual = getOnSuccessCallbackUrl(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getPaydayFilingUrl', () => {
    it('should return relative url for payday filing', () => {
      const businessId = '123';
      const state = {
        businessId,
      };

      const expected = `/#/nz/${businessId}/paydayFiling`;

      const actual = getPaydayFilingUrl(state);
      expect(actual).toEqual(expected);
    });
  });
});
