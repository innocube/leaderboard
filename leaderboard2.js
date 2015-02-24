PlayersList = new Mongo.Collection('players');


if (Meteor.isClient) {                      // this code only runs on the client:
    console.log("Hello client");
    Meteor.subscribe('thePlayers');

    Template.leaderboard.helpers({          // helper functions go here:
        'player': function(){
            var currentUserId = Meteor.userId();
            return PlayersList.find({}, {sort: {score: -1, name: 1} });
        },
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if (playerId == selectedPlayer) {
                console.log("Selected Player: " + PlayersList.findOne(selectedPlayer).name);
                return "selected";
            }
        },
        'showSelectedPlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne(selectedPlayer);
        },
        'count': function(){
            return PlayersList.find().count();
        }
    });

    Template.leaderboard.events({           // events go here:
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: 5} });
        },
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc: {score: -5} });
        },
        'click .remove': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            alert("Do you really want to delete the user " + PlayersList.findOne(selectedPlayer).name + "?");
            console.log("Removing " + PlayersList.findOne(selectedPlayer).name);
            PlayersList.remove(selectedPlayer);
        }
    });

    Template.addPlayerForm.events({
       'submit form': function(event){
           event.preventDefault();
           var playerNameVar = event.target.playerName.value;
           var playerScoreVar = 0;
           if (event.target.playerScore.value){
               playerScoreVar = parseInt(event.target.playerScore.value);
           }
           var currentUserId = Meteor.userId();
           PlayersList.insert({
               name: playerNameVar,
               score: playerScoreVar,
               createdBy: currentUserId
           });
           event.target.playerName.value = "";
           event.target.playerScore.value = "";
           console.log("Added " + playerNameVar + " (score: " + playerScoreVar + ")");
       }
    });
}


if (Meteor.isServer) {                      // this code only runs on the server:
    console.log("Hello server");
    console.log(PlayersList.find().fetch());
    Meteor.publish('thePlayers', function(){
        var currentUserId = this.userId;
        return PlayersList.find({createdBy: currentUserId});
    })
}
