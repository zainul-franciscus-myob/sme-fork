// TLDR: Pulls component CSS into the main chunk to avoid build warnings about ambiguous ordering.
//
// Details: Moving to dynamically imported feature modules means that our CSS is split into dynamic
// chunks which are imported alongside the JS chunks. This presents an issue for common CSS like
// that found in these components, which are imported into multiple feature modules. While Webpack
// can wire everything up fine, the CSS import ordering is no longer deterministic because it
// depends on the order the feature modules are imported, which depends on the order the user
// navigates around the app. The order shouldn't effect us since we use scoped CSS via CSS Modules,
// but Webpack issues a build warning about ambiguous ordering. Since build warnings are converted
// to errors in CI, these warnings break the build.

// `require.context()` is a Webpack specific construct which is interpreted at build time to
// statically import files without having to list their filenames. This one is doing something like
// `import './**/*.css';`, if such a thing were allowed. (For anyone familiar with this syntax,
// you'll notice we're not _actually_ importing the modules, we're just telling Webpack to make
// those imports available here. Practically, that means all those files will be bundled into
// whichever chunk this ends up in, but they won't be loaded until some other code actually imports
// them normally.)
require.context('.', true, /\.css$/);
