import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
const container=document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root=createRoot(container);

import { WebSocClient } from './controller/wsoc/WebSocClient';
import { WebSocProvider } from './controller/wsoc/WebSocProvider';

const client = new WebSocClient({
    urls:["ws://localhost:8080/wsoc_rp"]
})
root.render(
    <React.StrictMode>
        <WebSocProvider client={client}>
            <App />
        </WebSocProvider>
    </React.StrictMode>);