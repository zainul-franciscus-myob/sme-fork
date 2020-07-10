import loadDefaultTemplate from './loadDefaultTemplate';

export default (dispatcher, integration, store) => ({
  loadDefaultTemplate: () =>
    loadDefaultTemplate(dispatcher, integration, store),
});
