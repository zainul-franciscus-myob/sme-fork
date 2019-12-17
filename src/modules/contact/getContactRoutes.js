import ContactDetailModule from './contactDetail/ContactDetailModule';
import ContactListModule from './contactList/ContactListModule';
import RouteName from '../../router/RouteName';

const getContactRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: RouteName.CONTACT_LIST,
      path: '/:region/:businessId/contact/',
      module: new ContactListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Contacts',
    },
    {
      name: RouteName.CONTACT_DETAIL,
      path: '/:region/:businessId/contact/:contactId',
      module: new ContactDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Contact',
    },
  ];

  return routes;
};

export default getContactRoutes;
