import load from './load';
import save from './save';

export default (dispatcher, integration, store) => ({
  load: () => load(dispatcher, integration, store),
  save: (data) => save(dispatcher, integration, data),
});
