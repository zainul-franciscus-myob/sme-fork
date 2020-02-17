import loadDefaultTemplate from '../loadDefaultTemplate';
import templateService from '../index';

jest.mock('../loadDefaultTemplate');

describe('templateService', () => {
  const dispatcher = jest.fn();
  const integration = jest.fn();
  const store = jest.fn();

  let service;

  beforeEach(() => {
    service = templateService(dispatcher, integration, store);
  });

  it('gives params to loadDefaultTemplate', async () => {
    await service.loadDefaultTemplate();

    expect(loadDefaultTemplate).toBeCalledWith(dispatcher, integration, store);
  });
});
