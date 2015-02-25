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
            //console.log("Selected Player: " + PlayersList.findOne(selectedPlayer).name);
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
        Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        alert("Do you really want to delete the user " +
        PlayersList.findOne(selectedPlayer).name + "?");
        Meteor.call('removePlayerData', selectedPlayer);
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

        Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);

        event.target.playerName.value = "";
        event.target.playerScore.value = "";
    }
});