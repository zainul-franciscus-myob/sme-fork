import {
  LOAD_CONTACT_LIST,
} from '../../contact/ContactIntents';

const ContactListMapping = {
  [LOAD_CONTACT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/load_contact_list`,
  },
};

export default ContactListMapping;
