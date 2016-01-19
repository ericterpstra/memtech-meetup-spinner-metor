import moment from 'moment';

export default Meetup = {

    getMeetups() {

        let startTime = moment().subtract(3, 'days').unix() * 1000;
        let endTime = moment().add(8, 'days').unix() * 1000;

        try {

            let meetupResults = HTTP.get(
                'https://api.meetup.com/2/events',
                {
                    params: {
                        key: Meteor.settings.MEETUP,
                        status: 'upcoming,past',
                        'group_urlname': 'memphis-technology-user-groups',
                        time: [startTime, endTime].join()
                    }
                }
            );

            if( meetupResults.statusCode === 200 && meetupResults.data.results && meetupResults.data.results.length > 0 ){

                return meetupResults.data.results.map( ({id, name, time, utc_offset}) => (
                    {
                        id,
                        name,
                        time,
                        utc_offset
                    }
                ));

            } else {

                console.log('No Meetups Found');
                return false;

            }

        } catch (e) {

            console.log(e.message);
            return false;

        }

    },

    getMeetupRsvps(meetupId) {

        try {

            let meetupResult = HTTP.get(
                'https://api.meetup.com/2/rsvps',
                {
                    params: {
                        key: Meteor.settings.MEETUP,
                        event_id: meetupId,
                        order: 'name'
                    }
                }
            );

            return meetupResult.data.results;

        } catch (e) {

            console.log(e.text);
            return false;

        }
    }

};
   
