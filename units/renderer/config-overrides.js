const path = require("path");
const {
    removeModuleScopePlugin,
    override,
    babelInclude
} = require("customize-cra");

module.exports = override(
    removeModuleScopePlugin(),
    babelInclude([
        path.resolve('src'),
        path.resolve('..', '..', 'shared')
    ])
);

