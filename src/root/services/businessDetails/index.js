import load from './load';

export default (dispatcher, integration, store) => ({
  load: () => load(dispatcher, integration, store),
});
