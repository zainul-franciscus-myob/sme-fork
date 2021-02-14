import { GET_BUSINESS_NAME } from '../OnboardingIntents';

const MemoryOnboardingMapping = {
  [GET_BUSINESS_NAME]: ({ onSuccess }) =>
    onSuccess({ businessName: "Rob's cupcakes" }),
};

export default MemoryOnboardingMapping;
