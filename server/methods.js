import meetupTool from './imports/Meetup';
import moment from 'moment';

function _isFetchedWithinMinutes(time, minutes) {
    return moment().diff(time, 'minutes') <= minutes;
}

Meteor.methods({

    getMeetups() {

        // Check database.  If meetup list is new, return list.
        let meetupList = MeetupsCollection.findOne({});

        if ( _isFetchedWithinMinutes(meetupList.time, 60) ) {

            return meetupList.data;

        } else {

            // If it's too old, refresh from Meetup.com and return new list.

            let meetupList = meetupTool.getMeetups();

            MeetupsCollection.remove(meetupList._id);

            MeetupsCollection.insert({
                data: meetupList.data,
                time: new Date()
            });

            return meetupList;
        }


    },

    getMeetupRsvps(meetupId) {
        // Check database.  If meetup list is new, return list.
        let meetupRsvpData = MeetupCollection.findOne({meetupId: meetupId});

        if ( meetupRsvpData && _isFetchedWithinMinutes(meetupRsvpData.time, 15) ) {

            return meetupRsvpData.data;

        } else {

            // If it's too old, refresh from Meetup.com and return new list.

            let newRsvpData = meetupTool.getMeetupRsvps(meetupId);

            if(meetupRsvpData) {
                MeetupCollection.remove(meetupRsvpData._id);
            }

            MeetupCollection.insert({
                data: newRsvpData,
                meetupId: meetupId,
                time: new Date()
            });

            return newMeetupData;
        }
    }

});