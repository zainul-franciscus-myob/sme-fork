import ContactListModule from './contactList/ContactListModule';

const getContactRoutes = ({
  integration, setRootView, popMessages,
}) => {
  const routes = [
    {
      name: 'contactList',
      path: '/',
      module: new ContactListModule({
        integration, setRootView, popMessages,
      }),
    },
  ];

  return routes;
};

export default getContactRoutes;
