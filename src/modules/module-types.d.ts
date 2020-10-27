/** The homebrew DI container which modules select dependencies from. */
export type Container = Readonly<Record<string, any>>;

/** A module object, containing the code behind a route. */
export type Module = Record<string, any>;

/** A constructor for a module.
 * @param container The DI container which the module may select dependencies from. */
export type ModuleConstructor = new (container?: Container) => Module

/** Defines an individual route and how to load the code behind it. */
export interface Route {
  /** The canonical route name, which can be used to identify this route with the router. */
  name: string;
  /** The path pattern for this route. */
  path: string;
  /** The text to display in the tab's title when this route is active. */
  documentTitle: string;
  /** A list of allowed query params for this route. */
  allowedParams?: string[];
  /** An optional map of query param default values. */
  defaultParams?: Record<string, string>;
  /** Loads the module code behind this route. Supports ES6 dynamic imports to allow Webpack to
   * split each module into it's own output chunk, so the client will only download and parse the
   * code for the module as they first navigate to the associated route.
   * @example loadModule: () => import('./MyModule') */
  loadModule?: () => Promise<{
    // NOTE: The default export here should not be optional, but Ryder appears to have a bug which
    // expects it to be so. Ryder's Typescript support doesn't produce particularly helpful error
    // messages anyway, but avoiding an outright error in a correct case seems worth the concession.
    readonly default?: ModuleConstructor
  }>,
  /** Prefer using `loadModule` instead. Specifies a module to handle the route. The module code
   * will be bundled into the main chunk, rather than split into it's own. */
  module?: Module
}

/** A function which creates route configurations. */
export type RouteConfig = (container?: Container) => Route[]
