import {
  getUpdateAgentContactContent,
  getUpdateBusinessContactContent,
  getUpdateBusinessDetailsContent,
} from '../AtoSettingsSelectors';

describe('AtoSettingsSelectors', () => {
  describe('', () => {
    it('should get the update business details contents (Australia)', () => {
      const state = {
        businessDetails: {
          abn: '1234',
          address1: '25 Bright Dark Alley Way',
          address2: 'pass the Fairy Floss weather balloon',
          branch: '1',
          city: 'Purest',
          country: 'Australia',
          businessName: 'Purest Water',
          postcode: '3000',
          state: 'VIC',
        },
      };

      const result = getUpdateBusinessDetailsContent(state);

      const expected = {
        businessName: 'Purest Water',
        abnWpn: '1234',
        abnBranch: '1',
        streetAddress1: '25 Bright Dark Alley Way',
        streetAddress2: 'pass the Fairy Floss weather balloon',
        city: 'Purest',
        state: 'VIC',
        postcode: '3000',
        country: null,
      };

      expect(result).toEqual(expected);
    });

    it('should get the update business details contents (Australia)', () => {
      const state = {
        businessDetails: {
          abn: '1234',
          address1: '25 Bright Dark Alley Way',
          address2: 'pass the Fairy Floss weather balloon',
          branch: '1',
          city: 'Purest',
          country: 'Cananda',
          businessName: 'Purest Water',
          postcode: '3000',
          state: 'OTH',
        },
      };

      const result = getUpdateBusinessDetailsContent(state);

      const expected = {
        businessName: 'Purest Water',
        abnWpn: '1234',
        abnBranch: '1',
        streetAddress1: '25 Bright Dark Alley Way',
        streetAddress2: 'pass the Fairy Floss weather balloon',
        city: 'Purest',
        state: 'OTH',
        postcode: '3000',
        country: 'Cananda',
      };

      expect(result).toEqual(expected);
    });
  });

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

  describe('getUpdateAgentContactContent', () => {
    it('should get the update agent contact contents', () => {
      const state = {
        agentContact: {
          firstName: 'Fred',
          lastName: 'Hong',
          email: 'fh@mail.com',
          phone: '12345',
        },
        agentDetails: {
          agentAbn: '123',
          agentNumber: '321',
        },
      };

      const result = getUpdateAgentContactContent(state);

      const expected = {
        firstName: 'Fred',
        lastName: 'Hong',
        email: 'fh@mail.com',
        phone: '12345',
        agentAbn: '123',
        agentNumber: '321',
      };

      expect(result).toEqual(expected);
    });
  });
});
