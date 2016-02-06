import React from 'react';
import ReactDom from 'react-dom';
import App from './imports/App.jsx';

Meteor.startup(()=>{
    ReactDom.render(<App />, document.getElementById('root'));
});