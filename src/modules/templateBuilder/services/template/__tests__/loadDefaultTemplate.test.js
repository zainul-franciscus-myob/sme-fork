import fetchDefaultTemplate from '../fetchDefaultTemplate';
import loadDefaultTemplate from '../loadDefaultTemplate';

jest.mock('../fetchDefaultTemplate');

describe('loadDefaultTemplate', () => {
  const dispatcher = {
    loadTemplate: jest.fn(),
    setLoadingState: jest.fn(),
  };
  const integration = jest.fn();
  const store = jest.fn();
  const defaulTemplate = { template: {} };

  beforeEach(() => {
    fetchDefaultTemplate.mockResolvedValue(defaulTemplate);
  });

  it('asks for the defaultTemplate', async () => {
    await loadDefaultTemplate(dispatcher, integration, store);

    expect(fetchDefaultTemplate).toBeCalledWith(integration, store);
  });

  it('gives defaultTemplate to load template dispatch', async () => {
    await loadDefaultTemplate(dispatcher, integration, store);

    expect(dispatcher.loadTemplate).toBeCalledWith(defaulTemplate);
  });
});
