import {
  LOAD_CONTACT_LIST,
  SORT_AND_FILTER_CONTACT_LIST,
} from '../../contact/ContactIntents';

const ContactListMapping = {
  [SORT_AND_FILTER_CONTACT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/filter_contact_list`,
  },
  [LOAD_CONTACT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/load_contact_list`,
  },
};

export default ContactListMapping;
