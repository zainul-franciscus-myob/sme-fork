import {
  getUrlParams,
  getUserStatusMessage,
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
});
