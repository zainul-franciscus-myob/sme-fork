import {
  UPDATE_IRDNUMBER_ONBLUR,
  UPDATE_KIWISAVER_DETAIL,
  UPDATE_KIWISAVER_EMPLOYER_CONTRIBUTION_RATE,
  UPDATE_TAX_CODE,
  UPDATE_TAX_DETAIL,
} from './TaxAndKiwiSaverIntents';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const formatEmployerContributionRate = (contributionRate) =>
  formatNumberWithDecimalScaleRange(contributionRate, 2, 2);

const updateTaxDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      [action.key]: action.value,
    },
  },
});

const formatIrdNumber = (irdNumber) => {
  const ird = irdNumber.replace(/\s/g, '');
  return ird.length === 8 ? `0${ird}` : ird;
};

const updateIrdNumberOnBlur = (state) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      irdNumber: formatIrdNumber(state.payrollDetails.tax.irdNumber),
    },
  },
});

const resetIrdNumberIfTaxCodeND = (state, taxCode) =>
  taxCode === 'ND' ? '000000000' : state.payrollDetails.tax.irdNumber;

const updateTaxCode = (state, action) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      taxCode: action.value,
      irdNumber: resetIrdNumberIfTaxCodeND(state, action.value),
    },
  },
});

const setKiwiSaverDetails = (state, partialKiwiSaver) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    kiwiSaver: {
      ...state.payrollDetails.kiwiSaver,
      ...partialKiwiSaver,
    },
  },
});

const updateKiwiSaverDetails = (state, { key, value }) => {
  const partialKiwiSaver = {
    [key]: value,
  };

  return setKiwiSaverDetails(state, partialKiwiSaver);
};

const updateKiwiSaverEmployerContributionRate = (state, { value }) => {
  const partialKiwiSaver = {
    employerContributionRate: formatEmployerContributionRate(value),
  };

  return setKiwiSaverDetails(state, partialKiwiSaver);
};

export default {
  [UPDATE_TAX_DETAIL]: updateTaxDetails,
  [UPDATE_TAX_CODE]: updateTaxCode,
  [UPDATE_IRDNUMBER_ONBLUR]: updateIrdNumberOnBlur,
  [UPDATE_KIWISAVER_DETAIL]: updateKiwiSaverDetails,
  [UPDATE_KIWISAVER_EMPLOYER_CONTRIBUTION_RATE]: updateKiwiSaverEmployerContributionRate,
};
