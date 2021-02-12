import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';

import { appContext } from './context/AppContext';

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Application appContext={appContext}/>, document.getElementById('container'));
});


