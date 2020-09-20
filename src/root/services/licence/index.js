import { CONFIRM_LICENCE } from './LicenceIntents';
import { getBusinessId } from '../../rootSelectors';

const confirm = async (integration, store) => {
  const state = store.getState();
  const businessId = getBusinessId(state);

  await new Promise((resolve) =>
    integration.read({
      intent: CONFIRM_LICENCE,
      urlParams: { businessId },
      onSuccess: resolve,
      // Suppress the error. We don't want to stop user from accessing the app entirely.
      onFailure: resolve,
    })
  );
};

export default (integration, store) => ({
  confirm: () => confirm(integration, store),
});
