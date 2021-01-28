import {
  getRemoveAccessModalBody,
  getRemovePracticeAccessModalBody,
  getShouldShowManageMydotUserLink,
  getShouldShowPractices,
} from '../userListSelectors';

describe('User List Selectors', () => {
  describe('getShouldShowPractices', () => {
    it('should return false when practices is empty', () => {
      const state = {
        practices: [],
        loadPracticesError: null,
      };

      const actual = getShouldShowPractices(state);

      expect(actual).toEqual(false);
    });

    it('should return false when loadPracticesError is not falsy', () => {
      const state = {
        practices: [{}, {}],
        loadPracticesError: 'error',
      };

      const actual = getShouldShowPractices(state);

      expect(actual).toEqual(false);
    });

    it('should return true when loadPracticesError is not falsy and practice is not empty', () => {
      const state = {
        practices: [{}, {}],
        loadPracticesError: null,
      };

      const actual = getShouldShowPractices(state);

      expect(actual).toEqual(true);
    });
  });

  describe('getShouldShowManageMydotUserLink', () => {
    it('should show mydot user manage link if current user is not a FileUser', () => {
      const state = {
        entries: [
          {
            userId: '1234',
            myDotInvitationType: 'FileUser',
            isCurrentUser: false,
          },
          {
            userId: '4567',
            myDotInvitationType: 'AdminUser',
            isCurrentUser: true,
          },
        ],
      };

      const actual = getShouldShowManageMydotUserLink(state);

      expect(actual).toBeTruthy();
    });

    it('should not show mydot user manage link if current user is a FileUser', () => {
      const state = {
        entries: [
          {
            userId: '1234',
            myDotInvitationType: 'FileUser',
            isCurrentUser: false,
          },
          {
            userId: '4567',
            myDotInvitationType: 'FileUser',
            isCurrentUser: true,
          },
        ],
      };

      const actual = getShouldShowManageMydotUserLink(state);

      expect(actual).toBeFalsy();
    });

    it('should show mydot user manage link if mydot is down', () => {
      const state = {
        entries: [
          {
            userId: '1234',
          },
          {
            userId: '4567',
          },
        ],
      };

      const actual = getShouldShowManageMydotUserLink(state);

      expect(actual).toBeTruthy();
    });
  });

  describe('getRemoveAccessModalBody', () => {
    it('should return correct message for remove user access modal and user is a FileUser', () => {
      const state = {
        selectedUserIndex: '0',
        entries: [
          {
            userId: '1234',
            myDotInvitationType: 'FileUser',
          },
        ],
      };

      const actual = getRemoveAccessModalBody(state);

      expect(actual).toEqual(
        "This will remove access to this business. This can't be undone or recovered later."
      );
    });

    it('should return correct message for remove user access modal and user is not a FileUser', () => {
      const state = {
        selectedUserIndex: '1',
        entries: [
          {
            userId: '1234',
            role: 'FileUser',
          },
          {
            userId: '4567',
            role: '',
          },
        ],
      };

      const actual = getRemoveAccessModalBody(state);

      expect(actual).toEqual(
        "This will remove access to all businesses associated with this serial number. This can't be undone, or recovered later."
      );
    });
  });

  describe('getRemovePracticeAccessModalBody', () => {
    it('should return correct message for remove practice access modal', () => {
      const state = {
        selectedPracticeId: '1',
        practices: [
          {
            practiceId: '1',
            practiceName: 'Some Business',
          },
        ],
      };

      const actual = getRemovePracticeAccessModalBody(state);

      expect(actual).toEqual(
        'Some Business will no longer be able to access your business.'
      );
    });

    it('should return empty string for remove practice access modal when selected practice is empty', () => {
      const state = {
        selectedPracticeId: '1',
        practices: [],
      };

      const actual = getRemovePracticeAccessModalBody(state);

      expect(actual).toEqual(
        ' will no longer be able to access your business.'
      );
    });
  });
});
