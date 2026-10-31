const PACKAGE_ID = "@nex-assistant/media-sense";
// 本地排错时可显式开启；发布包始终排除 source map。
const sourceMaps = process.env.MEDIA_SENSE_SOURCEMAP === '1';
const CLIENT_EXTERNALS = new Set([
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/client",
  "@deepseek-ai/cordis",
  "@deepseek-ai/dsh-client-store",
  "@deepseek-ai/dsh-client-ui-slots",
  "@deepseek-ai/dsh-client-ui-primitives",
  "@deepseek-ai/dsh-api-session-controller/client",
  "@deepseek-ai/dsh-api-workspace-controller/client",
]);

export default [
  { name: 'media-sense/api', entry: { api: 'src/api/index.ts' }, outDir: 'lib', format: 'esm', platform: 'neutral', dts: false, sourcemap: sourceMaps, clean: false, deps: { neverBundle: ['zod'] } },
  {
    name: `${PACKAGE_ID}/host`,
    entry: { index: "src/index.ts" },
    outDir: "lib",
    format: "esm",
    platform: "node",
    dts: false,
    sourcemap: sourceMaps,
    clean: false,
    deps: {
      neverBundle: (specifier) => specifier.startsWith("@deepseek-ai/"),
    },
    outputOptions: { entryFileNames: "index.js" },
  },
  {
    name: `${PACKAGE_ID}/client`,
    entry: { client: "src/client/index.tsx" },
    outDir: "lib",
    format: "cjs",
    platform: "browser",
    dts: false,
    sourcemap: sourceMaps,
    clean: false,
    deps: {
      neverBundle: (specifier) => CLIENT_EXTERNALS.has(specifier),
      alwaysBundle: (specifier) => !CLIENT_EXTERNALS.has(specifier),
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
    },
    outputOptions: {
      entryFileNames: "client.js",
      sourcemapExcludeSources: false,
      banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PACKAGE_ID)}, factory: (require) => {`,
      intro: "var module = { exports: {} }; var exports = module.exports;",
      footer: "return module.exports; } });",
    },
  },
];
