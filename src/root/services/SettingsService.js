import load from './load';
import save from './save';

export default (dispatcher, integration, store) => ({
  load: context => load(dispatcher, integration, context),
  save: content => save(dispatcher, integration, store, content),
});
