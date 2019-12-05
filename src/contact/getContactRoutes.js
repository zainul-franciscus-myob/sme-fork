import ContactDetailModule from './contactDetail/ContactDetailModule';
import ContactListModule from './contactList/ContactListModule';

const getContactRoutes = ({
  integration, setRootView, popMessages, pushMessage,
}) => {
  const routes = [
    {
      name: 'contactList',
      path: '/',
      module: new ContactListModule({
        integration, setRootView, popMessages,
      }),
      documentTitle: 'Contacts',
    },
    {
      name: 'contactDetail',
      path: '/:contactId',
      module: new ContactDetailModule({ integration, setRootView, pushMessage }),
      documentTitle: 'Contact',
    },
  ];

  return routes;
};

export default getContactRoutes;
