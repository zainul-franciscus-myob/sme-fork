import {
  HeaderBusinessDetailStyle,
  PreviewType,
  SaleLayout,
} from './templateOptions';
import {
  LOAD_NEW_TEMPLATE,
  LOAD_TEMPLATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  UPDATE_PREVIEW_OPTION,
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
  previewType: PreviewType.Invoice,
  isCreating: true,
  businessDetails: {
    tradingName: '',
    businessName: '',
    address: '',
    phoneNumber: '',
    email: '',
    website: '',
    abn: '',
  },
  saleLayout: SaleLayout.ItemAndService,
  template: {
    templateId: undefined,
    templateName: '',
    featureColour: '#000000',
    headerTextColour: '#000000',
    useAddressEnvelopePosition: false,
    headerBusinessDetailsStyle: HeaderBusinessDetailStyle.logoAndBusinessDetails,
    headerImage: undefined,
    logoImage: undefined,
    logoSize: 100,
    businessDetailsPlacement: 'Left',
    tradingName: false,
    businessName: true,
    address: true,
    phoneNumber: true,
    email: true,
    website: true,
    abn: true,
    isDefault: false,
  },
});

const resetState = () => ({ ...getDefaultState() });

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
  isCreating: !action.context.templateName,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const loadTemplate = (state, action) => ({
  ...state,
  ...action.payload,
  businessDetails: {
    ...state.businessDetails,
    ...action.payload.businessDetails,
  },
  template: {
    ...state.template,
    ...action.payload.template,
  },
});

const loadNewTemplate = (state, action) => ({
  ...state,
  ...action.payload,
  businessDetails: {
    ...state.businessDetails,
    ...action.payload.businessDetails,
  },
});

const updatePreviewOption = (state, action) => ({
  ...state,
  [action.key]: action.value,
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
  [LOAD_NEW_TEMPLATE]: loadNewTemplate,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [UPDATE_TEMPLATE_OPTION]: updateTemplateOption,
  [UPDATE_PREVIEW_OPTION]: updatePreviewOption,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_TEMPLATE]: loadTemplate,
  [SET_ALERT]: setAlert,
  [SET_MODAL_TYPE]: setModalType,
};
const templateReducer = createReducer(getDefaultState(), handlers);

export default templateReducer;
