import { obfuscateEmail, obfuscateName } from '../obfuscate';

describe('obfuscate', () => {
  describe('obfuscateName', () => {
    it('obfuscates name', () => {
      const name = 'Clearwater Pty Ltd';

      const expected = 'C*********P**L**';

      expect(obfuscateName(name)).toEqual(expected);
    });
  });

  describe('obfuscateEmail', () => {
    it('obfuscate email', () => {
      const email = 'mohammad.sepahvand@myob.com';

      const expected = 'm****************d@myob.com';

      expect(obfuscateEmail(email)).toEqual(expected);
    });

    it('handles special char in local part', () => {
      const email = 'mohammad."@".sepahvand@myob.com';

      const expected = 'm********************d@myob.com';

      expect(obfuscateEmail(email)).toEqual(expected);
    });
  });
});
