import {
  CREATE_CONTACT,
  CREATE_CONTACT_MODAL,
  DELETE_CONTACT,
  LOAD_ABN_VALIDATION_RESULT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_AUTOCOMPLETE_ADDRESSES,
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
    getPath: ({ businessId }) =>
      `/${businessId}/contact/load_new_contact_detail`,
  },
  [LOAD_CONTACT_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/contact/load_contact_detail/${contactId}`,
  },
  [CREATE_CONTACT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/contact/create_contact`,
  },
  [UPDATE_CONTACT]: {
    method: 'PUT',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/contact/update_contact_detail/${contactId}`,
  },
  [DELETE_CONTACT]: {
    method: 'DELETE',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/contact/delete_contact/${contactId}`,
  },
  [LOAD_CONTACT_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/contact/load_new_contact_modal`,
  },
  [CREATE_CONTACT_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/contact/create_contact_modal`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/contact/load_account/${accountId}`,
  },
  [LOAD_ABN_VALIDATION_RESULT]: {
    method: 'GET',
    getPath: ({ businessId, abn }) =>
      `/${businessId}/contact/validate_abn/${abn}`,
  },
  [LOAD_CONTACT_COMBOBOX_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/load_contact_options`,
  },
  [LOAD_CONTACT_COMBOBOX_OPTION_BY_ID]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/contact/load_contact_options/${contactId}`,
  },
  [SEARCH_CONTACT_COMBOBOX]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/contact/load_contact_options`,
  },
  [LOAD_AUTOCOMPLETE_ADDRESSES]: {
    method: 'GET',
    getPath: ({ country, keywords }) =>
      `/address-autocomplete/${country}/${keywords}`,
  },
};

export default ContactListMapping;
