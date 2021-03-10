import {
  CREATE_CONTACT,
  CREATE_CONTACT_MODAL,
  DELETE_CONTACT,
  LOAD_ABN_VALIDATION_RESULT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_COMBOBOX_OPTIONS,
  LOAD_CONTACT_COMBOBOX_OPTION_BY_ID,
  LOAD_CONTACT_DETAIL,
  LOAD_CONTACT_LIST,
  LOAD_CONTACT_LIST_NEXT_PAGE,
  LOAD_CONTACT_MODAL,
  LOAD_NEW_CONTACT,
  SEARCH_CONTACT_COMBOBOX,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_CONTACT,
} from '../ContactIntents';
import contactDetailLoadResponse from './data/contactDetailEntry';
import contactListFilterResponse from './data/filterContactList';
import contactListLoadResponse from './data/contactList';
import contactListNextPageResponse from './data/contactListNextPage';
import createContactModalResponse from './data/createContactModalResponse';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadContactOptionByIdResponse from './data/loadContactComboboxOptionByIdResponse.json';
import loadContactOptionsResponse from './data/loadContactComboboxOptionsResponse.json';
import loadContactSearchResponse from './data/loadSearchContactCombobxResponse.json';
import loadNewContactModalResponse from './data/loadNewContactModalResponse';
import newContactDetailResponse from './data/contactDetailNewEntry';
import success from './data/success.json';
import validateAbnResponse from './data/validateAbnResult';

const sortAndFilterContactList = ({ onSuccess }) =>
  onSuccess(contactListFilterResponse);
const loadContactList = ({ onSuccess }) => onSuccess(contactListLoadResponse);
const contactListNextPage = ({ onSuccess }) =>
  onSuccess(contactListNextPageResponse);
const loadContactDetail = ({ onSuccess }) =>
  onSuccess(contactDetailLoadResponse);
const loadNewContact = ({ onSuccess }) => onSuccess(newContactDetailResponse);
const deleteContact = ({ onSuccess }) => onSuccess(success);
const updateContact = ({ onSuccess }) => onSuccess(success);
const createContact = ({ onSuccess }) => onSuccess(success);
const loadNewAccount = ({ onSuccess }) => onSuccess(loadAddedAccountResponse);
const validateAbn = ({ onSuccess }) => onSuccess(validateAbnResponse);

const ContactListMapping = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SORT_AND_FILTER_CONTACT_LIST]: sortAndFilterContactList,
  [LOAD_CONTACT_DETAIL]: loadContactDetail,
  [LOAD_NEW_CONTACT]: loadNewContact,
  [DELETE_CONTACT]: deleteContact,
  [UPDATE_CONTACT]: updateContact,
  [CREATE_CONTACT]: createContact,
  [LOAD_CONTACT_MODAL]: ({ onSuccess }) =>
    onSuccess(loadNewContactModalResponse),
  [CREATE_CONTACT_MODAL]: ({ onSuccess }) =>
    onSuccess(createContactModalResponse),
  [LOAD_CONTACT_LIST_NEXT_PAGE]: contactListNextPage,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadNewAccount,
  [LOAD_ABN_VALIDATION_RESULT]: validateAbn,
  [LOAD_CONTACT_COMBOBOX_OPTIONS]: ({ onSuccess }) => {
    const contactOptions = loadContactOptionsResponse.contactOptions.map(
      (option) => {
        const id = Math.floor(Math.random() * 100) + 1;
        return {
          ...option,
          id,
          displayName: `${option.displayName} ${id}`,
        };
      }
    );
    onSuccess({ ...loadContactOptionsResponse, contactOptions });
  },
  [LOAD_CONTACT_COMBOBOX_OPTION_BY_ID]: ({ urlParams, onSuccess }) => {
    const { contactId } = urlParams;
    onSuccess({ ...loadContactOptionByIdResponse, id: contactId });
  },
  [SEARCH_CONTACT_COMBOBOX]: ({ onSuccess }) =>
    onSuccess(loadContactSearchResponse),
};

export default ContactListMapping;
