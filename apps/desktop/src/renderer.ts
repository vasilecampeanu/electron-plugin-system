import '../styles/index.scss';

import { createElement, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    createElement(
        StrictMode,
        {},
        createElement(
            App
        )
    )
);
