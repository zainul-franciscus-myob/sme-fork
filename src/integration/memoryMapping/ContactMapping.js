import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACT_DETAIL,
  LOAD_CONTACT_LIST,
  SORT_AND_FILTER_CONTACT_LIST,
  UPDATE_CONTACT,
} from '../../contact/ContactIntents';
import contactDetailLoadResponse from '../data/contact/contactDetailEntry';
import contactListFilterResponse from '../data/contact/filterContactList';
import contactListLoadResponse from '../data/contact/contactList';
import success from '../data/success';

const sortAndFilterContactList = ({ onSuccess }) => onSuccess(contactListFilterResponse);
const loadContactList = ({ onSuccess }) => onSuccess(contactListLoadResponse);
const loadContactDetail = ({ onSuccess }) => onSuccess(contactDetailLoadResponse);
const deleteContact = ({ onFailure }) => onFailure(success);
const updateContact = ({ onSuccess }) => onSuccess(success);
const createContact = ({ onSuccess }) => onSuccess(success);

const ContactListMapping = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SORT_AND_FILTER_CONTACT_LIST]: sortAndFilterContactList,
  [LOAD_CONTACT_DETAIL]: loadContactDetail,
  [DELETE_CONTACT]: deleteContact,
  [UPDATE_CONTACT]: updateContact,
  [CREATE_CONTACT]: createContact,
};

export default ContactListMapping;
