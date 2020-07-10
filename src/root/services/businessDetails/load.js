import { LOAD_GLOBAL_BUSINESS_DETAILS } from './BusinessDetailsIntents';
import { getBusinessId } from '../../rootSelectors';

const load = async (dispatcher, integration, store) => {
  const state = store.getState();
  const businessId = getBusinessId(state);

  try {
    const businessDetails = await new Promise((resolve, reject) =>
      integration.read({
        intent: LOAD_GLOBAL_BUSINESS_DETAILS,
        urlParams: { businessId },
        onSuccess: resolve,
        onFailure: reject,
      })
    );

    dispatcher.loadBusinessDetails(businessDetails);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
};

export default load;
