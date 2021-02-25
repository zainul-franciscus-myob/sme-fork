const getRouteNameToModuleMapping = (routes) =>
  routes.reduce(
    (acc, { name, module, loadModule, documentTitle, isMaximisedModule }) => {
      acc[name] = {
        module,
        loadModule,
        title: documentTitle,
        isMaximisedModule: !!isMaximisedModule,
      };
      return acc;
    },
    {}
  );

export default getRouteNameToModuleMapping;
