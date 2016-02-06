import Meetup from './imports/Meetup';

if( MeetupsCollection.find({}).count() <= 0 ) {
    let meetup = {
        data: resMeetup.getMeetups(),
        time: new Date()
    };

    MeetupsCollection.insert(meetup);
}