import isDismissEvent from '../isDismissEvent';

describe('isDismissEvent', () => {
  describe('with a dismiss event', () => {
    it('returns true', () => {
      const event = 'setupBusinessDetailsDismiss';
      const result = isDismissEvent(event);

      expect(result).toEqual(true);
    });
  });

  describe('with a regular event', () => {
    it('returns false', () => {
      const event = 'setupBusinessDetails';
      const result = isDismissEvent(event);

      expect(result).toEqual(false);
    });
  });

  describe('with a NO event', () => {
    it('returns undefined', () => {
      const event = undefined;
      const result = isDismissEvent(event);

      expect(result).toBeUndefined();
    });
  });
});
