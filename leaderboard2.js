PlayersList = new Mongo.Collection('players');


if (Meteor.isClient) {                      // this code only runs on the client:
    console.log("Hello client");

    Template.leaderboard.helpers({          // helper functions go here:
        'player': function(){
            return PlayersList.find()
        },
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if (playerId == selectedPlayer) {
                console.log("Selected Player: " + selectedPlayer);
                return "selected"
            }
        },
        'count': function(){
            return PlayersList.find().count();
        }
    });

    Template.leaderboard.events({           // events go here:
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        }
    });
}


if (Meteor.isServer) {                      // this code only runs on the server:
    console.log("Hello server");
}
