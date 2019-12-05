const getRouteNameToModuleMapping = (routes) => {
  const moduleMapping = {};

  routes.forEach(({ name: rootName, subRoutes }) => {
    subRoutes.forEach(({ name, module, documentTitle }) => {
      const routeName = `${rootName}/${name}`;
      const defaultAction = (context) => { module.run(context); };

      moduleMapping[routeName] = {
        module,
        action: defaultAction,
        title: documentTitle,
      };
    });
  });

  return moduleMapping;
};

export default getRouteNameToModuleMapping;
