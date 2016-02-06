import React from 'react';
import Spinner from './Spinner.jsx';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meetups: [],
            spinnerItems: []
        }
    }

    componentWillMount() {
        Meteor.call('getMeetups', (error, response) => {
            this.setState({
                meetups: response
            });
        });
    }

    render() {
        return (
            <Spinner
                meetups={this.state.meetups}
                spinnerItems={this.state.spinnerItems}
                getSelectedItem={this.fetchMeetup.bind(this)}
            />
        );
    }

    fetchMeetup(meetupId) {

        Meteor.call('getMeetupRsvps', meetupId, (error, response) => {
            if(error || !response) {
                return console.log(error.message);
            } else {

                let len = response.len;
                let items = response.map( (rsvp, i, arr) => ({
                    id: i,
                    angle: (360/arr.length) * i,
                    photo: rsvp.photo,
                    caption: rsvp.name
                }));


                this.setState({
                    spinnerItems: items
                });
            }
        });

    }

}
