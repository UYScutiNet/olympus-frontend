/* eslint-disable */

module.exports = api => {
  const validEnv = ["development", "test", "production"];
  const currentEnv = api.env();
  const isDevelopmentEnv = api.env("development");
  const isProductionEnv = api.env("production");
  const isTestEnv = api.env("test");

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      `Please specify a valid 'MODE' or 'BABEL_ENV' environment variables. Valid values are "development", "test", and "production". Instead, received: ${JSON.stringify(
        currentEnv,
      )}.`,
    );
  }

  return {
    presets: [
      isTestEnv && [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
          modules: "commonjs",
        },
        "@babel/preset-react",
      ],
      isTestEnv && ["@babel/preset-typescript"],
      (isProductionEnv || isDevelopmentEnv) && [
        "@babel/preset-env",
        {
          forceAllTransforms: true,
          useBuiltIns: "entry",
          corejs: 3,
          modules: false,
          exclude: ["transform-typeof-symbol"],
        },
      ],
      [
        "@babel/preset-react",
        {
          useBuiltIns: true,
          runtime: "automatic",
        },
      ],
    ].filter(Boolean),
    plugins: [
      "babel-plugin-macros",
      "@babel/plugin-syntax-dynamic-import",
      isTestEnv && "babel-plugin-dynamic-import-node",
      "@babel/plugin-transform-destructuring",
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true,
        },
      ],
      [
        "@babel/plugin-proposal-object-rest-spread",
        {
          useBuiltIns: true,
        },
      ],
      [
        "@babel/plugin-transform-runtime",
        {
          helpers: false,
          regenerator: true,
          corejs: false,
        },
      ],
      [
        "@babel/plugin-transform-regenerator",
        {
          async: false,
        },
      ],
      [
        "@babel/plugin-proposal-private-methods",
        {
          loose: true,
        },
      ],
      [
        "@babel/plugin-proposal-private-property-in-object",
        {
          loose: true,
        },
      ],
      isProductionEnv && [
        "babel-plugin-transform-react-remove-prop-types",
        {
          removeImport: true,
        },
      ],
    ].filter(Boolean),
  };
};
