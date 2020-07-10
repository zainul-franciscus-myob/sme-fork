import { SAVE_SETTINGS } from '../../rootIntents';

const save = async (
  dispatcher,
  integration,
  {
    businessId,
    businessName,
    businessRole,
    industry,
    region,
    onboardingComplete,
  }
) => {
  const intent = SAVE_SETTINGS;
  const urlParams = { businessId };

  dispatcher.setLoadingState(true);

  try {
    const settings = await new Promise((resolve, reject) =>
      integration.write({
        intent,
        urlParams,
        content: {
          businessName,
          businessRole,
          industry,
          region,
          onboardingComplete,
        },
        onSuccess: resolve,
        onFailure: reject,
      })
    );

    dispatcher.saveSettings(settings);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  dispatcher.setLoadingState(false);
};

export default save;
