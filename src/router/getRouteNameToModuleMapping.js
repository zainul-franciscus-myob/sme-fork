const getRouteNameToModuleMapping = (routes) => {
  const moduleMapping = {};

  routes.forEach(({ name: rootName, subRoutes }) => {
    subRoutes.forEach(({ name, module }) => {
      const routeName = `${rootName}/${name}`;
      const defaultAction = (context) => { module.run(context); };

      moduleMapping[routeName] = {
        module,
        action: defaultAction,
      };
    });
  });

  return moduleMapping;
};

export default getRouteNameToModuleMapping;
