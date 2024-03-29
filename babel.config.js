module.exports = {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@modules": "./src/modules",
            "@shared": "./src/shared",
            "@erros": "./src/errors",
            "@config": "./src/config",
            "@utils": "./src/utils",
            "@ensures": "./src/ensures",

          },
        },
      ],
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  };
  