const getRouteNameToModuleMapping = (routes) =>
  routes.reduce((acc, { name, module, loadModule, documentTitle }) => {
    acc[name] = {
      module,
      loadModule,
      title: documentTitle,
    };
    return acc;
  }, {});

export default getRouteNameToModuleMapping;
