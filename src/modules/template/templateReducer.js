import { HeaderBusinessDetailStyle } from './templateOptions';
import {
  LOAD_TEMPLATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  UPDATE_TEMPLATE_OPTION,
} from './TemplateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  isLoading: false,
  alert: {},
  modelType: '',
  hasChange: false,
  template: {
    templateId: undefined,
    templateName: '',
    featureColour: '#000000',
    headerTextColour: '#000000',
    useAddressEnvelopePosition: false,
    headerBusinessDetailsStyle: HeaderBusinessDetailStyle.logoAndBusinessDetails,
    headerImage: undefined,
    logoImage: undefined,
    logoSize: 80,
    isLogoOnTheLeft: true,
    tradingName: false,
    businessName: false,
    address: false,
    phoneNumber: false,
    email: false,
    website: false,
    abn: false,
    isDefault: false,
  },
});

const resetState = () => ({ ...getDefaultState() });

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const loadTemplate = (state, action) => ({
  ...state,
  template: {
    ...action.template,
  },
});

const updateTemplateOption = (state, action) => (
  {
    ...state,
    hasChange: true,
    template: {
      ...state.template,
      [action.key]: action.value,
    },
  }
);

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setModalType = (state, { modalType }) => ({
  ...state,
  modalType,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [UPDATE_TEMPLATE_OPTION]: updateTemplateOption,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_TEMPLATE]: loadTemplate,
  [SET_ALERT]: setAlert,
  [SET_MODAL_TYPE]: setModalType,
};
const templateReducer = createReducer(getDefaultState(), handlers);

export default templateReducer;
