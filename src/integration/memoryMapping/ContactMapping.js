import {
  LOAD_CONTACT_LIST,
} from '../../contact/ContactIntents';
import contactListLoadResponse from '../data/contact/contactList';

const loadContactList = ({ onSuccess }) => onSuccess(contactListLoadResponse);

const ContactListMapping = {
  [LOAD_CONTACT_LIST]: loadContactList,
};

export default ContactListMapping;
