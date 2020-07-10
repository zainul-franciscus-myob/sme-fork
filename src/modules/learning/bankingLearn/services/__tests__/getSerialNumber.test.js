import { GET_SERIAL_NUMBER } from '../../bankingLearnIntents';
import getSerialNumber from '../getSerialNumber';

describe('getSerialNumber', () => {
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

  const serialNumber = 555555;
  const integration = mockIntegration({
    [GET_SERIAL_NUMBER]: { serialNumber },
  });

  const onSuccess = jest.fn();
  const onFailure = jest.fn();
  const context = {};

  beforeEach(() => {
    onSuccess.mockClear();
  });

  it('is called with GET_SERIAL_NUMBER', () => {
    getSerialNumber({
      integration,
      onSuccess,
      onFailure,
      context,
    });

    expect(integration.read).toBeCalledWith(
      expect.objectContaining({ intent: GET_SERIAL_NUMBER })
    );
  });

  it('is called with context', () => {
    getSerialNumber({
      integration,
      onSuccess,
      onFailure,
      context,
    });

    expect(integration.read).toBeCalledWith(
      expect.objectContaining({ urlParams: context })
    );
  });
});
