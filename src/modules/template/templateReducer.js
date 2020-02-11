import {
  HeaderBusinessDetailStyle,
  PreviewType,
  SaleLayout,
} from './templateOptions';
import {
  LOAD_NEW_TEMPLATE,
  LOAD_PAY_DIRECT,
  LOAD_TEMPLATE,
  REMOVE_TEMPLATE_IMAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_TEMP_FILE,
  UPDATE_PREVIEW_OPTION,
  UPDATE_TEMPLATE_IMAGE,
  UPDATE_TEMPLATE_OPTION,
} from './TemplateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getImageKey,
  getTempFile,
} from './templateSelectors';
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
  isAllowPaymentByDirectDeposit: true,
  isAllowPaymentByCheque: true,
  tempFile: undefined,
  payDirect: {
    isLoading: false,
    isRegistered: false,
  },
  template: {
    templateId: undefined,
    templateName: '',
    featureColour: '#000000',
    headerTextColour: '#000000',
    useAddressEnvelopePosition: false,
    headerBusinessDetailsStyle:
      HeaderBusinessDetailStyle.logoAndBusinessDetails,
    originalHeaderImage: undefined,
    headerImage: undefined,
    originalLogoImage: undefined,
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
    originalHeaderImage: action.payload.template.headerImage,
    originalLogoImage: action.payload.template.logoImage,
  },
});

const loadNewTemplate = (state, action) => ({
  ...state,
  ...action.payload,
  businessDetails: {
    ...state.businessDetails,
    ...action.payload.businessDetails,
  },
  template: {
    ...state.template,
    ...action.payload.template,
    originalHeaderImage: action.payload?.template?.headerImage,
    originalLogoImage: action.payload?.template?.logoImage,
  },
});

const loadPayDirect = (state, action) => ({
  ...state,
  payDirect: {
    ...state.payDirect,
    isRegistered: action.isRegistered,
  },
});

const updatePreviewOption = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

const updateTemplateOption = (state, action) => ({
  ...state,
  hasChange: true,
  template: {
    ...state.template,
    [action.key]: action.value,
  },
});

const updateTemplateImage = state => ({
  ...state,
  hasChange: true,
  template: {
    ...state.template,
    [getImageKey(state)]: getTempFile(state),
  },
});

const removeTemplateImage = state => ({
  ...state,
  hasChange: true,
  template: {
    ...state.template,
    [getImageKey(state)]: undefined,
  },
});

const setTempFile = (state, action) => ({
  ...state,
  tempFile: action.file,
});

const setPayDirectLoadingState = (state, action) => ({
  ...state,
  payDirect: {
    ...state.payDirect,
    isLoading: action.isLoading,
  },
});

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
  [SET_PAY_DIRECT_LOADING_STATE]: setPayDirectLoadingState,
  [LOAD_TEMPLATE]: loadTemplate,
  [LOAD_PAY_DIRECT]: loadPayDirect,
  [SET_ALERT]: setAlert,
  [SET_MODAL_TYPE]: setModalType,
  [SET_TEMP_FILE]: setTempFile,
  [UPDATE_TEMPLATE_IMAGE]: updateTemplateImage,
  [REMOVE_TEMPLATE_IMAGE]: removeTemplateImage,
};
const templateReducer = createReducer(getDefaultState(), handlers);

export default templateReducer;
