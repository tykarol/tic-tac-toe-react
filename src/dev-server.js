import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from 'helpers/Html';
import webpackConfig from '../webpack.config';
import config from '../config';

const host = config.get('webpack_host');
const port = config.get('webpack_port');

const app = new Express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}));

app.use(webpackHotMiddleware(compiler));

app.use(Express.static(config.get('dir_dist')));

function handleRender(req, res) {
    const html = ReactDOM.renderToString(<Html />);
    res.send(`<!doctype html>${html}`);
}

app.use(handleRender);

app.listen(port, host, (error) => {
    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    } else {
        // eslint-disable-next-line no-console
        console.info('==> Listening on %s:%s. Open up http://%s:%s/ in your browser.', host, port, host, port);
    }
});
