import Meetup from './imports/Meetup';

if( MeetupsCollection.find({}).count() <= 0 ) {
    let res = Meetup.getMeetups();

    let meetup = {
        data: res,
        time: new Date()
    };

    MeetupsCollection.insert(meetup);
}