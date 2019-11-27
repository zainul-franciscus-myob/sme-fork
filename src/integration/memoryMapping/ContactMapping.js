import {
  CREATE_CONTACT,
  CREATE_CONTACT_MODAL,
  DELETE_CONTACT,
  LOAD_CONTACT_DETAIL,
  LOAD_CONTACT_LIST,
  LOAD_CONTACT_LIST_NEXT_PAGE,
  LOAD_CONTACT_MODAL,
  LOAD_NEW_CONTACT,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_CONTACT,
} from '../../contact/ContactIntents';
import contactDetailLoadResponse from '../data/contact/contactDetailEntry';
import contactListFilterResponse from '../data/contact/filterContactList';
import contactListLoadResponse from '../data/contact/contactList';
import contactListNextPageResponse from '../data/contact/contactListNextPage';
import createContactModalResponse from '../data/contact/createContactModalResponse';
import loadNewContactModalResponse from '../data/contact/loadNewContactModalResponse';
import newContactDetailResponse from '../data/contact/contactDetailNewEntry';
import success from '../data/success';

const sortAndFilterContactList = ({ onSuccess }) => onSuccess(contactListFilterResponse);
const loadContactList = ({ onSuccess }) => onSuccess(contactListLoadResponse);
const contactListNextPage = ({ onSuccess }) => onSuccess(contactListNextPageResponse);
const loadContactDetail = ({ onSuccess }) => onSuccess(contactDetailLoadResponse);
const loadNewContact = ({ onSuccess }) => onSuccess(newContactDetailResponse);
const deleteContact = ({ onSuccess }) => onSuccess(success);
const updateContact = ({ onSuccess }) => onSuccess(success);
const createContact = ({ onSuccess }) => onSuccess(success);

const ContactListMapping = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SORT_AND_FILTER_CONTACT_LIST]: sortAndFilterContactList,
  [LOAD_CONTACT_DETAIL]: loadContactDetail,
  [LOAD_NEW_CONTACT]: loadNewContact,
  [DELETE_CONTACT]: deleteContact,
  [UPDATE_CONTACT]: updateContact,
  [CREATE_CONTACT]: createContact,
  [LOAD_CONTACT_MODAL]: ({ onSuccess }) => onSuccess(loadNewContactModalResponse),
  [CREATE_CONTACT_MODAL]: ({ onSuccess }) => onSuccess(createContactModalResponse),
  [LOAD_CONTACT_LIST_NEXT_PAGE]: contactListNextPage,
};

export default ContactListMapping;
