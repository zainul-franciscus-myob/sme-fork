import { GET_BUSINESS_ROLES, GET_INDUSTRIES } from '../onboardingIntents';

const loadBusinessRoles = async (dispatcher, integration, routeParams) => {
  const businessRoles = await new Promise((resolve, reject) => integration.read({
    intent: GET_BUSINESS_ROLES,
    urlParams: { businessId: routeParams.businessId },
    onSuccess: resolve,
    onFailure: reject,
  }));
  dispatcher.loadBusinessRoles(businessRoles);
};

const loadIndustries = async (dispatcher, integration, routeParams) => {
  const industries = await new Promise((resolve, reject) => integration.read({
    intent: GET_INDUSTRIES,
    urlParams: { businessId: routeParams.businessId },
    onSuccess: resolve,
    onFailure: reject,
  }));
  dispatcher.loadIndustries(industries);
};

const loadFormData = (dispatcher, integration, routeParams) => async () => {
  dispatcher.setLoadingState(true);
  try {
    await Promise.all([
      loadBusinessRoles(dispatcher, integration, routeParams),
      loadIndustries(dispatcher, integration, routeParams),
    ]);
  } catch (err) {
    console.log(err);
  }
  dispatcher.setLoadingState(false);
};

export default { loadFormData };
