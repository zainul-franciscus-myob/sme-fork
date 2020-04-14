import getContactDetail from '../contactDetailsNzSelector';

describe('EmployeeDetailNzSelectors', () => {
  describe('getContactDetail', () => {
    it('should return contact details', () => {
      const state = {
        contactDetail: {
          firstName: 'Bob',
          lastName: 'The Builder',
        },
      };

      const actual = getContactDetail(state);

      expect(actual).toEqual(state.contactDetail);
    });
  });
});
