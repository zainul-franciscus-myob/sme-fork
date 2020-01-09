import { getUpdateBusinessContactContent } from '../AtoSettingsSelectors';

describe('AtoSettingsSelectors', () => {
  describe('getUpdateBusinessContactContent', () => {
    it('should get the update business contact contents', () => {
      const state = {
        businessContact: {
          firstName: 'Fred',
          lastName: 'Hong',
          email: 'fh@mail.com',
          phone: '12345',
        },
      };

      const result = getUpdateBusinessContactContent(state);

      const expected = {
        firstName: 'Fred',
        lastName: 'Hong',
        email: 'fh@mail.com',
        phone: '12345',
      };

      expect(result).toEqual(expected);
    });
  });
});
