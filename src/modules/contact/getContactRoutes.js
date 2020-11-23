import RouteName from '../../router/RouteName';

/** @type {import('../module-types').RouteConfig} */
const getContactRoutes = () => [
  {
    name: RouteName.CONTACT_LIST,
    path: '/:region/:businessId/contact/',
    loadModule: () => import('./contactList/ContactListModule'),
    documentTitle: 'Contacts',
  },
  {
    name: RouteName.CONTACT_DETAIL,
    path: '/:region/:businessId/contact/:contactId',
    loadModule: () => import('./contactDetail/ContactDetailModule'),
    documentTitle: 'Contact',
  },
];

export default getContactRoutes;
