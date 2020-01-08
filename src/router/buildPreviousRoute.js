export default function buildPreviousRoute(router, previousRoute) {
  if (!previousRoute) return null;
  const { name, params } = previousRoute;
  return {
    name,
    params,
    url: window.location.origin + router.buildUrl(name, params),
  };
}
