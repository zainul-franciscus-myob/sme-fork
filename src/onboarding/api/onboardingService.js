import { GET_BUSINESS_ROLES, GET_INDUSTRIES } from '../onboardingIntents';

const loadBusinessRoles = async (dispatcher, integration, router) => {
  const businessRoles = await new Promise((resolve, reject) => integration.read({
    intent: GET_BUSINESS_ROLES,
    urlParams: { businessId: router.routeParams().businessId },
    onSuccess: resolve,
    onFailure: reject,
  }));
  dispatcher.loadBusinessRoles(businessRoles);
};

const loadIndustries = async (dispatcher, integration, router) => {
  const industries = await new Promise((resolve, reject) => integration.read({
    intent: GET_INDUSTRIES,
    urlParams: { businessId: router.routeParams().businessId },
    onSuccess: resolve,
    onFailure: reject,
  }));
  dispatcher.loadIndustries(industries);
};

const loadFormData = (dispatcher, integration, router) => async () => {
  dispatcher.setLoadingState(true);
  try {
    await Promise.all([
      loadBusinessRoles(dispatcher, integration, router),
      loadIndustries(dispatcher, integration, router),
    ]);
  } catch (err) {
    console.log(err);
  }
  dispatcher.setLoadingState(false);
};

export default { loadFormData };
