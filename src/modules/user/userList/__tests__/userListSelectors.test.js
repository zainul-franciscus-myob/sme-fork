import {
  getRemoveAccessModalBody,
  getRemovePracticeAccessModalBody,
  getShouldShowPractices,
  getTableEntries,
} from '../userListSelectors';

describe('User List Selectors', () => {
  describe('getTableEntries', () => {
    it('should assign user detail link to entry', () => {
      const state = {
        businessId: '1111-2222-3333-4444',
        region: 'AU',
        entries: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      };

      const actual = getTableEntries(state);

      expect(actual[0].link).toEqual('/#/AU/1111-2222-3333-4444/user/1');
      expect(actual[1].link).toEqual('/#/AU/1111-2222-3333-4444/user/2');
    });

    it.each([
      ['Accepted', false],
      ['Declined', false],
      ['Cancelled', false],
      ['Failed', false],
      ['Expired', false],
      ['Revoked', true],
      ['Pending', false],
    ])(
      'when myDotInvitationStatus is %s and current user is AdminUser onlyResendEnabled should be %s',
      (myDotInvitationStatus, expected) => {
        const state = {
          currentUserUserType: 'AdminUser',
          entries: [
            {
              myDotInvitationStatus,
              myDotInvitationType: 'FileUser',
            },
          ],
        };

        const actual = getTableEntries(state);

        expect(actual[0].onlyResendEnabled).toEqual(expected);
      }
    );

    it.each([
      ['Owner', 'AdminUser', true],
      ['Owner', 'Owner', true],
      ['Owner', 'FileUser', true],
      ['AdminUser', 'Owner', false],
      ['AdminUser', 'AdminUser', false],
      ['AdminUser', 'FileUser', true],
      ['FileUser', 'Owner', false],
      ['FileUser', 'AdminUser', false],
      ['FileUser', 'FileUser', false],
      [null, 'FileUser', true],
    ])(
      'when currentUserUserType is %s and user is %s and invitationType is Revoked, onlyResendEnabled should be %s',
      (currentUserUserType, myDotInvitationType, expected) => {
        const state = {
          currentUserUserType,
          entries: [
            {
              myDotInvitationStatus: 'Revoked',
              myDotInvitationType,
            },
          ],
        };

        const actual = getTableEntries(state);

        expect(actual[0].onlyResendEnabled).toEqual(expected);
      }
    );

    it.each([
      ['Accepted', false],
      ['Declined', false],
      ['Cancelled', false],
      ['Failed', false],
      ['Expired', false],
      ['Revoked', false],
      ['Pending', true],
    ])(
      'when myDotInvitationStatus is %s and current user is AdminUser resendOrCancelEnabled should be %s',
      (myDotInvitationStatus, expected) => {
        const state = {
          currentUserUserType: 'AdminUser',
          entries: [
            {
              myDotInvitationStatus,
              myDotInvitationType: 'FileUser',
            },
          ],
        };

        const actual = getTableEntries(state);

        expect(actual[0].resendOrCancelEnabled).toEqual(expected);
      }
    );

    it.each([
      ['Owner', 'AdminUser', true],
      ['Owner', 'Owner', true],
      ['Owner', 'FileUser', true],
      ['AdminUser', 'Owner', false],
      ['AdminUser', 'AdminUser', false],
      ['AdminUser', 'FileUser', true],
      ['FileUser', 'Owner', false],
      ['FileUser', 'AdminUser', false],
      ['FileUser', 'FileUser', false],
      [null, 'FileUser', true],
    ])(
      'when currentUserUserType is %s and user is %s and invitationType is Pending, resendOrCancelEnabled should be %s',
      (currentUserUserType, myDotInvitationType, expected) => {
        const state = {
          currentUserUserType,
          entries: [
            {
              myDotInvitationStatus: 'Pending',
              myDotInvitationType,
            },
          ],
        };

        const actual = getTableEntries(state);

        expect(actual[0].resendOrCancelEnabled).toEqual(expected);
      }
    );

    it.each([
      ['Accepted', true],
      ['Declined', false],
      ['Cancelled', false],
      ['Failed', false],
      ['Expired', false],
      ['Revoked', false],
      ['Pending', false],
    ])(
      'when myDotInvitationStatus is %s and current user is AdminUser and user is FileUser removeButtonEnabled should be %s',
      (myDotInvitationStatus, expected) => {
        const state = {
          currentUserUserType: 'AdminUser',
          entries: [
            {
              myDotInvitationStatus,
              myDotInvitationType: 'FileUser',
            },
          ],
        };

        const actual = getTableEntries(state);

        expect(actual[0].removeButtonEnabled).toEqual(expected);
      }
    );

    it.each([
      ['Owner', 'AdminUser', false],
      ['Owner', 'Owner', false],
      ['Owner', 'FileUser', true],
      ['AdminUser', 'Owner', false],
      ['AdminUser', 'AdminUser', false],
      ['AdminUser', 'FileUser', true],
      ['FileUser', 'Owner', false],
      ['FileUser', 'AdminUser', false],
      ['FileUser', 'FileUser', false],
      [null, 'FileUser', true],
      [null, 'AdminUser', false],
    ])(
      'when currentUserUserType is %s and user is %s and invitationType is Accepted, removeButtonEnabled should be %s',
      (currentUserUserType, myDotInvitationType, expected) => {
        const state = {
          currentUserUserType,
          entries: [
            {
              myDotInvitationStatus: 'Accepted',
              myDotInvitationType,
            },
          ],
        };

        const actual = getTableEntries(state);

        expect(actual[0].removeButtonEnabled).toEqual(expected);
      }
    );
  });

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
