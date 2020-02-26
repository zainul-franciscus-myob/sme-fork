import BankingService from '../index';
import getSerialNumber from '../getSerialNumber';

jest.mock('../getSerialNumber');
describe('bankingService', () => {
  it('calls getSerialNumber', () => {
    const businessId = '12345';
    const getState = jest.fn();
    const store = { getState };
    const integration = jest.fn();
    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    getState.mockReturnValue({ businessId });

    BankingService({ store, integration }).getSerialNumber({ onSuccess, onFailure });
    expect(getSerialNumber).toBeCalledWith({
      integration,
      context: { businessId },
      onSuccess,
      onFailure,
    });
  });
});
