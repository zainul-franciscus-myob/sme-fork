import {
  FORMAT_WITHHOLDING_VARIATION,
  LOAD_CONTEXT,
  SET_FORM_FIELD,
  SET_IS_LOADING,
  SET_IS_OPEN,
  SET_TAX_TABLE_RESULT,
} from './taxTableCalculationModalIntents';
import createReducer from '../../../../../store/createReducer';

const removeTrailingZeroes = number => String(Number(number));

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

const formatPercentage = (value) => {
  const percentage = Number(value) || 0;

  if (countDecimalPlaces(percentage) < 2) {
    return percentage.toFixed(2);
  }

  return removeTrailingZeroes(percentage.toFixed(5));
};

const formatWithholdingVariation = (state, { value }) => ({
  ...state,
  withholdingVariation: formatPercentage(value),
});

const getDefaultState = () => ({
  businessId: '',
  isOpen: false,
  hasTFN: null,
  selectedResidencyStatus: null,
  residencyStatusOptions: [],
  hasTaxFreeThreshold: false,
  hasSLFSDebt: false,
  isHortiShearer: false,
  isWithholdingVariation: false,
  withholdingVariation: '0.00',
  selectedSeniorTaxOffset: null,
  seniorTaxOffsetOptions: [],
  selectedMedicareLevy: null,
  medicareLevyOptions: [],
  taxTableDescription: null,
  taxTableId: null,
});

const setIsOpen = (state, { isOpen }) => ({
  ...state,
  isOpen,
});

const setFormField = (state, { key, value }) => ({
  ...state,
  [key]: value,
});

const loadContext = (state, { context }) => ({
  ...state,
  ...context,
});

const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setTaxTableResult = (state, { taxTableResult }) => (
  taxTableResult.singleTaxTableFound ? {
    ...state,
    taxTableId: taxTableResult.id,
    taxTableDescription: taxTableResult.description,
  } : {
    ...state,
    taxTableId: null,
    taxTableDescription: null,
  }
);

const taxTableCalculationModalReducer = createReducer(getDefaultState(), {
  [SET_IS_OPEN]: setIsOpen,
  [SET_FORM_FIELD]: setFormField,
  [LOAD_CONTEXT]: loadContext,
  [FORMAT_WITHHOLDING_VARIATION]: formatWithholdingVariation,
  [SET_IS_LOADING]: setIsLoading,
  [SET_TAX_TABLE_RESULT]: setTaxTableResult,
});

export default taxTableCalculationModalReducer;
