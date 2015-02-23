PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
    // this code only runs on the client:
    console.log("Hello client");

    Template.leaderboard.helpers({
        // helper functions go here
        'player': function(){
            return PlayersList.find()
        },
        'count': function(){
            return PlayersList.find().count();
        }
    });
}

if (Meteor.isServer) {
    // this code only runs on the server:
    console.log("Hello server");
}