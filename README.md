# Memtech Meetup Raffle Spinner 3300

Take it for a spin at: http://memtech-meetup-spinner.meteor.com

###To Install

Have Meteor installed already. You will then need to upgrade to the 1.3 beta (or just 1.3 if it's out now)

```
git clone https://github.com/ericterpstra/memtech-meetup-spinner-metor.git
cd memtech-meetup-spinner
meteor update --release 1.3-modules-beta.8
npm install
touch settings.json
```
Copy the json below into settings.json and add your Meetup API key.

```
{
    MEETUP: "YOURMEETUPAPIKEYHERE"
}
```

###To Run:
`meteor --settings=settings.json`
