import {
  CREATE_TEMPLATE,
  LOAD_NEW_TEMPLATE,
  LOAD_PAY_DIRECT,
  LOAD_TEMPLATE,
  UPDATE_TEMPLATE,
} from '../TemplateIntents';
import loadNewTemplateResponse from './data/loadNewTemplateResponse';
import loadTemplateResponse from './data/loadTemplateResponse';
import payDirectResponse from './data/loadPayDirectResponse';
import saveTemplateResponse from './data/saveTemplateResponse';

const loadNewTemplate = ({ onSuccess }) => onSuccess(loadNewTemplateResponse);
const loadTemplate = ({ onSuccess }) => onSuccess(loadTemplateResponse);
const updateTemplate = ({ onSuccess }) => onSuccess(saveTemplateResponse);
const createTemplate = ({ onSuccess }) => onSuccess(saveTemplateResponse);
const loadPayDirect = ({ onSuccess }) => onSuccess(payDirectResponse);

const MemoryTemplateMapping = {
  [LOAD_NEW_TEMPLATE]: loadNewTemplate,
  [LOAD_TEMPLATE]: loadTemplate,
  [CREATE_TEMPLATE]: createTemplate,
  [UPDATE_TEMPLATE]: updateTemplate,
  [LOAD_PAY_DIRECT]: loadPayDirect,
};

export default MemoryTemplateMapping;
