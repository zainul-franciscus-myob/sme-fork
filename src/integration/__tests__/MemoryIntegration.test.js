import MemoryIntegration from '../MemoryIntegration.js';
import { LOAD_PETS_AND_SPECIES } from '../PetIntents';

describe('MemoryIntegration', () => {
  describe('read method', () => {
    it('should return data supplied in config', (done) => {
      const integration = new MemoryIntegration({ key: 'value' });
      integration.read(LOAD_PETS_AND_SPECIES, (result) => { 
        expect(result).toEqual({ key: 'value' });
        done(); 
      });
    });
  });
});