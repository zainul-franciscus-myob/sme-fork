import MemoryIntegration from '../MemoryIntegration.js';
import PetIntents from '../PetIntents';

describe('MemoryIntegration', () => {
  describe('read method', () => {
    it('should return data supplied in config', () => {
      const integration = new MemoryIntegration({ key: 'value' });
      const result = integration.read(PetIntents.LOAD_PETS_AND_SPECIES);
      expect(result).toEqual({key: 'value'});
    });
  });
});