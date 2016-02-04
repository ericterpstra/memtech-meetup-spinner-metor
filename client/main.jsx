import React from 'react';
import ReactDom from 'react-dom';
import App from './imports/App.jsx';

Meteor.call('getMeetups', (err, res) => {
    console.log(res);
    ReactDom.render(<App meetups={res}/>, document.getElementById('root'));
});

Meteor.startup(()=>{
});
