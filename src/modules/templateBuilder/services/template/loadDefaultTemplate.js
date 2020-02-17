import fetchDefaultTemplate from './fetchDefaultTemplate';

const loadDefaultTemplate = async (dispatcher, integration, store) => {
  dispatcher.setLoadingState(true);

  const defaultTemplate = await fetchDefaultTemplate(integration, store);
  dispatcher.loadTemplate(defaultTemplate);

  dispatcher.setLoadingState(false);
};

export default loadDefaultTemplate;
