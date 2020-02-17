import { LOAD_DEFAULT_TEMPLATE } from '../../../TemplateBuilderIntents';
import fetchDefaultTemplate from '../fetchDefaultTemplate';

const mockIntegration = (intentResults = {}) => {
  const read = jest.fn(({ intent, onSuccess, onFailure }) => {
    try {
      const value = intentResults[intent];
      const result = typeof value === 'function' ? value() : value;
      onSuccess(result);
    } catch (error) {
      onFailure('Error occurred');
    }
  });

  return {
    read,
  };
};

describe('fetchDefaultTemplate', () => {
  let integration;
  const businessId = 'businessId';
  const mockState = { businessId };
  const getState = jest.fn();
  const mockStore = { getState };
  const defaultTemplate = {};

  beforeEach(() => {
    getState.mockReturnValue(mockState);
    integration = mockIntegration({
      [LOAD_DEFAULT_TEMPLATE]: defaultTemplate,
    });
  });

  it('resolves the default template', async () => {
    const result = await fetchDefaultTemplate(integration, mockStore);

    expect(result).toEqual(defaultTemplate);
  });

  it('gives intent to the read', async () => {
    await fetchDefaultTemplate(integration, mockStore);

    expect(integration.read).toBeCalledWith(expect.objectContaining({
      intent: LOAD_DEFAULT_TEMPLATE,
    }));
  });

  it('passes businessId into url params', async () => {
    await fetchDefaultTemplate(integration, mockStore);

    expect(integration.read).toBeCalledWith(expect.objectContaining({
      urlParams: { businessId },
    }));
  });
});
