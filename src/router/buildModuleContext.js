export default function buildModuleContext(route) {
  return Object.entries(route.params).reduce((acc, [key, value]) => {
    let contextValue;
    try {
      contextValue = decodeURIComponent(value);
    } catch (e) {
      contextValue = value;
    }
    return { ...acc, [key]: contextValue };
  }, {});
}
