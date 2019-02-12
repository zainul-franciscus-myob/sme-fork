import {
  LOAD_CONTACT_LIST,
  SORT_AND_FILTER_CONTACT_LIST,
} from '../../contact/ContactIntents';
import contactListFilterResponse from '../data/contact/filterContactList';
import contactListLoadResponse from '../data/contact/contactList';

const sortAndFilterContactList = ({ onSuccess }) => onSuccess(contactListFilterResponse);
const loadContactList = ({ onSuccess }) => onSuccess(contactListLoadResponse);

const ContactListMapping = {
  [LOAD_CONTACT_LIST]: loadContactList,
  [SORT_AND_FILTER_CONTACT_LIST]: sortAndFilterContactList,
};

export default ContactListMapping;
