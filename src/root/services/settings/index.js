import load from './load';

export default (dispatcher, integration, store, navigateTo) => ({
  load: () => load(dispatcher, integration, store, navigateTo),
});
