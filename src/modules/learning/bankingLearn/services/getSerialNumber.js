import { GET_SERIAL_NUMBER } from '../bankingLearnIntents';

const getSerialNumber = async ({
  integration,
  context,
  onSuccess,
  onFailure,
}) => {
  const bankFeeds = await new Promise(() => {
    integration.read({
      intent: GET_SERIAL_NUMBER,
      onSuccess,
      onFailure,
      urlParams: context,
    });
  });

  return bankFeeds;
};

export default getSerialNumber;
