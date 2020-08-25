import { LOAD_GLOBAL_BUSINESS_DETAILS } from './BusinessDetailsIntents';
import { getBusinessId } from '../../rootSelectors';

const load = async (dispatcher, integration, store) => {
  const state = store.getState();
  const businessId = getBusinessId(state);

  const businessDetails = await new Promise((resolve, reject) =>
    integration.read({
      intent: LOAD_GLOBAL_BUSINESS_DETAILS,
      urlParams: { businessId },
      onSuccess: resolve,
      onFailure: reject,
    })
  );

  dispatcher.loadBusinessDetails(businessDetails);
};

export default load;
