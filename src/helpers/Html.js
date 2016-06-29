import React, { Component } from 'react';

export default class Html extends Component {
    render() {
        return (
            <html lang="pl">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="/styles/app.css" rel="stylesheet" />
                </head>
                <body>
                    <div id="root"></div>
                    <script src="/scripts/app.js" />
                </body>
            </html>
        );
    }
}
