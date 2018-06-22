import MemoryIntegration from '../MemoryIntegration.js'

describe('MemoryIntegration', () => {
  describe('read method', () => {
    it('should return data supplied in config', () => {
      const integration = new MemoryIntegration({ key: 'value' });
      const result = integration.read('key');
      expect(result).toBe('value');
    });
  });
});