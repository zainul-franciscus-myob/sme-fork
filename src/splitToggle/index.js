import MemoryToggle from './MemoryToggle';
import SplitToggle from './SplitToggle';

const getSplitToggle = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return new MemoryToggle();
  }

  return new SplitToggle();
};

const splitFeatureToggles = getSplitToggle();

export const initializeSplit = async (businessId) => {
  await splitFeatureToggles.init({ businessId });
};

export const isToggleOn = (splitName, splitAttributes) =>
  splitFeatureToggles.isToggleOn(splitName, splitAttributes);

export const reset = () => splitFeatureToggles.reset();
