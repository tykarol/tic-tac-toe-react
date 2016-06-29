import mapValues from 'lodash/mapValues';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';

import config from './config';

const globals = mapValues(config.get('globals'), function(varible) {
    return JSON.stringify(varible);
});

const paths  = config.get('utils_paths');

let webpackConfig = {
    context: paths.src(),
    entry: {
        app: [
            './app'
        ]
    },
    output: {
        path: paths.dist(),
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: config.get('babel_options')
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'file-loader?name=images/[hash:base64:8].[ext]'
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join('.', config.get('dir_src'))],
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.DefinePlugin(globals),
        new CleanPlugin([
            paths.dist('images'),
            paths.dist('scripts'),
            paths.dist('index.html')
        ]),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};

if (config.get('env') === 'production') {
    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.unshift(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                'unused'   : true,
                'dead_code': true
            }
        })
    );
} else {
    webpackConfig.devtool = 'source-map';
    // When spurce map for css is active then the url() must be absolute path because is used blob for serve css
    webpackConfig.output.publicPath = config.get('webpack_public_path');
    
    // hot
    webpackConfig.entry['app'].unshift(
        'webpack-hot-middleware/client?path='+config.get('webpack_public_path')+'__webpack_hmr'
    );

    // react hot
    webpackConfig.module.loaders[0].query = webpackConfig.module.loaders[0].query || {};
    webpackConfig.module.loaders[0].query.plugins = webpackConfig.module.loaders[0].query.plugins || [];
    webpackConfig.module.loaders[0].query.plugins.push([
        'react-transform', 
        {
            transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
            }]
        }
    ]);

    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.unshift(
        new webpack.HotModuleReplacementPlugin()
    );
};

console.info('==> ENV = %s', config.get('env'));

export default webpackConfig;