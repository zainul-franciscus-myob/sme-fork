import {
  CREATE_CONTACT,
  CREATE_CONTACT_MODAL,
  DELETE_CONTACT,
  LOAD_ABN_VALIDATION_RESULT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_DETAIL,
  LOAD_CONTACT_LIST,
  LOAD_CONTACT_LIST_NEXT_PAGE,
  LOAD_CONTACT_MODAL,
  LOAD_NEW_CONTACT,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_CONTACT,
} from '../ContactIntents';
import contactDetailLoadResponse from './data/contactDetailEntry';
import contactListFilterResponse from './data/filterContactList';
import contactListLoadResponse from './data/contactList';
import contactListNextPageResponse from './data/contactListNextPage';
import createContactModalResponse from './data/createContactModalResponse';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
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
};

export default ContactListMapping;
