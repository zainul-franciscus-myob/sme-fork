import { removeCommas } from './formatter';

const areValuesEqual = (currValue, propValue) => {
  const formattedCurrValue = Number(removeCommas(currValue));
  const formattedPropValue = Number(removeCommas(propValue));

  // If we're getting an invalid value, continue using the components value in state
  if (Number.isNaN(formattedPropValue) || Number.isNaN(formattedCurrValue)) {
    return true;
  }

  return formattedCurrValue === formattedPropValue;
};

export default areValuesEqual;
