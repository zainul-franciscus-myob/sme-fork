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

const ContactListMapping = {
  [SORT_AND_FILTER_CONTACT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/filter_contact_list`,
  },
  [LOAD_CONTACT_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/load_contact_list`,
  },
  [LOAD_CONTACT_LIST_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/filter_contact_list`,
  },
  [LOAD_NEW_CONTACT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/load_new_contact_detail`,
  },
  [LOAD_CONTACT_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) => `/${businessId}/contact/load_contact_detail/${contactId}`,
  },
  [CREATE_CONTACT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/contact/create_contact`,
  },
  [UPDATE_CONTACT]: {
    method: 'PUT',
    getPath: ({ businessId, contactId }) => `/${businessId}/contact/update_contact_detail/${contactId}`,
  },
  [DELETE_CONTACT]: {
    method: 'DELETE',
    getPath: ({ businessId, contactId }) => `/${businessId}/contact/delete_contact/${contactId}`,
  },
  [LOAD_CONTACT_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/load_new_contact_modal`,
  },
  [CREATE_CONTACT_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/contact/create_contact_modal`,
  },
};

export default ContactListMapping;
