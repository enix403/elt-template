const path = require('path');
const CracoAlias = require("craco-alias");
const {
    override,
    removeModuleScopePlugin,
    babelInclude
} = require("customize-cra");


module.exports = {
    webpack: {
        configure: override(
            removeModuleScopePlugin(),
            babelInclude([
                path.resolve('src'),
                path.resolve('..', '..', 'shared')
            ])
        )
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                // baseUrl SHOULD be specified
                // plugin does not take it from tsconfig
                baseUrl: "./src",
                /* tsConfigPath should point to the file where "baseUrl" and "paths"
                are specified*/
                tsConfigPath: "./tsconfig.base.json"
            }
        },
    ]
};
